import React from 'react'

export type AniccaSkeletonVariant = 'text' | 'rect' | 'circle'

export interface AniccaSkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: AniccaSkeletonVariant
  /** Width — number (px) or any CSS length. */
  width?: number | string
  /** Height — number (px) or any CSS length. */
  height?: number | string
  /** Number of repeated lines when variant=text. */
  lines?: number
  /** Disable shimmer animation. */
  static?: boolean
}

/**
 * AniccaSkeleton — Loading placeholder with shimmer animation.
 */
export function AniccaSkeleton({
  variant = 'rect', width, height, lines = 1, static: isStatic,
  className = '', style, ...rest
}: AniccaSkeletonProps): React.ReactElement {
  const baseClass = `${isStatic ? '' : 'anicca-shimmer'} block bg-surface-muted dark:bg-surface-container`
  const w = typeof width === 'number' ? `${width}px` : width
  const h = typeof height === 'number' ? `${height}px` : height

  if (variant === 'circle') {
    const size = w ?? h ?? '2.5rem'
    return (
      <span
        className={`${baseClass} rounded-full ${className}`}
        style={{ width: size, height: size, ...style }}
        aria-hidden="true"
        {...rest}
      />
    )
  }

  if (variant === 'text') {
    return (
      <span className={`flex flex-col gap-1.5 ${className}`} aria-hidden="true" {...rest}>
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className={`${baseClass} rounded-xs`}
            style={{
              width: i === lines - 1 && lines > 1 ? '70%' : (w ?? '100%'),
              height: h ?? '0.875rem',
            }}
          />
        ))}
      </span>
    )
  }

  return (
    <span
      className={`${baseClass} rounded-lg ${className}`}
      style={{ width: w ?? '100%', height: h ?? '1rem', ...style }}
      aria-hidden="true"
      {...rest}
    />
  )
}
