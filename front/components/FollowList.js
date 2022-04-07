import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, List } from 'antd';
import styled from 'styled-components';
import { StopOutlined } from '@ant-design/icons';
import { useQueryClient } from 'react-query';
import { removeFollowerAPI, unfollowAPI } from '../apis';

const ListWrapper = styled(List)`
  margin-bottom: 20px;
`;

const LoadMoreWrapper = styled.div`
    text-align: center;
    margin: 10px 0;
`;

const RenderItem = styled(List.Item)`
  margin-top: 20px;
`;

const FollowList = ({ header, data }) => {
  const gridInfo = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }), []);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const onClickUnfollow = useCallback((user) => () => {
    if (!loading) {
      if (header === '팔로잉') {
        removeFollowerAPI(user.id).finally(() => {
          queryClient.refetchQueries('followers');
          setLoading(true);
        });
      } else {
        unfollowAPI({ id: user.id }).finally(() => {
          queryClient.refetchQueries('followings');
          setLoading(true);
        });
      }
    }
  }, [data]);

  return (
    <ListWrapper
      grid={gridInfo}
      size="small"
      header={<div>{header}</div>}
      loadMore={<LoadMoreWrapper><Button>더 보기</Button></LoadMoreWrapper>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <RenderItem>
          <Card actions={[<StopOutlined key="stop" onClick={onClickUnfollow(item)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </RenderItem>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
};

FollowList.defaultProps = {
  header: '',
  data: null,
};

export default FollowList;
