import fetch from "node-fetch"

import { API_URL } from "../../utils/constants"
import MainLayout from "../../components/layouts/Main"
import NewsCard from "../../components/NewsCard"

export default function Post({ news }) {
  return (
    <MainLayout>
      <NewsCard news={news} />
    </MainLayout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(API_URL)
  const posts = (await res.json()).data
  const paths = posts.map((post) => `/n/${post.hash}`)

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const { hash } = params

  const res = await fetch(`${API_URL}/${hash}`)

  const news = await res.json()

  return {
    props: {
      news,
    },
  }
}
