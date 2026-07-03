# Project Audit: PolicyPilot Transition

This audit report details the architectural state of the `metronic-nextjs` template and provides a roadmap for cleaning up the codebase to transition to `PolicyPilot`.

## 1. Folder Tree
(Summarized directory structure)
- `app/`: Next.js 15+ App Router, routes, API, models.
- `components/`: Shared UI (Radix/Tailwind wrappers) and common components.
- `config/`: App configuration (menus, settings).
- `css/`: Styling, CSS variables, and demo-specific styles.
- `hooks/`: Reusable client-side logic.
- `i18n/`: Internationalization configuration.
- `lib/`: Core utilities (Prisma, S3, helpers).
- `prisma/`: Database management.
- `providers/`: React Context providers.
- `public/`: Static assets.
- `scripts/`: Build/verification scripts.
- `types/`: Custom TypeScript declarations.

## 2. Audit Findings

### Demo Pages & Code (High Priority for Removal)
- `app/(protected)/components/demo*`: Extensive demo UI components.
- `app/(protected)/i18n-test`: Testing demo.
- `components/examples`: Unused example components.

### Unused npm Packages (Candidates for removal)
*Note: Some packages might be required transitively or by the build process. Verify before deletion.*
- `@auth/prisma-adapter`
- `@ianvs/prettier-plugin-sort-imports`
- `@tanstack/react-query-devtools`
- `embla-carousel-autoplay`
- `next-i18next`
- `react-aspect-ratio`
- `react-is`
- `react-wrap-balancer`
- `tw-animate-css`

### Unused Components/Layouts
- Multiple `demo*` layouts within `app/components/layouts/`.
- Numerous UI components in `components/ui` that are not referenced in the main application logic.

### Duplicate/Dead Code/Configs
- Multiple `demo` configuration objects in `config/`.
- Likely duplicated UI wrapper components (e.g., various button styles or layout wrappers that aren't actively used).

### Dead Imports/Exports
- Extensive dead imports exist across the `app/components/partials/` and `(protected)` folders where template code was partially removed.

## 3. Removal Potential
**Estimated Percentage of Code/Files Removable:** 40% - 60%

This estimate is high because the template includes many demo variants (different sidebars, headers, dashboards) intended for exploration, not for production use in `PolicyPilot`.

## 4. Next Steps
1. Define the core `PolicyPilot` layout.
2. Systematically remove one `demo*` directory at a time.
3. Use `depcheck` and static analysis to identify and remove unused components in `components/ui`.
4. Refactor `config` files to be specific to `PolicyPilot`.
