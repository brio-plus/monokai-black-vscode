# Monokai Black

A true black Monokai theme for VS Code. Pure `#000000` backgrounds, Monokai-inspired syntax colors, and built-in markdown preview highlighting.

## Features

- **True black** editor, terminal, and panel backgrounds
- **Monokai palette** optimized for readability
- **Markdown preview** with syntax-highlighted code blocks (Shiki)
- **Semantic highlighting** support
- **Auto-configured** Material Icon Theme integration

## Install

Search "Monokai Black" in VS Code Extensions, or:

```
ext install brio-plus.theme-monokai-black-vscode
```

## Recommended Setup

### Material Icon Theme (Required)

This extension requires [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) for the best experience. VS Code will prompt you to install it automatically.

On first activation, Monokai Black configures Material Icon Theme with a clean, minimal appearance:
- Folder theme: Classic
- Icon colors: Gray (`#999`)
- Angular icon pack

To re-apply these settings anytime: `Ctrl+Shift+P` → **Monokai Black: Apply Material Icon Theme Settings**

### Monaspace Argon Font (Recommended)

For the complete Monokai Black experience, we strongly recommend installing **Monaspace Argon Var** - a beautiful monospace font with ligatures.

1. Download from [Monaspace Releases](https://github.com/githubnext/monaspace/releases/latest)
2. Install **monaspace-variable** on your system
3. Run `Ctrl+Shift+P` → **Monokai Black: Apply Monaspace Argon Font Settings**

This configures:
- Editor font: Monaspace Argon Var
- Terminal font: Monaspace Argon Var
- Ligatures: All stylistic sets enabled

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
![Python](images/python_test.jpg)

**TypeScript**
![TypeScript](images/typescript_test.jpg)

## Markdown Preview

Code blocks in markdown preview render with Monokai Black colors. Open any `.md` file and press `Ctrl+Shift+V` to preview.

![Markdown](images/markdown_test.jpg)

## License

MIT - [Brio.Plus](https://brio.plus)
