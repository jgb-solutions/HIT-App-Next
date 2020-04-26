import fetch from "node-fetch"
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  TelegramIcon,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
} from 'react-share'

import { API_URL, TWITTER_HANDLE, APP_NAME } from "../../utils/constants"
import MainLayout from "../../components/layouts/Main"
import NewsCard from "../../components/NewsCard"
import NewsInterface from "../../interfaces/NewsInterface"
import colors from "../../utils/colors"
import SEO from "../../components/SEO"

export default function Post({ news }: { news: NewsInterface & { randoms: NewsInterface[] } }) {
  const router = useRouter()

  const ShareButtons = () => {
    const url = `https://infotoutan.com/n/${news.hash}`
    const title = `${news.title} - Haïti Info Toutan (HIT)`
    const hashtags = `HIT HITNews news`

    return (
      <Grid container spacing={2}>
        <Grid item>
          <FacebookShareButton
            url={url}
            quote={title}
            hashtag={hashtags.split(' ').join(' #')}>
            <FacebookIcon size={48} style={{ borderRadius: 4, color: colors.facebook }} />
          </FacebookShareButton>
        </Grid>
        <Grid item>
          <TwitterShareButton
            url={url}
            title={title}
            via={TWITTER_HANDLE}
            hashtags={hashtags.split(' ')}>
            <TwitterIcon size={48} style={{ borderRadius: 4, color: colors.twitter }} />
          </TwitterShareButton>
        </Grid>
        <Grid item>
          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={48} style={{ borderRadius: 4, color: colors.whatsapp }} />
          </WhatsappShareButton>
        </Grid>
        <Grid item>
          <TelegramShareButton url={url} title={title}>
            <TelegramIcon size={48} style={{ borderRadius: 4, color: colors.telegram }} />
          </TelegramShareButton>
        </Grid>
      </Grid>
    )
  }

  return (
    <MainLayout title={news?.title}>
      {router.isFallback ? <CircularProgress /> : (
        <>
          <SEO
            title={`${news.title}`}
            url={`${APP_NAME}/n/${news.hash}`}
            description={`${news.body.split('\n')[0]}`}
            image={news.image_url}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardActionArea>
                  <img src={news.image_url || 'https://files.infotoutan.com/images/03kpJg2M2zsaY3GmdRUn50OKQfua2p84ETrg2L3V.jpeg'} alt={news.title} />

                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {news.public_date}
                    </Typography>
                    {news.video_id && (
                      <div className="video-container">
                        <iframe
                          width="853"
                          height="480"
                          src={`https://www.youtube.com/embed/${news.video_id}`}
                          frameBorder="0"
                          allowFullScreen title={news.title} />
                      </div>
                    )}
                    <div dangerouslySetInnerHTML={{ __html: `${news.body}` }} />
                  </CardContent>
                </CardActionArea>
                {!!news.ads && (
                  <CardActions>
                    <div dangerouslySetInnerHTML={{ __html: `${news.ads}` }} />
                  </CardActions>
                )}
                <CardActions>
                  <ShareButtons />
                </CardActions>
              </Card>
            </Grid>
          </Grid>

          {news.randoms ? (
            <>
              <br />
              <h3>Autres Nouvelles</h3>
              <Grid container spacing={2}>
                {news.randoms.map((news: NewsInterface) => (
                  <Grid item md={3} sm={4} xs={12} key={news.hash}>
                    <Link href={`/n/[hash]`} as={`/n/${news.hash}`}>
                      <a style={{ textDecoration: 'none' }}>
                        <NewsCard news={news} />
                      </a>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : null}
        </>
      )}
    </MainLayout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(API_URL)
  const allNews = (await res.json()).data

  const paths = allNews.map((news: NewsInterface) => `/n/${news.hash}`)

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
