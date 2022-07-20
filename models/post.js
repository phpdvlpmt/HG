import { GraphQLClient, gql } from 'graphql-request'
const hygraph = new GraphQLClient(
  'https://api-eu-central-1.hygraph.com/v2/cl5qh2swa014z01uk9hv6em7f/master'
)

export const getAllPosts = async () => {
  const QUERY = gql`
    {
      posts {
        id
        title
        slug
        content {
          html
        }
        coverImage {
          url
          width
          height
        }
        author {
          name
        }
      }
    }
  `
  const { posts } = await hygraph.request(QUERY)
  return posts
}
