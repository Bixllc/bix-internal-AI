interface ProgressBarProps {
  progress?: number
  className?: string
}

export function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  const isIndeterminate = progress === undefined

  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full bg-ink/5 ${className}`}>
      {isIndeterminate ? (
        <div className="h-full w-1/3 animate-indeterminate rounded-full bg-accent" />
      ) : (
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      )}
    </div>
  )
}
