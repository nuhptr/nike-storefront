# Project Rules & Guidelines (AGENTS.md)

## Stack & Runtime

- **Framework:** Always use the **latest stable Astro** (`astro`, `@astrojs/react`, `@astrojs/check`).
- **Node.js:** Require `engines.node >=24.0.0` in `package.json`.
- **Styling & UI:** Tailwind CSS v4 (`@tailwindcss/vite`, `@import "tailwindcss"`, `@theme inline`) with **Base UI** (`@base-ui/react`) and `devl.dev` / `coss ui` (`shadcn` registry configured in `components.json`).
- **State Management:** Use lightweight `nanostores` + `@nanostores/react` for client island ViewModels.

## Standard MVVM Architecture (`hoo-wallet` Standard)

Keep `src/` strictly organized into **5 top-level directories**:

```text
src/
├── models/        # Immutable domain interfaces (*.model.ts) & concrete data/services (*.data.ts)
├── viewmodels/    # ViewModel classes, factories, & reactive nanostore ViewModels (*.viewmodel.ts)
├── views/
│   ├── layouts/      # Base HTML document shell & SEO metadata
│   ├── components/   # Reusable Base UI primitives (ui/) & storefront cards/islands
│   └── sections/     # Page sections composed from components
├── styles/        # Tailwind CSS v4 tokens, base rules, and utilities (index.css)
└── pages/         # Thin composition root / binder wiring ViewModels to Views
```

### Path Aliases

Configure `tsconfig.json` without deprecated `baseUrl`:
- `@models/*` -> `./src/models/*`
- `@viewmodels/*` -> `./src/viewmodels/*`
- `@views/*` -> `./src/views/*`
- `@styles/*` -> `./src/styles/*`
- `@/*` -> `./src/*` (for `shadcn` / `@devl` registry compatibility)

## SOLID Principles

1. **Single Responsibility (SRP):** Keep domain models, concrete data, ViewModels, UI primitives, and Astro views strictly separated. Never hardcode domain datasets inside `.astro` or `.tsx` views.
2. **Open/Closed (OCP):** Extend UI primitives (`Button`, `Badge`, `Card`) via `cva` variants or slots instead of modifying component internals; ViewModels accept any `IStorefrontModel` implementation.
3. **Liskov Substitution (LSP):** Any concrete implementation of `IStorefrontModel` or `INewsletterService` must be seamlessly substitutable without breaking ViewModel invariants.
4. **Interface Segregation (ISP):** Pass only the narrow typed slice required by each section or component.
5. **Dependency Inversion (DIP):** ViewModels depend on model/service interfaces injected via constructor or factory arguments rather than concrete datasets.

## Documentation (`/** */`)

- Document all `.ts`, `.tsx`, `.mjs`, and `.astro` frontmatter files with **JSDoc (`/** ... */`)** comments covering module purpose, interfaces, classes, factory functions, components, and props.

## Performance & Accessibility

- Apply `fetchpriority="high"` (and never `loading="lazy"`) on the Hero LCP image with explicit `width` and `height`.
- Apply `loading="lazy"` alone (without `fetchpriority="low"`) on below-the-fold images.
- Use semantic HTML landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`), `<article>` for cards, a single `<h1>`, `:focus-visible` outlines, and `prefers-reduced-motion` guards.
- Validate interactive form fields after user interaction (`:user-invalid` / `:user-valid` + synced `aria-invalid` and `aria-describedby`).

## Verification Gate

Before finishing changes, verify zero errors, warnings, or hints:

```bash
npx tsc --noEmit && ASTRO_TELEMETRY_DISABLED=1 npm run build
```
