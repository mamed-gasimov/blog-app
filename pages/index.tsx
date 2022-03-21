import { GetStaticProps } from 'next';
import type { NextPage } from 'next'
import { Categories, PostCard, PostWidget } from '../components';
import { getPosts } from '../services/sendGraphRequest';
import { GetPostType } from '../types/PostType';
import FeaturedPosts from '../sections/FeaturedPosts';

interface Props {
  posts: GetPostType[];
}

const HomePage: NextPage<Props> = ({ posts }) => {
  return (
    <div className='container mx-auto px-10 mb-8'>
      <FeaturedPosts />
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard post={post.node} key={index} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </main >
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await getPosts()) || [];

  return {
    props: {
      posts,
    }
  }
}

export default HomePage;