import React, { useEffect } from 'react';
import getPosts from './../lib/get-posts';
import Shot from '../components/Shot';
import Header from '../components/Header';
import Hero from '../components/Hero';

export default function IndexPage({ posts }) {
  useEffect(() => {
    console.log(posts);
  }, []);
  return (
    <>
      <div className='main-container'>
        <Header />
        <Hero />
        <div className='container mx-auto px-4 py-32 grid  gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {posts.map((shot) => (
            <Shot key={shot.slug} shot={shot} />
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps = () => {
  const posts = getPosts();

  return {
    props: {
      posts,
    },
  };
};
