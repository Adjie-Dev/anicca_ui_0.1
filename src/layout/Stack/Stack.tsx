import React from 'react'

export type AniccaStackDirection = 'vertical' | 'horizontal'
export type AniccaStackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type AniccaStackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

export interface AniccaStackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: AniccaStackDirection
  /** Gap between items in rem. Accepts number (rem) or string. */
  gap?: number | string
  align?: AniccaStackAlign
  justify?: AniccaStackJustify
  /** Allow wrap when direction=horizontal. */
  wrap?: boolean
  /** Render a divider element between children. */
  divider?: React.ReactNode
  /** Render as a specific element. */
  as?: keyof React.JSX.IntrinsicElements
}

const ALIGN: Record<AniccaStackAlign, string> = {
  start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch', baseline: 'items-baseline',
}
const JUSTIFY: Record<AniccaStackJustify, string> = {
  start: 'justify-start', center: 'justify-center', end: 'justify-end',
  between: 'justify-between', around: 'justify-around', evenly: 'justify-evenly',
}

/**
 * AniccaStack — Flexbox stack with consistent gap, optional dividers between items.
 */
export function AniccaStack({
  direction = 'vertical', gap = 1, align, justify, wrap, divider, as = 'div',
  className = '', style, children, ...rest
}: AniccaStackProps): React.ReactElement {
  const Tag = as as React.ElementType
  const gapValue = typeof gap === 'number' ? `${gap}rem` : gap

  if (divider !== undefined) {
    const items = React.Children.toArray(children).filter(Boolean)
    const woven: React.ReactNode[] = []
    items.forEach((child, i) => {
      woven.push(child)
      if (i < items.length - 1) {
        woven.push(<React.Fragment key={`anicca-stack-divider-${i}`}>{divider}</React.Fragment>)
      }
    })
    children = woven
  }

  return (
    <Tag
      className={`flex ${direction === 'vertical' ? 'flex-col' : 'flex-row'} ${wrap && direction === 'horizontal' ? 'flex-wrap' : ''} ${align ? ALIGN[align] : ''} ${justify ? JUSTIFY[justify] : ''} ${className}`}
      style={{ gap: gapValue, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
