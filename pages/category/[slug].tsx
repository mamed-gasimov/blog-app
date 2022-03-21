import { FC } from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services/sendGraphRequest';
import { PostCard, Categories, Loader } from '../../components';
import { GetStaticPaths, GetStaticProps } from 'next';
import { GetCategoryPost } from '../../types/GetCategoryPost';

interface Props {
    posts: GetCategoryPost[];
}

const CategoryPost: FC<Props> = ({ posts }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    {posts.map((post, index) => (
                        // @ts-ignore
                        <PostCard key={index} post={post.node} />
                    ))}
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const posts = await getCategoryPost(params?.slug as string);

    return {
        props: { posts },
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const categories = await getCategories();
    let paths = [{ params: { slug: '' } }];
    if (categories) {
        paths = categories?.map(({ slug }) => ({ params: { slug } }));
    }
    return {
        paths,
        fallback: true,
    };
}

export default CategoryPost;