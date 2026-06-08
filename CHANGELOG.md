# MakerMind — Changelog

All notable changes to MakerMind are documented here.  
Format: `[vX.Y.Z] — YYYY-MM-DD`  
**X** = Major (breaking change or full rebuild)  
**Y** = Minor (new feature or screen)  
**Z** = Patch (fix, tweak, copy change)

---

## [v1.3.2] — 2025-06-08
### Fixed
- About page now shows real app icon instead of placeholder character
### Added
- "Clear all ideas" button in Settings > Data (for removing test data)

---

## [v1.3.1] — 2025-06-08
### Changed
- App icon updated to official Lab Nextdoor puzzle mark (original brand asset)

---

## [v1.3.0] — 2025-06-08
### Added
- Inline rename for categories and statuses (tap ✎ pencil, edit, Save or Enter)
- About page (◉ tab) with creator info, Lab Nextdoor branding, GitHub & Facebook links
- Motto: "Build. Break. Learn."
- Bottom nav now has 3 tabs: Ideas · Settings · About
- Version tracking and CHANGELOG introduced

### Changed
- FAB hidden on Settings and About views (only visible on Ideas)

---

## [v1.2.0] — 2025-06-08
### Added
- Settings screen with full category and status management
- Add custom categories with icon picker (32 icons) and colour picker (16 colours)
- Add custom statuses with name and colour wheel
- Reorder categories and statuses with ↑↓ buttons
- Delete categories and statuses (with usage warning)
- Reset to defaults button (preserves ideas)
- All dropdowns and filter pills update dynamically from settings

### Changed
- Bottom nav introduced (Ideas · Settings)
- FAB repositioned above nav bar

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
- Initial MakerMind PWA build
- Idea capture with Title, Category, Status, Notes, Tags
- 4 default categories: Project Ideas, DIY/Hardware, Smart Home, Shopping/Sourcing
- 5 default statuses: Idea, Planning, In Progress, Done, On Hold
- Filter pills by category and status
- Full-text search
- AI Expand with Claude (goal, components, challenges, first action)
- AI expansion saved per idea card
- LocalStorage persistence across sessions
- Dark maker-aesthetic UI (Syne + DM Sans fonts)
- Card grid with colour-coded category accents
