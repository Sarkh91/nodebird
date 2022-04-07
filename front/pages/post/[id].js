import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { loadPostAPI } from '../../apis';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: singlePost } = useQuery('singlePost', () => loadPostAPI(id));

  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}님의 글</title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'http://localhost:3000/favicon.ico'} />
        <meta property="og:url" content={`http://localhost:3000/post/${id}`} />
      </Head>
      {singlePost && <PostCard post={singlePost} />}
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

  await queryClient.prefetchQuery('singlePost', () => loadPostAPI(id));
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Post;
