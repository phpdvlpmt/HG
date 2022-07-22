import React from 'react'
import { getAllWorks } from '../models/inf'
import Image from 'next/image'
import Link from 'next/link'

export async function getStaticProps() {
  const works = await getAllWorks()

  return {
    props: {
      works,
    },
  }
}
const inf = ({ works }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto gap-4 py-10 ">
      {works?.map((work) => (
        <div
          key={work?.id}
          className="bg-slate-600  sm:bg-red-800  aspect-w-1 aspect-h-1 sm:aspect-w-1 sm:aspect-h-1  w-full overflow-hidden"
        >
          <Link href={work?.pdf.url}>
            <a target="_blank">
              <Image src={work.image.url} layout="fill" alt="work" />
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default inf
