import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query';
import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';
import { loadHashtagPostsAPI } from '../../apis';

const Hashtag = () => {
  const router = useRouter();
  const { tag } = router.query;

  const {
    data,
    isLoading: loadPostsLoading,
    fetchNextPage,
  } = useInfiniteQuery(
    ['hashtag', tag],
    ({ pageParam = '' }) => loadHashtagPostsAPI({ tag, pageParam }),
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
    const onScroll = () => {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (readToLoad) {
          fetchNextPage();
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [readToLoad, fetchNextPage]);

  return (
    <AppLayout>
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const tag = context.params?.tag;
  if (!tag) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  await queryClient.prefetchInfiniteQuery(['hashtag', tag], () => loadHashtagPostsAPI(tag));
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Hashtag;
