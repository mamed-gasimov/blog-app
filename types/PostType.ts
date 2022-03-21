export type GetPostType = {
    cursor: string;
    node: GetPostNodeType;
}

export type GetPostNodeType = {
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: {
        url: string;
    };
    categories: GetPostsNodeCategoryType[];
    author: GetPostsNodeAuthorType;
}

export interface GetPostDetails extends GetPostNodeType {
    content: {
        raw: string
    };
}

type GetPostsNodeCategoryType = {
    name?: string;
    slug?: string;
}

export type GetPostsNodeAuthorType = {
    name: string;
    bio: string;
    id: string;
    photo: {
        url: string;
    };
}
