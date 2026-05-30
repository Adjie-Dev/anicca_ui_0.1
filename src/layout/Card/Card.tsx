import React from 'react'

export type AniccaCardVariant = 'elevated' | 'outlined' | 'flat'

export interface AniccaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AniccaCardVariant
  /** Render border-left accent color (e.g. for status cards). */
  accent?: string
  /** Disable padding on body; useful when composing with CardHeader/CardBody/CardFooter. */
  unpadded?: boolean
}

const VARIANTS: Record<AniccaCardVariant, string> = {
  elevated: 'bg-surface border border-text/[0.06] shadow-md dark:bg-surface dark:border-border/50 dark:shadow-md',
  outlined: 'bg-surface border border-border dark:bg-surface dark:border-border',
  flat: 'bg-surface-muted border border-transparent dark:bg-surface-container',
}

/**
 * AniccaCard — Container with variants. Compose with CardHeader/Body/Footer or pass children directly.
 */
export function AniccaCard({
  variant = 'elevated', accent, unpadded, className = '', style, children, ...rest
}: AniccaCardProps): React.ReactElement {
  return (
    <div
      className={`rounded-a ${unpadded ? '' : 'p-6'} ${VARIANTS[variant]} ${accent ? 'border-l-4' : ''} ${className}`}
      style={{ ...(accent ? { borderLeftColor: accent } : {}), ...style }}
      {...rest}
    >
      {children}
    </div>
  )
}

export interface AniccaCardSlotProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AniccaCardHeader({ className = '', children, ...rest }: AniccaCardSlotProps): React.ReactElement {
  return (
    <div className={`px-6 py-5 border-b border-border flex items-center justify-between gap-3 ${className}`} {...rest}>
      {children}
    </div>
  )
}

export function AniccaCardTitle({ className = '', children, ...rest }: React.HTMLAttributes<HTMLHeadingElement>): React.ReactElement {
  return <h3 className={`text-[1rem] font-bold text-text tracking-tight m-0 ${className}`} {...rest}>{children}</h3>
}

export function AniccaCardDescription({ className = '', children, ...rest }: React.HTMLAttributes<HTMLParagraphElement>): React.ReactElement {
  return <p className={`text-[0.82rem] text-text-muted m-0 ${className}`} {...rest}>{children}</p>
}

export function AniccaCardBody({ className = '', children, ...rest }: AniccaCardSlotProps): React.ReactElement {
  return <div className={`px-6 py-5 text-text ${className}`} {...rest}>{children}</div>
}

export function AniccaCardFooter({ className = '', children, ...rest }: AniccaCardSlotProps): React.ReactElement {
  return (
    <div className={`px-6 py-4 border-t border-border flex items-center justify-end gap-2 ${className}`} {...rest}>
      {children}
    </div>
  )
}
