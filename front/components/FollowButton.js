import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useQuery, useQueryClient } from 'react-query';
import { followAPI, loadMyInfoAPI, unfollowAPI } from '../apis';

const FollowButton = ({ post }) => {
  const { data: me } = useQuery('user', loadMyInfoAPI);
  const [loading, setLoading] = useState(false);
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  const queryClient = useQueryClient();

  const onClickButton = useCallback(() => {
    setLoading(true);
    if (isFollowing) {
      unfollowAPI({ id: post.User.id }).finally(() => {
        queryClient.refetchQueries('user');
        setLoading(false);
      });
    } else {
      followAPI({ id: post.User.id }).finally(() => {
        queryClient.refetchQueries('user');
        setLoading(false);
      });
    }
  }, [post.User.id, isFollowing]);

  return (
    <Button loading={loading} onClick={onClickButton}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
