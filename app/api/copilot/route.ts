import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const stream = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      stream: true,
      messages: [
        {
          role: "system",
          content: `
You are BrokerOS AI.

You are an AI assistant built for insurance brokers.

You help with:

- Policy summaries
- Claims analysis
- Renewal reminders
- Customer communication
- Coverage explanations
- Cross-selling recommendations
- Risk analysis

Always answer professionally and clearly.
          `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content;

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
    console.error(error);

    return new Response("Something went wrong.", {
      status: 500,
    });
  }
}