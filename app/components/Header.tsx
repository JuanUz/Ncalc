'use client'
import { useState } from 'react'
import { Menu, X, Activity } from 'lucide-react'

const NAV = [
  { label: 'Teoría', href: '#teoria' },
  { label: 'Caso de Estudio', href: '#caso' },
  { label: 'Gráfica', href: '#grafica' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-xl border-b border-white/80 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-200">
            <Activity size={16} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-slate-800 leading-none">Laplace & Servidores</p>
            <p className="text-[10px] text-slate-500 leading-none mt-0.5">Caso de Estudio Universitario</p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-1">
          {NAV.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-600 hover:text-indigo-600 font-medium px-4 py-2 rounded-xl hover:bg-indigo-50 transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Badge */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 font-semibold px-3 py-1.5 rounded-full border border-indigo-200">
            Opción E — Ingeniería
          </span>
        </div>

        {/* Mobile menu btn */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/90 backdrop-blur-xl px-4 py-3 space-y-1 animate-fade-in">
          {NAV.map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-slate-600 hover:text-indigo-600 font-medium px-4 py-2.5 rounded-xl hover:bg-indigo-50 transition-all"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
