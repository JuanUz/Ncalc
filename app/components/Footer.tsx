import { Activity } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/60 bg-white/30 backdrop-blur-sm py-10 mt-16">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
            <Activity size={14} className="text-white" />
          </div>
          <span className="text-sm font-bold text-slate-700">Laplace & Servidores</span>
        </div>
        <p className="text-xs text-slate-500 mb-1">
          Caso de Estudio Universitario · Opción E — Control de tráfico de paquetes
        </p>
        <p className="text-xs text-slate-400">
          Construido con Next.js 14 · Tailwind CSS · Recharts · LM Studio
        </p>
        <div className="mt-6 flex justify-center gap-6 text-xs text-slate-400">
          <span>dQ/dt + μQ = λu(t)</span>
          <span>·</span>
          <span>Q(t) = (λ/μ)(1 − e^(−μt))</span>
          <span>·</span>
          <span>Q(∞) = λ/μ = 4</span>
        </div>
      </div>
    </footer>
  )
}
