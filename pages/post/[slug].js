import React from 'react'
import Image from 'next/image'
import { GraphQLClient, gql } from 'graphql-request'

const hygraph = new GraphQLClient(
  'https://api-eu-central-1.hygraph.com/v2/cl5qh2swa014z01uk9hv6em7f/master'
)

const QUERY = gql`
  query getPost($slug: String!) {
    post(where: { slug: $slug }) {
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
const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`

export async function getStaticPaths() {
  const { posts } = await hygraph.request(SLUGLIST)

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const slug = params.slug
  const data = await hygraph.request(QUERY, { slug })
  const post = data.post
  return {
    props: {
      post,
    },
    revalidate: 1,
  }
}

export default function post({ post }) {
  return (
    <div>
      <div>{post.title}</div>
      <Image
        src={post.coverImage.url}
        width={post.coverImage.width}
        height={post.coverImage.height}
        alt={post.coverImage.title}
      />
      <div>{post.author.name}</div>
      <div dangerouslySetInnerHTML={{ __html: post.content.html }} />
    </div>
  )
}
