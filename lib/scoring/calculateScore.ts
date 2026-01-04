import { QuizResponse } from "@/types/quiz";

export function calculateScore(responses: QuizResponse): number {
  let score = 0;

  // Intensidade (rolês + saídas): 30%
  const intensidadeScore = calculateIntensidadeScore(responses);
  score += intensidadeScore * 0.3;

  // Variedade (lugares + viagens): 25%
  const variedadeScore = calculateVariedadeScore(responses);
  score += variedadeScore * 0.25;

  // Social/romance: 20%
  const socialScore = calculateSocialScore(responses);
  score += socialScore * 0.2;

  // Satisfação (nota + mood): 25%
  const satisfacaoScore = calculateSatisfacaoScore(responses);
  score += satisfacaoScore * 0.25;

  return Math.round(Math.min(100, Math.max(0, score)));
}

function calculateIntensidadeScore(responses: QuizResponse): number {
  let score = 0;

  // Frequência de saídas (0-40 pontos)
  const frequenciaMap: Record<string, number> = {
    "0-1": 10,
    "2-3": 25,
    "4-5": 35,
    "todo-dia": 40,
  };
  score += frequenciaMap[responses.frequenciaSaidas || "0-1"] || 0;

  // Intensidade geral (0-30 pontos)
  const intensidadeMap: Record<string, number> = {
    pouco: 5,
    ok: 15,
    bem: 25,
    intensamente: 30,
  };
  score += intensidadeMap[responses.intensidade || "pouco"] || 0;

  // Período (0-30 pontos)
  const periodoMap: Record<string, number> = {
    dia: 10,
    noite: 20,
    equilibrado: 30,
  };
  score += periodoMap[responses.periodo || "dia"] || 0;

  return Math.min(100, score);
}

function calculateVariedadeScore(responses: QuizResponse): number {
  let score = 0;

  // Lugares visitados (0-40 pontos)
  const lugaresCount = responses.ondeCurtiu?.length || 0;
  score += Math.min(40, lugaresCount * 8);

  // Viagens (0-40 pontos)
  if (responses.viajou === true || responses.viajou === "true") {
    const viagensMap: Record<string, number> = {
      "0": 0,
      "1": 15,
      "2-3": 30,
      varios: 40,
    };
    score += viagensMap[responses.quantidadeDestinos || "0"] || 0;
  }

  // Top lugar preenchido (0-20 pontos)
  if (responses.topLugar && responses.topLugar.trim()) {
    score += 20;
  }

  return Math.min(100, score);
}

function calculateSocialScore(responses: QuizResponse): number {
  let score = 0;

  // Número de dates (0-50 pontos)
  const datesMap: Record<string, number> = {
    "0": 0,
    "1-2": 15,
    "3-5": 30,
    "6-10": 45,
    "10+": 50,
  };
  score += datesMap[responses.numeroDates || "0"] || 0;

  // História marcante (0-30 pontos)
  if (responses.historiaMarcante === true || responses.historiaMarcante === "true") {
    score += 30;
  }

  // Status (0-20 pontos)
  const statusMap: Record<string, number> = {
    solteiro: 5,
    ficando: 15,
    namorando: 20,
    complicado: 10,
  };
  score += statusMap[responses.status || "solteiro"] || 0;

  return Math.min(100, score);
}

function calculateSatisfacaoScore(responses: QuizResponse): number {
  let score = 0;

  // Nota geral (0-50 pontos)
  const nota = responses.notaGeral || 0;
  score += (nota / 10) * 50;

  // Mood (0-30 pontos)
  const moodMap: Record<string, number> = {
    leve: 10,
    intenso: 25,
    caotico: 15,
    nostalgico: 20,
    feliz: 30,
    confuso: 5,
  };
  score += moodMap[responses.mood || "leve"] || 0;

  // Estilo de vida (0-20 pontos)
  const estiloMap: Record<string, number> = {
    saudavel: 20,
    equilibrado: 15,
    "caos-controlado": 10,
    "caos-assumido": 5,
  };
  score += estiloMap[responses.estilo || "equilibrado"] || 0;

  return Math.min(100, score);
}

