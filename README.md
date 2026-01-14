# Monokai Black for Visual Studio Code

The full documentation is in [./Source/extension/README.md](./Source/extension/README.md).

## Quick Start

```bash
cd Source/extension
npm install
npm run build
npm run package
code --install-extension *.vsix --force
```

## Repository Structure

```
monokai-black-vscode/
├── Source/
│   └── extension/          # VS Code extension source
│       ├── src/            # TypeScript source code
│       ├── dist/           # Bundled JavaScript (generated)
│       ├── themes/         # Color theme JSON files
│       ├── media/          # CSS for markdown preview
│       └── test/           # Test files
├── .github/
│   └── workflows/          # CI/CD pipelines
├── Build/                  # Old build artifacts (deprecated)
└── Tests/                  # Sample code for theme testing
```
