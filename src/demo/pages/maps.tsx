import 'maplibre-gl/dist/maplibre-gl.css'
import { useState, useEffect, useRef } from 'react'
import type { Map as MaplibreMap } from 'maplibre-gl'
import { ACCENT, card, pageShell } from '../theme'
import { Crumbs } from '../ui/primitives'
import { AniccaSpinner } from '../../data/Spinner'

// ── Dark mode hook ─────────────────────────────────────────────────────────
function useDarkMode() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains('dark'))
    )
    obs.observe(document.documentElement, { attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  return dark
}

// ── Inline OSM raster style — no external style JSON needed ───────────────
const MAP_STYLE = {
  version: 8 as const,
  sources: {
    osm: {
      type: 'raster' as const,
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  },
  layers: [{ id: 'osm-tiles', type: 'raster' as const, source: 'osm' }],
}

type MarkerDef = { lat: number; lng: number; color: string; title: string; meta: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addMarkers(mgl: any, map: MaplibreMap, markers: MarkerDef[]) {
  markers.forEach(m => {
    const el = document.createElement('span')
    el.className = 'material-symbols-outlined'
    el.style.cssText = [
      'font-size:34px',
      `color:${m.color}`,
      "font-variation-settings:'FILL' 1",
      'cursor:pointer',
      'display:block',
      'line-height:1',
      'filter:drop-shadow(0 2px 5px rgba(0,0,0,0.45))',
      'transition:transform 0.15s ease',
    ].join(';')
    el.textContent = 'location_on'
    el.onmouseenter = () => { el.style.transform = 'scale(1.25)' }
    el.onmouseleave = () => { el.style.transform = 'scale(1)' }

    const popup = new mgl.Popup({ offset: 28, closeButton: false })
      .setHTML(`<strong style="font-size:13px">${m.title}</strong><br><span style="font-size:11px;opacity:0.7">${m.meta}</span>`)

    new mgl.Marker({ element: el, anchor: 'bottom' })
      .setLngLat([m.lng, m.lat])
      .setPopup(popup)
      .addTo(map)
  })
}

// ── MapLibre map component ─────────────────────────────────────────────────
type MapStatus = 'loading' | 'ready' | 'error'

function MapLibreMap({
  lat, lng, zoom, dark, markers,
}: {
  lat: number; lng: number; zoom: number; dark: boolean; markers: MarkerDef[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef       = useRef<MaplibreMap | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mglRef       = useRef<any>(null)
  const isMount      = useRef(true)
  const darkRef      = useRef(dark)
  darkRef.current    = dark

  const [status, setStatus] = useState<MapStatus>('loading')
  const [errMsg, setErrMsg] = useState('')

  // ── Init — dynamic import so module crash cannot bubble to App.tsx ────────
  useEffect(() => {
    if (!containerRef.current) return
    let destroyed = false

    import('maplibre-gl')
      .then(({ default: mgl }) => {
        if (destroyed || !containerRef.current) return

        mglRef.current = mgl

        const map = new mgl.Map({
          container: containerRef.current,
          style: MAP_STYLE,
          center: [lng, lat],
          zoom,
          attributionControl: false,
        })

        mapRef.current = map

        map.on('load', () => {
          if (destroyed) return
          addMarkers(mgl, map, markers)
          setStatus('ready')
        })

        map.on('error', (e) => {
          console.error('[MapLibre]', e.error)
          if (!destroyed) {
            setStatus('error')
            setErrMsg(e.error?.message ?? String(e.error))
          }
        })
      })
      .catch(err => {
        console.error('[MapLibre] import failed:', err)
        if (!destroyed) {
          setStatus('error')
          setErrMsg(String(err))
        }
      })

    return () => {
      destroyed = true
      mapRef.current?.remove()
      mapRef.current = null
      mglRef.current = null
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── flyTo when active location changes ───────────────────────────────────
  useEffect(() => {
    if (isMount.current) { isMount.current = false; return }
    const map = mapRef.current
    if (!map) return
    const doFly = () => map.flyTo({ center: [lng, lat], zoom, speed: 1.2, curve: 1.5, essential: true })
    if (map.isStyleLoaded()) { doFly() } else { map.once('style.load', doFly) }
  }, [lat, lng, zoom])

  return (
    <div className="relative h-[360px] rounded-[16px] overflow-hidden border border-outline-variant/20">
      {/* Map container — filter for dark mode on raster OSM tiles */}
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{
          filter: dark ? 'invert(92%) hue-rotate(180deg) brightness(0.9) contrast(0.9)' : 'none',
          transition: 'filter 0.4s ease',
        }}
      />

      {/* Loading overlay */}
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-container-low">
          <AniccaSpinner size="md" />
        </div>
      )}

      {/* Error overlay — visible on screen, not just console */}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-container-low gap-3 p-6">
          <span className="material-symbols-outlined text-[36px] text-error">map_off</span>
          <p className="text-label-md font-semibold text-on-surface">Map gagal dimuat</p>
          {errMsg && <p className="text-[11px] text-on-surface-variant text-center break-all max-w-xs">{errMsg}</p>}
        </div>
      )}
    </div>
  )
}

// ── Page: Office Locations ─────────────────────────────────────────────────
type OfficeDef = MarkerDef & { zoom: number }

export function MapGooglePage() {
  const dark = useDarkMode()
  const offices: OfficeDef[] = [
    { title: 'Denpasar',  meta: 'HQ · 240 staff',  color: ACCENT.indigo, lat: -8.65, lng: 115.22, zoom: 11 },
    { title: 'Talas',     meta: 'Regional · 80',    color: ACCENT.green,  lat: 42.52, lng: 72.24,  zoom: 11 },
    { title: 'Singapore', meta: 'R&D · 45',         color: ACCENT.amber,  lat: 1.35,  lng: 103.82, zoom: 11 },
    { title: 'Tokyo',     meta: 'EU office · 30',   color: ACCENT.red,    lat: 35.68, lng: 139.69, zoom: 11 },
  ]
  const [active, setActive] = useState(offices[0])

  return (
    <div className={pageShell}>
      <Crumbs trail={['Maps', 'Google Map']} />
      <div>
        <h1 className="text-[28px] font-bold text-on-surface tracking-tight">Locations</h1>
        <p className="text-body-base text-on-surface-variant">Office network across regions.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <section className={`${card} lg:col-span-2 p-3`}>
          <MapLibreMap lat={active.lat} lng={active.lng} zoom={active.zoom} dark={dark} markers={offices} />
        </section>
        <section className={`${card} p-6`}>
          <h4 className="text-headline-sm font-bold text-on-surface tracking-tight mb-4">Offices</h4>
          <div className="space-y-3">
            {offices.map(o => {
              const isActive = o.title === active.title
              return (
                <button
                  key={o.title}
                  onClick={() => setActive(o)}
                  className={`w-full text-left flex items-center gap-3 p-3 rounded-[12px] border transition-all cursor-pointer ${
                    isActive ? 'border-primary/40 bg-primary/8 shadow-sm' : 'border-outline-variant/15 hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px] shrink-0" style={{ color: o.color, fontVariationSettings: "'FILL' 1" }}>
                    location_on
                  </span>
                  <div>
                    <p className="text-label-md font-bold text-on-surface">{o.title}</p>
                    <p className="text-[12px] text-on-surface-variant">{o.meta}</p>
                  </div>
                  {isActive && <span className="ml-auto material-symbols-outlined text-[16px] text-primary">my_location</span>}
                </button>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

// ── Page: Sales by Region ──────────────────────────────────────────────────
type CountryDef = MarkerDef & { pct: number; zoom: number }

export function MapVectorPage() {
  const dark = useDarkMode()
  const countries: CountryDef[] = [
    { title: 'United States', meta: '82% of sales', pct: 82, color: ACCENT.indigo, lat: 37.09,  lng: -95.71, zoom: 4 },
    { title: 'Indonesia',     meta: '64% of sales', pct: 64, color: ACCENT.green,  lat: -0.79,  lng: 113.92, zoom: 4 },
    { title: 'Germany',       meta: '47% of sales', pct: 47, color: ACCENT.amber,  lat: 51.17,  lng: 10.45,  zoom: 5 },
    { title: 'Japan',         meta: '38% of sales', pct: 38, color: ACCENT.red,    lat: 36.20,  lng: 138.25, zoom: 5 },
    { title: 'Brazil',        meta: '25% of sales', pct: 25, color: ACCENT.slate,  lat: -14.24, lng: -51.93, zoom: 4 },
  ]
  const [active, setActive] = useState(countries[0])

  return (
    <div className={pageShell}>
      <Crumbs trail={['Maps', 'Vector Map']} />
      <div>
        <h1 className="text-[28px] font-bold text-on-surface tracking-tight">Sales by Region</h1>
        <p className="text-body-base text-on-surface-variant">Distribution across markets.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <section className={`${card} lg:col-span-2 p-3`}>
          <MapLibreMap lat={active.lat} lng={active.lng} zoom={active.zoom} dark={dark} markers={countries} />
        </section>
        <section className={`${card} p-6`}>
          <h4 className="text-headline-sm font-bold text-on-surface tracking-tight mb-4">Top countries</h4>
          <div className="space-y-4">
            {countries.map(c => {
              const isActive = c.title === active.title
              return (
                <button
                  key={c.title}
                  onClick={() => setActive(c)}
                  className={`w-full text-left p-2 -mx-2 rounded-[10px] transition-all cursor-pointer ${
                    isActive ? 'bg-primary/8' : 'hover:bg-surface-container'
                  }`}
                >
                  <div className="flex justify-between text-body-sm mb-1.5">
                    <span className={`font-medium ${isActive ? 'text-primary' : 'text-on-surface'}`}>{c.title}</span>
                    <span className="font-bold tabular-nums text-on-surface">{c.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${c.pct}%`, background: c.color }} />
                  </div>
                </button>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
