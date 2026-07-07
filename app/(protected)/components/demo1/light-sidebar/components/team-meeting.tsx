import Link from 'next/link';
import { MapPin, Users } from 'lucide-react';
import { ShieldCheck } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const TeamMeeting = () => {
  return (
    <Card className="h-full">
      <CardContent className="grow lg:p-7.5 lg:pt-6 p-5">
        <div className="flex items-center justify-between flex-wrap gap-5 mb-7.5">
          <div className="flex flex-col gap-1">
            <span className="text-xl font-semibold text-mono">
              Upcoming Renewals
            </span>
            <span className="text-sm font-semibold text-foreground">
              This Week
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
  <ShieldCheck className="h-6 w-6 text-primary" />
</div>
        </div>
        <p className="text-sm font-normal text-foreground leading-5.5 mb-8">
         28 policies require renewal within the next 7 days.

Estimated premium value:
₦14.8M
        </p>
        <div className="flex rounded-lg bg-accent/50 gap-10 p-5">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-1.5 text-sm font-normal text-foreground">
              <MapPin size={16} className="text-base text-muted-foreground" />
              Highest Priority
            </div>
            <div className="text-sm font-medium text-foreground pt-1.5">
              Motor Insurance
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-1.5 text-sm font-normal text-foreground">
              <Users size={16} className="text-base text-muted-foreground" />
              Due Today
            </div>
            <div className="text-lg font-bold">
  8 Policies
</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button mode="link" underlined="dashed" asChild>
          <Link href="#">Review Renewals →</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { TeamMeeting };
