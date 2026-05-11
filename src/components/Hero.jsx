import { useState } from 'react'

const TRENDING = [
  { title: 'Dune: Part Two', year: '2024', genre: 'Sci-Fi Epic' },
  { title: 'Oppenheimer', year: '2023', genre: 'Historical Drama' },
  { title: 'Poor Things', year: '2023', genre: 'Dark Fantasy' },
  { title: 'The Batman', year: '2022', genre: 'Noir Thriller' },
]

export default function Hero({ onSearch }) {
  const [activeIdx, setActiveIdx] = useState(0)

  const handleChipSearch = (title) => {
    onSearch(title)
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-cinema-red/5 rounded-full blur-[120px]" />
        <div className="absolute top-20 left-1/4 w-[400px] h-[300px] bg-cinema-teal/3 rounded-full blur-[100px]" />
        {/* Grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(#e8e8f0 1px, transparent 1px), linear-gradient(90deg, #e8e8f0 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cinema-red/20 bg-cinema-red/5 text-cinema-red text-xs font-body font-medium tracking-widest uppercase mb-6 sm:mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-cinema-red animate-pulse2 inline-block" />
          Movie Discovery Engine
        </div>

        {/* Headline */}
        <h1 className="font-display text-6xl sm:text-8xl lg:text-[110px] leading-none tracking-wider text-cinema-text mb-4">
          DISCOVER
          <br />
          <span className="text-gradient">CINEMA</span>
        </h1>

        <p className="font-body text-cinema-sub text-base sm:text-lg max-w-md mx-auto mb-10 sm:mb-12 leading-relaxed font-light">
          Search millions of films. Explore ratings, cast, plots and more — instantly.
        </p>

        {/* Quick search chips */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          <span className="text-cinema-muted/60 text-xs font-body self-center mr-1">Try:</span>
          {TRENDING.map((item, i) => (
            <button
              key={item.title}
              onClick={() => handleChipSearch(item.title)}
              className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-cinema-card border border-cinema-border hover:border-cinema-red/40 transition-all duration-200 hover:bg-cinema-red/5"
            >
              <span className="text-xs sm:text-sm text-cinema-sub group-hover:text-cinema-text transition-colors font-body">{item.title}</span>
              <span className="text-xs text-cinema-muted/50 hidden sm:inline">{item.genre}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
