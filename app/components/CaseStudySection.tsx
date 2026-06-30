'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Calculator, TableProperties } from 'lucide-react'

// ─────────────────────────────────────────────
// Model: dQ/dt + μQ = λu(t)
// λ = 8 paquetes/s (tasa de llegada)
// μ = 2 paquetes/s (tasa de procesamiento)
// Q(0) = 0
//
// Solución: Q(t) = (λ/μ)(1 − e^(−μt)) = 4(1 − e^(−2t))
// Estado estacionario: Q(∞) = λ/μ = 4 paquetes
// ─────────────────────────────────────────────

const LAMBDA = 8   // paquetes/s — tasa de llegada (escalón unitario)
const MU = 2       // paquetes/s — tasa de procesamiento

export function generateData() {
  const data = []
  for (let t = 0; t <= 5; t += 0.1) {
    const Q = (LAMBDA / MU) * (1 - Math.exp(-MU * t))
    const arrival = LAMBDA * t           // paquetes acumulados llegando
    const processed = arrival - Q        // paquetes procesados
    data.push({
      t: parseFloat(t.toFixed(2)),
      Q: parseFloat(Q.toFixed(4)),
      arrival: parseFloat(arrival.toFixed(2)),
      processed: parseFloat(processed.toFixed(4)),
    })
  }
  return data
}

function MathBlock({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="my-4">
      {label && <p className="text-xs font-semibold text-violet-600 uppercase tracking-wide mb-1">{label}</p>}
      <div className="math-block bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 text-center text-slate-700 overflow-x-auto text-sm leading-relaxed">
        {children}
      </div>
    </div>
  )
}

