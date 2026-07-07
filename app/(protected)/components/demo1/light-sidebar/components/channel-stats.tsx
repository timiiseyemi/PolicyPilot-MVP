import { Fragment } from 'react';
import {
  ShieldCheck,
  Users,
  Wallet,
  FileWarning,
  LucideIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface IChannelStatsItem {
  icon: LucideIcon;
  info: string;
  desc: string;
}
type IChannelStatsItems = Array<IChannelStatsItem>;

const ChannelStats = () => {
  const items: IChannelStatsItems = [
  {
    icon: ShieldCheck,
    info: '1,248',
    desc: 'Active Policies',
  },
  {
    icon: Users,
    info: '386',
    desc: 'Customers',
  },
  {
    icon: Wallet,
    info: '₦82.4M',
    desc: 'Premium Collected',
  },
  {
    icon: FileWarning,
    info: '12',
    desc: 'Pending Claims',
  },
];

  const renderItem = (item: IChannelStatsItem, index: number) => {
    return (
      <Card key={index}>
        <CardContent className="p-0 flex flex-col justify-between gap-6 h-full">
          <div className="mt-4 ms-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
  <item.icon className="h-6 w-6 text-primary" />
</div>
          <div className="flex flex-col gap-1 pb-4 px-5">
            <span className="text-3xl font-semibold text-mono">
              {item.info}
            </span>
            <span className="text-sm font-normal text-muted-foreground">
              {item.desc}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Fragment>
     

      {items.map((item, index) => {
        return renderItem(item, index);
      })}
    </Fragment>
  );
};

export { ChannelStats, type IChannelStatsItem, type IChannelStatsItems };
