"use client";

import { Fragment, useEffect, useState } from "react";
import {
  ShieldCheck,
  Users,
  Wallet,
  FileWarning,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface IChannelStatsItem {
  icon: LucideIcon;
  info: string;
  desc: string;
}

export function ChannelStats() {
  const [items, setItems] = useState<IChannelStatsItem[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/dashboard");
      const data = await res.json();

      setItems([
        {
          icon: ShieldCheck,
          info: data.activePolicies.toString(),
          desc: "Active Policies",
        },
        {
          icon: Users,
          info: data.customers.toString(),
          desc: "Customers",
        },
        {
          icon: Wallet,
          info: `₦${Number(data.premiumCollected).toLocaleString()}`,
          desc: "Premium Collected",
        },
        {
          icon: FileWarning,
          info: data.pendingClaims.toString(),
          desc: "Pending Claims",
        },
      ]);
    }

    load();
  }, []);

  return (
    <Fragment>
      {items.map((item, index) => (
        <Card key={index}>
          <CardContent className="p-0 flex flex-col justify-between gap-6 h-full">
            <div className="mt-4 ms-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <item.icon className="h-6 w-6 text-primary" />
            </div>

            <div className="flex flex-col gap-1 pb-4 px-5">
              <span className="text-3xl font-semibold">
                {item.info}
              </span>

              <span className="text-sm text-muted-foreground">
                {item.desc}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </Fragment>
  );
}
