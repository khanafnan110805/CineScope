import { useEffect, useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MovieGrid from './components/MovieGrid'
import Footer from './components/Footer'
import { useMovieSearch } from './hooks/useMovieSearch'

export default function App() {
  const { results, loading, error, query, totalResults, hasSearched, search, clear } = useMovieSearch()
  const resultsRef = useRef(null)

  const handleSearch = (q) => {
    search(q)
    // Smooth scroll to results after brief delay
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="noise-overlay min-h-screen flex flex-col bg-cinema-bg">
      <Header onSearch={handleSearch} onClear={clear} currentQuery={query} />

      <main className="flex-1">
        {!hasSearched && (
          <Hero onSearch={handleSearch} />
        )}

        {/* Divider when results showing */}
        {hasSearched && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-cinema-border to-transparent" />
          </div>
        )}

        <MovieGrid
          movies={results}
          loading={loading}
          error={error}
          hasSearched={hasSearched}
          query={query}
          totalResults={totalResults}
        />
      </main>

      <Footer />
    </div>
  )
}
