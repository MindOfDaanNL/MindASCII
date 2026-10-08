# MindASCII

**Author:** MindDevelopment  
**Project:** MindASCII  
**Version:** 1.0.0  
**Port:** 3050  
**Runtime:** Node.js  
**Database:** MariaDB  
**License:** Private / MindDevelopment

---

# MindASCII

MindASCII is a powerful web-based ASCII art generator and editor developed by **MindDevelopment**.

The goal is to build much more than a simple text-to-ASCII converter.

MindASCII should become a complete **ASCII Art Design Studio** where users can:

- Generate ASCII text
- Create ASCII banners
- Create boxes
- Create separators
- Create headers
- Create tables
- Create CLI interfaces
- Create code comments
- Create README banners
- Create terminal layouts
- Create logos
- Create custom ASCII compositions
- Combine multiple ASCII elements
- Preview the result
- Configure the target environment
- Configure width and height
- Select character sets
- Select styles
- Edit the generated result manually
- Save projects
- Export ASCII art

The application should intelligently adapt generated ASCII art to its intended usage.

For example:

``text
Usage: VS Code
``

should cause MindASCII to prefer output that works well inside a VS Code source file, including appropriate line widths, comment formatting and characters that render correctly in a monospace code editor.

---

# Core Vision

MindASCII should answer a simple question:

> "What kind of ASCII art are you trying to create, and where are you going to use it?"

Instead of simply asking:

``text
Enter text:
``

MindASCII should allow:

``text
What are you creating?

[ Banner           ▼ ]

Where will it be used?

[ VS Code          ▼ ]

Style:

[ Block            ▼ ]

Width:

[ 80 columns       ]

Border:

[ Double           ▼ ]

Alignment:

[ Center           ▼ ]
``

The generator should then produce an appropriate result.

---

# Main Concept

MindASCII consists of several systems:

``text
┌──────────────────────────────────────────────────────┐
│                     MindASCII                        │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Usage / Environment                                 │
│       ↓                                              │
│  Generator                                            │
│       ↓                                              │
│  Style Engine                                         │
│       ↓                                              │
│  Layout Engine                                        │
│       ↓                                              │
│  Box / Border Engine                                  │
│       ↓                                              │
│  Character Engine                                     │
│       ↓                                              │
│  Formatter                                            │
│       ↓                                              │
│  Preview + Editor                                     │
│       ↓                                              │
│  Export                                               │
│                                                      │
└──────────────────────────────────────────────────────┘
``

The important idea is that **usage influences generation**.

---

# Technology Stack

Use:

## Backend

- Node.js
- Express.js
- MariaDB
- Sequelize or another mature MariaDB ORM
- dotenv
- Secure authentication
- WebSocket / Socket.IO where useful

## Frontend

Prefer:

- HTML
- CSS
- Vanilla JavaScript

A frontend framework may be used if it genuinely improves the application.

Do not introduce a framework purely because it is popular.

MindASCII should remain lightweight and fast.

---

# Port

Default port:

``text
3050
``

Configured through:

``env
PORT=3050
``

Do not hardcode the port.

---

# MariaDB

Use MariaDB for application data.

Possible tables:

``text
users
sessions
projects
saved_art
templates
custom_styles
user_settings
export_history
``

Do not store every generated result automatically.

Only persist data when the user explicitly saves something or when functionality requires it.

---

# Suggested Project Structure

``text
MindASCII/
│
├── src/
│   ├── server.js
│   │
│   ├── config/
│   │   ├── database.js
│   │   └── environment.js
│   │
│   ├── controllers/
│   │   ├── generatorController.js
│   │   ├── projectController.js
│   │   ├── templateController.js
│   │   └── exportController.js
│   │
│   ├── routes/
│   │   ├── web.js
│   │   ├── api.js
│   │   ├── projects.js
│   │   └── templates.js
│   │
│   ├── services/
│   │   ├── asciiEngine.js
│   │   ├── fontEngine.js
│   │   ├── layoutEngine.js
│   │   ├── boxEngine.js
│   │   ├── borderEngine.js
│   │   ├── environmentEngine.js
│   │   ├── formatter.js
│   │   ├── exportService.js
│   │   └── projectService.js
│   │
│   ├── generators/
│   │   ├── text.js
│   │   ├── banner.js
│   │   ├── box.js
│   │   ├── table.js
│   │   ├── separator.js
│   │   ├── header.js
│   │   ├── logo.js
│   │   └── custom.js
│   │
│   ├── data/
│   │   ├── fonts/
│   │   ├── borders/
│   │   ├── styles/
│   │   ├── symbols/
│   │   └── environments/
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── SavedArt.js
│   │   ├── Template.js
│   │   └── UserSetting.js
│   │
│   └── utils/
│       ├── validation.js
│       ├── textWidth.js
│       └── formatting.js
│
├── views/
│   ├── layouts/
│   ├── home/
│   ├── generator/
│   ├── editor/
│   ├── projects/
│   ├── templates/
│   └── settings/
│
├── public/
│   ├── css/
│   ├── js/
│   └── assets/
│
├── storage/
│
├── migrations/
│
├── scripts/
│
├── .env.example
├── package.json
├── README.md
└── PROJECT.md
``

