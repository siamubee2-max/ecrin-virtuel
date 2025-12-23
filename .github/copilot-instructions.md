# GitHub Copilot / AI Agent Instructions

Purpose: Help AI agents make safe, focused code changes in this React + Vite project.

- **Run & build**: use `npm install` then `npm run dev` for local dev, `npm run build` and `npm run preview` for production preview (see package.json).

- **Big picture**: Single-page React app (Vite). Routing is defined in `src/App.jsx`. Data fetching uses `@tanstack/react-query` (see `src/main.jsx` QueryClient defaults). UI primitives come from `src/components/ui/*` (shadcn-style components).

- **Data layer & integrations**: A lightweight compatibility layer `src/api/base44Client.js` wraps Supabase (`src/api/supabaseClient.js`). Use `base44.entities.<Name>` to list/get/create/update/delete records. Example: `base44.entities.JewelryItem.list('-created_date')` (used in `src/pages/JewelryBox.jsx`).

- **LLM / file upload usage**: The codebase calls `base44.integrations.Core.UploadFile` and `base44.integrations.Core.InvokeLLM` (see `src/pages/JewelryBox.jsx` for an example that analyzes images and extracts JSON). When editing or adding LLM prompts, follow the same response_json_schema pattern used in `JewelryBox`.

- **Patterns & conventions**:
  - Prefer `base44.entities.<Entity>.filter(filters, orderBy)` for server-side-like queries; `createEntity` in `base44Client.js` implements `list/get/create/update/delete/filter`.
  - Optimistic UI is used selectively via `react-query` mutation callbacks and `queryClient.invalidateQueries` to refresh data.
  - UI components are small, composable, and live under `src/components/ui` (avoid adding large logic there; create new higher-level components in `src/components/*`).
  - Routes are component pages under `src/pages/*` and mounted in `src/App.jsx`.

- **Auth / secrets**: Supabase URL/key are currently stored in `src/api/supabaseClient.js`. Do NOT commit new secrets. If you need local overrides, prefer environment variables and update Vite config accordingly.

- **Where to make API/entity changes**: Modify or add wrappers in `src/api/base44Client.js`. New entities should follow the `createEntity(tableName)` shape so frontend pages can call `base44.entities.NewEntity.list()` etc.

- **Notifications & side-effects**: The app sometimes performs server-side-like iterations in frontend code (see notification creation logic in `src/pages/JewelryBox.jsx` `updateMutation`). If changing this, consider moving heavy/batched work server-side or via background jobs.

- **Testing & linting**: Lint with `npm run lint`. There are no test scripts in the repo; keep changes small and validate by running the app locally.

- **PR guidance for AI agents**:
  - Keep changes minimal and focused to a single feature/bug.
  - Add/modify only files related to the task; follow existing folder structure (`src/pages`, `src/components`, `src/api`).
  - Do not add or expose secrets. If new env vars are required, document them in the README and use `import.meta.env` for Vite.

If anything here is unclear or you'd like more examples (e.g., common component props or typical query keys), tell me which area to expand.
