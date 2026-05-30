import React from 'react'

export interface AniccaGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns. Accepts number or CSS template string (e.g. "1fr 2fr"). */
  columns?: number | string
  /** Responsive columns: { base, sm, md, lg, xl } */
  responsive?: { base?: number | string; sm?: number | string; md?: number | string; lg?: number | string; xl?: number | string }
  /** Gap in rem or any CSS length. */
  gap?: number | string
  /** Min child column width — uses repeat(auto-fit, minmax(...)). Overrides columns. */
  minChildWidth?: string
  as?: keyof React.JSX.IntrinsicElements
}

const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280 }

function toTemplate(cols: number | string | undefined): string | undefined {
  if (cols === undefined) return undefined
  return typeof cols === 'number' ? `repeat(${cols}, minmax(0, 1fr))` : cols
}

/**
 * AniccaGrid — CSS Grid wrapper with responsive columns + autosizing via minChildWidth.
 */
export function AniccaGrid({
  columns = 1, responsive, gap = 1, minChildWidth,
  as = 'div', className = '', style, children, ...rest
}: AniccaGridProps): React.ReactElement {
  const Tag = as as React.ElementType
  const gapValue = typeof gap === 'number' ? `${gap}rem` : gap
  const base = minChildWidth
    ? `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`
    : toTemplate(responsive?.base ?? columns)

  // Build responsive CSS via inline style with @media not possible inline; rely on data attrs + class injection.
  // Fallback: set base only; for responsive use minChildWidth which is fluid.
  const styleProp: React.CSSProperties = { display: 'grid', gap: gapValue, gridTemplateColumns: base, ...style }

  return (
    <Tag
      data-anicca-grid=""
      data-responsive={responsive ? JSON.stringify(responsive) : undefined}
      className={className}
      style={styleProp}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Note: For full responsive breakpoint support, consumers can wrap with Tailwind's grid-cols-{n} sm:grid-cols-{n} etc.
// The minChildWidth approach is the recommended fluid path here.
void BREAKPOINTS