The exact architecture may be changed if there is a strong technical reason.

---

# Generator Types

MindASCII should support multiple generator modes.

## 1. Text / Banner

Convert normal text into ASCII art.

Example:

``text
MINDDEV
``

could become:

``text
██╗   ███╗██╗███╗   ██╗██████╗ ███████╗██╗   ██╗
████╗ ████║██║████╗  ██║██╔══██╗██╔════╝██║   ██║
██╔████╔██║██║██╔██╗ ██║██║  ██║█████╗  ██║   ██║
██║╚██╔╝██║██║██║╚██╗██║██║  ██║██╔══╝  ╚██╗ ██╔╝
██║ ╚═╝ ██║██║██║ ╚████║██████╔╝███████╗ ╚████╔╝
╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝  ╚═══╝
``

Support many fonts.

---

# ASCII Fonts

Provide a large collection of fonts.

Examples:

``text
Standard
Big
Small
Block
Banner
Slant
Shadow
Digital
Bubble
Thin
Bold
Rounded
Outline
Mini
Retro
Terminal
Pixel
``

The exact font collection can grow over time.

Fonts should be stored as reusable definitions rather than hardcoded inside the generator logic.

Example conceptual structure:

``json
{
  "name": "Block",
  "height": 6,
  "characters": {
    "A": [
      " ███ ",
      "█   █",
      "█████",
      "█   █",
      "█   █"
    ]
  }
}
``

---

# Styles

Styles should be separate from fonts.

Examples:

``text
Clean
Minimal
Retro
Cyber
Terminal
Developer
Industrial
Pixel
Hacker
Classic
Modern
Cute
Heavy
Thin
``

A style can influence:

- Font
- Border
- Spacing
- Alignment
- Character set
- Prefix/suffix
- Width
- Padding

---

# Boxes

Boxes are a major feature.

MindASCII should have a dedicated Box Generator.

Example:

``text
┌──────────────────────────────┐
│          MindASCII           │
├──────────────────────────────┤
│ ASCII Art Generator          │
└──────────────────────────────┘
``

Allow different border sets.

---

# Border Sets

Include many border styles.

## Single

``text
┌────────────┐
│            │
└────────────┘
``

## Double

``text
╔════════════╗
║            ║
╚════════════╝
``

## Rounded

``text
╭────────────╮
│            │
╰────────────╯
``

## Heavy

``text
┏━━━━━━━━━━━━┓
┃            ┃
┗━━━━━━━━━━━━┛
``

## ASCII-only

``text
+------------+
|            |
+------------+
``

## Dashed

``text
+------------+
|............|
+------------+
``

Create a large reusable border library.

---

# Box Configuration

Users should be able to configure:

``text
Width
Height
Padding
Border
Border thickness
Alignment
Vertical alignment
Title
Title alignment
Footer
Footer alignment
``

Example:

``text
Border:

[ Double ]

Width:

[ 60 ]

Padding:

[ 2 ]

Title:

[ MindASCII ]

Alignment:

[ Center ]
``

---

# Headers

Create a Header Generator.

Example:

``text
============================================================
                    MINDDEVELOPMENT
============================================================
``

Or:

``text
╔══════════════════════════════════════════════════════════╗
║                    MINDDEVELOPMENT                      ║
╚══════════════════════════════════════════════════════════╝
``

Support:

- Top border
- Bottom border
- Both
- No border
- Center
- Left
- Right

---

# Separators

Create a separator generator.

Examples:

``text
------------------------------------------------------------
============================================================
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
............................................................
───────────────────────────────────────────────────────────
═══════════════════════════════════════════════════════════
``

