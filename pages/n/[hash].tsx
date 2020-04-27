import Link from 'next/link'
import fetch from "node-fetch"
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from 'react-share'

import SEO from "../../components/SEO"
import colors from "../../utils/colors"
import Image from "../../components/Image"
import NewsCard from "../../components/NewsCard"
import MainLayout from "../../components/layouts/Main"
import NewsInterface from "../../interfaces/NewsInterface"
import { API_URL, TWITTER_HANDLE, APP_NAME } from "../../utils/constants"

export default function Post({ news }: { news: NewsInterface & { randoms: NewsInterface[] } }) {
  const router = useRouter()

  const ShareButtons = () => {
    const url = `https://infotoutan.com/n/${news.hash}`
    const title = `${news.title} - Haïti Info Toutan (HIT)`
    const hashtags = `HIT HITNews news`

    return (
      <Grid container spacing={2} justify="space-around">
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
        <div className="react-transition flip-in-x">
          <SEO
            title={`${news.title}`}
            url={`${APP_NAME}/n/${news.hash}`}
            description={`${news.body.split('\n')[0]}`}
            image={news.image_url}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardActionArea>
                  {!news.video_id &&
                    <Image
                      src={news.image_url || 'https://files.infotoutan.com/images/03kpJg2M2zsaY3GmdRUn50OKQfua2p84ETrg2L3V.jpeg'}
                      alt={news.title}
                      photon={{ width: 663 }}
                    />
                  }

                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="div">
                      {news.public_date}
                    </Typography>
                    <br />

                    {news.video_id && (
                      <div style={{
                        marginBottom: 15,
                        marginLeft: -16,
                        marginRight: -16,
                        position: 'relative',
                        paddingBottom: '56.25%',
                        paddingTop: 30,
                        height: 0,
                        overflow: 'hidden',
                      }
                      }>
                        <iframe
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                          }}
                          width="853"
                          height="480"
                          src={`https://www.youtube.com/embed/${news.video_id}`}
                          frameBorder="0"
                          allowFullScreen title={news.title} />
                      </div>
                    )}
                    <Typography component="div">
                      <div dangerouslySetInnerHTML={{ __html: `${news.body}` }} />
                    </Typography>
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
        </div>
      )
      }
    </MainLayout >
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
