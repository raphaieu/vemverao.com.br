import { QuizResponse } from "@/types/quiz";

export function getBadges(responses: QuizResponse): string[] {
  const badges: string[] = [];

  // 🌊 Pé na Areia
  if (
    responses.ondeCurtiu?.includes("praias") &&
    (responses.ondeCurtiu?.length || 0) >= 2
  ) {
    badges.push("🌊 Pé na Areia");
  }

  // 🍻 Rolêzeiro Profissional
  if (
    responses.frequenciaSaidas === "4-5" ||
    responses.frequenciaSaidas === "todo-dia"
  ) {
    badges.push("🍻 Rolêzeiro Profissional");
  }

  // ✈️ Turista Premium
  if (
    (responses.viajou === true || responses.viajou === "true") &&
    (responses.quantidadeDestinos === "2-3" ||
      responses.quantidadeDestinos === "varios")
  ) {
    badges.push("✈️ Turista Premium");
  }

  // 💘 Coração em Alta
  if (
    (responses.historiaMarcante === true || responses.historiaMarcante === "true") &&
    (responses.numeroDates === "3-5" ||
      responses.numeroDates === "6-10" ||
      responses.numeroDates === "10+")
  ) {
    badges.push("💘 Coração em Alta");
  }

  // 🧘 Verão Zen
  if (
    responses.tipoPredominante === "paz" &&
    responses.estilo === "saudavel"
  ) {
    badges.push("🧘 Verão Zen");
  }

  // 🎵 Trilha Sonora
  if (responses.trilhaSonora && responses.trilhaSonora.length >= 3) {
    badges.push("🎵 Trilha Sonora");
  }

  // 📸 Memórias
  if (responses.fotos && responses.fotos.length > 0) {
    badges.push("📸 Memórias");
  }

  // 🏃 Ativo Total
  if (responses.tipoPredominante === "ativo") {
    badges.push("🏃 Ativo Total");
  }

  // 🎉 Noite Sem Fim
  if (responses.periodo === "noite" && responses.frequenciaSaidas !== "0-1") {
    badges.push("🎉 Noite Sem Fim");
  }

  return badges;
}

