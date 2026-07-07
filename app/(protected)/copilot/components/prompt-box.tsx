'use client';

import { SendHorizonal, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface PromptBoxProps {
  prompt: string;
  setPrompt: (value: string) => void;
  loading: boolean;
  askAI: () => void;
}

export function PromptBox({
  prompt,
  setPrompt,
  loading,
  askAI,
}: PromptBoxProps) {

  

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">

      <div className="flex items-center gap-2 mb-4">

        <Sparkles className="w-5 h-5 text-primary" />

        <h2 className="font-semibold text-lg">
          Ask AI Copilot
        </h2>

      </div>

      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Example: Draft a renewal reminder for John Doe's motor insurance policy..."
        className="min-h-[140px] resize-none"
      />

      <div className="flex justify-between items-center mt-5">

        <p className="text-sm text-muted-foreground">
          AI can summarize policies, generate emails,
          explain coverage, recommend products and answer
          insurance questions.
        </p>

        <Button
          onClick={askAI}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Thinking...
            </>
          ) : (
            <>
              <SendHorizonal className="w-4 h-4 mr-2" />
              Ask AI
            </>
          )}
        </Button>

      </div>

    </div>
  );
}