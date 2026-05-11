import MovieCard from './MovieCard'
import SkeletonCard from './SkeletonCard'

export default function MovieGrid({ movies, loading, error, hasSearched, query, totalResults }) {
  // Loading state
  if (loading && movies.length === 0) {
    return (
      <section id="results-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-5 shimmer-bg rounded w-40" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} index={i} />
          ))}
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section id="results-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col items-center justify-center py-24 text-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div>
            <h3 className="font-display text-2xl tracking-wide text-cinema-text mb-2">Connection Error</h3>
            <p className="text-cinema-sub text-sm font-body max-w-sm">{error}</p>
          </div>
          <p className="text-xs text-cinema-muted font-body">Check your internet connection and try again.</p>
        </div>
      </section>
    )
  }

  // Empty state after search
  if (hasSearched && movies.length === 0 && !loading) {
    return (
      <section id="results-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col items-center justify-center py-24 text-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-cinema-card border border-cinema-border flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2a2a3a" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
                <line x1="8" y1="11" x2="14" y2="11" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cinema-red/10 border border-cinema-red/30 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#e63946" strokeWidth="3">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl tracking-wide text-cinema-text mb-2">No Results Found</h3>
            <p className="text-cinema-sub text-sm font-body max-w-sm">
              No movies matched{' '}
              <span className="text-cinema-text font-medium">"{query}"</span>
              . Try a different title or check your spelling.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {['Inception', 'The Godfather', 'Interstellar'].map(s => (
              <button
                key={s}
                className="px-3 py-1.5 text-xs font-body text-cinema-muted border border-cinema-border rounded-full hover:border-cinema-red/30 hover:text-cinema-red transition-all"
              >
                Try "{s}"
              </button>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Results
  if (movies.length > 0) {
    return (
      <section id="results-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Results header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-cinema-red rounded-full" />
            <div>
              <span className="font-body text-cinema-text font-medium">
                Results for{' '}
                <span className="text-cinema-red">"{query}"</span>
              </span>
              {totalResults > 0 && (
                <span className="ml-2 text-xs text-cinema-muted font-body">
                  {totalResults.toLocaleString()} found
                </span>
              )}
            </div>
          </div>
          <span className="text-xs text-cinema-muted font-body">{movies.length} shown</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {movies.map((movie, i) => (
            <MovieCard key={movie.imdbID || i} movie={movie} index={i} />
          ))}
          {/* Loading more skeletons */}
          {loading && Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={`sk-${i}`} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-cinema-muted/40 font-body mt-10">
          Data provided by <a href="https://www.omdbapi.com" target="_blank" rel="noopener noreferrer" className="hover:text-cinema-muted transition-colors">OMDb API</a>
        </p>
      </section>
    )
  }

  return null
}