function Step({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(num <= 2)
  return (
    <div className="bg-white/60 backdrop-blur rounded-2xl border border-white/80 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left group">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
            {num}
          </span>
          <span className="font-semibold text-slate-800 text-sm">{title}</span>
        </div>
        <span className="text-slate-400 group-hover:text-violet-500 transition-colors">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-2 border-t border-slate-100 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  )
}

export default function CaseStudySection() {
  const tableData = generateData().filter((_, i) => i % 5 === 0) // cada 0.5s
  const ss = LAMBDA / MU // estado estacionario

  return (
    <section id="caso" className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8 animate-slide-up">
        <span className="inline-block bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-3 tracking-wide uppercase">
          Sección 2 — Opción E
        </span>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Caso de Estudio</h2>
        <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
          Control del tráfico de paquetes en un servidor de comunicaciones, modelado con la Transformada de Laplace.
        </p>
      </div>

      {/* Contexto */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 shadow-sm p-5">
        <div className="flex items-start gap-3 mb-3">
          <span className="p-2 bg-indigo-500 rounded-xl text-white"><Calculator size={16} /></span>
          <div>
            <h3 className="font-semibold text-slate-800">Descripción del problema</h3>
            <p className="text-xs text-slate-500 mt-0.5">Modelo diferencial de primer orden</p>
          </div>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-3">
          Un servidor de comunicaciones recibe paquetes de datos. En el instante <span className="math-inline">t = 0</span>, inicia una ráfaga de tráfico con una tasa de llegada constante de <strong>λ = 8 paquetes/s</strong> (modelada como escalón unitario). El servidor procesa los paquetes con una tasa de <strong>μ = 2 paquetes/s</strong> proporcional al número de paquetes en cola.
        </p>
        <p className="text-slate-600 text-sm leading-relaxed">
          Se desea encontrar <span className="math-inline">Q(t)</span>, el número de paquetes en cola en función del tiempo, y analizar el comportamiento hacia el estado estacionario.
        </p>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: 'Tasa de llegada λ', val: '8 paq/s', color: 'bg-blue-50 border-blue-200 text-blue-800' },
            { label: 'Tasa procesamiento μ', val: '2 paq/s', color: 'bg-violet-50 border-violet-200 text-violet-800' },
            { label: 'Estado estacionario', val: `${ss} paq`, color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
          ].map(item => (
            <div key={item.label} className={`rounded-xl border p-3 ${item.color}`}>
              <p className="text-xs font-medium opacity-70">{item.label}</p>
              <p className="font-bold text-lg mt-0.5 math-inline">{item.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pasos de cálculo */}
      <div className="space-y-3">
        <Step num={1} title="Planteamiento de la ecuación diferencial">
          <p className="text-slate-600 text-sm mb-2">
            El modelo de balance de paquetes establece que la variación de la cola es la diferencia entre la tasa de llegada y la tasa de procesamiento:
          </p>
          <MathBlock label="EDO del modelo">
            dQ/dt + μ·Q(t) = λ·u(t)
          </MathBlock>
          <MathBlock label="Substituyendo los valores λ=8, μ=2">
            dQ/dt + 2·Q(t) = 8·u(t)
          </MathBlock>
          <p className="text-slate-600 text-sm">Condición inicial: <span className="math-inline">Q(0) = 0</span> (la cola está vacía al inicio).</p>
        </Step>

        <Step num={2} title="Aplicación de la Transformada de Laplace (dominio s)">
          <p className="text-slate-600 text-sm mb-2">
            Aplicamos la Transformada de Laplace a ambos lados. Usando la propiedad de la derivada <span className="math-inline">ℒ&#123;Q'(t)&#125; = sQ(s) − Q(0)</span> y que <span className="math-inline">ℒ&#123;u(t)&#125; = 1/s</span>:
          </p>
          <MathBlock label="Transformando término a término">
            ℒ&#123;dQ/dt&#125; + 2·ℒ&#123;Q(t)&#125; = 8·ℒ&#123;u(t)&#125;
          </MathBlock>
          <MathBlock label="Aplicando propiedades">
            [sQ(s) − Q(0)] + 2·Q(s) = 8/s
          </MathBlock>
          <MathBlock label="Aplicando Q(0)=0 y agrupando">
            Q(s)·(s + 2) = 8/s
          </MathBlock>
          <MathBlock label="Despejando Q(s)">
            Q(s) = 8 / [s·(s + 2)]
          </MathBlock>
        </Step>

        <Step num={3} title="Descomposición en fracciones parciales">
          <p className="text-slate-600 text-sm mb-2">
            Descomponemos <span className="math-inline">Q(s) = 8/[s(s+2)]</span> en fracciones parciales para poder aplicar la transformada inversa:
          </p>
          <MathBlock label="Forma de fracciones parciales">
            8/[s·(s + 2)] = A/s + B/(s + 2)
          </MathBlock>
          <MathBlock label="Multiplicando ambos lados por s·(s+2)">
            8 = A·(s + 2) + B·s
          </MathBlock>
          <div className="grid grid-cols-2 gap-3 my-3">
            <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 text-center">
              <p className="text-xs text-blue-600 font-semibold mb-1">Para s = 0:</p>
              <p className="math-block text-blue-800 text-sm">8 = A·(0 + 2) ⟹ A = 4</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 border border-purple-100 text-center">
              <p className="text-xs text-purple-600 font-semibold mb-1">Para s = −2:</p>
              <p className="math-block text-purple-800 text-sm">8 = B·(−2) ⟹ B = −4</p>
            </div>
          </div>
          <MathBlock label="Resultado de la descomposición">
            Q(s) = 4/s − 4/(s + 2)
          </MathBlock>
        </Step>

        <Step num={4} title="Transformada Inversa de Laplace — solución en tiempo">
          <p className="text-slate-600 text-sm mb-2">
            Aplicamos la transformada inversa a cada término, usando los pares estándar <span className="math-inline">ℒ⁻¹&#123;1/s&#125; = u(t)</span> y <span className="math-inline">ℒ⁻¹&#123;1/(s+a)&#125; = e^(−at)u(t)</span>:
          </p>
          <MathBlock label="Transformada inversa término a término">
            Q(t) = ℒ⁻¹&#123;4/s&#125; − ℒ⁻¹&#123;4/(s+2)&#125;
          </MathBlock>
          <MathBlock label="✅ Solución final">
            Q(t) = 4·(1 − e^(−2t)) · u(t) &nbsp; paquetes
          </MathBlock>
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-4 mt-3">
            <p className="text-sm font-semibold text-emerald-800 mb-2">Análisis del resultado:</p>
            <ul className="space-y-1.5 text-xs text-emerald-700">
              <li className="flex gap-2"><span>→</span>En <span className="math-inline">t = 0</span>: Q(0) = 4·(1−1) = 0 ✓ (consistente con la condición inicial)</li>
              <li className="flex gap-2"><span>→</span>Cuando <span className="math-inline">t → ∞</span>: Q(∞) = 4·(1−0) = <strong>4 paquetes</strong> (estado estacionario)</li>
              <li className="flex gap-2"><span>→</span>La constante de tiempo es <span className="math-inline">τ = 1/μ = 0.5 s</span>: en 5τ = 2.5s el sistema llega al 99.3% del estado estacionario</li>
              <li className="flex gap-2"><span>→</span>La razón λ/μ = 8/2 = 4 determina la capacidad máxima de la cola</li>
            </ul>
          </div>
        </Step>
      </div>

      {/* Tabla de datos */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-4">
          <span className="p-2 bg-teal-500 rounded-xl text-white"><TableProperties size={16} /></span>
          <div>
            <h3 className="font-semibold text-slate-800">Tabla de valores calculados</h3>
            <p className="text-xs text-slate-500">Q(t) = 4·(1 − e^(−2t)) paquetes en cola</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-50 to-violet-50 text-slate-700">
                <th className="px-4 py-3 text-left font-semibold">t (s)</th>
                <th className="px-4 py-3 text-left font-semibold">Q(t) — Paq. en cola</th>
                <th className="px-4 py-3 text-left font-semibold">Llegaron (λt)</th>
                <th className="px-4 py-3 text-left font-semibold">Procesados</th>
                <th className="px-4 py-3 text-left font-semibold">% Capacidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableData.map((row, i) => {
                const pct = (row.Q / ss) * 100
                return (
                  <tr key={i} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-4 py-2.5 font-mono text-slate-700 font-medium">{row.t.toFixed(1)}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-indigo-700 font-semibold">{row.Q.toFixed(3)}</span>
                        <div className="flex-1 max-w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full transition-all"
                            style={{ width: `${Math.min(pct, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-slate-500">{row.arrival.toFixed(1)}</td>
                    <td className="px-4 py-2.5 font-mono text-emerald-600">{row.processed.toFixed(3)}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        pct >= 90 ? 'bg-emerald-100 text-emerald-700' :
                        pct >= 60 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {pct.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-3 text-center">
          Estado estacionario alcanzado: Q(∞) = λ/μ = {ss} paquetes · τ = 1/μ = 0.5 s
        </p>
      </div>
    </section>
  )
}
