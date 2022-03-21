import { request, gql } from 'graphql-request';
import { CategoryType } from '../types/CategoryType';
import { SubmitCommentType } from '../types/CommentTypes';
import { GetCategoryPost } from '../types/GetCategoryPost';
import { FeaturedPost, GetPostDetails, GetPostType } from '../types/PostType';

const graphqlAPI = process.env.ENDPOINT_URL as string;

export const getPosts = async () => {
  try {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    cursor
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query);
    return result.postsConnection.edges as GetPostType[];
  } catch (error) {
    console.log(error);
  }
}

export const getPostDetails = async (slug: string) => {
  try {
    const query = gql`
    query GetPostDetails ($slug: String!) {
      post (where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

    const result = await request(graphqlAPI, query, { slug });
    return result.post as GetPostDetails;
  } catch (error) {
    console.log(error);
  }
}

export const getRecentPosts = async () => {
  try {
    const query = gql`
      query GetPostDetails {
        posts(
          orderBy: createdAt_ASC
          last: 3
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;

    const result = await request(graphqlAPI, query);

    return result.posts;
  } catch (error) {
    console.log(error);
  }
};

export const getSimilarPosts = async (categories: CategoryType[], slug: string) => {
  try {
    const query = gql`
      query GetPostDetails($slug: String!, $categories: [String!]) {
        posts(
          where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
          last: 3
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;
    const result = await request(graphqlAPI, query, { slug, categories });

    return result.posts;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  try {
    const query = gql`
    query GetCategories {
      categories {
          name
          slug
      }
    }
  `;

    const result = await request(graphqlAPI, query);
    return result.categories as CategoryType[];
  } catch (error) {
    console.log(error);
  }
}

export const submitComment = async (obj: SubmitCommentType) => {
  try {
    const result = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    return result.json();
  } catch (error) {
    console.log(error);
  }

};

export const getComments = async (slug: string) => {
  try {
    const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }){
        name
        createdAt
        comment
      }
    }
  `;

    const result = await request(graphqlAPI, query, { slug });
    return result.comments;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryPost = async (slug: string) => {
  try {
    const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

    const result = await request(graphqlAPI, query, { slug });
    return result.postsConnection.edges as GetCategoryPost;
  } catch (error) {
    console.log(error);
  }
};

export const getAdjacentPosts = async (createdAt: string, slug: string) => {
  try {
    const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

    const result = await request(graphqlAPI, query, { slug, createdAt });
    return { next: result.next[0], previous: result.previous[0] };
  } catch (error) {
    console.log(error);
  }
}

export const getFeaturedPosts = async () => {
  try {
    const query = gql`
      query GetCategoryPost() {
        posts(where: { featuredPost: true }) {
          author {
            name
            photo {
              url
            }
          }
          featuredImage {
            url
          }
          title
          slug
          createdAt
        }
      }
    `;

    const result = await request(graphqlAPI, query);
    return result.posts as FeaturedPost[];
  } catch (error) {
    console.log(error);
  }
};
