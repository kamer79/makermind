# MakerMind — Changelog

All notable changes to MakerMind are documented here.
Format: `[vX.Y.Z] — YYYY-MM-DD`

**Versioning rules:**
- **X.0.0** Major — full rebuild or new architecture
- **X.Y.0** Minor — new feature or screen (logged here)
- **X.Y.Z** Patch — bug fix, text tweak, style change (not logged)

---
## [v2.3.0] — 2026-06-25

### Added
- **Export Data** — export all projects in three formats:
  - 📄 JSON — full project data (backup, migration)
  - 📝 Markdown — human-readable project summaries
  - 📊 CSV — task lists for spreadsheets
- **Update Check Restored** — "Check for Update" button in About page
- **Service Worker Updates** — automatic notification when new version is available
- **Settings Improvements** — new Export Data section

### Changed
- About page now shows v2.3.0 with update check button
- Version notes system restored for update notifications

---
## [v2.2.0] — 2026-06-25

### Added
- **RAG Knowledge Base** — upload documents (PDF, TXT, MD) for context-aware AI
- **Local Embeddings** — using Transformers.js (all local, no API calls)
- **Semantic Search** — find relevant document chunks based on your questions
- **Knowledge Tab** — new tab in project modal for document management
- **RAG-Enhanced Copilot** — AI answers with context from your uploaded documents
- **Document Management** — upload, list, and delete documents per project

### Changed
- Copilot chat now uses RAG context when available
- Knowledge Base status indicator in project modal

## [v2.1.0] — 2026-06-25

### Added
- **Shimmy Setup Guide** — complete documentation for running local LLMs offline (`SHIMMY_SETUP.md`)
- **Shimmy Test Connection** — one-click test button in Settings → AI Engine
- **README.md** — Shimmy section with quick start and link to full guide

### Changed
- Settings → AI Engine → Shimmy section now includes a "Test Connection" button
- Settings → AI Engine → Shimmy section now includes a link to the setup guide
- About page version updated to v2.1.0

---

## [v2.0.0] — 2026-06-24

### Major — Complete Rewrite: MakerMind 2.0

MakerMind is reborn as an **AI Project Copilot for Makers & Builders**.

### Added
- **Projects** instead of Ideas — complete terminology overhaul
- **New Project Schema** with structured fields:
  - Project details: title, category, status, notes, tags
  - Blueprint: summary, hardware, software, risks, milestones, first tasks
  - Tasks: with status tracking (To Do / Doing / Done) and effort estimates
  - Resources: parts, tools, components list
  - Chat: Copilot conversation history per project
- **5 AI Engines** with flexible selection:
  - **Pollinations AI** — completely free, no key required
  - **OpenRouter** — uses `openrouter/free` (auto-selects best available free model)
  - **Shimmy** — local server for running any GGUF model (100% private, offline)
  - **Google Gemini** — free API key (1,500 requests/day from aistudio.google.com)
  - **Claude API** — paid key for best quality blueprints (console.anthropic.com)
- **Project Blueprint Generator** — AI creates structured output with:
  - Summary (2-3 sentence overview)
  - Hardware list (components, sensors, MCUs)
  - Software stack (firmware, libraries, platforms)
  - Risks (potential challenges and blockers)
  - Milestones (phased roadmap)
  - First Tasks (actionable next steps)
- **Project Analysis** — AI-powered insights with:
  - Tips (practical advice for the build)
  - Risks (potential issues to watch for)
  - Resources (suggested components, tutorials, similar projects)
  - Health Check (complexity score, completeness score, missing items)
- **Task Kanban Board** — drag & drop tasks between columns:
  - To Do → Doing → Done
  - Effort estimates per task (30m → 1 week)
  - Auto-updating progress bar
  - Auto-populate tasks from blueprint generation
- **Copilot Chat** — per-project AI assistant with:
  - Project context awareness (title, notes, blueprint)
  - Natural language Q&A about the project
  - Chat history saved per project
- **Automatic Migration** — v1 ideas are seamlessly migrated to v2 projects
- **New Tabbed Modal Interface** — Project, Blueprint, Tasks, Copilot tabs
- **Voice Input** — speech-to-text for project title (Chrome on Android)
- **Service Worker** — offline support with v2 cache