Allow:

``text
Character
Length
Pattern
Spacing
Prefix
Suffix
``

---

# ASCII Tables

Create a table generator.

Example:

``text
┌──────────────┬──────────────┬──────────────┐
│ Name         │ Status       │ Port         │
├──────────────┼──────────────┼──────────────┤
│ MindDocker   │ Running      │ 3050         │
│ MindASCII    │ Development  │ 3050         │
└──────────────┴──────────────┴──────────────┘
``

Users should be able to:

- Add columns
- Remove columns
- Add rows
- Remove rows
- Resize columns
- Set alignment
- Set borders
- Set header style

---

# Code Comment Generator

This is particularly important.

MindASCII should support code comments.

Example:

``text
// ============================================================
// MindDevelopment
// ============================================================
``

Or:

``text
/* ============================================================
 * MindDevelopment
 * ============================================================ */
``

Support languages/environments such as:

``text
JavaScript
TypeScript
Python
C
C++
C#
Java
PHP
HTML
CSS
SQL
Shell
PowerShell
Lua
Rust
Go
JSONC
YAML
Markdown
``

The user should select:

``text
Usage:
[ VS Code ]

Language:
[ JavaScript ]

Style:
[ Header ]
``

MindASCII should then automatically use the correct comment syntax.

---

# Usage / Environment Presets

One of MindASCII's most important features.

Users should be able to select where their ASCII art will be used.

Examples:

``text
VS Code
Terminal
Windows CMD
PowerShell
Linux Terminal
Bash
GitHub README
GitLab README
Markdown
Discord
Code Comment
CLI Application
README
Website
Documentation
Discord Bot
NPM Package
Git Repository
``

Each environment can define:

``text
Maximum recommended width
Allowed characters
Comment syntax
ANSI support
Unicode support
Recommended fonts
Recommended borders
Recommended spacing
``

---

# VS Code Preset

When:

``text
Usage = VS Code
``

MindASCII should consider:

- Monospace rendering
- Source-code comment syntax
- Recommended line width
- Unicode support
- Tab/space behavior
- Language-specific comments

Example:

``text
Language:
JavaScript
``

Output:

``text
// ╔════════════════════════════════════════════════════════╗
// ║                    MindDevelopment                    ║
// ╚════════════════════════════════════════════════════════╝
``

---

# Terminal Preset

For terminal output:

``text
Usage:
Linux Terminal
``

Prefer:

- Monospace-safe output
- ANSI-compatible characters
- Configurable Unicode usage
- Terminal width
- No unnecessary whitespace

Allow terminal widths such as:

``text
40
60
80
100
120
160
Custom
``

---

# README Preset

For Markdown:

``text
Usage:
GitHub README
``

Consider:

- Markdown code blocks
- Maximum width
- Unicode support
- Copy/paste safety

Provide an export like:

`````markdown
```text
╔════════════════════════════════════╗
║          MindDevelopment           ║
╚════════════════════════════════════╝
```
`````

---

# Discord Preset

For Discord:

- Respect message width
- Support code blocks
- Avoid characters that render inconsistently
- Provide easy copy output

Example:

`````text
```text
╔══════════════════════╗
║      MindASCII       ║
╚══════════════════════╝
```
`````

---

# Width Engine

MindASCII must have a proper width engine.

Users should be able to specify:

``text
Width:
80
``

The generator should ensure output does not exceed the selected width where possible.

Support:

``text
Auto
40
60
80
100
120
160
Custom
``

The system should calculate:

- Visible character width
- Padding
- Borders
- Text width
- Alignment

---

# Height

Allow users to configure maximum height where appropriate.

Example:

``text
Maximum height:
10 lines
``

The generator should attempt to fit the requested output.

---

# Alignment

Support:

``text
Left
Center
Right
Justified
``

For vertical layouts:

``text
Top
Center
Bottom
``

---

# Character Sets

Allow selecting character sets.

Examples:

``text
ASCII only

+
-
|
/

Unicode

┌ ┐ └ ┘
─ │
╔ ╗ ╚ ╝
═ ║
``

Other possible sets:

``text
Box Drawing
Block Elements
Braille
Technical
Minimal
Terminal Safe
``

Users should be able to create custom character sets.

---

# ASCII Composition

MindASCII should allow multiple generated elements to be combined.

Example:

