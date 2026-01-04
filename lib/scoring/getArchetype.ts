import { QuizResponse } from "@/types/quiz";

export function getArchetype(responses: QuizResponse): string {
  const scores: Record<string, number> = {
    "Veranista Raiz": 0,
    "Praieiro Zen": 0,
    "Turista Premium": 0,
    "Noite Sem Fim": 0,
    "Romance de Verão": 0,
    "Caos Organizado": 0,
    "Explorador Urbano": 0,
    "Sossego & Sol": 0,
  };

  // Veranista Raiz - equilíbrio geral
  if (responses.tipoPredominante === "praia" && responses.intensidade === "bem") {
    scores["Veranista Raiz"] += 3;
  }
  if (responses.ondeCurtiu?.includes("praias")) {
    scores["Veranista Raiz"] += 2;
  }

  // Praieiro Zen - praia + paz
  if (responses.tipoPredominante === "praia" && responses.tipoPredominante === "paz") {
    scores["Praieiro Zen"] += 5;
  }
  if (responses.estilo === "saudavel") {
    scores["Praieiro Zen"] += 2;
  }

  // Turista Premium - muitas viagens
  if (responses.viajou && responses.quantidadeDestinos === "varios") {
    scores["Turista Premium"] += 5;
  }
  if (responses.tipoViagem === "ferias") {
    scores["Turista Premium"] += 3;
  }

  // Noite Sem Fim - noite + rolês frequentes
  if (responses.periodo === "noite" && responses.frequenciaSaidas === "todo-dia") {
    scores["Noite Sem Fim"] += 5;
  }
  if (responses.ondeCurtiu?.includes("clubes") || responses.ondeCurtiu?.includes("barzinhos")) {
    scores["Noite Sem Fim"] += 3;
  }

  // Romance de Verão - dates + história
  if (responses.historiaMarcante && responses.numeroDates !== "0") {
    scores["Romance de Verão"] += 5;
  }
  if (responses.status === "namorando" || responses.status === "ficando") {
    scores["Romance de Verão"] += 3;
  }

  // Caos Organizado - caótico mas controlado
  if (responses.mood === "caotico" && responses.estilo === "caos-controlado") {
    scores["Caos Organizado"] += 5;
  }
  if (responses.intensidade === "intensamente") {
    scores["Caos Organizado"] += 2;
  }

  // Explorador Urbano - variedade de lugares
  if ((responses.ondeCurtiu?.length || 0) >= 4) {
    scores["Explorador Urbano"] += 4;
  }
  if (responses.ondeCurtiu?.includes("trilhas") || responses.ondeCurtiu?.includes("shows")) {
    scores["Explorador Urbano"] += 3;
  }

  // Sossego & Sol - paz + pouco movimento
  if (responses.tipoPredominante === "paz" && responses.frequenciaSaidas === "0-1") {
    scores["Sossego & Sol"] += 5;
  }
  if (responses.estilo === "saudavel" || responses.estilo === "equilibrado") {
    scores["Sossego & Sol"] += 2;
  }

  // Encontrar o arquétipo com maior score
  let maxScore = 0;
  let archetype = "Veranista Raiz";

  for (const [key, value] of Object.entries(scores)) {
    if (value > maxScore) {
      maxScore = value;
      archetype = key;
    }
  }

  // Se nenhum score foi alto, usar lógica de fallback
  if (maxScore === 0) {
    if (responses.tipoPredominante === "praia") {
      archetype = "Veranista Raiz";
    } else     if (responses.viajou === true || responses.viajou === "true") {
      archetype = "Turista Premium";
    } else if (responses.periodo === "noite") {
      archetype = "Noite Sem Fim";
    } else {
      archetype = "Sossego & Sol";
    }
  }

  return archetype;
}