### Changed
- "Ideas" renamed to "Projects" throughout the app
- "AI Expansion" renamed to "Project Blueprint"
- "Expand with AI" renamed to "Generate Blueprint"
- Complete UI overhaul for better project management
- Improved AI prompt engineering for structured blueprint output
- App tagline updated to "AI Project Copilot for Makers & Builders"
- Bottom nav: "Ideas" → "Projects"

### Removed
- Legacy v1 idea schema (replaced with v2 project schema)
- Old AI expansion format (replaced with structured blueprint)
- Groq engine (replaced with OpenRouter's free model router)
- Transformers.js (removed in v1.6, now confirmed gone)

---

## [v1.6.0] — 2025-06-08
### Added
- Pollinations AI engine — completely free, no account or API key needed
- Google Gemini engine — free API key from aistudio.google.com (1,500 requests/day, no credit card)
- 3-engine chooser: Pollinations · Google Gemini · Claude API
- Gemini API key stored on-device only, never in source code
- Engine-specific key validation (Gemini keys start with AIza…, Claude with sk-ant-…)

### Changed
- Removed Transformers.js (on-device model) — was too slow and gave poor quality on mobile
- AI engine chooser now shows all 3 options with clear descriptions
- Settings → AI Engine updated to show correct key instructions per engine

---

## [v1.5.0] — 2025-06-08
### Added
- Live info ticker at the top of the home screen
- Smooth continuous scroll with color-coded message types (tip, feature, version, motto, use, ai, community)
- Ticker content fetched from ticker.json on GitHub — update messages without an app release
- Falls back to cached messages offline, then built-in fallback if no cache
- Tappable messages — version/feature taps open About, AI taps open Settings, community taps open links
- ticker.json file — edit on GitHub anytime to push new tips, announcements or feature hints to all users

---

## [v1.4.0] — 2025-06-08
### Added
- Free on-device AI via Transformers.js (Xenova/flan-t5-small, ~50MB, works offline after first load)
- AI engine chooser shown on first "Expand" tap — user picks Free or Claude API
- Settings → AI Engine section to switch engine anytime
- Claude API key input in Settings — stored only on-device, never in source code
- Honest speed/quality warning shown when Free AI is selected
- "Expand" button label and subtitle reflect active engine dynamically
- In-app update notification — bottom sheet shows what's new when a new version is available
- "Update Now" applies update instantly, "Later" dismisses until ready
- "Check for Update" button in About page for manual trigger

### Changed
- About page footer updated to "AI-powered" (engine-agnostic)
- PWA install prompt now appears correctly on Android Chrome (manifest fix)
- App icon updated to official Lab Nextdoor puzzle mark

---

## [v1.3.0] — 2025-06-08
### Added
- Inline rename for categories and statuses (tap ✎, edit, Save or Enter)
- About page with creator info, Lab Nextdoor branding, GitHub & Facebook links
- Motto: "Build. Break. Learn." by Karim Amer
- PayPal support button (paypal.me/KarimAmer914)
- Version tracking and CHANGELOG introduced
- Bottom nav expanded to 3 tabs: Ideas · Settings · About
- "Clear all ideas" button in Settings → Data

---

## [v1.2.0] — 2025-06-08
### Added
- Settings screen with full category and status management
- Add custom categories with icon picker (32 icons) and colour picker (16 colours)
- Add custom statuses with name and colour wheel
- Reorder categories and statuses with ↑↓ buttons
- Delete categories and statuses with usage warning
- Reset to defaults button (preserves ideas)
- All dropdowns and filter pills update dynamically from settings
- Bottom navigation bar (Ideas · Settings)

---

## [v1.1.0] — 2025-06-08
### Added
- Voice input for Title and Notes fields (🎙 button, Chrome on Android)
- PWA manifest and service worker for offline support and home screen install
- App icons (192×192 and 512×512)
- Installable on Android via Chrome "Add to Home Screen"

---

## [v1.0.0] — 2025-06-08
### Added
- Initial MakerMind PWA release
- Idea capture with Title, Category, Status, Notes, Tags
- 4 default categories: Project Ideas, DIY/Hardware, Smart Home, Shopping/Sourcing
- 5 default statuses: Idea, Planning, In Progress, Done, On Hold
- Filter pills by category and status
- Full-text search
- AI expansion powered by Claude API
- AI expansion saved per idea card
- LocalStorage persistence across sessions
- Dark maker-aesthetic UI (Syne + DM Sans fonts)
- Card grid with colour-coded category accents
