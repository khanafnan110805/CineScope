export default function Footer() {
  return (
    <footer className="border-t border-cinema-border/40 py-8 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg tracking-widest text-cinema-text">CINE</span>
            <span className="font-display text-lg tracking-widest text-cinema-red">SCOPE</span>
            <span className="text-cinema-muted/30 mx-2">·</span>
            <span className="text-xs text-cinema-muted/50 font-body">Discover Cinema Instantly</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-body text-cinema-muted/40">
            <span>Powered by</span>
            <a 
              href="https://www.omdbapi.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cinema-muted/60 hover:text-cinema-muted transition-colors"
            >
              OMDb API
            </a>
            <span className="text-cinema-muted/20">·</span>
            <span>© {new Date().getFullYear()} CineScope</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
