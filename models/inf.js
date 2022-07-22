import { GraphQLClient, gql } from 'graphql-request'
const hygraph = new GraphQLClient(
  'https://api-eu-central-1.hygraph.com/v2/cl5qh2swa014z01uk9hv6em7f/master'
)

export const getAllWorks = async () => {
  const QUERY = gql`
    {
      works {
        id
        image {
          url
          width
          height
        }
        pdf {
          url
        }
      }
    }
  `
  const { works } = await hygraph.request(QUERY)
  return works
}
