import { QuestionBlock } from "@/types/quiz";

export const quizBlocks: QuestionBlock[] = [
  {
    id: "identidade",
    title: "Identidade do Verão",
    description: "Como você definiria seu verão?",
    questions: [
      {
        id: "notaGeral",
        type: "slider",
        label: "Nota geral do seu verão (0-10)",
        required: true,
        min: 0,
        max: 10,
        step: 1,
      },
      {
        id: "tipoPredominante",
        type: "radio",
        label: "Seu verão foi mais:",
        required: true,
        options: [
          { value: "praia", label: "🌊 Praia" },
          { value: "role", label: "🍻 Rolê" },
          { value: "viagem", label: "✈️ Viagem" },
          { value: "paz", label: "🧘 Paz" },
          { value: "romance", label: "💘 Romance" },
          { value: "ativo", label: "🏃 Ativo" },
        ],
      },
      {
        id: "mood",
        type: "radio",
        label: "Mood predominante:",
        required: true,
        options: [
          { value: "leve", label: "Leve" },
          { value: "intenso", label: "Intenso" },
          { value: "caotico", label: "Caótico" },
          { value: "nostalgico", label: "Nostálgico" },
          { value: "feliz", label: "Feliz" },
          { value: "confuso", label: "Confuso" },
        ],
      },
      {
        id: "intensidade",
        type: "radio",
        label: "Você diria que viveu seu verão:",
        required: true,
        options: [
          { value: "pouco", label: "Pouco" },
          { value: "ok", label: "Ok" },
          { value: "bem", label: "Bem" },
          { value: "intensamente", label: "Intensamente" },
        ],
      },
    ],
  },
  {
    id: "lugares",
    title: "Lugares & Rolês",
    description: "Onde você mais curtiu?",
    questions: [
      {
        id: "ondeCurtiu",
        type: "checkbox",
        label: "Onde você mais curtiu? (marque até 5)",
        required: true,
        multiple: true,
        options: [
          { value: "praias", label: "Praias" },
          { value: "barzinhos", label: "Barzinhos" },
          { value: "clubes", label: "Clubes" },
          { value: "shows", label: "Shows" },
          { value: "trilhas", label: "Trilhas / Natureza" },
          { value: "casa_amigos", label: "Casa de amigos" },
        ],
      },
      {
        id: "topLugar",
        type: "text",
        label: "Top 1 lugar do verão",
        required: false,
      },
      {
        id: "frequenciaSaidas",
        type: "radio",
        label: "Quantas vezes saiu por semana?",
        required: true,
        options: [
          { value: "0-1", label: "0-1" },
          { value: "2-3", label: "2-3" },
          { value: "4-5", label: "4-5" },
          { value: "todo-dia", label: "Todo dia praticamente" },
        ],
      },
      {
        id: "periodo",
        type: "radio",
        label: "Seu rolê foi mais:",
        required: true,
        options: [
          { value: "dia", label: "Dia" },
          { value: "noite", label: "Noite" },
          { value: "equilibrado", label: "Equilibrado" },
        ],
      },
    ],
  },
  {
    id: "viagens",
    title: "Viagens",
    description: "Você viajou no verão?",
    questions: [
      {
        id: "viajou",
        type: "radio",
        label: "Viajou no verão?",
        required: true,
        options: [
          { value: "false", label: "Não" },
          { value: "true", label: "Sim" },
        ],
      },
      {
        id: "quantidadeDestinos",
        type: "radio",
        label: "Quantos destinos?",
        required: true,
        conditional: {
          field: "viajou",
          value: "true",
        },
        options: [
          { value: "0", label: "Não viajou" },
          { value: "1", label: "Sim, 1 destino" },
          { value: "2-3", label: "Sim, 2-3" },
          { value: "varios", label: "Sim, vários" },
        ],
      },
      {
        id: "principaisDestinos",
        type: "text",
        label: "Principais destinos",
        required: false,
        conditional: {
          field: "viajou",
          value: "true",
        },
      },
      {
        id: "tipoViagem",
        type: "radio",
        label: "Tipo de viagem:",
        required: false,
        conditional: {
          field: "viajou",
          value: "true",
        },
        options: [
          { value: "bate-volta", label: "Bate-volta" },
          { value: "fim-semana", label: "Fim de semana" },
          { value: "ferias", label: "Férias" },
        ],
      },
      {
        id: "mesMaisViajado",
        type: "radio",
        label: "Mês mais viajado:",
        required: false,
        conditional: {
          field: "viajou",
          value: "true",
        },
        options: [
          { value: "dez", label: "Dezembro" },
          { value: "jan", label: "Janeiro" },
          { value: "fev", label: "Fevereiro" },
          { value: "mar", label: "Março" },
        ],
      },
    ],
  },
  {
    id: "social",
    title: "Social & Romance",
    description: "Como foi sua vida social?",
    questions: [
      {
        id: "status",
        type: "radio",
        label: "Seu status no verão:",
        required: true,
        options: [
          { value: "solteiro", label: "Solteiro" },
          { value: "ficando", label: "Ficando" },
          { value: "namorando", label: "Namorando" },
          { value: "complicado", label: "É complicado" },
        ],
      },
      {
        id: "numeroDates",
        type: "radio",
        label: "Número de dates:",
        required: true,
        options: [
          { value: "0", label: "0" },
          { value: "1-2", label: "1-2" },
          { value: "3-5", label: "3-5" },
          { value: "6-10", label: "6-10" },
          { value: "10+", label: "10+" },
        ],
      },
      {
        id: "historiaMarcante",
        type: "radio",
        label: "Teve alguma história marcante?",
        required: true,
        options: [
          { value: "false", label: "Não" },
          { value: "true", label: "Sim" },
        ],
      },
      {
        id: "historiaMarcanteTexto",
        type: "text",
        label: "Conte em 1 frase (opcional):",
        required: false,
        conditional: {
          field: "historiaMarcante",
          value: "true",
        },
      },
    ],
  },
  {
    id: "momentos",
    title: "Momentos Marcantes",
    description: "Os melhores momentos do seu verão",
    questions: [
      {
        id: "top3Dias",
        type: "date",
        label: "Top 3 dias do verão (datas opcionais)",
        required: false,
        multiple: true,
      },
      {
        id: "trilhaSonora",
        type: "text",
        label: "Trilha sonora do verão (3 músicas)",
        required: false,
        multiple: true,
      },
      {
        id: "fotos",
        type: "file",
        label: "Suba até 5 fotos que resumem seu verão (opcional)",
        required: false,
        multiple: true,
      },
    ],
  },
  {
    id: "estilo",
    title: "Estilo de Vida",
    description: "Como foi seu estilo de vida?",
    questions: [
      {
        id: "estilo",
        type: "radio",
        label: "Seu verão foi mais:",
        required: true,
        options: [
          { value: "saudavel", label: "Saudável" },
          { value: "equilibrado", label: "Equilibrado" },
          { value: "caos-controlado", label: "Caos controlado" },
          { value: "caos-assumido", label: "Caos assumido" },
        ],
      },
      {
        id: "gastoRole",
        type: "radio",
        label: "Gasto com rolês foi:",
        required: true,
        options: [
          { value: "baixo", label: "Baixo" },
          { value: "medio", label: "Médio" },
          { value: "alto", label: "Alto" },
          { value: "nem-quero-saber", label: "Nem quero saber" },
        ],
      },
    ],
  },
];

