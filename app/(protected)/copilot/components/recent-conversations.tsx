import {
  MessageSquare,
  Clock,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const conversations = [
  {
    title: "Renewal Email for John Doe",
    time: "2 mins ago",
  },
  {
    title: "Summarize Motor Policy",
    time: "15 mins ago",
  },
  {
    title: "Claims Analysis",
    time: "Yesterday",
  },
];

export function RecentConversations() {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Recent Conversations
        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-3">

        {conversations.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border p-4 hover:bg-muted cursor-pointer transition"
          >

            <div className="flex items-center gap-3">

              <MessageSquare className="w-5 h-5 text-primary" />

              <div className="flex-1">

                <div className="font-medium">
                  {item.title}
                </div>

                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">

                  <Clock className="w-3 h-3" />

                  {item.time}

                </div>

              </div>

            </div>

          </div>
        ))}

      </CardContent>

    </Card>
  );
}