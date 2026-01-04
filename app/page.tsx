import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-summer-yellow via-summer-orange to-summer-blue">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">
          🌊 Vem Verão
        </h1>
        <p className="text-2xl text-white/90 font-semibold">
          Descubra como foi seu verão em 3 minutos
        </p>
        <p className="text-lg text-white/80">
          Um quiz rápido e divertido que transforma suas memórias de verão em
          um resultado compartilhável, estilo Spotify Wrapped
        </p>
        <div className="pt-8">
          <Link
            href="/login"
            className="inline-block bg-white text-summer-orange px-8 py-4 rounded-full text-xl font-bold hover:bg-summer-light transition-all shadow-lg hover:scale-105"
          >
            Começar Quiz
          </Link>
        </div>
        <div className="pt-4 text-white/70 text-sm">
          <p>✨ Resultado personalizado</p>
          <p>📊 Dashboard com seus dados</p>
          <p>📸 Imagem compartilhável</p>
        </div>
      </div>
    </main>
  );
}

