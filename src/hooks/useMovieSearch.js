import { useState, useCallback, useRef } from 'react'

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'b9a5e69d'
const BASE_URL = 'https://www.omdbapi.com/'

export function useMovieSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [totalResults, setTotalResults] = useState(0)
  const [hasSearched, setHasSearched] = useState(false)
  const abortRef = useRef(null)

  const search = useCallback(async (searchQuery, page = 1) => {
    const q = searchQuery.trim()
    if (!q) return

    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    setQuery(q)
    setLoading(true)
    setError(null)
    setHasSearched(true)
    if (page === 1) setResults([])

    try {
      const url = `${BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(q)}&page=${page}&type=movie`
      const res = await fetch(url, { signal: abortRef.current.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()

      if (data.Response === 'True') {
        const movies = data.Search || []
        // Fetch details for each movie to get ratings, genre, actors, plot
        const detailed = await Promise.allSettled(
          movies.map(m => fetchMovieDetail(m.imdbID))
        )
        const enriched = detailed.map((r, i) =>
          r.status === 'fulfilled' ? r.value : movies[i]
        )
        setResults(prev => page === 1 ? enriched : [...prev, ...enriched])
        setTotalResults(parseInt(data.totalResults, 10) || 0)
      } else {
        setResults([])
        setTotalResults(0)
        if (data.Error && data.Error !== 'Movie not found!') {
          setError(data.Error)
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError('Failed to fetch movies. Check your connection and try again.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const clear = useCallback(() => {
    setResults([])
    setQuery('')
    setError(null)
    setHasSearched(false)
    setTotalResults(0)
  }, [])

  return { results, loading, error, query, totalResults, hasSearched, search, clear }
}

async function fetchMovieDetail(imdbID) {
  const url = `${BASE_URL}?apikey=${import.meta.env.VITE_OMDB_API_KEY || 'b9a5e69d'}&i=${imdbID}&plot=short`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Detail fetch failed')
  return res.json()
}
