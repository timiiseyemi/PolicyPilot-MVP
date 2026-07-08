import { Sparkles, Copy, RefreshCcw, Check, BrainCircuit } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ResponseCardProps {
  response: string;
  loading: boolean;
  onRegenerate: () => void;
}

export function ResponseCard({
  response,
  loading,
  onRegenerate,
}: ResponseCardProps) {
  const [copied, setCopied] = useState(false);

  const copyResponse = async () => {
    if (!response) return;
    await navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border bg-background/50 backdrop-blur-xl shadow-lg border-border/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-9 rounded-full bg-primary/10 text-primary">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-lg">AI Response</h3>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={copyResponse} className="rounded-full">
            {copied ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button size="sm" variant="ghost" onClick={onRegenerate} className="rounded-full">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
        </div>
      </div>

      <div className="relative rounded-2xl bg-background/30 p-6 min-h-[300px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
            <Sparkles className="w-8 h-8 animate-pulse text-primary" />
            <p className="animate-pulse">BrokerOS AI is thinking...</p>
          </div>
        ) : response ? (
          <div className="prose prose-invert max-w-none leading-7 text-foreground/90 whitespace-pre-wrap">
            {response}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Your generated response will appear here.
          </div>
        )}
      </div>
    </div>
  );
}