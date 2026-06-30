import { ArrowDown, BookOpen, Server, Cpu } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative py-20 px-4 text-center overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-100/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Tag */}
        <span className="inline-flex items-center gap-1.5 bg-white/80 text-indigo-600 border border-indigo-200 text-xs font-semibold px-4 py-2 rounded-full mb-6 shadow-sm animate-fade-in">
          <Cpu size={12} />
          Caso de Estudio — Ingeniería de Sistemas
        </span>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4 animate-slide-up">
          Modelado de un{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 bg-clip-text text-transparent">
            Servidor de Aplicaciones
          </span>
        </h1>
        <p className="text-lg text-slate-600 mb-2 animate-slide-up">
          con la Transformada de Laplace
        </p>

        {/* Math formula highlight */}
        <div className="inline-block bg-white/80 backdrop-blur border border-indigo-100 rounded-2xl px-6 py-4 my-6 shadow-sm animate-fade-in">
          <p className="math-block text-slate-700 text-base">
            dQ/dt + 2Q(t) = 8·u(t)&nbsp;&nbsp;⟹&nbsp;&nbsp;Q(t) = 4·(1 − e^(−2t))
          </p>
        </div>

        {/* Description */}
        <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed mb-8 animate-fade-in">
          Aplicación interactiva que modela el control del tráfico de paquetes en un servidor de comunicaciones, resolviendo la ecuación diferencial del sistema mediante la Transformada de Laplace.
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap animate-slide-up">
          {[
            { icon: <BookOpen size={14} />, label: '6 conceptos teóricos', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
            { icon: <Server size={14} />, label: 'Modelo Q(t) real', color: 'bg-violet-50 text-violet-700 border-violet-200' },
            { icon: <Cpu size={14} />, label: 'IA integrada (LM Studio)', color: 'bg-pink-50 text-pink-700 border-pink-200' },
          ].map(s => (
            <span key={s.label} className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full border ${s.color}`}>
              {s.icon}{s.label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#teoria"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold px-6 py-3.5 rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:scale-105 transition-all duration-200 text-sm"
        >
          Explorar el caso
          <ArrowDown size={15} />
        </a>
      </div>
    </section>
  )
}
