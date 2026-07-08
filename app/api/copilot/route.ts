import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are BrokerOS AI, an intelligent insurance brokerage assistant.

You help insurance brokers with:

• Policy summaries
• Coverage explanations
• Claims analysis
• Renewal reminders
• Customer communication
• Cross-selling opportunities
• Risk analysis
• Insurance best practices

Always answer professionally.

Never hallucinate insurance facts.

If information is missing, explain what additional information is required.
`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response("GEMINI_API_KEY is not configured.", {
        status: 500,
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const { prompt, context } = await req.json();

    const fullPrompt = context
      ? `Context: ${JSON.stringify(context)}\n\nUser Question: ${prompt}`
      : prompt;

    const result = await model.generateContentStream({
      contents: [
        { role: "user", parts: [{ text: `${SYSTEM_PROMPT}\n\n${fullPrompt}` }] },
      ],
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return new Response("Something went wrong with the AI service.", {
      status: 500,
    });
  }
}
