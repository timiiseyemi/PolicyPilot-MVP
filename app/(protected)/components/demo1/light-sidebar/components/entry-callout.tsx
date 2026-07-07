import Link from "next/link";
import {
  Bot,
  ArrowRight,
  CircleCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IEntryCalloutProps {
  className: string;
}

const EntryCallout = ({ className }: IEntryCalloutProps) => {
  return (
    <Card className={`h-full ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bot className="h-6 w-6 text-primary" />
          </div>

          <div>
            <CardTitle className="text-xl">
              BrokerOS AI
            </CardTitle>

            <p className="text-sm text-muted-foreground mt-1">
              Your intelligent insurance assistant
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">

        <div>
          <p className="font-medium">
            Good afternoon, Timmy 👋
          </p>

          <p className="text-sm text-muted-foreground mt-1">
            Here's what's happening today.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">

          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium">
              Today's Insights
            </span>
          </div>

          <div className="space-y-2 text-sm">

            <div className="flex items-center gap-2">
              <CircleCheck className="text-green-600 h-4 w-4" />
              12 policies expire this week
            </div>

            <div className="flex items-center gap-2">
              <CircleCheck className="text-green-600 h-4 w-4" />
              ₦2.8M outstanding premiums
            </div>

            <div className="flex items-center gap-2">
              <CircleCheck className="text-green-600 h-4 w-4" />
              4 claims awaiting approval
            </div>

            <div className="flex items-center gap-2">
              <CircleCheck className="text-green-600 h-4 w-4" />
              3 high-value customers require follow-up
            </div>

          </div>
        </div>

        <div className="space-y-2">

          <h4 className="font-medium">
            Suggested Actions
          </h4>

          <ul className="space-y-2 text-sm text-muted-foreground">

            <li>• Generate renewal reminders</li>

            <li>• Follow up outstanding premiums</li>

            <li>• Review pending claims</li>

            <li>• Identify at-risk policies</li>

          </ul>

        </div>

      </CardContent>

      <CardFooter>

        <Button asChild className="w-full">

          <Link href="/copilot">

            Open AI Copilot

            <ArrowRight className="ml-2 h-4 w-4" />

          </Link>

        </Button>

      </CardFooter>

    </Card>
  );
};

export {
  EntryCallout,
  type IEntryCalloutProps,
};