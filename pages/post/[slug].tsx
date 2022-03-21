import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Author, Categories, PostDetails, PostWidget, CommentsForm, Comments, Loader } from '../../components';
import AdjacentPosts from '../../sections/AdjacentPosts';
import { getPostDetails, getPosts } from '../../services/sendGraphRequest';
import { GetPostDetails } from '../../types/PostType';

interface Props {
    post: GetPostDetails;
}

const PostDetailsPage: NextPage<Props> = ({ post }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <>
            <div className="container mx-auto px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                        <PostDetails post={post} />
                        <Author author={post.author} />
                        <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
                        <CommentsForm slug={post.slug} />
                        <Comments slug={post.slug} />
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative lg:sticky top-8">
                            <PostWidget
                                slug={post.slug}
                                // @ts-ignore
                                categories={post.categories.map((category) => category.slug)}
                            />
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const post = await getPostDetails(params?.slug as string);

    return {
        props: {
            post,
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getPosts();
    let postPaths = [{ params: { slug: '' } }];
    if (posts) {
        postPaths = posts.map(({ node: { slug } }) => ({ params: { slug } }));
    }

    return {
        paths: postPaths,
        fallback: true,
    }
}

export default PostDetailsPage;