import axios from "axios"
import { useCallback, useEffect, useState } from "react"

const API_URL = "https://genius-song-lyrics1.p.rapidapi.com"
const API_KEY = process.env.EXPO_PUBLIC_RAPIDAPI_KEY

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const options = {
    method: "GET",
    url: `${API_URL}${url}`,
    headers: {
      "x-rapidapi-host": "genius-song-lyrics1.p.rapidapi.com",
      "x-rapidapi-key": API_KEY,
    },
  }
  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await axios(options)
      setData(result.data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
