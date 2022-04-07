import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Card } from 'antd';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Link from 'next/link';
import { loadMyInfoAPI, logoutAPI } from '../apis';

const UserProfile = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { data: me } = useQuery('user', loadMyInfoAPI);
  const mutation = useMutation(logoutAPI, {
    onMutate: () => {
      setLoading(true);
    },
    onError: (error) => {
      alert(error.response?.data);
    },
    onSuccess: () => {
      queryClient.setQueryData('user', null);
    },
  });

  const onLogOut = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return (
    <Card actions={[
      <div key="twit"><Link href={`/user/${me.id}`}><a>짹짹<br />{me.Posts.length}</a></Link></div>,
      <div key="followings"><Link href="/profile"><a>팔로잉<br />{me.Followings.length}</a></Link></div>,
      <div key="followers"><Link href="/profile"><a>팔로워<br />{me.Followers.length}</a></Link></div>,
    ]}
    >
      <Card.Meta title={me.nickname} avatar={<Link href={`/user/${me.id}`}><a><Avatar>{me.nickname[0]}</Avatar></a></Link>} />
      <Button onClick={onLogOut} loading={loading}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
