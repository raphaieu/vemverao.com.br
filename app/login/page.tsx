"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDevLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/dev-login", {
        method: "POST",
        redirect: "follow",
      });

      if (response.ok || response.redirected) {
        // O servidor já redireciona, então apenas seguimos
        if (response.redirected) {
          window.location.href = response.url;
        } else {
          window.location.href = "/quiz";
        }
      } else {
        const error = await response.json();
        console.error("Erro ao fazer login de desenvolvimento:", error);
        alert("Erro ao fazer login. Verifique o console.");
      }
    } catch (error) {
      console.error("Erro ao fazer login de desenvolvimento:", error);
      alert("Erro ao fazer login. Verifique o console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-summer-yellow via-summer-orange to-summer-blue">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-summer-orange mb-2">
            🌊 Vem Verão
          </h1>
          <p className="text-gray-600">
            Faça login para começar seu quiz do verão
          </p>
        </div>

        <div className="space-y-4">
          {/* Botão de Desenvolvimento - sempre aparece, mas só funciona em dev */}
          <button
            onClick={handleDevLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-purple-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-purple-700 transition-all disabled:opacity-50"
          >
            {loading ? (
              "Carregando..."
            ) : (
              <>
                <span>🔧</span>
                Entrar como Desenvolvedor (Bypass)
              </>
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Ou use OAuth
              </span>
            </div>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/quiz" })}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 rounded-lg px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar com Google
          </button>

          <button
            onClick={() => signIn("facebook", { callbackUrl: "/quiz" })}
            className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white rounded-lg px-6 py-3 font-semibold hover:bg-[#166FE5] transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Continuar com Facebook
          </button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            Ao continuar, você concorda com nossos{" "}
            <Link href="/terms" className="text-summer-orange hover:underline">
              Termos de Uso
            </Link>{" "}
            e{" "}
            <Link
              href="/privacy"
              className="text-summer-orange hover:underline"
            >
              Política de Privacidade
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-summer-orange hover:underline text-sm"
          >
            ← Voltar
          </Link>
        </div>
      </div>
    </main>
  );
}

