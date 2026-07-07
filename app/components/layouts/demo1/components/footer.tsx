'use client';

import { generalSettings } from '@/config/general.config';
import { Container } from '@/components/common/container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
  <Container>
    <div className="flex flex-col md:flex-row justify-between items-center gap-3 py-5">

      <div className="text-sm text-muted-foreground">
        © {currentYear} PolicyPilot. All rights reserved.
      </div>

      <nav className="flex gap-5 text-sm">

        <a href="/privacy" className="hover:text-primary">
          Privacy
        </a>

        <a href="/terms" className="hover:text-primary">
          Terms
        </a>

        <a href="/support" className="hover:text-primary">
          Support
        </a>

      </nav>

    </div>
  </Container>
</footer>
  );
}
