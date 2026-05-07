# Design Specs

Per-component design specifications written by the Design team and consumed by Frontend.

## Purpose

Each file in this directory captures the visual contract for a single component before Frontend implements it. Specs are the primary handoff artifact between Design (Step 2 of the workflow) and Frontend (Step 3).

## When this directory fills up

Phase 2 of [`/.claude/plans/overall-plan.md`](../../.claude/plans/overall-plan.md) creates one spec per component, in order:

1. `Hero.md`
2. `Links.md`
3. `About.md`
4. `Skills.md`
5. `Works.md`
6. `Career.md`

## Spec file structure (template)

Each `<Component>.md` should include:

- **Purpose** — what the component communicates
- **Anatomy** — list of sub-elements (heading, body, icon, etc.)
- **Tokens used** — explicit list of CSS custom properties from `../tokens.css`
- **States** — default / hover / focus / responsive breakpoints
- **Reference** — Figma node URL or screenshot path, if any
- **Open questions** — items needing Frontend or user clarification

## Rules

- Reference tokens by name (e.g. `--color-surface`); never inline hex values
- If a needed token is missing, add it to `../tokens.css` in the same commit
- Keep specs under ~80 lines — link out for longer rationale
