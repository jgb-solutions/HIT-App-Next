import fetch from 'node-fetch'
import Grid from '@material-ui/core/Grid'
import InfiniteScroll from 'react-infinite-scroller'
import Link from 'next/link'

import NewsInterface from '../interfaces/NewsInterface'
import MainLayout from '../components/layouts/Main'
import NewsCard from '../components/NewsCard'
import useAllNews from '../hooks/useAllNews'
import { API_URL } from '../utils/constants'

// import useAllNews from '../hooks/useAllNews'
// import SEO from '../components/SEO'

export default function AllNews({ posts }) {
  const { data: newsData, loading, error, hasMore, loadMore } = useAllNews(posts)

  return (
    <MainLayout>
      <InfiniteScroll
        pageStart={1}
        loadMore={loadMore}
        hasMore={hasMore}
        // loader={<Spinner key={1} />}
        useWindow={false}
      >
        <Grid container spacing={2}>
          {newsData.map((news: NewsInterface) => (
            <Grid item md={3} sm={4} xs={12} key={news.hash}>
              <Link href={`/n/[hash]`} as={`/n/${news.hash}`}>
                <a>
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

export async function getServerSideProps() {
  const res = await fetch(API_URL)

  const posts = (await res.json()).data

  return {
    props: {
      posts,
    },
  }
}