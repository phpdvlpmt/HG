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
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 container mx-auto gap-4 p-5">
      {works?.map((work) => (
        <div key={work.id} className="bg-slate-600 w-72 h-52 relative">
          <Link href={work.pdf.url}>
            <a target="_blank">
              <Image
                src={work.image.url}
                layout="fill"
                alt="work"
                objectFit="cover"
                className="overflow-hidden "
              />
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default inf
