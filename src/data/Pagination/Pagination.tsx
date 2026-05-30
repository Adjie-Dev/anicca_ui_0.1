import React from 'react'

export interface AniccaPaginationLabels {
  previous?: string
  next?: string
  page?: string
  goToPage?: (page: number) => string
}

export interface AniccaPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current page (1-indexed). */
  page: number
  /** Total number of pages. */
  pageCount: number
  /** Called when user clicks a page. */
  onPageChange: (page: number) => void
  /** How many pages to show on each side of current. Default 1. */
  siblingCount?: number
  /** Always show first/last page even if hidden. Default true. */
  boundaryCount?: number
  /** Hide previous/next buttons. */
  hideControls?: boolean
  labels?: AniccaPaginationLabels
}

const DEFAULT_LABELS: Required<Omit<AniccaPaginationLabels, 'goToPage'>> & Pick<AniccaPaginationLabels, 'goToPage'> = {
  previous: '← Prev',
  next: 'Next →',
  page: 'Page',
  goToPage: (p: number) => `Go to page ${p}`,
}

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function buildPages(page: number, pageCount: number, siblingCount: number, boundaryCount: number): (number | 'ellipsis')[] {
  const totalNumbers = boundaryCount * 2 + siblingCount * 2 + 3
  if (pageCount <= totalNumbers) return range(1, pageCount)

  const leftSibling = Math.max(page - siblingCount, boundaryCount + 2)
  const rightSibling = Math.min(page + siblingCount, pageCount - boundaryCount - 1)
  const showLeftEllipsis = leftSibling > boundaryCount + 2
  const showRightEllipsis = rightSibling < pageCount - boundaryCount - 1

  const firstPages = range(1, boundaryCount)
  const lastPages = range(pageCount - boundaryCount + 1, pageCount)

  const result: (number | 'ellipsis')[] = [...firstPages]
  if (showLeftEllipsis) result.push('ellipsis')
  else result.push(...range(boundaryCount + 1, leftSibling - 1))
  result.push(...range(leftSibling, rightSibling))
  if (showRightEllipsis) result.push('ellipsis')
  else result.push(...range(rightSibling + 1, pageCount - boundaryCount))
  result.push(...lastPages)
  return result
}

/**
 * AniccaPagination — Page navigation with sibling/boundary windowing and ellipsis.
 */
export function AniccaPagination({
  page, pageCount, onPageChange, siblingCount = 1, boundaryCount = 1,
  hideControls = false, labels, className = '', ...rest
}: AniccaPaginationProps): React.ReactElement {
  const t = { ...DEFAULT_LABELS, ...labels }
  const pages = buildPages(page, pageCount, siblingCount, boundaryCount)

  const btnBase = 'min-w-[34px] h-[34px] px-2 inline-flex items-center justify-center text-[0.82rem] font-semibold rounded-lg border transition-[background-color,border-color,color] duration-150 focus-visible:outline-none focus-visible:ring-[var(--anicca-ring-width)] focus-visible:ring-primary-soft disabled:opacity-40 disabled:cursor-not-allowed'

  return (
    <nav className={`flex items-center gap-1.5 ${className}`} aria-label="Pagination" {...rest}>
      {!hideControls && (
        <button
          type="button"
          className={`${btnBase} bg-surface text-text-muted border-border hover:enabled:border-primary hover:enabled:text-primary`}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          {t.previous}
        </button>
      )}
      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`e${i}`} className="px-1 text-text-subtle select-none">…</span>
        ) : (
          <button
            key={p}
            type="button"
            aria-current={p === page ? 'page' : undefined}
            aria-label={t.goToPage?.(p)}
            onClick={() => onPageChange(p)}
            className={`${btnBase} ${p === page ? 'bg-primary text-primary-fg border-primary' : 'bg-surface text-text-muted border-border hover:enabled:border-primary hover:enabled:text-primary'}`}
          >
            {p}
          </button>
        )
      )}
      {!hideControls && (
        <button
          type="button"
          className={`${btnBase} bg-surface text-text-muted border-border hover:enabled:border-primary hover:enabled:text-primary`}
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          {t.next}
        </button>
      )}
    </nav>
  )
}
