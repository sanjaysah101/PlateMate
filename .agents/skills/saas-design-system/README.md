# saas-design-system

The design system behind Juryza, packaged so any AI can rebuild the same
quality of UI for another product.

```
saas-design-system/
  SKILL.md                    entry point: principles, workflow, checklist
  PROMPT.md                   paste-in prompt for AIs that can't load skills (+ starter briefs)
  references/
    theme.css                 exact OKLCH tokens (light/dark), motion, rich-text styles
    app-shell.md              root, site, auth and sidebar-workspace layouts
    components.md             PageHeader, StatCard, Section, covers, avatars, CopyButton…
    page-recipes.md           13 screen recipes (landing, dashboard, list, editor…)
    pitfalls.md               bugs that silently ruin the look
```

## Using it

- **Claude Code:** copy the folder to `<project>/.claude/skills/saas-design-system/`
  (or `~/.claude/skills/` for every project). It loads when you ask for UI work.
- **Other agents (Cursor, Codex, …):** put the folder in the repo and tell the
  agent "Follow saas-design-system/SKILL.md", or add that line to its rules
  file (`AGENTS.md`, `.cursor/rules`).
- **Chat-only AIs:** paste the prompt from `PROMPT.md` after filling in the
  project brief.

To rebrand, pick a hue and follow the header of `references/theme.css`.
