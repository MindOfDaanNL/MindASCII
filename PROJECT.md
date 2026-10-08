# PROJECT.md

This file mirrors the `MindASCII_PROJECT.md` specification and serves as a quick reference for developers working on this codebase.

See `MindASCII_PROJECT.md` for the full specification.

## Quick Reference

**Port:** 3050 (via `PORT` env variable)  
**Author:** MindDevelopment  
**License:** Private

## Project Structure

```text
MindASCII/
├── src/
│   ├── server.js              # Express server entry point
│   ├── config/
│   │   ├── database.js        # Database connection config
│   │   └── environment.js     # Environment/usage presets
│   ├── controllers/
│   │   ├── generatorController.js  # Page rendering
│   │   ├── projectController.js     # Project CRUD API
│   │   ├── templateController.js    # Template CRUD API
│   │   └── exportController.js      # Export/download endpoints
│   ├── routes/
│   │   ├── web.js             # Web page routes
│   │   ├── api.js             # Generator API endpoints
│   │   ├── projects.js        # Project API routes
│   │   └── templates.js       # Template API routes
│   ├── services/
│   │   ├── asciiEngine.js      # Main generation engine
│   │   ├── fontEngine.js       # Font loading and rendering
│   │   ├── layoutEngine.js     # Width, height, alignment
│   │   ├── boxEngine.js        # Box and table generation
│   │   ├── borderEngine.js     # Border library
│   │   ├── environmentEngine.js # Usage/environment presets
│   │   ├── formatter.js        # Formatting tools
│   │   ├── exportService.js    # Export (TXT, MD, JSON)
│   │   └── projectService.js   # Project/template persistence
│   ├── generators/
│   │   ├── text.js
│   │   ├── banner.js
│   │   ├── box.js
│   │   ├── table.js
│   │   ├── separator.js
│   │   ├── header.js
│   │   ├── logo.js
│   │   └── custom.js
│   ├── data/
│   │   ├── fonts/              # JSON font definitions
│   │   ├── borders/            # JSON border definitions
│   │   ├── styles/             # JSON style definitions
│   │   ├── symbols/            # JSON symbol definitions
│   │   └── environments/       # JSON environment presets
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── SavedArt.js
│   │   ├── Template.js
│   │   └── UserSetting.js
│   └── utils/
│       ├── validation.js
│       ├── textWidth.js
│       └── formatting.js
├── views/                      # EJS templates
│   ├── layouts/
│   ├── home/
│   ├── generator/
│   ├── editor/
│   ├── projects/
│   ├── templates/
│   └── settings/
├── public/
│   ├── css/
│   ├── js/
│   └── assets/
├── storage/                    # Local file storage
├── migrations/
├── scripts/
├── test/
│   └── test.js
├── .env.example
├── package.json
├── README.md
└── PROJECT.md
```

## Development Phases Status

| Phase | Status |
|-------|--------|
| Phase 1 - Foundation | Complete |
| Phase 2 - Basic Generator | Complete |
| Phase 3 - Layout Engine | Complete |
| Phase 4 - Boxes & Borders | Complete |
| Phase 5 - Developer Tools | Complete |
| Phase 6 - Advanced Generators | Complete |
| Phase 7 - Editor | Complete |
| Phase 8 - Projects | Complete |
| Phase 9 - Export | Complete |
| Phase 10 - Polish | In progress (testing, responsive) |
