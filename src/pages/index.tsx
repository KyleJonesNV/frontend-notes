import Header from '@/components/Header/Header'
import Content from '@/components/Content/Content'
import Head from 'next/head'

export default function Home() {
  return (
    <main>
      <Head>
        <title>Notes</title>
      </Head>
      <Header />
      <Content />
    </main>
  )
}

