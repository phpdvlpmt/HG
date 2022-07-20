import Head from 'next/head'
import { GraphQLClient, gql } from 'graphql-request'
import Image from 'next/image'
import Link from 'next/link'

const hygraph = new GraphQLClient(process.env.CONTENT_API)
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
    <div className="container mx-auto px-4">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <Link href="/ext">
            <a>EXT</a>
          </Link>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-4 gap-10">
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