``text
+----------------------------------------------------------+
|                                                          |
|                    MINDDEVELOPMENT                       |
|                                                          |
|   NodeJS Tools         Docker Tools       Web Tools      |
|                                                          |
+----------------------------------------------------------+
``

A user should be able to combine:

``text
Banner
+
Box
+
Separator
+
Text
``

into one composition.

---

# Visual Editor

Create a visual ASCII editor.

The editor should contain:

``text
┌─────────────────────────────────────────────────────────┐
│ Toolbar                                                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                 ASCII CANVAS                            │
│                                                         │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ Character count: 124                                     │
│ Width: 60       Height: 8                                │
└─────────────────────────────────────────────────────────┘
``

Users should be able to directly edit generated ASCII.

---

# Manual Editing

Generated output must never be locked.

Users can modify it manually.

Support:

- Text editing
- Copy
- Cut
- Paste
- Undo
- Redo
- Select all
- Find
- Replace

Preserve whitespace.

Do not collapse multiple spaces.

---

# Live Preview

Changing a setting should update the preview.

For example:

``text
Font:
Block → Shadow
``

should immediately regenerate the preview.

No full-page reload.

---

# Generator Interface

Create a professional generator interface.

Example:

``text
┌──────────────────────────────────────────────────────────────┐
│ MindASCII                                                    │
├───────────────────────┬──────────────────────────────────────┤
│ GENERATOR             │ PREVIEW                              │
│                       │                                      │
│ Type                  │    ████                              │
│ [ Banner ▼ ]          │   █    █                             │
│                       │   ████                               │
│ Text                  │                                      │
│ [ MindASCII ]         │                                      │
│                       │                                      │
│ Usage                 │                                      │
│ [ VS Code ▼ ]         │                                      │
│                       │                                      │
│ Language              │                                      │
│ [ JavaScript ▼ ]      │                                      │
│                       │                                      │
│ Font                  │                                      │
│ [ Block ▼ ]           │                                      │
│                       │                                      │
│ Border                │                                      │
│ [ Double ▼ ]          │                                      │
│                       │                                      │
│ Width                 │                                      │
│ [ 80 ]                │                                      │
│                       │                                      │
│ [ Generate ]          │                                      │
└───────────────────────┴──────────────────────────────────────┘
``

---

# Projects

Allow users to save ASCII projects.

A project should contain:

``text
Name
Description
Generator type
Settings
Generated output
Created date
Updated date
``

Example:

``text
MindDevelopment Header
MindDocker Banner
MindGit README
MindNode Comment
``

---

# Templates

Create a template library.

Templates can include:

``text
GitHub README Header
Node.js Header
Express Header
Docker Header
CLI Header
Project Header
Copyright Header
Section Header
Warning Box
Info Box
Success Box
Error Box
``

Users should be able to:

``text
Use template
Edit template
Duplicate template
Save as custom template
``

---

# Developer Templates

Include templates useful for developers.

Examples:

## Project Header

``text
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║                    MindDevelopment                       ║
║                                                          ║
║                    MindDocker                            ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
``

## Section Header

``text
// ============================================================
// Docker Configuration
// ============================================================
``

## Warning

``text
╔══════════════════════════════════════════════════════════╗
║ ⚠ WARNING                                                ║
║                                                          ║
║ This operation may permanently delete data.              ║
╚══════════════════════════════════════════════════════════╝
``

---

# Custom Templates

Users should be able to build templates.

Allow placeholders:

``text
{{title}}
{{subtitle}}
{{date}}
{{author}}
{{version}}
{{description}}
``

Example:

``text
╔══════════════════════════════════════════════════════════╗
║ {{title}}                                                ║
║                                                          ║
║ {{description}}                                          ║
║                                                          ║
║ Author: {{author}}                                       ║
╚══════════════════════════════════════════════════════════╝
``

---

# ASCII Validation

Before exporting, MindASCII should optionally validate:

``text
Maximum width
Maximum height
Unsupported characters
Invalid Unicode
Unbalanced borders
Trailing whitespace
``

Example:

``text
⚠ Output exceeds the recommended 80-character width.
``

Allow:

``text
Fix automatically
Ignore
``

---

# Formatting Tools

Provide tools such as:

``text
Trim trailing whitespace
Normalize line endings
Normalize indentation
Center artwork
Left align
Right align
Normalize width
Add padding
Remove padding
``

---

# Copy & Export

Support:

``text
Copy to clipboard
Download .txt
Download .md
Download .json
``

For code output:

