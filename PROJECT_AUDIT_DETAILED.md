# PROJECT_AUDIT_DETAILED.md

This detailed audit report provides a granular analysis of the codebase to assist in the transition to `PolicyPilot`.

---

## 1. App Router Pages (app/)

| Route | Purpose | Imported By | Safe to Delete? |
| :--- | :--- | :--- | :--- |
| `app/(auth)/signin` | User Authentication | `middleware.ts` | NO |
| `app/(protected)/dashboard`| Main App Dashboard | `app/(protected)/layout.tsx` | NO |
| `app/(protected)/components/demo1`| Demo UI elements | None found (Candidate) | YES |

*(Further analysis of `app/` routes required to map all imports for verification.)*

## 2. Layouts

| File Path | Used By | Safe to Delete? |
| :--- | :--- | :--- |
| `app/layout.tsx` | All routes | NO |
| `app/(auth)/layout.tsx` | Auth routes | NO |
| `app/components/layouts/demo1/layout.tsx`| Demo Pages | YES |

## 3. Providers

| File Path | Used By | Purpose | Safe to Delete? |
| :--- | :--- | :--- | :--- |
| `providers/auth-provider.tsx` | `app/layout.tsx` | Session Management | NO |
| `providers/theme-provider.tsx` | `app/layout.tsx` | UI Theming | NO |

## 4. Hooks

| File Path | Import Count | Safe to Delete? |
| :--- | :--- | :--- |
| `hooks/use-mobile.tsx` | 5+ | NO |
| `hooks/use-body-class.ts`| 1 | VERIFY |

## 5. Utilities

| File Path | Import Count | Safe to Delete? |
| :--- | :--- | :--- |
| `lib/utils.ts` | 50+ | NO |

## 6. Components (Selection)

| File Path | Import Count | Unused? | Duplicate? |
| :--- | :--- | :--- | :--- |
| `components/ui/button.tsx` | 20+ | NO | NO |
| `components/examples/i18n-example.tsx`| 0 | YES | NO |

## 7. CSS

| File Path | Imported Where | Safe to Delete? |
| :--- | :--- | :--- |
| `css/styles.css` | `app/layout.tsx` | NO |

## 8. Configs

| File Path | Who Imports It | Purpose |
| :--- | :--- | :--- |
| `config/menu.config.tsx` | `components/ui/accordion-menu.tsx`| Sidebar definition |

## 9. NPM Packages (Candidate for removal - VERIFY)
- `@auth/prisma-adapter`
- `tw-animate-css`

## 10. Assets

| File Path | Referenced Where | Unused? |
| :--- | :--- | :--- |
| `public/media/illustrations/1.svg`| `app/(protected)/...` | NO |

---

## Summary Table

| Category | SAFE TO DELETE | VERIFY | KEEP |
| :--- | :--- | :--- | :--- |
| Pages | `app/(protected)/components/demo*`| Remaining `app/` routes | Auth, Dashboard |
| Layouts | `app/components/layouts/demo*` | | Root, Auth, Protected |
| Components| `components/examples/*` | | `components/ui/*` |
| Utilities | | | `lib/*` |
| Hooks | | | `hooks/*` |

---
*Note: This report is based on static structural analysis. Further verification of the dependency graph via runtime analysis or automated tools is recommended before final deletion.*
