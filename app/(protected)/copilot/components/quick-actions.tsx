'use client';

import {
  Mail,
  FileText,
  Shield,
  TrendingUp,
  Users,
  AlertTriangle,
  Zap,
} from "lucide-react";

const actions = [
  {
    title: "Draft Renewal Email",
    description: "Generate personalized renewal reminders.",
    icon: Mail,
    prompt: "Draft a professional renewal reminder email for a customer's insurance policy.",
  },
  {
    title: "Summarize Policy",
    description: "Explain any policy in simple language.",
    icon: FileText,
    prompt: "Summarize this insurance policy in simple language a customer can understand.",
  },
  {
    title: "Explain Coverage",
    description: "Help customers understand benefits & exclusions.",
    icon: Shield,
    prompt: "Explain the coverage, exclusions and benefits of this policy.",
  },
  {
    title: "Cross-sell Recommendation",
    description: "Recommend additional insurance products.",
    icon: TrendingUp,
    prompt: "Recommend additional insurance products this customer should consider.",
  },
  {
    title: "Analyze Portfolio",
    description: "Review a customer's policies and risks.",
    icon: Users,
    prompt: "Analyze this customer's insurance portfolio and identify risks.",
  },
  {
    title: "Generate Risk Report",
    description: "Create a comprehensive risk assessment.",
    icon: AlertTriangle,
    prompt: "Generate a detailed risk assessment report for this customer.",
  },
];

interface QuickActionsProps {
  setPrompt: (value: string) => void;
  askAI: (prompt: string) => void;
}

export function QuickActions({ setPrompt, askAI }: QuickActionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Zap className="w-4 h-4" />
        <h2 className="text-sm font-medium uppercase tracking-wider">Quick Actions</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.title}
              onClick={() => askAI(action.prompt)}
              className="flex flex-col gap-3 p-5 rounded-2xl border bg-background/50 backdrop-blur-md transition-all hover:border-primary/50 hover:bg-primary/5 text-left group"
            >
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">{action.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}