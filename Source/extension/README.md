# Monokai Black

A true black Monokai theme for VS Code. Pure `#000000` backgrounds, Monokai-inspired syntax colors, and built-in markdown preview highlighting.

## Features

- **True black** editor, terminal, and panel backgrounds
- **Monokai palette** optimized for readability
- **Markdown preview** with syntax-highlighted code blocks (Shiki)
- **Semantic highlighting** support

## Install

Search "Monokai Black" in VS Code Extensions, or:

```
ext install brio-plus.theme-monokai-black-vscode
```

## Recommended Setup

For the complete Monokai Black experience, we recommend:

### 1. Monaspace Argon Font

A beautiful monospace font with ligatures:
1. Download from [Monaspace Releases](https://github.com/githubnext/monaspace/releases/latest)
2. Install **monaspace-variable** on your system

### 2. Material Icon Theme

Clean, minimal file icons:
1. Install [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) from the VS Code Marketplace

### 3. User Settings

Open your `settings.json` (`Ctrl+Shift+P` → "Preferences: Open User Settings (JSON)") and add:

```json
{
  // Color theme
  "workbench.colorTheme": "Monokai Black",

  // Fonts
  "editor.fontFamily": "'Monaspace Argon Var'",
  "editor.fontLigatures": "'calt', 'liga', 'dlig', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08'",
  "editor.renderControlCharacters": true,
  "terminal.integrated.fontFamily": "'Monaspace Argon Var'",

  // Explorer icons
  "workbench.iconTheme": "material-icon-theme",
  "material-icon-theme.folders.theme": "classic",
  "material-icon-theme.hidesExplorerArrows": false,
  "material-icon-theme.activeIconPack": "angular",
  "material-icon-theme.folders.color": "#999",
  "material-icon-theme.files.color": "#999"
}
```

## Color Palette

| Token      | Color     | Hex       |
| ---------- | --------- | --------- |
| Background | Black     | `#000000` |
| Foreground | Off-white | `#f7f1ff` |
| Strings    | Yellow    | `#fce566` |
| Keywords   | Pink      | `#fc618d` |
| Functions  | Green     | `#7bd88f` |
| Comments   | Gray      | `#69676c` |
| Types      | Cyan      | `#5ad4e6` |
| Constants  | Purple    | `#948ae3` |
| Parameters | Orange    | `#fd9353` |

## Screenshots

**Python**
![Python](https://raw.githubusercontent.com/brio-plus/monokai-black-vscode/main/Source/extension/images/python_test.png)

**TypeScript**
![TypeScript](https://raw.githubusercontent.com/brio-plus/monokai-black-vscode/main/Source/extension/images/typescript_test.png)

## Markdown Preview

Code blocks in markdown preview render with Monokai Black colors. Open any `.md` file and press `Ctrl+Shift+V` to preview.

![Markdown](https://raw.githubusercontent.com/brio-plus/monokai-black-vscode/main/Source/extension/images/markdown_test.png)

## License

MIT - [Brio.Plus](https://brio.plus)
