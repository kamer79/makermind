# MakerMind — Changelog

All notable changes to MakerMind are documented here.
Format: `[vX.Y.Z] — YYYY-MM-DD`

**Versioning rules:**
- **X.0.0** Major — full rebuild or new architecture
- **X.Y.0** Minor — new feature or screen (logged here)
- **X.Y.Z** Patch — bug fix, text tweak, style change (not logged)

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

---

## [v1.1.0] — 2025-06-08
### Added
- Voice input for Title and Notes fields (🎙 button, Chrome on Android)
- PWA manifest and service worker for offline support and home screen install
- App icons (192×192 and 512×512)
- Installable on Android via Chrome "Add to Home Screen"

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

## [v1.5.0] — 2025-06-08
### Added
- Live info ticker at the top of the home screen
- Smooth continuous scroll with color-coded message types (tip, feature, version, motto, use, ai, community)
- Ticker content fetched from ticker.json on GitHub — update messages without an app release
- Falls back to cached messages offline, then built-in fallback if no cache
- Tappable messages — version/feature taps open About, AI taps open Settings, community taps open links
- ticker.json file — edit on GitHub anytime to push new tips, announcements or feature hints to all users

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
