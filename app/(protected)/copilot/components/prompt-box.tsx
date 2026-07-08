'use client';

import { SendHorizontal, Sparkles, Loader2 } from "lucide-react";
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
    <div className="relative rounded-3xl border bg-background/50 backdrop-blur-xl p-2 shadow-xl border-border/50">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">
          <Sparkles className="w-4 h-4" />
        </div>
        <h2 className="font-semibold text-lg">
          Insurance Assistant
        </h2>
      </div>

      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="How can I help you with your brokerage tasks today?"
        className="min-h-[160px] resize-none border-none bg-transparent text-lg focus-visible:ring-0 px-4"
      />

      <div className="flex justify-between items-center px-4 py-3">
        <p className="text-sm text-muted-foreground/70">
          BrokerOS AI helps with summaries, claims, and customer communication.
        </p>

        <Button
          onClick={askAI}
          disabled={loading || !prompt.trim()}
          className="rounded-full px-6 shadow-md transition-all hover:shadow-lg"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Generate
              <SendHorizontal className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}