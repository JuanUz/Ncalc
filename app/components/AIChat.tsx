'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Settings, Send, Bot, User, AlertCircle, Loader2, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SYSTEM_PROMPT = `Eres un asistente experto en matemáticas, ingeniería de software y procesamiento de señales, especializado en la Transformada de Laplace y su aplicación al modelado de sistemas.

El caso de estudio actual es: "Modelado del comportamiento de un servidor de comunicaciones usando la Transformada de Laplace". El modelo es dQ/dt + 2Q = 8u(t), con solución Q(t) = 4(1 − e^(−2t)).

Responde en español, de manera clara y pedagógica. Usa notación matemática cuando sea necesario. Si el usuario pregunta sobre la teoría o el código, sé específico y detallado.`

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [configOpen, setConfigOpen] = useState(false)
  const [ngrokUrl, setNgrokUrl] = useState('')
  const [modelName, setModelName] = useState('local-model')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [configured, setConfigured] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  function saveConfig() {
    if (!ngrokUrl.trim()) { setError('Ingresa la URL de Ngrok'); return }
    setConfigured(true)
    setConfigOpen(false)
    setError('')
    setMessages([{
      role: 'assistant',
      content: `¡Conexión configurada! Estoy listo para ayudarte con el caso de estudio sobre la Transformada de Laplace. ¿Tienes alguna pregunta sobre la teoría, el modelo matemático dQ/dt + 2Q = 8u(t), o los resultados Q(t) = 4(1 − e^(−2t))?`
    }])
  }

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ngrokUrl,
          model: modelName,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newMessages.map(m => ({ role: m.role, content: m.content })),
          ],
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error del servidor')
      const assistantContent =
        data.choices?.[0]?.message?.content || 'No se recibió respuesta.'
      setMessages(prev => [...prev, { role: 'assistant', content: assistantContent }])
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error desconocido'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-4 py-3 rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:scale-105 transition-all duration-200 ${open ? 'hidden' : ''}`}
      >
        <Sparkles size={16} />
        <span className="text-sm font-semibold">Asistente IA</span>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[370px] max-w-[calc(100vw-24px)] h-[560px] max-h-[calc(100vh-48px)] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-violet-500 p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Asistente Laplace</p>
                <p className="text-white/70 text-xs">{configured ? `● ${modelName}` : '● No configurado'}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setConfigOpen(true)} className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <Settings size={14} className="text-white" />
              </button>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <X size={14} className="text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll p-4 space-y-3">
            {messages.length === 0 && !configured && (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 gap-3">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <MessageCircle size={24} className="text-indigo-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600">Conecta tu IA local</p>
                  <p className="text-xs text-slate-400 mt-1">Configura tu URL de Ngrok (LM Studio) para comenzar.</p>
                </div>
                <button
                  onClick={() => setConfigOpen(true)}
                  className="flex items-center gap-1.5 bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-indigo-600 transition-colors"
                >
                  <Settings size={12} />
                  Configurar
                </button>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-xl shrink-0 flex items-center justify-center ${msg.role === 'assistant' ? 'bg-indigo-100' : 'bg-violet-100'}`}>
                  {msg.role === 'assistant'
                    ? <Bot size={14} className="text-indigo-600" />
                    : <User size={14} className="text-violet-600" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  msg.role === 'assistant'
                    ? 'bg-slate-50 border border-slate-100 text-slate-700 rounded-tl-sm'
                    : 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white rounded-tr-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Bot size={14} className="text-indigo-600" />
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3">
                  <Loader2 size={14} className="text-indigo-400 animate-spin" />
                </div>
              </div>
            )}
            {error && (
              <div className="flex gap-2 items-start bg-red-50 border border-red-100 rounded-xl p-3">
                <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-100 shrink-0">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={configured ? 'Pregunta sobre Laplace...' : 'Configura la IA primero...'}
                disabled={!configured || loading}
                rows={1}
                className="flex-1 resize-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent disabled:opacity-50 transition-all"
              />
              <button
                onClick={sendMessage}
                disabled={!configured || !input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 shrink-0 self-end"
              >
                <Send size={14} />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5 text-center">Enter para enviar · Shift+Enter nueva línea</p>
          </div>
        </div>
      )}

      {/* Config modal */}
      {configOpen && (
        <div className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) setConfigOpen(false) }}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-slate-800">Configurar IA Local</h3>
                <p className="text-xs text-slate-500 mt-0.5">Conecta LM Studio a través de Ngrok</p>
              </div>
              <button onClick={() => setConfigOpen(false)} className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                <X size={14} className="text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">URL de Ngrok</label>
                <input
                  type="text"
                  value={ngrokUrl}
                  onChange={e => setNgrokUrl(e.target.value)}
                  placeholder="https://xxxx-xxxx.ngrok-free.app/v1"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                />
                <p className="text-xs text-slate-400 mt-1">El endpoint base de tu servidor LM Studio expuesto con Ngrok.</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre del modelo</label>
                <input
                  type="text"
                  value={modelName}
                  onChange={e => setModelName(e.target.value)}
                  placeholder="local-model"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                />
                <p className="text-xs text-slate-400 mt-1">Identificador del modelo en LM Studio (ej: lmstudio-community/Meta-Llama-3).</p>
              </div>

              {/* How-to guide */}
              <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
                <p className="text-xs font-semibold text-indigo-800 mb-2">¿Cómo configurar LM Studio + Ngrok?</p>
                <ol className="space-y-1 text-xs text-indigo-700">
                  <li>1. Abre LM Studio → Servidor local → Iniciar en puerto 1234.</li>
                  <li>2. Ejecuta: <code className="bg-indigo-100 px-1 rounded">ngrok http 1234</code></li>
                  <li>3. Copia la URL <code className="bg-indigo-100 px-1 rounded">https://xxxx.ngrok-free.app</code></li>
                  <li>4. Pégala aquí con <code className="bg-indigo-100 px-1 rounded">/v1</code> al final.</li>
                </ol>
              </div>

              {error && (
                <div className="flex gap-2 bg-red-50 border border-red-100 rounded-xl p-3">
                  <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              )}

              <button
                onClick={saveConfig}
                className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold text-sm py-3 rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-indigo-200"
              >
                Guardar y conectar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
