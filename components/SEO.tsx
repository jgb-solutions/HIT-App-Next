import React from 'react'
import Head from 'next/head'

import { DOMAIN, FB_APP_ID, APP_NAME, TWITTER_HANDLE } from '../utils/constants'

type Props = {
  title?: string,
  url?: string,
  description?: string,
  type?: string,
  image?: string,
  imageWidth?: number,
  imageHeight?: number,
}

export default function SEO({ title, url, description, type, image, imageWidth, imageHeight }: Props) {
  const titleContent = `${APP_NAME} - ${title || "Authentique et Dynamique !!!"}`
  const descriptionContent = description || `
      ${APP_NAME} est une plateforme Fondée par de jeunes Haïtiens en 2016,
      dont l'objectif est d'informer ses abonnés en tout le temps,
      dont son nom Haiti info Toutan,
      constituée de professionnels de l'information.
      HIT se veut être un outil util pour ses lecteurs pour qui,
      l'information  est d'une importance  capitale dans leur quotidien.
  `
  const imageContent = image || `https://files.infotoutan.com/images/03kpJg2M2zsaY3GmdRUn50OKQfua2p84ETrg2L3V.jpeg`

  return (
    <>
      <Head>
        <meta property="og:title" content={titleContent} />
        <meta property="og:site_name" content={APP_NAME} />
        <meta property="og:url" content={url || DOMAIN} />
        <meta property="og:description" content={descriptionContent} />
        <meta property="og:type" content={type || "website"} />
        <meta property="og:image" content={imageContent} />
        {imageWidth && <meta property="og:image:width" content={`${imageWidth}`} />}
        {imageHeight && <meta property="og:image:height" content={`${imageHeight}`} />}

        <meta property="fb:app_id" content={FB_APP_ID} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={`@${TWITTER_HANDLE}`} />
        <meta name="twitter:title" content={titleContent} />
        <meta name="twitter:description" content={descriptionContent} />
        <meta name="twitter:image" content={imageContent} />

        <title>{titleContent}</title>
      </Head>
    </>
  )
}