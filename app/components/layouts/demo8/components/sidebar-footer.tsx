'use client';

import { UserDropdownMenu } from '@/partials/topbar/user-dropdown-menu';
import { toAbsoluteUrl } from '@/lib/helpers';

export function SidebarFooter() {
  return (
    <div className="flex flex-col gap-5 items-center shrink-0 pb-5">
      <UserDropdownMenu
        trigger={
          <img
            className="size-8 rounded-lg border-2 border-mono/30 shrink-0 cursor-pointer"
            src={toAbsoluteUrl('/media/avatars/300-2.png')}
            alt="User Avatar"
          />
        }
      />
    </div>
  );
}
