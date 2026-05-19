import React, { useState, useMemo } from 'react'

/**
 * Column definition for AniccaDataTable.
 */
export interface AniccaColumn<T> {
  key: keyof T & string
  label: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
  width?: string
}

export interface AniccaDataTableLabels {
  searchPlaceholder?: string
  results?: string
  emptyMessage?: string
  page?: string
  of?: string
  previous?: string
  next?: string
}

/**
 * Props for AniccaDataTable.
 */
export interface AniccaDataTableProps<T extends object> {
  data: T[]
  columns: AniccaColumn<T>[]
  searchable?: boolean
  pageSize?: number
  className?: string
  /** i18n label overrides */
  labels?: AniccaDataTableLabels
}

const DEFAULT_LABELS: Required<AniccaDataTableLabels> = {
  searchPlaceholder: 'Search...',
  results: 'results',
  emptyMessage: 'No data found',
  page: 'Page',
  of: 'of',
  previous: '← Prev',
  next: 'Next →',
}

/**
 * AniccaDataTable — A full-featured data table with search filtering,
 * column sorting, pagination, and custom cell rendering.
 */
export function AniccaDataTable<T extends object>({
  data,
  columns,
  searchable = true,
  pageSize = 5,
  className = '',
  labels,
}: AniccaDataTableProps<T>): React.ReactElement {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortAsc, setSortAsc] = useState(true)
  const [page, setPage] = useState(0)
  const t = { ...DEFAULT_LABELS, ...labels }

  const filtered = useMemo(() => {
    let result = data
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(row =>
        columns.some(col => String((row as Record<string, unknown>)[col.key] ?? '').toLowerCase().includes(q))
      )
    }
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const av = String((a as Record<string, unknown>)[sortKey] ?? '')
        const bv = String((b as Record<string, unknown>)[sortKey] ?? '')
        const cmp = av.localeCompare(bv, undefined, { numeric: true })
        return sortAsc ? cmp : -cmp
      })
    }
    return result
  }, [data, search, sortKey, sortAsc, columns])

  const totalPages = pageSize > 0 ? Math.ceil(filtered.length / pageSize) : 1
  const paged = pageSize > 0 ? filtered.slice(page * pageSize, (page + 1) * pageSize) : filtered

  const handleSort = (key: string) => {
    if (sortKey === key) setSortAsc(!sortAsc)
    else { setSortKey(key); setSortAsc(true) }
  }

  return (
    <div className={`bg-a-surface rounded-a shadow-a-sm border border-a-border overflow-hidden ${className}`}>
      {searchable && (
        <div className="flex items-center justify-between py-5 px-6 border-b border-a-border">
          <div className="flex items-center gap-2 bg-a-surface-muted border-[1.5px] border-a-border rounded-[10px] py-2 px-[0.85rem] transition-colors focus-within:border-a-primary focus-within:shadow-[0_0_0_3px_var(--anicca-primary-soft)]">
            <span className="text-[0.85rem] opacity-50">🔍</span>
            <input
              className="border-none bg-transparent outline-none text-[0.85rem] font-[inherit] text-a-text w-[200px] placeholder:text-a-text-subtle"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(0) }}
              placeholder={t.searchPlaceholder}
            />
          </div>
          <span className="text-xs text-a-text-subtle font-medium">{filtered.length} {t.results}</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-spacing-0">
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`text-left py-3 px-5 text-[0.7rem] font-semibold text-a-text-muted uppercase tracking-[0.05em] bg-a-surface-muted whitespace-nowrap ${col.sortable ? 'cursor-pointer select-none transition-colors duration-150 hover:text-a-text' : ''}`}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    <span className="text-[0.7rem]">{sortAsc ? ' ↑' : ' ↓'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr><td colSpan={columns.length} className="py-12 px-6 text-center text-a-text-subtle text-[0.9rem]">{t.emptyMessage}</td></tr>
            ) : (
              paged.map((row, i) => (
                <tr key={i} className="transition-colors duration-150 hover:[&>td]:bg-a-surface-muted">
                  {columns.map(col => (
                    <td key={col.key} className="py-[0.85rem] px-5 text-[0.85rem] border-b border-a-border align-middle last:border-b-0 text-a-text">
                      {col.render ? col.render((row as Record<string, unknown>)[col.key] as T[keyof T], row) : String((row as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pageSize > 0 && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 py-4 px-6 border-t border-a-border">
          <button
            className="py-[0.4rem] px-[0.85rem] border-[1.5px] border-a-border rounded-lg bg-a-surface text-[0.78rem] font-medium text-a-text-muted cursor-pointer transition-all duration-150 font-[inherit] hover:enabled:border-a-primary hover:enabled:text-a-primary disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >{t.previous}</button>
          <span className="text-[0.78rem] text-a-text-muted font-medium">{t.page} {page + 1} {t.of} {totalPages}</span>
          <button
            className="py-[0.4rem] px-[0.85rem] border-[1.5px] border-a-border rounded-lg bg-a-surface text-[0.78rem] font-medium text-a-text-muted cursor-pointer transition-all duration-150 font-[inherit] hover:enabled:border-a-primary hover:enabled:text-a-primary disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
          >{t.next}</button>
        </div>
      )}
    </div>
  )
}
