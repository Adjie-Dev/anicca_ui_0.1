import React, { useState, useMemo } from 'react'

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

export interface AniccaDataTableProps<T extends object> {
  data: T[]
  columns: AniccaColumn<T>[]
  searchable?: boolean
  searchPlaceholder?: string
  pageSize?: number
  className?: string
  labels?: AniccaDataTableLabels
}

const DEFAULT_LABELS: Required<AniccaDataTableLabels> = {
  searchPlaceholder: 'Search...', results: 'results', emptyMessage: 'No data found',
  page: 'Page', of: 'of', previous: '← Prev', next: 'Next →',
}

/**
 * AniccaDataTable — Data table with search, column sorting, and pagination.
 */
export function AniccaDataTable<T extends object>({
  data, columns, searchable = true, searchPlaceholder, pageSize = 5, className = '', labels,
}: AniccaDataTableProps<T>): React.ReactElement {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortAsc, setSortAsc] = useState(true)
  const [page, setPage] = useState(0)
  const t = { ...DEFAULT_LABELS, ...labels }

  const filtered = useMemo(() => {
    let r = data
    if (search) {
      const q = search.toLowerCase()
      r = r.filter((row) => columns.some((c) => String((row as Record<string, unknown>)[c.key] ?? '').toLowerCase().includes(q)))
    }
    if (sortKey) {
      r = [...r].sort((a, b) => {
        const av = String((a as Record<string, unknown>)[sortKey] ?? '')
        const bv = String((b as Record<string, unknown>)[sortKey] ?? '')
        return sortAsc ? av.localeCompare(bv, undefined, { numeric: true }) : bv.localeCompare(av, undefined, { numeric: true })
      })
    }
    return r
  }, [data, search, sortKey, sortAsc, columns])

  const totalPages = pageSize > 0 ? Math.ceil(filtered.length / pageSize) : 1
  const paged = pageSize > 0 ? filtered.slice(page * pageSize, (page + 1) * pageSize) : filtered

  const handleSort = (key: string) => {
    if (sortKey === key) setSortAsc(!sortAsc)
    else { setSortKey(key); setSortAsc(true) }
  }

  return (
    <div className={`bg-surface-container-lowest rounded-[20px] shadow-[0_1px_2px_rgba(11,28,48,0.04),0_12px_32px_-14px_rgba(11,28,48,0.14)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.3)] border border-on-surface/[0.06] dark:border-[rgba(51,65,85,0.5)] overflow-hidden ${className}`}>
      {searchable && (
        <div className="flex items-center justify-between py-5 px-6 border-b border-on-surface/[0.06] dark:border-[rgba(51,65,85,0.5)]">
          <div className="flex items-center gap-2 bg-[#f8fafc] dark:bg-background border border-on-surface/[0.08] dark:border-[rgba(71,85,105,0.5)] rounded-[10px] py-2 px-[0.85rem] transition-[border-color,box-shadow] duration-200 focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgb(var(--primary)/0.12)] dark:focus-within:border-primary dark:focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-outline" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              className="border-none bg-transparent outline-none text-[0.85rem] font-[inherit] text-on-surface dark:text-on-surface w-[200px] placeholder:text-[#94a3b8] dark:placeholder:text-[#64748b]"
              placeholder={searchPlaceholder ?? t.searchPlaceholder}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0) }}
            />
          </div>
          <span className="text-[0.75rem] font-medium text-[#94a3b8]">{filtered.length} {t.results}</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`text-left py-[0.9rem] px-5 text-[0.68rem] font-semibold text-[#767586] dark:text-[#94a3b8] uppercase tracking-[0.08em] bg-transparent dark:bg-background border-b border-on-surface/[0.06] dark:border-[rgba(51,65,85,0.5)] whitespace-nowrap ${col.sortable ? 'cursor-pointer select-none transition-colors duration-150 hover:text-on-surface dark:hover:text-on-surface' : ''}`}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    <span className="text-[0.7rem] ml-1">{sortAsc ? '↑' : '↓'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 px-6 text-center text-[#94a3b8] text-[0.85rem]">
                  {t.emptyMessage}
                </td>
              </tr>
            ) : paged.map((row, i) => (
              <tr key={i} className="group">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`py-4 px-5 text-[0.85rem] text-on-surface dark:text-[#cbd5e1] align-middle border-b border-on-surface/[0.05] dark:border-[rgba(51,65,85,0.4)] last:border-b-0 transition-colors duration-150 group-hover:bg-primary/[0.07] dark:group-hover:bg-[rgba(71,85,105,0.35)] ${i % 2 !== 0 ? 'bg-surface-container-low/40 dark:bg-[rgba(51,65,85,0.25)]' : ''}`}
                  >
                    {col.render
                      ? col.render((row as Record<string, unknown>)[col.key] as T[keyof T], row)
                      : String((row as Record<string, unknown>)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pageSize > 0 && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 py-4 px-6 border-t border-on-surface/[0.06] dark:border-[rgba(51,65,85,0.5)]">
          <button
            className="py-[0.45rem] px-[0.9rem] border border-on-surface/10 dark:border-[rgba(71,85,105,0.5)] rounded-[10px] bg-surface-container-lowest dark:bg-[#1e293b] text-[0.78rem] font-semibold text-[#565e74] dark:text-[#cbd5e1] cursor-pointer font-[inherit] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:border-primary hover:enabled:text-primary hover:enabled:bg-primary/[0.04] dark:hover:enabled:border-[#3b82f6] dark:hover:enabled:text-[#3b82f6]"
            disabled={page === 0} onClick={() => setPage(page - 1)}
          >{t.previous}</button>
          <span className="text-[0.78rem] text-[#64748b] dark:text-[#94a3b8] font-medium">{t.page} {page + 1} {t.of} {totalPages}</span>
          <button
            className="py-[0.45rem] px-[0.9rem] border border-on-surface/10 dark:border-[rgba(71,85,105,0.5)] rounded-[10px] bg-surface-container-lowest dark:bg-[#1e293b] text-[0.78rem] font-semibold text-[#565e74] dark:text-[#cbd5e1] cursor-pointer font-[inherit] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:border-primary hover:enabled:text-primary hover:enabled:bg-primary/[0.04] dark:hover:enabled:border-[#3b82f6] dark:hover:enabled:text-[#3b82f6]"
            disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}
          >{t.next}</button>
        </div>
      )}
    </div>
  )
}
