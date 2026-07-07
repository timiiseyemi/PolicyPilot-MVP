'use client';

import {
  Mail,
  FileText,
  Shield,
  TrendingUp,
  Users,
  AlertTriangle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const actions = [
  {
    title: "Draft Renewal Email",
    description: "Generate personalized renewal reminders.",
    icon: Mail,
    prompt:
      "Draft a professional renewal reminder email for a customer's insurance policy.",
  },
  {
    title: "Summarize Policy",
    description: "Explain any policy in simple language.",
    icon: FileText,
    prompt:
      "Summarize this insurance policy in simple language a customer can understand.",
  },
  {
    title: "Explain Coverage",
    description: "Help customers understand benefits & exclusions.",
    icon: Shield,
    prompt:
      "Explain the coverage, exclusions and benefits of this policy.",
  },
  {
    title: "Cross-sell Opportunities",
    description: "Recommend additional insurance products.",
    icon: TrendingUp,
    prompt:
      "Recommend additional insurance products this customer should consider.",
  },
  {
    title: "Analyze Customer Portfolio",
    description: "Review a customer's policies and risks.",
    icon: Users,
    prompt:
      "Analyze this customer's insurance portfolio and identify risks.",
  },
  {
    title: "Detect Lapsed Policies",
    description: "Identify policies requiring immediate attention.",
    icon: AlertTriangle,
    prompt:
      "Identify policies that have lapsed or are close to expiry.",
  },
];

interface QuickActionsProps {
  setPrompt: (value: string) => void;
}

export function QuickActions({
  setPrompt,
}: QuickActionsProps) {
  return (
    <div>

      <h2 className="text-lg font-semibold mb-4">
        Quick AI Actions
      </h2>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Card
    onClick={() => setPrompt(action.prompt)}
              key={action.title}
              className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary"
            >
              <CardContent className="p-6">

                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">

                  <Icon className="w-6 h-6 text-primary" />

                </div>

                <h3 className="font-semibold text-lg mb-2">
                  {action.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-6">
                  {action.description}
                </p>

              </CardContent>
            </Card>
          );
        })}

      </div>

    </div>
  );
}