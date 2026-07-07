import { Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, RefreshCcw, Check } from "lucide-react";
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

    setTimeout(() => {
        setCopied(false);
    }, 2000);
};

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
    <Sparkles className="w-5 h-5 text-primary" />
    AI Response
</CardTitle>

<div className="flex gap-2">

    <Button
        size="sm"
        variant="outline"
        onClick={copyResponse}
    >
        {copied ? (
            <>
                <Check className="w-4 h-4 mr-2" />
                Copied
            </>
        ) : (
            <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
            </>
        )}
    </Button>

    <Button
        size="sm"
        variant="outline"
        onClick={onRegenerate}
    >
        <RefreshCcw className="w-4 h-4 mr-2" />

        Regenerate
    </Button>

</div>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border bg-primary/5 p-5 min-h-[250px]">
          {loading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-5/6" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          ) : response ? (
            <div className="whitespace-pre-wrap leading-7">
              {response}
            </div>
          ) : (
            <div className="text-muted-foreground">
              Ask AI anything about insurance, renewals,
              claims, customer communication or policies.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}