# Monokai Black VS Code Extension

## Project Overview

This is a VS Code color theme extension that provides:
1. **Monokai Black theme**: A dark theme with true black (#000000) background
2. **Markdown Preview syntax highlighting**: Uses Shiki to highlight code blocks in markdown previews with Monokai Black colors

## Project Structure

```
monokai-black-vscode/
├── Source/extension/           # Main extension source
│   ├── src/extension.ts       # Extension entry point
│   ├── themes/                # Theme definition files
│   │   ├── Monokai Black.json       # VS Code editor theme
│   │   └── monokai-black-shiki.json # Shiki theme for markdown
│   ├── media/                 # Static assets
│   │   └── markdown-preview.css     # Markdown preview styling
│   ├── package.json           # Extension manifest
│   └── esbuild.config.mjs     # Build configuration
├── build/                     # Built .vsix files go here
└── tests/                     # Test markdown files
```

## Development Workflow

### Prerequisites
- Node.js 18+
- npm

### Building the Extension

```bash
cd Source/extension
npm install          # Install dependencies (first time only)
npm run build        # Build for production
npm run package      # Build and create .vsix in build/
```

### Testing Locally

1. Build the extension: `npm run package`
2. In VS Code: `Ctrl+Shift+P` → "Extensions: Install from VSIX..."
3. Select `build/theme-monokai-black-vscode-x.x.x.vsix`
4. Reload VS Code
5. Open a markdown file with code blocks (e.g., `tests/05-COMPONENT-BREAKDOWN.md`)
6. Open markdown preview: `Ctrl+Shift+V` or click preview icon

### Debugging

View extension logs:
1. Open VS Code Developer Tools: `Help` → `Toggle Developer Tools`
2. Go to Console tab
3. Filter by `[Monokai Black]`

Key log messages:
- `Extension activating...` - Shows remote context info
- `extendMarkdownIt called` - Confirms markdown plugin is loaded
- `Theme check:` - Shows detected theme name
- `Shiki highlighter initialized` - Confirms Shiki is ready

## Key Technical Details

### Extension Kind

The extension uses `"extensionKind": ["ui"]` to ensure it runs on the client side (not the remote server). This is critical for markdown preview functionality in remote environments (Codespaces, SSH, WSL).

### Markdown Preview Pipeline

1. VS Code calls `activate()` when extension loads
2. `activate()` returns object with `extendMarkdownIt(md)` method
3. VS Code passes markdown-it instance to `extendMarkdownIt`
4. Extension overrides `md.renderer.rules.fence` to intercept code blocks
5. For each code block:
   - Check if Monokai Black theme is active
   - If yes + Shiki ready: Use Shiki highlighting
   - Otherwise: Fall back to default renderer

### Theme Detection

The function `isMonokaiBlackThemeActive()` checks if the current VS Code theme contains "monokai black" (case-insensitive). In remote contexts with unknown theme, it defaults to active.

## Common Issues

### Syntax highlighting not working in Codespaces/Remote

**Symptoms**: Markdown preview shows code blocks without Monokai Black colors

**Causes**:
1. `extensionKind` includes "workspace" - extension runs on server instead of client
2. Theme detection fails in remote context
3. Shiki not initialized before first render

**Solutions**:
1. Ensure `extensionKind` is `["ui"]` only
2. Check logs for theme detection results
3. Close and reopen markdown preview after extension loads

### Build size is large (~9MB)

This is expected due to bundling Shiki with multiple language grammars. The build uses esbuild for optimal bundling.

## Version Management

Version is in `Source/extension/package.json`. The GitHub Actions workflow auto-increments patch version on publish to marketplace.
