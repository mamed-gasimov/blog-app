import { FC } from 'react';
import { PostType } from './types';

interface Props {
    post: PostType;
}

const PostCard: FC<Props> = ({ post }) => {
    return (
        <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
            {post.title}
            {post.excerpt}
        </div>
    )
}

export default PostCard;