import { Sparkles } from "lucide-react";

export function AIHeader() {
  return (
    <div className="rounded-2xl border bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">

      <div className="flex items-center gap-3 mb-3">

        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">

          <Sparkles className="w-6 h-6" />

        </div>

        <div>

          <h1 className="text-3xl font-bold">
            AI Copilot
          </h1>

          <p className="text-blue-100">
            Your intelligent insurance brokerage assistant.
          </p>

        </div>

      </div>

      <p className="max-w-3xl text-blue-100 leading-7">

        Generate policy summaries, draft renewal reminders,
        analyze customer portfolios, explain coverage,
        recommend cross-selling opportunities,
        and answer insurance questions instantly.

      </p>

    </div>
  );
}