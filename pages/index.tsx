import fetch from 'node-fetch'
import Grid from '@material-ui/core/Grid'
import InfiniteScroll from 'react-infinite-scroller'


import NewsInterface from '../interfaces/NewsInterface'
import MainLayout from '../components/layouts/Main'
import NewsCard from '../components/NewsCard'
import useAllNews from '../hooks/useAllNews'

// import NewsInterface from '../interfaces/NewsInterface'
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
              <NewsCard news={news} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  const res = await fetch("http://web.infotoutan.loc/api/news")

  const posts = (await res.json()).data

  return {
    props: {
      posts,
    },
  }
}