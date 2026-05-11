import { useState, useRef, useEffect } from 'react'

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
)

const ClearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
)

const FilmIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
    <line x1="7" y1="2" x2="7" y2="22"/>
    <line x1="17" y1="2" x2="17" y2="22"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <line x1="2" y1="7" x2="7" y2="7"/>
    <line x1="2" y1="17" x2="7" y2="17"/>
    <line x1="17" y1="17" x2="22" y2="17"/>
    <line x1="17" y1="7" x2="22" y2="7"/>
  </svg>
)

export default function Header({ onSearch, onClear, currentQuery }) {
  const [inputVal, setInputVal] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!currentQuery) setInputVal('')
  }, [currentQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputVal.trim()) onSearch(inputVal)
  }

  const handleClear = () => {
    setInputVal('')
    onClear()
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear()
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-cinema-bg/80 backdrop-blur-xl border-b border-cinema-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-8 h-16 sm:h-20">
          {/* Logo */}
          <a href="/" onClick={(e) => { e.preventDefault(); onClear() }} className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-cinema-red/10 border border-cinema-red/30 flex items-center justify-center text-cinema-red transition-all group-hover:bg-cinema-red/20 group-hover:border-cinema-red/50">
              <FilmIcon />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-2xl tracking-widest text-cinema-text leading-none">CINE</span>
              <span className="font-display text-2xl tracking-widest text-cinema-red leading-none">SCOPE</span>
            </div>
            <span className="sm:hidden font-display text-xl tracking-widest text-cinema-text">CS</span>
          </a>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="flex-1 max-w-2xl mx-auto">
            <div className={`relative flex items-center search-glow rounded-xl transition-all duration-300 ${focused ? 'bg-cinema-card' : 'bg-cinema-card/70'} border ${focused ? 'border-cinema-red/40' : 'border-cinema-border'}`}>
              <button
                type="submit"
                className="pl-4 pr-2 text-cinema-muted hover:text-cinema-red transition-colors"
                aria-label="Search"
              >
                <SearchIcon />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder="Search for a movie..."
                className="flex-1 bg-transparent py-3 sm:py-3.5 px-2 text-cinema-text placeholder-cinema-muted/60 text-sm sm:text-base focus:outline-none"
                aria-label="Search for a movie"
                autoComplete="off"
                spellCheck="false"
              />
              {inputVal && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="pr-4 pl-2 text-cinema-muted hover:text-cinema-text transition-colors"
                  aria-label="Clear search"
                >
                  <ClearIcon />
                </button>
              )}
            </div>
          </form>

          {/* Nav hint */}
          <div className="hidden lg:flex items-center gap-1 text-xs text-cinema-muted/50 shrink-0 font-body">
            <kbd className="px-1.5 py-0.5 rounded bg-cinema-border text-cinema-muted font-mono text-xs">⏎</kbd>
            <span>to search</span>
          </div>
        </div>
      </div>
    </header>
  )
}
