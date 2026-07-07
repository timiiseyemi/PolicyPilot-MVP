import {
  Sparkles,
  FileText,
  Mail,
  Shield,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tasks = [
  {
    icon: Mail,
    title: "Generate Renewal Emails",
  },
  {
    icon: FileText,
    title: "Summarize Policy",
  },
  {
    icon: Shield,
    title: "Explain Coverage",
  },
  {
    icon: Users,
    title: "Analyze Customer Portfolio",
  },
];

export function SuggestedTasks() {
  return (
    <Card>

      <CardHeader>

        <CardTitle className="flex items-center gap-2">

          <Sparkles className="w-5 h-5 text-primary"/>

          Suggested Tasks

        </CardTitle>

      </CardHeader>

      <CardContent className="grid gap-3">

        {tasks.map((task) => {

          const Icon = task.icon;

          return (

            <button
              key={task.title}
              className="rounded-lg border p-3 flex items-center gap-3 hover:border-primary hover:bg-primary/5 transition"
            >

              <Icon className="w-5 h-5 text-primary"/>

              <span className="font-medium">
                {task.title}
              </span>

            </button>

          );

        })}

      </CardContent>

    </Card>
  );
}