'use client';

import Link from 'next/link';
import { toAbsoluteUrl } from '@/lib/helpers';

export function SidebarHeader() {
  return (
    <div className="hidden lg:flex items-center justify-center shrink-0 pt-8 pb-3.5">
      <Link href="/">
        <img
          src={toAbsoluteUrl('/media/logos/policypilot-logo.png')}
          className="dark:hidden h-[25px]"
          alt="PolicyPilot"
        />
        <img
          src={toAbsoluteUrl('/media/logos/policypilot-logo.png')}
          className="hidden dark:block h-[25px]"
          alt="PolicyPilot"
        />
      </Link>
    </div>
  );
}
