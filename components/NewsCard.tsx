import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import NewsInterface from '../interfaces/NewsInterface'

const useStyles = makeStyles({
  media: {
    height: 140,
  },
})

export default function NewsCard({ news }: { news: NewsInterface }) {
  const classes = useStyles()

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={news?.image_url || 'https://files.infotoutan.com/images/03kpJg2M2zsaY3GmdRUn50OKQfua2p84ETrg2L3V.jpeg'}
          title={news?.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {news.public_date}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {news.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}