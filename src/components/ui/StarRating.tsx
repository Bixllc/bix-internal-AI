export function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < rating ? 'fill-accent' : 'fill-ink/10'}`}
        >
          <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.14 1 5.86L10 14.9l-5.25 2.75 1-5.86L1.5 7.65l5.9-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  )
}
