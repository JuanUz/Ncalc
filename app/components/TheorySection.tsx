'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp, BookOpen, Zap, ArrowRightLeft, Sigma, Activity, ToggleRight } from 'lucide-react'

interface AccordionProps {
  title: string
  icon: React.ReactNode
  accentColor: string
  children: React.ReactNode
}

function Accordion({ title, icon, accentColor, children }: AccordionProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 shadow-sm overflow-hidden transition-all duration-300 ${open ? 'shadow-md' : ''}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left group"
      >
        <div className="flex items-center gap-3">
          <span className={`p-2 rounded-xl ${accentColor} text-white`}>{icon}</span>
          <span className="font-600 text-slate-800 text-base font-semibold">{title}</span>
        </div>
        <span className="text-slate-400 group-hover:text-violet-500 transition-colors">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 animate-fade-in border-t border-slate-100/80 pt-4">
          {children}
        </div>
      )}
    </div>
  )
}

function MathBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="math-block bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 my-3 text-center text-slate-700 overflow-x-auto">
      {children}
    </div>
  )
}

function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="bg-violet-100 text-violet-800 px-1.5 py-0.5 rounded font-medium text-sm math-inline">{children}</span>
}

export default function TheorySection() {
  return (
    <section id="teoria" className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8 animate-slide-up">
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-3 tracking-wide uppercase">
          Sección 1
        </span>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Investigación Teórica</h2>
        <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
          Fundamentos matemáticos de la Transformada de Laplace: definiciones, propiedades y aplicaciones.
        </p>
      </div>

      <div className="space-y-3">
        {/* 1. Definición */}
        <Accordion
          title="1. Definición de la Transformada de Laplace"
          icon={<BookOpen size={16} />}
          accentColor="bg-indigo-500"
        >
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            La <strong>Transformada de Laplace</strong> es una transformación integral que convierte una función del dominio del tiempo <Highlight>f(t)</Highlight> en una función del dominio de la frecuencia compleja <Highlight>F(s)</Highlight>, donde <Highlight>s = σ + jω</Highlight>.
          </p>
          <MathBlock>
            ℒ&#123;f(t)&#125; = F(s) = ∫₀^∞ f(t) · e^(−st) dt
          </MathBlock>
          <p className="text-slate-600 text-sm leading-relaxed">
            donde <Highlight>s ∈ ℂ</Highlight> es la variable compleja de frecuencia. Esta transformación es una herramienta fundamental en ingeniería de sistemas, teoría de control, procesamiento de señales y análisis de circuitos.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { label: 'Dominio original', val: 'Tiempo: t ≥ 0', color: 'bg-blue-50 border-blue-200 text-blue-700' },
              { label: 'Dominio transformado', val: 'Frecuencia: s ∈ ℂ', color: 'bg-purple-50 border-purple-200 text-purple-700' },
            ].map(item => (
              <div key={item.label} className={`rounded-xl border p-3 ${item.color}`}>
                <p className="text-xs font-semibold uppercase tracking-wide opacity-70">{item.label}</p>
                <p className="font-mono text-sm font-semibold mt-0.5">{item.val}</p>
              </div>
            ))}
          </div>
        </Accordion>

        {/* 2. Propiedades */}
        <Accordion
          title="2. Propiedades más importantes"
          icon={<Zap size={16} />}
          accentColor="bg-violet-500"
        >
          <p className="text-slate-600 text-sm mb-4">Las propiedades de la Transformada de Laplace simplifican enormemente la resolución de ecuaciones diferenciales:</p>
          <div className="space-y-3">
            {[
              {
                name: 'Linealidad',
                formula: 'ℒ{af(t) + bg(t)} = aF(s) + bG(s)',
                desc: 'La transformada distribuye sobre sumas y escalares constantes.',
              },
              {
                name: 'Derivada en el tiempo',
                formula: "ℒ{f'(t)} = sF(s) − f(0⁻)",
                desc: 'Convierte derivadas en multiplicaciones algebraicas — la clave para resolver EDOs.',
              },
              {
                name: 'Segunda derivada',
                formula: "ℒ{f''(t)} = s²F(s) − sf(0⁻) − f'(0⁻)",
                desc: 'Las condiciones iniciales quedan incorporadas naturalmente.',
              },
              {
                name: 'Integral',
                formula: 'ℒ{∫₀ᵗ f(τ)dτ} = F(s)/s',
                desc: 'La integración se convierte en división por s.',
              },
              {
                name: 'Desplazamiento en frecuencia',
                formula: 'ℒ{e^(at)f(t)} = F(s − a)',
                desc: 'Traslación en el eje s.',
              },
              {
                name: 'Convolución',
                formula: 'ℒ{f(t) * g(t)} = F(s)·G(s)',
                desc: 'La convolución en tiempo equivale a multiplicación en frecuencia.',
              },
            ].map(prop => (
              <div key={prop.name} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <p className="text-xs font-bold text-violet-700 uppercase tracking-wide mb-1">{prop.name}</p>
                <div className="math-block bg-white rounded-lg p-2 text-center text-slate-700 text-sm border border-slate-100 mb-2">
                  {prop.formula}
                </div>
                <p className="text-xs text-slate-500">{prop.desc}</p>
              </div>
            ))}
          </div>
        </Accordion>

        {/* 3. Condiciones de existencia */}
        <Accordion
          title="3. Condiciones suficientes de existencia"
          icon={<Sigma size={16} />}
          accentColor="bg-pink-500"
        >
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            La integral <Highlight>∫₀^∞ f(t)e^(−st) dt</Highlight> converge y define <Highlight>F(s)</Highlight> si se cumplen las siguientes condiciones:
          </p>
          <div className="space-y-3">
            {[
              {
                num: '1',
                title: 'Seccionalmente continua',
                desc: 'f(t) es continua a trozos en todo intervalo finito [0, T], con un número finito de discontinuidades de salto.',
                color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
              },
              {
                num: '2',
                title: 'Orden exponencial',
                desc: 'Existen constantes M > 0, α ∈ ℝ y T₀ ≥ 0 tales que |f(t)| ≤ Meᵅᵗ para todo t > T₀. Esto garantiza que el crecimiento de f(t) no supera una exponencial.',
                color: 'text-blue-700 bg-blue-50 border-blue-200',
              },
              {
                num: '3',
                title: 'Región de convergencia',
                desc: 'La transformada F(s) existe para todos los valores de s con Re(s) > α, donde α es el ábscisa de convergencia (exponente de la cota exponencial).',
                color: 'text-purple-700 bg-purple-50 border-purple-200',
              },
            ].map(c => (
              <div key={c.num} className={`rounded-xl border p-4 ${c.color}`}>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-lg leading-none mt-0.5">{c.num}.</span>
                  <div>
                    <p className="font-semibold text-sm mb-1">{c.title}</p>
                    <p className="text-xs opacity-80 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <MathBlock>
            F(s) existe ⟺ Re(s) &#62; α, donde |f(t)| ≤ M·e^(αt)
          </MathBlock>
        </Accordion>

        {/* 4. Transformada directa */}
        <Accordion
          title="4. Transformada de Laplace Directa"
          icon={<ArrowRightLeft size={16} />}
          accentColor="bg-sky-500"
        >
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            La <strong>Transformada Directa</strong> convierte una función del tiempo al dominio de la frecuencia compleja. Matemáticamente:
          </p>
          <MathBlock>
            F(s) = ℒ&#123;f(t)&#125; = ∫₀^∞ f(t) e^(−st) dt
          </MathBlock>
          <p className="text-slate-600 text-sm mb-3">Pares de transformadas directas fundamentales:</p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-sky-50 text-sky-800">
                  <th className="px-4 py-2.5 text-left font-semibold">f(t) — Dominio tiempo</th>
                  <th className="px-4 py-2.5 text-left font-semibold">F(s) — Dominio frecuencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ['δ(t) — Impulso unitario', '1'],
                  ['u(t) — Escalón unitario', '1/s'],
                  ['t — Rampa', '1/s²'],
                  ['tⁿ — Potencia', 'n! / sⁿ⁺¹'],
                  ['e^(at)', '1/(s − a)'],
                  ['sen(ωt)', 'ω/(s² + ω²)'],
                  ['cos(ωt)', 's/(s² + ω²)'],
                  ['e^(at)·sen(ωt)', 'ω/((s−a)² + ω²)'],
                ].map(([ft, Fs]) => (
                  <tr key={ft} className="hover:bg-sky-50/40 transition-colors">
                    <td className="px-4 py-2.5 math-inline text-slate-700">{ft}</td>
                    <td className="px-4 py-2.5 math-inline text-indigo-700 font-medium">{Fs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Accordion>

        {/* 5. Transformada inversa */}
        <Accordion
          title="5. Transformada de Laplace Inversa"
          icon={<Activity size={16} />}
          accentColor="bg-emerald-500"
        >
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            La <strong>Transformada Inversa</strong> recupera la función original en el dominio del tiempo a partir de su representación en frecuencia:
          </p>
          <MathBlock>
            f(t) = ℒ⁻¹&#123;F(s)&#125; = (1/2πj) · ∫_(c−j∞)^(c+j∞) F(s) e^(st) ds
          </MathBlock>
          <p className="text-slate-600 text-sm mb-3">
            En la práctica, rara vez se evalúa esta integral de Bromwich directamente. Los métodos más usados son:
          </p>
          <div className="space-y-2">
            {[
              {
                method: 'Tablas de pares conocidos',
                desc: 'Identificar F(s) como una forma tabular estándar y leer f(t) directamente.',
              },
              {
                method: 'Fracciones parciales',
                desc: 'Descomponer F(s) = P(s)/Q(s) en fracciones simples, luego aplicar la transformada inversa término a término.',
              },
              {
                method: 'Teorema del valor inicial',
                desc: 'lim(t→0⁺) f(t) = lim(s→∞) s·F(s) — útil para verificación.',
              },
              {
                method: 'Teorema del valor final',
                desc: 'lim(t→∞) f(t) = lim(s→0) s·F(s) — permite conocer el estado estacionario sin calcular f(t) completa.',
              },
            ].map(m => (
              <div key={m.method} className="flex gap-3 bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                <span className="text-emerald-500 mt-0.5">▸</span>
                <div>
                  <p className="text-sm font-semibold text-emerald-800">{m.method}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Accordion>

        {/* 6. Función escalón */}
        <Accordion
          title="6. Función Escalón Unitario u(t)"
          icon={<ToggleRight size={16} />}
          accentColor="bg-orange-500"
        >
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            La <strong>función escalón unitario</strong> (o función de Heaviside) modela la activación abrupta de un sistema o señal:
          </p>
          <MathBlock>
            u(t) = &#123; 0 , si t &lt; 0 &#125;&nbsp;&nbsp;&nbsp;u(t) = &#123; 1 , si t ≥ 0 &#125;
          </MathBlock>
          <p className="text-slate-600 text-sm mb-3">Su transformada de Laplace es:</p>
          <MathBlock>
            ℒ&#123;u(t)&#125; = 1/s , Re(s) &#62; 0
          </MathBlock>
          <p className="text-slate-600 text-sm font-semibold mb-2">Variantes y combinaciones:</p>
          <div className="space-y-2 mb-3">
            {[
              { formula: 'u(t − a)', meaning: 'Escalón retardado: se activa en t = a', transform: 'e^(−as)/s' },
              { formula: 'u(t) − u(t − a)', meaning: 'Pulso rectangular de duración a', transform: '(1 − e^(−as))/s' },
              { formula: 'f(t)·u(t)', meaning: 'Función causal: activa f(t) solo para t ≥ 0', transform: 'F(s)' },
            ].map(v => (
              <div key={v.formula} className="bg-orange-50 rounded-xl p-3 border border-orange-100">
                <div className="flex justify-between items-start">
                  <span className="math-inline text-orange-800 font-medium text-sm">{v.formula}</span>
                  <span className="math-inline text-indigo-700 text-xs bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">{v.transform}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{v.meaning}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-sm font-semibold mb-1">Aplicaciones en ingeniería:</p>
          <ul className="text-xs text-slate-500 space-y-1 list-none">
            {[
              'Modelar la entrada de paquetes a un servidor (tráfico que inicia en t=0)',
              'Representar la activación de fuentes de voltaje/corriente en circuitos',
              'Modelar cargas que se aplican abruptamente en estructuras',
              'Describir señales de control en sistemas realimentados',
            ].map(a => (
              <li key={a} className="flex gap-2 items-start">
                <span className="text-orange-400 shrink-0 mt-0.5">•</span>
                {a}
              </li>
            ))}
          </ul>
        </Accordion>
      </div>
    </section>
  )
}
