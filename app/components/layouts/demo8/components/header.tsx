'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Container } from '@/components/common/container';
import { SidebarFooter } from './sidebar-footer';
import { SidebarMenu } from './sidebar-menu';

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Close sheet when route changes
  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);

  return (
    <header className="flex items-center fixed z-10 top-0 start-0 end-0 shrink-0 bg-muted h-(--header-height)">
      <Container className="flex items-center justify-between flex-wrap gap-3">
        <Link href="/">
          <img
            src={toAbsoluteUrl('/media/logos/policypilot-logo.png')}
            className="dark:hidden h-[25px]"
            alt="PolicyPilot"
          />
          <img
            src={toAbsoluteUrl('/media/logos/policypilot-logo.png')}
            className="hidden dark:inline-block h-[25px]"
            alt="PolicyPilot"
          />
        </Link>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="dim" mode="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="p-0 gap-0 w-(--sidebar-width)"
            side="left"
            close={false}
          >
            <SheetHeader className="p-0 space-y-0" />
            <SheetBody className="px-0 pt-5 flex flex-col grow">
              <SidebarMenu />
              <SidebarFooter />
            </SheetBody>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
