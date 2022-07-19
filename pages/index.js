import Head from 'next/head'
import { GraphQLClient, gql } from 'graphql-request'
import Image from 'next/image'
import Link from 'next/link'

const hygraph = new GraphQLClient(
  'https://api-eu-central-1.hygraph.com/v2/cl5qh2swa014z01uk9hv6em7f/master'
)
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
export async function getStaticProps() {
  const { posts } = await hygraph.request(QUERY)

  return {
    props: {
      posts,
    },
    revalidate: 1,
  }
}

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ul>
          {posts.map(({ id, title, slug, coverImage, author, content }) => (
            <div key={id}>
              <Link href={`/post/${slug}`}>{title}</Link>
              <Image
                src={coverImage.url}
                width={coverImage.width}
                height={coverImage.height}
                alt={coverImage.title}
              />
              <div>{author.name}</div>
              <div dangerouslySetInnerHTML={{ __html: content.html }} />
            </div>
          ))}
        </ul>
      </main>
    </div>
  )
}
