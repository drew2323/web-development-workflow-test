import { RichText } from '@payloadcms/richtext-lexical/react'
import { connection } from 'next/server'
import { getPayload } from 'payload'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  await connection()

  const payload = await getPayload({ config })
  const pages = await payload.find({
    collection: 'pages',
    limit: 1,
    sort: 'createdAt',
  })
  const page = pages.docs[0]

  return (
    <div className="home">
      {page ? <RichText data={page.content} /> : <p>Hello world</p>}
    </div>
  )
}
