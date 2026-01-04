import OpenAI from "openai";
import { QuizResponse, QuizResult } from "@/types/quiz";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateTexts(
  responses: QuizResponse,
  result: QuizResult
): Promise<{
  summary: string;
  advice: string;
  caption: string;
  reportName: string;
}> {
  const prompt = buildPrompt(responses, result);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Você é um assistente criativo que gera textos divertidos e positivos sobre o verão das pessoas. Seja descontraído, use emojis quando apropriado e mantenha um tom leve e engraçado.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
    });

    const content = completion.choices[0]?.message?.content || "";
    return parseAIResponse(content);
  } catch (error) {
    console.error("Erro ao gerar textos com IA:", error);
    return getDefaultTexts(result);
  }
}

function buildPrompt(responses: QuizResponse, result: QuizResult): string {
  return `Com base nas seguintes informações sobre o verão de uma pessoa, gere textos personalizados:

RESPOSTAS DO QUIZ:
- Nota geral: ${responses.notaGeral || "N/A"}/10
- Tipo predominante: ${responses.tipoPredominante || "N/A"}
- Mood: ${responses.mood || "N/A"}
- Intensidade: ${responses.intensidade || "N/A"}
- Lugares visitados: ${responses.ondeCurtiu?.join(", ") || "Nenhum"}
- Top lugar: ${responses.topLugar || "N/A"}
- Frequência de saídas: ${responses.frequenciaSaidas || "N/A"}
- Viajou: ${responses.viajou ? "Sim" : "Não"}
- Destinos: ${responses.principaisDestinos || "N/A"}
- Status: ${responses.status || "N/A"}
- Dates: ${responses.numeroDates || "0"}
- História marcante: ${responses.historiaMarcante ? "Sim" : "Não"}
- Estilo: ${responses.estilo || "N/A"}

RESULTADO:
- Score: ${result.score}/100
- Arquétipo: ${result.archetype}
- Badges: ${result.badges.join(", ")}

Gere 4 textos separados por "---":

1. RESUMO (2-3 frases, tom divertido e positivo, estilo "zoeira")
2. CONSELHOS (3 bullets práticos para o próximo verão)
3. LEGENDA (1 frase curta e compartilhável para Instagram/TikTok, com hashtags)
4. NOME DO RELATÓRIO (formato: "O Verão de [Nome]: Edição '[Título Criativo]'")

Separe cada seção com "---"`;
}

function parseAIResponse(content: string): {
  summary: string;
  advice: string;
  caption: string;
  reportName: string;
} {
  const sections = content.split("---").map((s) => s.trim()).filter(Boolean);

  return {
    summary: sections[0] || "Seu verão foi incrível!",
    advice: sections[1] || "• Continue aproveitando\n• Se divirta\n• Crie memórias",
    caption: sections[2] || "#VemVerão #Verão2025",
    reportName: sections[3] || "O Verão: Edição Especial",
  };
}

function getDefaultTexts(result: QuizResult): {
  summary: string;
  advice: string;
  caption: string;
  reportName: string;
} {
  return {
    summary: `Seu verão foi ${result.score >= 70 ? "incrível" : result.score >= 50 ? "bom" : "tranquilo"}! Você é um ${result.archetype}.`,
    advice: "• Continue aproveitando a vida\n• Se divirta com responsabilidade\n• Crie memórias inesquecíveis",
    caption: `Meu verão em números! Score: ${result.score}/100 🏖️ #VemVerão #Verão2025`,
    reportName: `O Verão: Edição ${result.archetype}`,
  };
}

