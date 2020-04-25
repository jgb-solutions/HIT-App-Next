import fetch from "node-fetch"
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'


import { API_URL } from "../../utils/constants"
import MainLayout from "../../components/layouts/Main"
import NewsCard from "../../components/NewsCard"
import NewsInterface from "../../interfaces/NewsInterface"

export default function Post({ news }: { news: NewsInterface }) {
  const router = useRouter()

  return (
    <MainLayout>
      {router.isFallback ? <h3>Loading</h3> : (
        <NewsCard news={news} />
      )}
    </MainLayout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(API_URL)
  const allNews = (await res.json()).data

  const paths = allNews.map((news: NewsInterface) => ({ params: { hash: news.hash } }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  if (params) {
    const { hash } = params

    const res = await fetch(`${API_URL}/${hash}`)

    const news = await res.json()

    return { props: { news } }
  }

  return { props: {} }
}
