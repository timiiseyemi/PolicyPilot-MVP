import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return new Response(
        "OPENROUTER_API_KEY is not configured.",
        {
          status: 500,
        }
      );
    }

    const client = new OpenAI({
      apiKey,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const { prompt } = await req.json();

    const stream = await client.chat.completions.create(
      {
        model: "moonshotai/kimi-k2:free",

        stream: true,

        messages: [
          {
            role: "system",
            content: `
You are BrokerOS AI.

You are an AI assistant built specifically for insurance brokers.

You help with:

- Policy summaries
- Claims analysis
- Renewal reminders
- Customer communication
- Coverage explanations
- Cross-selling recommendations
- Risk analysis

Always answer professionally, accurately and clearly.
`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "HTTP-Referer":
            process.env.NEXT_PUBLIC_APP_URL ??
            "https://localhost:3000",

          "X-Title": "BrokerOS AI",
        },
      }
    );

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text =
              chunk.choices[0]?.delta?.content;

            if (text) {
              controller.enqueue(
                encoder.encode(text)
              );
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
        "Content-Type":
          "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error(error);

    return new Response(
      "Something went wrong.",
      {
        status: 500,
      }
    );
  }
}