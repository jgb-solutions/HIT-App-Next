import { useEffect, useState } from 'react'

import NewsInterface from '../interfaces/NewsInterface'
import { API_URL } from '../utils/constants'

interface ResponseData {
  next_page_url: string
  current_page: number
  data: NewsInterface[]
}

interface AllNews {
  loading: boolean
  error: Error | null
  data: NewsInterface[]
  loadMore: () => void
  hasMore: boolean,
}

const parseResponse = async (response: Response) => await response.json()

export default function useAllNews(list: NewsInterface[]): AllNews {
  const take = undefined
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [error, setError] = useState(null)
  const [newsList, setNewsList] = useState<NewsInterface[]>(list)


  // useEffect(() => {
  //   fetchNews()
  //   // eslint-disable-next-line
  // }, [page])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const { data, next_page_url }: ResponseData = await parseResponse(await fetch(`${API_URL}?page=${page}&take=${take}`))
      setNewsList([...newsList, ...data])
      setHasMore(!!next_page_url)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }

  }

  const loadMore = () => {
    if (hasMore) {
      setPage(page + 1)
    } else {
      setHasMore(false)
    }
  }

  return { data: newsList, loading, error, loadMore, hasMore }
}