import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, Comment, List, Popover } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Link from 'next/link';
import dayjs from 'dayjs';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';
import { likePostAPI, loadMyInfoAPI, removePostAPI, retweetAPI, unLikePostAPI } from '../apis';

const PostCardWrapper = styled.div`
  margin-bottom: 20px;
`;

dayjs.locale('ko');

const PostCard = ({ post }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { data: me } = useQuery('user', loadMyInfoAPI);

  const likeMutation = useMutation(['post', post.id], likePostAPI, {
    onMutate() {
      if (!me) return;
      queryClient.setQueryData('posts', (data) => {
        const found = data?.pages.flat().find((v) => v.id === post.id);
        if (found) {
          found.Likers.push({ id: me.id });
        }
        return {
          pageParams: data?.pageParams || [],
          pages: data?.pages || [],
        };
      });
    },
    onSettled() {
      queryClient.refetchQueries('posts');
    },
  });
  const unlikeMutation = useMutation(['post', post.id], unLikePostAPI, {
    onMutate() {
      if (!me) return;
      queryClient.setQueryData('posts', (data) => {
        const found = data?.pages.flat().find((v) => v.id === post.id);
        if (found) {
          const index = found.Likers.findIndex((v) => v.id === me.id);
          found.Likers.splice(index, 1);
        }
        return {
          pageParams: data?.pageParams || [],
          pages: data?.pages || [],
        };
      });
    },
    onSettled() {
      queryClient.refetchQueries('posts');
    },
  });

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onLike = useCallback(() => {
    if (!me?.id) {
      return alert('로그인이 필요합니다.');
    }

    return likeMutation.mutate(post.id);
  }, [me, post.id, likeMutation]);

  const onUnLike = useCallback(() => {
    if (!me?.id) {
      return alert('로그인이 필요합니다.');
    }

    return unlikeMutation.mutate(post.id);
  }, [me, post.id, unlikeMutation]);

  const onRetweet = useCallback(() => {
    if (!me?.id) {
      return alert('로그인이 필요합니다.');
    }

    return retweetAPI(post.id).catch((error) => {
      alert(error.response.data);
    }).finally(() => {
      queryClient.refetchQueries('posts');
    });
  }, [me?.id, post.id]);

  const onRemovePost = useCallback(() => {
    if (!me?.id) {
      return alert('로그인이 필요합니다.');
    }

    setLoading(true);
    return removePostAPI(post.id).finally(() => {
      setLoading(false);
      queryClient.refetchQueries('posts');
    });
  }, [me?.id, post.id]);

  const liked = post.Likers.find((v) => me?.id && v.id === me.id);
  const dateStyle = useMemo(() => ({
    float: 'right',
  }), []);

  return (
    <PostCardWrapper>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked
            ? <HeartTwoTone twoToneColor="#fe5656" key="heart" onClick={onUnLike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={[
              <Button.Group key="button-group">
                {
                  me?.id && post.User.id === me?.id ? (
                    <>
                      <Button>수정</Button>
                      <Button
                        onClick={onRemovePost}
                        type="danger"
                        loading={loading}
                      >삭제
                      </Button>
                    </>
                  ) : <Button>신고</Button>
                                }
              </Button.Group>,
            ]}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={me?.id && post.User.id !== me?.id && <FollowButton post={post} />}
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗 하셨습니다.` : null}
      >
        {
          post.RetweetId && post.Retweet
            ? (
              <Card
                cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
              >
                <div style={dateStyle}>{dayjs(post.createdAt).format('YYYY.MM.DD')}</div>
                <Card.Meta
                  avatar={<Link href={`/user/${post.Retweet.User.id}`}><a><Avatar> {post.Retweet.User.nickname[0]}</Avatar></a></Link>}
                  title={post.Retweet.User.nickname}
                  description={<PostCardContent postData={post.Retweet.content} />}
                />
              </Card>
            )

            : (
              <>
                <div style={dateStyle}>{dayjs(post.createdAt).format('YYYY.MM.DD')}</div>
                <Card.Meta
                  avatar={<Link href={`/user/${post.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
                  title={post.User.nickname}
                  description={<PostCardContent postData={post.content} />}
                />

              </>
            )
        }
      </Card>
      {commentFormOpened
                && (
                <div>
                  <CommentForm post={post} />
                  <List
                    header={`${post.Comments.length}개의 댓글`}
                    itemLayout="horizontal"
                    dataSource={post.Comments}
                    renderItem={(item) => (
                      <li>
                        <Comment
                          author={item.User.nickname}
                          avatar={<Link href={`/user/${item.User.id}`}><a><Avatar>{item.User.nickname[0]}</Avatar></a></Link>}
                          content={item.content}
                        />
                      </li>
                    )}
                  />
                </div>
                )}
    </PostCardWrapper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    Retweet: PropTypes.object,
    RetweetId: PropTypes.number,
  }).isRequired,
};

export default PostCard;
