'use client';

import { UserDropdownMenu } from '@/partials/topbar/user-dropdown-menu';
import { toAbsoluteUrl } from '@/lib/helpers';

export function SidebarFooter() {
  return (
    <div className="flex flex-center justify-between shrink-0 ps-4 pe-3.5 mb-3.5">
      <UserDropdownMenu
        trigger={
          <img
            className="size-9 rounded-full border-2 border-mono/25 shrink-0 cursor-pointer"
            src={toAbsoluteUrl('/media/avatars/300-2.png')}
            alt="User Avatar"
          />
        }
      />
    </div>
  );
}