``text
Copy as JavaScript
Copy as Python
Copy as Bash
Copy as C++
``

depending on selected language.

---

# Export Formats

Support at minimum:

``text
TXT
Markdown
JSON
``

Possible future:

``text
HTML
SVG
PNG
``

PNG/SVG export should only be added if it fits the ASCII philosophy.

---

# Shareable Projects

Future functionality may allow generating a shareable link.

Example:

``text
mindascii.example/project/abc123
``

A shared project should contain only intentionally shared data.

Private projects must remain private.

---

# ASCII Preview Modes

Provide different preview modes.

## Raw

Show exact characters.

## Terminal

Render inside a terminal-style panel.

## Code

Render using code-editor-like formatting.

## Markdown

Render inside a Markdown code block.

## Discord

Preview inside a Discord-like code block.

---

# Font Browser

Create a font browser.

Users should be able to browse fonts visually.

Example:

``text
Block

████
██ █
████


Shadow

████
█  █
████
``

Allow:

``text
Search fonts...
``

Categories:

``text
Classic
Modern
Retro
Pixel
Developer
Terminal
Decorative
Minimal
``

---

# Border Browser

Do the same for borders.

Display previews:

``text
Single
┌──────┐
│      │
└──────┘

Double
╔══════╗
║      ║
╚══════╝

Rounded
╭──────╮
│      │
╰──────╯
``

Users can click a border to select it.

---

# Style Browser

Create a style browser.

Examples:

``text
Classic
Modern
Cyber
Terminal
Developer
Retro
Minimal
Industrial
``

Each style should have a visual preview.

---

# Symbol Library

Create a symbol library.

Categories:

``text
Arrows
Stars
Boxes
Checkmarks
Warnings
Math
Technical
Separators
Decorative
Developer
``

Examples:

``text
→
←
↑
↓
✓
✕
⚠
★
◆
■
●
``

Allow users to copy symbols.

---

# Unicode Awareness

ASCII and Unicode are not always visually equivalent.

MindASCII should clearly distinguish:

``text
ASCII Safe
Unicode
Extended Unicode
``

For example:

``text
ASCII:
+-----+

Unicode:
┌─────┐
``

If the selected environment is ASCII-only, warn when Unicode characters are used.

---

# Developer Mode

Provide a dedicated Developer Mode.

Developer Mode should expose additional options:

``text
Language
Comment syntax
Indentation
Maximum width
ASCII-only
Unicode
Line ending
Header/footer
Copyright
Author
Version
``

This mode should be particularly useful for creating source-code headers.

---

# Copyright Header Generator

Because MindASCII is made by MindDevelopment, include a useful copyright/header generator.

Example:

``text
// ============================================================
// MindDevelopment
// MindDocker
//
// Copyright © 2026 MindDevelopment
// ============================================================
``

Allow:

``text
Author
Project
Year
License
Description
``

and language selection.

---

# API

MindASCII should expose an internal API.

Example:

``text
POST /api/generate
POST /api/box
POST /api/banner
POST /api/table
POST /api/separator

GET /api/fonts
GET /api/styles
GET /api/borders
GET /api/environments
GET /api/templates
``

Example request:

``json
{
  "type": "banner",
  "text": "MindASCII",
  "font": "block",
  "usage": "vscode",
  "width": 80
}
``

Return:

``json
{
  "success": true,
  "output": "..."
}
``

---

# Performance

Generation should be fast.

Normal ASCII generation should happen locally/server-side without noticeable delay.

Do not use external APIs for basic ASCII generation.

MindASCII must work without an internet connection after the application itself is loaded.

---

# Security

Implement:

- Authentication
- CSRF protection
- Rate limiting
- Input validation
- Output escaping
- Secure sessions
- Security headers

Never execute generated ASCII as code.

Treat all user-created content as untrusted data.

---

# UI Design

MindASCII should have a modern developer-oriented interface.

Recommended design:

``text
Dark theme
Monospace preview
Modern sidebar
Clean cards
Compact controls
Large preview
Keyboard shortcuts
``

The ASCII preview should be the most important visual element.

Avoid making the application look like a generic AI dashboard.

It should feel like a specialized developer tool.

---

# Keyboard Shortcuts

Support useful shortcuts:

``text
Ctrl + Enter
Generate

Ctrl + S
Save project

Ctrl + Shift + C
Copy

Ctrl + Z
Undo

Ctrl + Shift + Z
Redo

