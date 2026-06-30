# Transformada de Laplace — Modelado de Servidor de Comunicaciones

Caso de estudio universitario interactivo construido con **Next.js 14**, **React**, **Tailwind CSS** y **Recharts**.

## ✨ Características

- 📚 **Teoría completa** con acordeones interactivos sobre Transformada de Laplace
- 📐 **Caso de estudio resuelto** paso a paso: `dQ/dt + 2Q = 8u(t)` → `Q(t) = 4(1 − e⁻²ᵗ)`
- 📊 **Gráfica interactiva** con Recharts mostrando la evolución de la cola de paquetes
- 🤖 **Asistente IA** conectado a LM Studio vía Ngrok (proxy Next.js para evitar CORS)
- 🎨 **Diseño pastel animado** con glassmorphism, totalmente responsivo

---

## 🚀 Despliegue en Vercel (paso a paso)

### Opción A — Despliegue desde GitHub (recomendado)

1. **Crea un repositorio en GitHub** y sube este proyecto:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/laplace-server.git
   git push -u origin main
   ```

2. **Abre [vercel.com](https://vercel.com)** e inicia sesión con tu cuenta de GitHub.

3. Haz clic en **"Add New → Project"** e importa el repositorio.

4. En la configuración del proyecto, verifica:
   - **Framework Preset**: Next.js (se detecta automáticamente)
   - **Build Command**: `npm run build` (por defecto)
   - **Output Directory**: `.next` (por defecto)
   - **Node.js Version**: 18.x o 20.x

5. Haz clic en **"Deploy"** — ¡listo! Vercel genera una URL pública en ~60 segundos.

### Opción B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## 💻 Desarrollo local

```bash
npm install
npm run dev
# Abre http://localhost:3000
```

---

## 🤖 Conectar el Asistente IA (LM Studio + Ngrok)

1. Abre **LM Studio** y carga cualquier modelo (ej. Llama 3, Mistral, Phi-3).
2. Ve a la pestaña **"Local Server"** y actívalo (por defecto en `http://localhost:1234`).
3. Instala Ngrok: [ngrok.com/download](https://ngrok.com/download)
4. Ejecuta en terminal:
   ```bash
   ngrok http 1234
   ```
5. Copia la URL que aparece: `https://xxxx.ngrok-free.app`
6. En la aplicación, haz clic en el botón **🤖** (esquina inferior derecha).
7. Haz clic en ⚙️ e ingresa la URL de Ngrok y el nombre del modelo.
8. ¡Chatea con el asistente experto en Laplace!

> **Nota**: El proxy en `app/api/chat/route.ts` evita problemas de CORS haciendo las llamadas server-side.

---

## 📁 Estructura del proyecto

```
laplace-server/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Proxy API → LM Studio vía Ngrok
│   ├── globals.css               # Estilos globales + animaciones
│   ├── layout.tsx                # Layout raíz con metadata
│   └── page.tsx                  # Página principal
├── components/
│   ├── Header.tsx                # Navbar sticky con glassmorphism
│   ├── Hero.tsx                  # Sección hero con ecuación
│   ├── TheorySection.tsx         # Acordeones de teoría (6 conceptos)
│   ├── CaseStudySection.tsx      # Modelo, pasos, gráfica, tabla
│   ├── AIChat.tsx                # Chat flotante + panel de config
│   └── Footer.tsx                # Pie de página
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── package.json
```

---

## 🧮 Modelo Matemático

| Parámetro | Valor | Descripción |
|-----------|-------|-------------|
| λ | 8 paq/s | Tasa de llegada de paquetes |
| μ | 2 s⁻¹ | Tasa de procesamiento |
| Q(∞) | 4 paquetes | Estado estacionario |
| τ | 0.5 s | Constante de tiempo |

**Ecuación diferencial:**
```
dQ/dt + 2·Q(t) = 8·u(t),   Q(0) = 0
```

**Solución:**
```
Q(t) = 4(1 − e^(−2t)) · u(t)
```
