import { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.ENDPOINT_URL;

export default async function asynchandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const graphQLClient = new GraphQLClient((graphqlAPI as string), {
            headers: {
                authorization: `Bearer ${process.env.GRAPH_TOKEN}`,
            },
        });

        const query = gql`
            mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
                createComment(data: {
                    name: $name, 
                    email: $email, 
                    comment: $comment, 
                    post: {
                        connect: {
                            slug: $slug
                        }
                    }
                }) { id }
            }
        `;

        const result = await graphQLClient.request(query, {
            name: req.body.name,
            email: req.body.email,
            comment: req.body.comment,
            slug: req.body.slug,
        });

        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
}