Ctrl + A
Select all
``

Display shortcuts where appropriate.

---

# Responsive Design

MindASCII must work on:

- Desktop
- Laptop
- Tablet
- Mobile

On mobile, the editor and settings can become vertically stacked.

---

# Theme

Support:

``text
Dark
Light
System
``

Dark mode can be the default.

---

# Settings

Settings should include:

``text
Theme
Default width
Default usage
Default font
Default border
Default character set
Auto-generate
Auto-save
Editor font size
Preview font size
``

---

# Testing

Test at least:

``text
ASCII generation
Font loading
Text width calculations
Box generation
Border generation
Table generation
Alignment
Width limits
Code comments
VS Code preset
Terminal preset
Markdown preset
Project saving
Template loading
API endpoints
``

Pay special attention to whitespace.

ASCII generators frequently break because spaces or line endings are handled incorrectly.

---

# Avoid

Do not:

- Make this only a basic FIGlet clone.
- Depend on an external ASCII generation API.
- Hardcode every generator into one massive file.
- Collapse whitespace.
- Automatically remove spaces from user output.
- Ignore line width.
- Assume Unicode works everywhere.
- Create fake generator buttons.
- Create hundreds of settings that do nothing.
- Store every generated result in MariaDB automatically.

---

# Development Phases

## Phase 1 — Foundation

Implement:

- Node.js
- Express
- MariaDB
- Authentication
- Basic UI
- Generator API
- Basic project structure

---

## Phase 2 — Basic Generator

Implement:

- Text generator
- ASCII fonts
- Styles
- Live preview
- Copy functionality

---

## Phase 3 — Layout Engine

Implement:

- Width
- Height
- Alignment
- Padding
- Spacing
- Character sets

---

## Phase 4 — Boxes & Borders

Implement:

- Box generator
- Border library
- Headers
- Separators
- Titles
- Footers

---

## Phase 5 — Developer Tools

Implement:

- Code comments
- Language presets
- VS Code preset
- Terminal preset
- Markdown preset
- Copyright headers

---

## Phase 6 — Advanced Generators

Implement:

- Tables
- Logos
- Compositions
- Templates
- Symbol library

---

## Phase 7 — Editor

Implement:

- Manual editing
- Undo
- Redo
- Find
- Replace
- Keyboard shortcuts
- Formatting tools

---

## Phase 8 — Projects

Implement:

- Save projects
- Edit projects
- Duplicate
- Delete
- Templates
- User settings

---

## Phase 9 — Export

Implement:

- TXT
- Markdown
- JSON
- Language-specific code output

---

## Phase 10 — Polish

Implement:

- Responsive design
- Performance improvements
- Better previews
- Font browser
- Border browser
- Style browser
- Documentation
- Testing

---

# AI Developer Instructions

You are building **MindASCII** for MindDevelopment.

This is not supposed to be a simple:

``text
Input → FIGlet → Output
``

application.

The goal is to build a complete ASCII creation tool.

Think of MindASCII as:

``text
ASCII Generator
+
ASCII Editor
+
ASCII Layout Engine
+
ASCII Template Library
+
Developer Header Generator
+
Code Comment Generator
+
ASCII Design Studio
``

Build the underlying architecture so new generators, fonts, borders, styles and environments can be added without rewriting the entire application.

Prefer data-driven definitions.

For example:

``text
New font
→ Add font definition

New border
→ Add border definition

New environment
→ Add environment definition

New language
→ Add comment syntax definition
``

Do not hardcode these into large conditional statements.

---

# Definition of Done

MindASCII is considered functional when a user can:

``text
✓ Open MindASCII
✓ Generate ASCII text
✓ Select a font
✓ Select a style
✓ Select an environment
✓ Set width
✓ Set alignment
✓ Generate boxes
✓ Select borders
✓ Generate headers
✓ Generate separators
✓ Generate tables
✓ Generate code comments
✓ Select programming language
✓ Generate VS Code-friendly output
✓ Generate terminal-friendly output
✓ Generate Markdown-friendly output
✓ Preview the output
✓ Manually edit the output
✓ Copy the result
✓ Save projects
✓ Load projects
✓ Use templates
✓ Export TXT
✓ Export Markdown
✓ Export JSON
✓ Browse fonts
✓ Browse borders
✓ Browse styles
✓ Browse symbols
``

All major controls must perform real functionality.

No fake buttons.

No placeholder generators.
