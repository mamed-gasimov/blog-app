import { FC } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import { GetPostNodeType } from '../../types/PostType';
import { DateIcon } from '../../assets/images';

interface Props {
    post: GetPostNodeType;
}

const PostCard: FC<Props> = ({ post }) => {
    return (
        <section className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
            <div className='relative overflow-hidden shadow-md pb-80 mb-6'>
                <Image
                    src={post.featuredImage.url}
                    layout='fill'
                    alt={`${post.title}`}
                    className='object-top absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg'
                />
            </div>
            <h1 className='transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold'>
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </h1>
            <div className='block lg:flex text-center items-center justify-center mb-8 w-full'>
                <div className='flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center'>
                    <Image
                        // unoptimized
                        // loader={grpahCMSImageLoader}
                        alt={post.author.name}
                        height='30px'
                        width='30px'
                        className='align-middle rounded-full'
                        src={post.author.photo.url}
                    />
                    <p className='inline align-middle text-gray-700 ml-2 font-medium text-lg'>{post.author.name}</p>
                </div>
                <div className='font-medium text-gray-700'>
                    <span className='w-6 h-6 inline mr-2 text-pink-500'>
                        <DateIcon size='1.5rem' />
                    </span>
                    <span className='align-middle'>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                </div>
            </div>
            <p className='text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8'>
                {post.excerpt}
            </p>
            <div className='text-center'>
                <Link href={`/post/${post.slug}`}>
                    <span
                        className={
                            `transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600
text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer`
                        }
                    >
                        Continue Reading
                    </span>
                </Link>
            </div>
        </section>
    )
}

export default PostCard;