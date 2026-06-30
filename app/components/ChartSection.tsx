'use client'
import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine, Area, AreaChart
} from 'recharts'
import { BarChart2, TrendingUp, Layers } from 'lucide-react'
import { generateData } from './CaseStudySection'

const LAMBDA = 8
const MU = 2
const SS = LAMBDA / MU // 4

const COLORS = {
  queue: '#6366f1',
  processed: '#10b981',
  arrival: '#f59e0b',
}

type ChartMode = 'queue' | 'all' | 'area'

interface TooltipProps {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string; dataKey: string }>
  label?: number
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white/95 backdrop-blur rounded-xl shadow-lg border border-slate-100 p-3 text-xs">
      <p className="font-bold text-slate-700 mb-2">t = {(label as number)?.toFixed(2)} s</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-slate-600">{entry.name}:</span>
          <span className="font-semibold" style={{ color: entry.color }}>{entry.value.toFixed(3)}</span>
        </div>
      ))}
    </div>
  )
}

export default function ChartSection() {
  const [mode, setMode] = useState<ChartMode>('queue')
  const data = generateData()

  const tau = 1 / MU
  const t63 = tau
  const t99 = 5 * tau

  const modes: { id: ChartMode; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'queue', label: 'Cola Q(t)', icon: <TrendingUp size={14} />, desc: 'Solo paquetes en cola' },
    { id: 'all', label: 'Comparativa', icon: <BarChart2 size={14} />, desc: 'Cola, llegadas y procesados' },
    { id: 'area', label: 'Área', icon: <Layers size={14} />, desc: 'Vista de área acumulada' },
  ]

  return (
    <section id="grafica" className="space-y-5">
      <div className="text-center mb-6 animate-slide-up">
        <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-3 tracking-wide uppercase">
          Visualización
        </span>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Gráfica Interactiva</h2>
        <p className="text-slate-500 text-sm">
          Evolución de la cola de paquetes según el modelo{' '}
          <span className="math-inline">Q(t) = 4·(1 − e^(−2t))</span>
        </p>
      </div>

      {/* Mode selector */}
      <div className="flex gap-2 justify-center flex-wrap">
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              mode === m.id
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-200'
                : 'bg-white/70 text-slate-600 hover:bg-indigo-50 border border-slate-200'
            }`}
          >
            {m.icon}
            {m.label}
          </button>
        ))}
      </div>

      {/* Chart card */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 shadow-sm p-5">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {mode === 'area' ? (
              <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="queueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.queue} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={COLORS.queue} stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="procGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.processed} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={COLORS.processed} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="t" tick={{ fontSize: 11, fill: '#94a3b8' }} label={{ value: 'Tiempo (s)', position: 'insideBottom', offset: -2, fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} label={{ value: 'Paquetes', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <ReferenceLine y={SS} stroke="#6366f1" strokeDasharray="5 4" strokeOpacity={0.6} label={{ value: `Q(∞)=${SS}`, position: 'right', fontSize: 10, fill: '#6366f1' }} />
                <Area type="monotone" dataKey="Q" name="Cola Q(t)" stroke={COLORS.queue} fill="url(#queueGrad)" strokeWidth={2.5} dot={false} />
                <Area type="monotone" dataKey="processed" name="Procesados" stroke={COLORS.processed} fill="url(#procGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            ) : (
              <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="t" tick={{ fontSize: 11, fill: '#94a3b8' }} label={{ value: 'Tiempo (s)', position: 'insideBottom', offset: -2, fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} label={{ value: 'Paquetes', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <ReferenceLine y={SS} stroke="#6366f1" strokeDasharray="5 4" strokeOpacity={0.6} label={{ value: `Estado estacionario = ${SS} paq`, position: 'right', fontSize: 9, fill: '#6366f1' }} />
                {mode === 'queue' || mode === 'all' ? (
                  <Line type="monotone" dataKey="Q" name="Cola Q(t)" stroke={COLORS.queue} strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: COLORS.queue }} />
                ) : null}
                {mode === 'all' && (
                  <>
                    <Line type="monotone" dataKey="processed" name="Procesados" stroke={COLORS.processed} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    <Line type="monotone" dataKey="arrival" name="Llegadas λt" stroke={COLORS.arrival} strokeWidth={1.5} strokeDasharray="4 3" dot={false} activeDot={{ r: 4 }} />
                  </>
                )}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key values */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Estado estacionario', val: `${SS} paq`, sub: 'Q(∞) = λ/μ', color: 'from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-800' },
          { label: 'Constante de tiempo τ', val: `${tau.toFixed(1)} s`, sub: 'τ = 1/μ', color: 'from-violet-50 to-violet-100 border-violet-200 text-violet-800' },
          { label: '63% alcanzado', val: `t = ${t63.toFixed(1)} s`, sub: 'Q(τ) ≈ 2.53 paq', color: 'from-sky-50 to-sky-100 border-sky-200 text-sky-800' },
          { label: '99% alcanzado', val: `t = ${t99.toFixed(1)} s`, sub: 'Q(5τ) ≈ 3.97 paq', color: 'from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-800' },
        ].map(item => (
          <div key={item.label} className={`bg-gradient-to-br ${item.color} border rounded-2xl p-4`}>
            <p className="text-xs font-medium opacity-70 mb-1">{item.label}</p>
            <p className="font-bold text-xl math-inline">{item.val}</p>
            <p className="text-xs opacity-60 mt-0.5 math-inline">{item.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
