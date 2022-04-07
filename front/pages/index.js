import React, { useEffect } from 'react';
import { dehydrate, QueryClient, useInfiniteQuery, useQuery } from 'react-query';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { loadPostsAPI } from '../apis/post';
import { loadMyInfoAPI } from '../apis';
import { throttle } from '../assets/js';

export const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;
  if (pageIndex === 0) return '/posts?lastId=0';

  return `/posts?lastId=${previousPageData?.[previousPageData?.length - 1].id || 0}&limit=10`;
};

const Home = () => {
  const { data: me } = useQuery('user', loadMyInfoAPI);
  const {
    data,
    isLoading: loadPostsLoading,
    fetchNextPage,
  } = useInfiniteQuery('posts', ({ pageParam = '' }) => loadPostsAPI({ params: pageParam }), {
    getNextPageParam: (lastPage) => ({ lastId: lastPage?.[lastPage.length - 1]?.id,
    }),
  });

  const mainPosts = data?.pages.flat();
  const isEmpty = data?.pages[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data.pages[data.pages.length - 1]?.length < 10);
  const hasMorePosts = !isEmpty && !isReachingEnd;
  const readToLoad = hasMorePosts && !loadPostsLoading;

  useEffect(() => {
    const onScroll = throttle(() => {
      const end = document.documentElement.scrollHeight - 300;
      const current = document.documentElement.clientHeight + window.scrollY;

      if (current >= end) {
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
      {me && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery('posts', () => loadPostsAPI());
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Home;
