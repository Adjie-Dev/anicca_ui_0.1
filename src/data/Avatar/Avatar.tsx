import React, { useState } from 'react'

export type AniccaAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
export type AniccaAvatarShape = 'circle' | 'rounded' | 'square'

export interface AniccaAvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  src?: string
  alt?: string
  /** Initials or fallback content when image missing/fails. */
  name?: string
  /** Custom fallback element (overrides initials). */
  fallback?: React.ReactNode
  size?: AniccaAvatarSize
  shape?: AniccaAvatarShape
  /** Status dot overlay. */
  status?: 'online' | 'offline' | 'busy' | 'away'
}

const SIZES: Record<Exclude<AniccaAvatarSize, number>, number> = {
  xs: 24, sm: 32, md: 40, lg: 56, xl: 72,
}

const STATUS_COLORS = {
  online: 'var(--anicca-success)',
  offline: 'var(--anicca-text-subtle)',
  busy: 'var(--anicca-danger)',
  away: 'var(--anicca-warning)',
}

const SHAPES: Record<AniccaAvatarShape, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-lg',
  square: 'rounded-none',
}

function getInitials(name?: string): string {
  if (!name) return '?'
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join('')
}

/**
 * AniccaAvatar — User avatar with image, initials fallback, status indicator, shape variants.
 */
export function AniccaAvatar({
  src, alt, name, fallback, size = 'md', shape = 'circle', status,
  className = '', style, ...rest
}: AniccaAvatarProps): React.ReactElement {
  const [errored, setErrored] = useState(false)
  const dim = typeof size === 'number' ? size : SIZES[size]
  const fontSize = dim * 0.4
  const showImage = src && !errored

  return (
    <span
      className={`relative inline-flex items-center justify-center bg-surface-muted text-text-muted overflow-hidden border border-border dark:bg-surface-container dark:text-text-muted dark:border-border ${SHAPES[shape]} ${className}`}
      style={{ width: dim, height: dim, fontSize, ...style }}
      role="img"
      aria-label={alt ?? name ?? 'avatar'}
      {...rest}
    >
      {showImage ? (
        <img src={src} alt={alt ?? name ?? ''} onError={() => setErrored(true)} className="w-full h-full object-cover" />
      ) : (
        <span className="font-bold tracking-tight">{fallback ?? getInitials(name)}</span>
      )}
      {status && (
        <span
          className="absolute bottom-0 right-0 rounded-full border-2 border-surface"
          style={{ width: dim * 0.28, height: dim * 0.28, background: STATUS_COLORS[status] }}
          aria-label={status}
        />
      )}
    </span>
  )
}

export interface AniccaAvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum visible avatars; rest collapsed into "+N" chip. */
  max?: number
  /** Spacing — negative margin between avatars (px). */
  spacing?: number
  size?: AniccaAvatarSize
}

/**
 * AniccaAvatarGroup — Stack of avatars with overflow indicator.
 */
export function AniccaAvatarGroup({
  max = 4, spacing = 8, size = 'md', className = '', style, children, ...rest
}: AniccaAvatarGroupProps): React.ReactElement {
  const items = React.Children.toArray(children).filter(Boolean)
  const visible = items.slice(0, max)
  const overflow = items.length - visible.length
  const dim = typeof size === 'number' ? size : SIZES[size]

  return (
    <div className={`flex ${className}`} style={style} {...rest}>
      {visible.map((child, i) => (
        <span key={i} style={{ marginLeft: i === 0 ? 0 : -spacing }} className="ring-2 ring-surface rounded-full">
          {React.isValidElement(child) && (child.type === AniccaAvatar)
            ? React.cloneElement(child as React.ReactElement<AniccaAvatarProps>, { size })
            : child}
        </span>
      ))}
      {overflow > 0 && (
        <span
          className="inline-flex items-center justify-center bg-surface-muted text-text-muted rounded-full border-2 border-surface font-semibold"
          style={{ width: dim, height: dim, fontSize: dim * 0.36, marginLeft: -spacing }}
        >
          +{overflow}
        </span>
      )}
    </div>
  )
}
