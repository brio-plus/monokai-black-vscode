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
│   │   ├── monokai-black-shiki.json # Shiki theme for markdown preview
│   │   └── typeql.tmLanguage.json   # Custom language grammar (TypeQL)
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

### Testing Locally (Fast Iteration)

Use CLI commands to install/uninstall without manual UI interaction:

```bash
# Uninstall current version
code --uninstall-extension brio-plus.theme-monokai-black-vscode

# Install new build
code --install-extension ../../build/theme-monokai-black-vscode-1.1.4.vsix

# Then reload VS Code window (Ctrl+Shift+P → "Reload Window")
```

Test with markdown files containing code blocks (e.g., `tests/05-COMPONENT-BREAKDOWN.md`).

### Debugging

View extension logs in VS Code Developer Tools (`Help` → `Toggle Developer Tools` → Console tab).
Filter by `[Monokai Black]` - only error logs are emitted in production.

## Version Management

### When to Bump Version

| Scenario | Bump Version? | Notes |
|----------|---------------|-------|
| Local development/testing | **No** | Overwrite same .vsix file |
| Publishing to marketplace | **Yes** | Must be higher than marketplace version |
| Testing after marketplace publish | **Yes** | Must be higher to avoid auto-update replacing your local build |

### Auto-Update Conflict

When testing locally after a marketplace publish:
- VS Code detects the marketplace version and tries to auto-update
- If your local .vsix has the same or lower version, it gets replaced
- **Solution**: Always bump to a version higher than marketplace when starting new work

### Version Location

Version is in `Source/extension/package.json`. The GitHub Actions workflow auto-increments on publish.

## Key Technical Details

### Extension Kind

```json
"extensionKind": ["workspace", "ui"]
```

The order matters for remote environments (Codespaces, SSH, WSL):
- `workspace` first: Extension runs on the remote server where markdown preview is rendered
- `ui` fallback: For local VS Code usage

### Activation Events

```json
"activationEvents": ["onLanguage:markdown"]
```

Extension activates when a markdown file is opened, ensuring Shiki is ready before preview.

### Markdown Preview Pipeline

1. VS Code calls `activate()` when a markdown file is opened
2. `activate()` returns object with `extendMarkdownIt(md)` method
3. Extension overrides `md.renderer.rules.fence` to intercept code blocks
4. For each code block: Shiki highlights with Monokai Black colors
5. Always applies Monokai Black styling (no theme detection - user installed extension for this)

### Build Size (~9MB)

The large bundle size is due to Shiki bundling ~40 TextMate grammars for language support. This is expected and necessary for syntax highlighting in markdown preview.

## Adding Custom Languages

Languages not bundled with Shiki (like TypeQL) require:

### 1. Add TextMate Grammar

Download the `.tmLanguage.json` from the language's VS Code extension repository and save to `themes/`.

### 2. Register in extension.ts

```typescript
// Import the grammar
import typeqlGrammar from '../themes/typeql.tmLanguage.json';

// Add to CUSTOM_LANGUAGES array
const CUSTOM_LANGUAGES = [
  {
    ...typeqlGrammar,        // Spread first
    name: 'typeql',          // Override with lowercase name (Shiki requirement)
    scopeName: 'source.tql'
  }
];

// Add alias if needed
const LANGUAGE_ALIASES = {
  'tql': 'typeql',
  // ...
};
```

### 3. Add Color Mappings (if needed)

If the language uses scopes that map to wrong colors, add specific rules in `monokai-black-shiki.json`:

```json
{
  "scope": "variable.parameter.tql",
  "settings": {
    "foreground": "#5ad4e6"
  }
}
```

## Common Issues

### Syntax highlighting not working in Codespaces/Remote

**Symptoms**: Markdown preview shows code blocks without Monokai Black colors, or with default VS Code highlighting.

**Causes**:
1. Extension not activated (check if markdown file was opened)
2. `extensionKind` order wrong - must have `workspace` before `ui`
3. Version conflict with marketplace (auto-update replacing local build)

**Solutions**:
1. Ensure `extensionKind` is `["workspace", "ui"]`
2. Bump version higher than marketplace
3. Uninstall, reinstall, reload window

### Custom language not highlighting

**Symptoms**: Code block shows plain text or wrong colors.

**Checklist**:
1. Grammar file exists in `themes/`
2. Grammar imported and added to `CUSTOM_LANGUAGES`
3. `name` property is lowercase (e.g., `typeql` not `TypeQL`)
4. Alias added if using shorthand (e.g., `tql` → `typeql`)
5. Color mappings added in `monokai-black-shiki.json` if needed

## Color Reference (Monokai Black Palette)

| Color | Hex | Usage |
|-------|-----|-------|
| Pink | `#fc618d` | Keywords, tags |
| Green | `#7bd88f` | Functions, strings |
| Yellow | `#fce566` | Strings, headings |
| Cyan | `#5ad4e6` | Types, classes, variables (TypeQL) |
| Purple | `#948ae3` | Constants, numbers |
| Orange | `#fd9353` | Parameters, symbols |
| Gray | `#69676c` | Comments |
| White | `#f7f1ff` | Default text |
| Black | `#000000` | Background |
