'use client';

import { useState } from "react";

import { Container } from "@/components/common/container";

import { AIHeader } from "./components/ai-header";
import { PromptBox } from "./components/prompt-box";
import { QuickActions } from "./components/quick-actions";
import { ResponseCard } from "./components/response-card";
import { RecentConversations } from "./components/recent-conversations";
import { SuggestedTasks } from "./components/suggested-tasks";



export default function CopilotPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
  if (!prompt.trim()) return;

  try {
    setLoading(true);
    setResponse("");

    const res = await fetch("/api/copilot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    const data = await res.json();

    setResponse(data.response || "No response received.");
  } catch (err) {
    console.error(err);

    setResponse("Something went wrong while talking to AI.");
  } finally {
    setLoading(false);
  }
};

  return (
    <Container>
      <div className="py-8 space-y-6">

        <AIHeader />

        <PromptBox
          prompt={prompt}
          setPrompt={setPrompt}
          loading={loading}
          askAI={askAI}
        />
        <ResponseCard
    response={response}
    loading={loading}
    onRegenerate={askAI}
/>

        <QuickActions
    setPrompt={setPrompt}
/>

<div className="grid gap-6 lg:grid-cols-3">

    <div className="space-y-6">

        <SuggestedTasks />

        <RecentConversations />

    </div>

    <div className="lg:col-span-2">

        

    </div>

</div>

        

      </div>
    </Container>
  );
}