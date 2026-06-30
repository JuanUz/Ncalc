import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Modelado de Servidor — Transformada de Laplace',
  description: 'Caso de estudio universitario: Modelado del comportamiento de un servidor de aplicaciones usando la Transformada de Laplace.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  )
}
