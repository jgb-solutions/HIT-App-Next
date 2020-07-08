import Link from 'next/link'
import fetch from 'node-fetch'
import { GetStaticProps } from 'next'
import Grid from '@material-ui/core/Grid'
import InfiniteScroll from 'react-infinite-scroller'
import CircularProgress from '@material-ui/core/CircularProgress'

import useAllNews from '../hooks/useAllNews'
import { API_URL } from '../utils/constants'
import NewsCard from '../components/NewsCard'
import MainLayout from '../components/layouts/Main'
import NewsInterface from '../interfaces/NewsInterface'

export default function AllNews({ posts }: { posts: NewsInterface[] }) {
  const { data: newsData, loading, error, hasMore, loadMore } = useAllNews(posts)

  return (
    <MainLayout>
      <InfiniteScroll
        pageStart={2}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={<CircularProgress key={1} />}
        useWindow={false}
        initialLoad={false}
      >
        <Grid container spacing={2} className="react-transition scale-in">
          {newsData.map((news: NewsInterface) => (
            <Grid item md={3} sm={4} xs={12} key={news.hash}>
              <Link href={`/n/[hash]`} as={`/n/${news.hash}`}>
                <a style={{ textDecoration: 'none' }}>
                  <NewsCard news={news} />
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </MainLayout>
  )
}

export async function getStaticProps() {
  const res = await fetch(API_URL)

  const posts = (await res.json()).data

  return {
    props: {
      posts,
    },
    unstable_revalidate: 30
  }
}