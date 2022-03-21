export type SubmitCommentType = {
    name: string;
    email: string;
    comment: string;
    slug: string;
}

export type GetCommentType = {
    name: string;
    createdAt: string;
    comment: string;
}