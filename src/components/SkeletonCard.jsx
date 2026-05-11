export default function SkeletonCard({ index = 0 }) {
  const delay = index * 80

  return (
    <div
      className="bg-cinema-card border border-cinema-border rounded-2xl overflow-hidden opacity-0 animate-fadeUp"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Poster skeleton */}
      <div className="aspect-[2/3] shimmer-bg" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-5 shimmer-bg rounded-md w-4/5" />
          <div className="h-5 shimmer-bg rounded-md w-2/5" />
        </div>
        
        {/* Genres */}
        <div className="flex gap-2">
          <div className="h-4 shimmer-bg rounded-full w-16" />
          <div className="h-4 shimmer-bg rounded-full w-20" />
        </div>
        
        {/* Plot lines */}
        <div className="space-y-1.5">
          <div className="h-3 shimmer-bg rounded w-full" />
          <div className="h-3 shimmer-bg rounded w-full" />
          <div className="h-3 shimmer-bg rounded w-3/4" />
        </div>

        {/* Actors */}
        <div className="h-3 shimmer-bg rounded w-2/3 mt-auto" />
        
        {/* Button */}
        <div className="h-9 shimmer-bg rounded-lg mt-2" />
      </div>
    </div>
  )
}
