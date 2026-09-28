<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Project

Windows 95-style personal portfolio.

Stack: Next.js 16, React 19, TypeScript, Zustand, react95, react-rnd, Vitest, Playwright.

Preserve the existing architecture and retro desktop concept. Avoid unrelated refactors and unnecessary dependencies.

## Git

- Never work directly on `main`.
- Before a task: update `main` with `git pull --ff-only`, then create a dedicated branch.
- Use `feat/`, `fix/`, `refactor/`, `test/`, `docs/`, `chore/`.
- Commit frequently: after each independently reviewable implementation step.
- Prefer several small commits over one large commit.
- Use Conventional Commits.
- Do not amend, squash, force-push, or merge unless explicitly requested.

## Pull requests

Every substantial task must end with a PR.

After implementation:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
git push -u origin HEAD
gh pr create
gh pr view
gh pr checks
```

Fix failures caused by the branch, commit the fixes, push, and re-check CI.

PR body should briefly state:

- changes;
- important decisions;
- tests/checks run.

Do not merge the PR.

## Code

- Inspect existing code/tests before changing anything.
- Reuse existing abstractions.
- Keep changes scoped to the task.
- Keep TypeScript strict; avoid `any` and unsafe casts.
- Put desktop apps under `src/features/apps/<app>`.
- Integrate apps through the existing application registry/window manager.
- Use Zustand only for genuinely shared state.
- Keep large content/data outside presentation components.
- Reuse shared project/contact/skill data instead of duplicating it.
- Add/update tests for changed behavior.
- Never delete tests just to pass CI.

## UI

Preserve Windows 95 aesthetics.

Prefer classic:

- windows;
- explorer views;
- menus;
- dialogs;
- tabs;
- status bars.

Avoid modern SaaS cards, glassmorphism, gradients, and unrelated redesigns.

Keep desktop and mobile usable. Prefer CSS for responsive behavior.

## Safety

- Do not invent personal information, URLs, project metrics, employers, or contacts.
- Verify a file is unused before deleting it.
- Do not modify dependency versions unless required by the task.
