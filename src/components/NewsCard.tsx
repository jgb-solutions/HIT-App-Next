import React from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'

import Image from './Image'
import NewsInterface from '../interfaces/NewsInterface'

export default function NewsCard({ news }: { news: NewsInterface }) {
  return (
    <Card>
      <CardActionArea>
        <Image
          src={news?.image_url || 'https://files.infotoutan.com/images/03kpJg2M2zsaY3GmdRUn50OKQfua2p84ETrg2L3V.jpeg'}
          title={news?.title}
          photon={{ width: 564 }}
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {news.public_date}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {news.title.substring(0, 75)}
            {news.title.length > 75 && '...'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}