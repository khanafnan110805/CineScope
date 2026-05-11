import { useState } from 'react'

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const CalendarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

const PersonIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const ExpandIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

function PosterImage({ src, title }) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)
  const isValid = src && src !== 'N/A'

  return (
    <div className="relative w-full aspect-[2/3] bg-cinema-border overflow-hidden">
      {!loaded && !errored && isValid && (
        <div className="absolute inset-0 shimmer-bg" />
      )}
      {isValid && !errored ? (
        <img
          src={src}
          alt={`${title} poster`}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-cinema-card">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2a2a3a" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="2"/>
            <line x1="7" y1="2" x2="7" y2="22"/>
            <line x1="17" y1="2" x2="17" y2="22"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
          </svg>
          <span className="text-[10px] text-cinema-border font-body uppercase tracking-widest">No poster</span>
        </div>
      )}
    </div>
  )
}

export default function MovieCard({ movie, index = 0 }) {
  const [expanded, setExpanded] = useState(false)

  const {
    Title,
    Year,
    Poster,
    imdbRating,
    Genre,
    Actors,
    Plot,
    Director,
    Runtime,
    Rated,
    imdbVotes,
  } = movie

  const genres = Genre && Genre !== 'N/A' ? Genre.split(',').slice(0, 3).map(g => g.trim()) : []
  const actors = Actors && Actors !== 'N/A' ? Actors.split(',').slice(0, 3).map(a => a.trim()) : []
  const rating = imdbRating && imdbRating !== 'N/A' ? parseFloat(imdbRating) : null
  const ratingColor = rating >= 7.5 ? 'text-emerald-400' : rating >= 6 ? 'text-cinema-gold' : rating ? 'text-orange-400' : 'text-cinema-muted'

  const delay = Math.min(index * 60, 480)

  return (
    <article
      className="card-hover bg-cinema-card border border-cinema-border rounded-2xl overflow-hidden flex flex-col opacity-0 animate-fadeUp"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Poster */}
      <div className="relative overflow-hidden">
        <PosterImage src={Poster} title={Title} />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Year badge */}
        {Year && Year !== 'N/A' && (
          <div className="absolute top-2.5 left-2.5">
            <span className="flex items-center gap-1 text-[11px] font-body font-medium text-cinema-sub bg-cinema-bg/80 backdrop-blur-sm px-2 py-1 rounded-full border border-cinema-border/50">
              <CalendarIcon />
              {Year}
            </span>
          </div>
        )}

        {/* Rating badge */}
        {rating && (
          <div className="absolute top-2.5 right-2.5">
            <span className={`flex items-center gap-1 text-[11px] font-body font-bold bg-cinema-bg/85 backdrop-blur-sm px-2 py-1 rounded-full border border-cinema-border/50 ${ratingColor}`}>
              <StarIcon />
              {imdbRating}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <h3 className="font-display text-lg sm:text-xl tracking-wide text-cinema-text leading-tight line-clamp-2">
          {Title}
        </h3>

        {/* Genres */}
        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {genres.map(g => (
              <span key={g} className="genre-tag">{g}</span>
            ))}
          </div>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-3 text-[11px] text-cinema-muted font-body">
          {Runtime && Runtime !== 'N/A' && (
            <span>{Runtime}</span>
          )}
          {Rated && Rated !== 'N/A' && (
            <span className="px-1.5 py-0.5 rounded border border-cinema-border text-cinema-muted/70">{Rated}</span>
          )}
          {imdbVotes && imdbVotes !== 'N/A' && (
            <span className="ml-auto opacity-60">{parseInt(imdbVotes.replace(/,/g, '')).toLocaleString()} votes</span>
          )}
        </div>

        {/* Plot */}
        {Plot && Plot !== 'N/A' && (
          <div>
            <p className={`text-cinema-sub text-xs sm:text-sm leading-relaxed font-body font-light transition-all ${expanded ? '' : 'line-clamp-3'}`}>
              {Plot}
            </p>
            {Plot.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-[11px] text-cinema-red/70 hover:text-cinema-red mt-1 transition-colors font-body"
              >
                {expanded ? 'Less' : 'More'}
                <span className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
                  <ExpandIcon />
                </span>
              </button>
            )}
          </div>
        )}

        {/* Actors */}
        {actors.length > 0 && (
          <div className="flex items-start gap-1.5 mt-auto pt-2 border-t border-cinema-border/50">
            <PersonIcon />
            <p className="text-[11px] text-cinema-muted/70 font-body leading-relaxed">
              {actors.join(' · ')}
            </p>
          </div>
        )}

        {/* Director */}
        {Director && Director !== 'N/A' && (
          <p className="text-[11px] text-cinema-muted/50 font-body">
            Dir. <span className="text-cinema-muted">{Director}</span>
          </p>
        )}

        {/* IMDb link */}
        <a
          href={`https://www.imdb.com/title/${movie.imdbID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-cinema-border/50 hover:bg-cinema-red/10 hover:border-cinema-red/30 border border-transparent text-xs font-body font-medium text-cinema-muted hover:text-cinema-red transition-all duration-200"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-cinema-gold">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
          View on IMDb
        </a>
      </div>
    </article>
  )
}
