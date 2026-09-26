export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Mi Web
      </h1>
      <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-8">
        Creado con Next.js, 10 agentes en paralelo y mucho café.
      </p>
      <a
        href="#"
        className="inline-block px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-slate-200 transition-colors shadow-xl shadow-blue-500/20"
      >
        Ver Demo
      </a>
      <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition">
          <h3 className="text-xl font-bold mb-2">Hero</h3>
          <p className="text-slate-400">Animaciones con Framer Motion</p>
        </div>
        <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition">
          <h3 className="text-xl font-bold mb-2">Features</h3>
          <p className="text-slate-400">Tarjetas interactivas</p>
        </div>
        <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition">
          <h3 className="text-xl font-bold mb-2">Code</h3>
          <p className="text-slate-400">Syntax highlighting</p>
        </div>
      </div>
      <footer className="mt-20 text-slate-500 text-sm">
        © 2026 — Hecho con 10 agentes en paralelo
      </footer>
    </main>
  );
}
