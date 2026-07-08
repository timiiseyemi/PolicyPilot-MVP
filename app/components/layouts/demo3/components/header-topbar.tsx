'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchDialog } from '@/partials/dialogs/search/search-dialog';
import { UserDropdownMenu } from '@/partials/topbar/user-dropdown-menu';
import {
  Search,
} from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { StoreClientTopbar } from '@/app/(protected)/store-client/components/common/topbar';

export function HeaderTopbar() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 lg:gap-3.5">
      <>
        {pathname.startsWith('/store-client') ? (
          <StoreClientTopbar />
        ) : (
          <>
            <Button asChild className="hidden md:inline-flex">
              <Link href="account/home/get-started">Get Started</Link>
            </Button>
            <SearchDialog
              trigger={
                <Button
                  variant="ghost"
                  mode="icon"
                  shape="circle"
                  className="hover:[&_svg]:text-primary"
                >
                  <Search className="size-4.5!" />
                </Button>
              }
            />
            <UserDropdownMenu
              trigger={
                <img
                  className="size-9 rounded-full border-2 border-input shrink-0 cursor-pointer"
                  src={toAbsoluteUrl('/media/avatars/gray/5.png')}
                  alt="User Avatar"
                />
              }
            />
          </>
        )}
      </>
    </div>
  );
}
