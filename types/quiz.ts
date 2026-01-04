export type QuizResponse = {
  // Bloco A - Identidade do Verão
  notaGeral?: number; // 0-10
  tipoPredominante?: "praia" | "role" | "viagem" | "paz" | "romance" | "ativo";
  mood?: "leve" | "intenso" | "caotico" | "nostalgico" | "feliz" | "confuso";
  intensidade?: "pouco" | "ok" | "bem" | "intensamente";

  // Bloco B - Lugares & Rolês
  ondeCurtiu?: string[]; // praias, barzinhos, clubes, shows, trilhas, casa_amigos
  topLugar?: string;
  frequenciaSaidas?: "0-1" | "2-3" | "4-5" | "todo-dia";
  periodo?: "dia" | "noite" | "equilibrado";

  // Bloco C - Viagens
  viajou?: boolean;
  quantidadeDestinos?: "0" | "1" | "2-3" | "varios";
  principaisDestinos?: string;
  tipoViagem?: "bate-volta" | "fim-semana" | "ferias";
  mesMaisViajado?: "dez" | "jan" | "fev" | "mar";

  // Bloco D - Social & Romance
  status?: "solteiro" | "ficando" | "namorando" | "complicado";
  numeroDates?: "0" | "1-2" | "3-5" | "6-10" | "10+";
  historiaMarcante?: boolean;
  historiaMarcanteTexto?: string;

  // Bloco E - Momentos Marcantes
  top3Dias?: string[]; // Datas em formato ISO
  trilhaSonora?: string[]; // 3 músicas
  fotos?: string[]; // URLs das fotos

  // Bloco F - Estilo de Vida
  estilo?: "saudavel" | "equilibrado" | "caos-controlado" | "caos-assumido";
  gastoRole?: "baixo" | "medio" | "alto" | "nem-quero-saber";
};

export type QuizResult = {
  score: number;
  archetype: string;
  badges: string[];
  aiSummary?: string;
  aiAdvice?: string;
  aiCaption?: string;
  reportName?: string;
};

export type QuestionBlock = {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
};

export type Question = {
  id: string;
  type: "slider" | "radio" | "checkbox" | "text" | "date" | "file";
  label: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  multiple?: boolean;
  conditional?: {
    field: string;
    value: any;
  };
};

