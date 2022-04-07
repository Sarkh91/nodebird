import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { loadFollowersAPI, loadFollowingsAPI, loadMyInfoAPI } from '../apis';

const Profile = () => {
  const router = useRouter();
  const { data: me } = useQuery('user', loadMyInfoAPI);
  const { data: Followings } = useQuery('followings', loadFollowingsAPI);
  const { data: Followers } = useQuery('followers', loadFollowersAPI);

  useEffect(() => {
    if (!me?.id) {
      router.push('/');
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        {<FollowList header="팔로잉 목록" data={Followings || []} />}
        {<FollowList header="팔로워 목록" data={Followers || []} />}
      </AppLayout>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('user', loadMyInfoAPI);
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Profile;
