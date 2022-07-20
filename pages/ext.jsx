import React from 'react'
import { getAllPosts } from '../models/post'

export async function getStaticProps() {
  const posts = await getAllPosts()
  return {
    props: {
      posts,
    },
  }
}
const ext = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2 className="text-4xl text-indigo-700">{post.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default ext
