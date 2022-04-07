import React, { useEffect } from 'react';
import { Avatar, Card } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useInfiniteQuery, useQuery } from 'react-query';
import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';
import { loadMyInfoAPI, loadUserAPI, loadUserPostsAPI } from '../../apis';
import { throttle } from '../../assets/js';

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: me } = useQuery('user', loadMyInfoAPI);
  const { data: userInfo } = useQuery(['user', id], () => loadUserAPI(id));

  const {
    data,
    isLoading: loadPostsLoading,
    fetchNextPage,
  } = useInfiniteQuery(
    ['user', id, 'posts'],
    ({ pageParam }) => loadUserPostsAPI({ id, ...pageParam }),
    {
      getNextPageParam: (lastPage) => ({ lastId: lastPage?.[lastPage.length - 1]?.id,
      }),
    },
  );

  const mainPosts = data?.pages.flat();
  const isEmpty = data?.pages[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data.pages[data.pages.length - 1]?.length < 10);
  const hasMorePosts = !isEmpty && !isReachingEnd;
  const readToLoad = hasMorePosts && !loadPostsLoading;

  useEffect(() => {
    const onScroll = throttle(() => {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (readToLoad) {
          fetchNextPage();
        }
      }
    });
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [readToLoad, fetchNextPage]);

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>
            {userInfo.nickname}
            님의 글
          </title>
          <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:image" content="https://nodebird.com/favicon.ico" />
          <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
        </Head>
      )}
      {userInfo && (userInfo.id !== me?.id)
        ? (
          <Card
            style={{ marginBottom: 20 }}
            actions={[
              <div key="twit">
                짹짹
                <br />
                {userInfo.Posts}
              </div>,
              <div key="following">
                팔로잉
                <br />
                {userInfo.Followings}
              </div>,
              <div key="follower">
                팔로워
                <br />
                {userInfo.Followers}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
            />
          </Card>
        )
        : null}
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const id = context.params?.id;
  if (!id) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  await queryClient.prefetchInfiniteQuery(['user', id, 'posts'], () => loadUserPostsAPI({ id }));
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default User;
