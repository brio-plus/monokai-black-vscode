# Monokai Black for Visual Studio Code

Monokai Black is a beautiful dark color theme for Visual Studio Code with true black backgrounds. Focus on your code without eye strain.

## Features

- **True Black Background**: Uses `#000000` for the editor and terminal backgrounds
- **Monokai-inspired Colors**: Carefully selected colors for optimal readability
- **Markdown Preview Syntax Highlighting**: Code blocks in markdown preview are highlighted using the same Monokai Black colors (powered by Shiki)
- **Semantic Highlighting**: Full support for VS Code's semantic token highlighting

## Installation

### From VS Code Marketplace

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "Monokai Black"
4. Click Install
5. Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
6. Select "Preferences: Color Theme"
7. Choose "Monokai Black"

### From VSIX (Local Testing)

```bash
code --install-extension theme-monokai-black-vscode-1.1.0.vsix --force
```

## Screenshots

### Python

![Python](https://gitlab.com/yann.lischetti/monokai-black-vscode/-/raw/main/Source/extension/images/python_test.jpg "Python")

### TypeScript

![TypeScript](https://gitlab.com/yann.lischetti/monokai-black-vscode/-/raw/main/Source/extension/images/typescript_test.jpg "TypeScript")

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Black | `#000000` |
| Foreground | Off-white | `#f7f1ff` |
| Strings | Yellow | `#fce566` |
| Keywords | Pink | `#fc618d` |
| Functions | Green | `#7bd88f` |
| Comments | Gray (italic) | `#69676c` |
| Types/Classes | Cyan | `#5ad4e6` |
| Constants/Numbers | Purple | `#948ae3` |
| Parameters | Orange | `#fd9353` |

## Markdown Preview

This extension enhances VS Code's built-in markdown preview with syntax-highlighted code blocks. Open any markdown file and press `Ctrl+Shift+V` (`Cmd+Shift+V` on Mac) to see code blocks highlighted with the Monokai Black theme.

Code blocks in the preview feature:
- Black background (`#000000`)
- Gray border (`#363537`)
- Syntax highlighting matching the editor theme

## Development

### Building Locally

```bash
cd Source/extension
npm install
npm run build
npm run package
```

### Release Process

1. Create feature branch from `dev`
2. Implement changes and commit
3. Merge feature branch to `dev`
4. CI builds and uploads VSIX artifact
5. Test VSIX locally in VS Code
6. Bump version in `package.json`
7. Merge `dev` to `main`
8. Publish workflow auto-publishes if version changed

### Publishing Prerequisites

- `VSCE_PAT` secret configured in GitHub repository settings
- Personal Access Token from [Azure DevOps](https://dev.azure.com/) with Marketplace publish permissions

## Contributing

Found a bug or have a suggestion? Please open an issue on [GitHub](https://github.com/brio-plus/monokai-black-vscode/issues).

## License

MIT License - see [LICENSE.txt](LICENSE.txt) for details.

## Third-Party Licenses

This extension uses [Shiki](https://shiki.style/) for syntax highlighting in markdown preview (MIT License).

## Author

[Brio.Plus](https://brio.plus)
