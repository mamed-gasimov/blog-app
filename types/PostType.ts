export type GetPostType = {
    cursor: string;
    node: GetPostNodeType;
}

export type GetPostNodeType = {
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: GetPostsNodeImgType;
    categories: GetPostsNodeCategoryType[];
    author: GetPostsNodeAuthorType;
}

type GetPostsNodeImgType = {
    url: string;
}

type GetPostsNodeCategoryType = {
    name: string;
    slug: string;
}

type GetPostsNodeAuthorType = {
    name: string;
    bio: string;
    id: string;
    photo: GetPostsNodeAuthorPhotoType;
}

type GetPostsNodeAuthorPhotoType = {
    url: string;
}
