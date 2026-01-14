# Extraction des customizations VS Code vers le theme Monokai Black

## Analyse de ton `settings.json`

J'ai identifie 22 overrides de couleurs dans `workbench.colorCustomizations` qui peuvent etre integres directement dans le theme.

---

## Customizations a integrer

| Setting | Ta valeur | Valeur actuelle theme | Action |
|---------|-----------|----------------------|--------|
| `terminal.background` | `#000000` | `#000000` | Deja fait |
| `panel.background` | `#000000` | `#363537` | A changer |
| `panel.border` | `#333333` | `#222222` | A changer |
| `sideBar.background` | `#000000` | `#191919` | A changer |
| `sideBar.border` | `#333333` | `#131313` | A changer |
| `editorGroupHeader.tabsBackground` | `#000000` | `#222222` | A changer |
| `editorGroupHeader.border` | `#000000` | Non defini | A ajouter |
| `editorGroupHeader.tabsBorder` | `#000000` | `#222222` | A changer |
| `tab.activeBackground` | `#222222` | `#222222` | Identique |
| `tab.inactiveBackground` | `#000000` | `#222222` | A changer |
| `tab.border` | `#000000` | `#222222` | A changer |
| `titleBar.activeBackground` | `#000000` | `#191919` | A changer |
| `titleBar.activeForeground` | `#aaaaaa` | `#8b888f` | A changer |
| `titleBar.inactiveBackground` | `#000000` | `#191919` | A changer |
| `titleBar.inactiveForeground` | `#333333` | `#525053` | A changer |
| `titleBar.border` | `#333333` | `#131313` | A changer |
| `notebook.cellEditorBackground` | `#000000` | `#1919197f` | A changer |
| `notebook.editorBackground` | `#000000` | `#222222` | A changer |
| `notebook.cellBorderColor` | `#333333` | `#363537` | A changer |
| `notebook.outputContainerBackgroundColor` | `#000000` | Non defini | A ajouter |
| `editorOverviewRuler.border` | `#000000` | `#222222` | A changer |

---

## Settings a supprimer de ton fichier

Ces lignes peuvent etre supprimees apres integration dans le theme :

```json
// SUPPRIMER - Lignes 52-74
"workbench.colorCustomizations": {
  "terminal.background": "#000000",
  "panel.background": "#000000",
  "panel.border": "#333",
  "sideBar.background": "#000",
  "sideBar.border": "#333",
  "editorGroupHeader.tabsBackground": "#000000",
  "editorGroupHeader.border": "#000000",
  "editorGroupHeader.tabsBorder": "#000000",
  "tab.activeBackground": "#222",
  "tab.inactiveBackground": "#000000",
  "tab.border": "#000000",
  "titleBar.activeBackground": "#000000",
  "titleBar.activeForeground": "#aaa",
  "titleBar.inactiveBackground": "#000",
  "titleBar.inactiveForeground": "#333",
  "titleBar.border": "#333",
  "notebook.cellEditorBackground": "#000",
  "notebook.editorBackground": "#000000",
  "notebook.cellBorderColor": "#333",
  "notebook.outputContainerBackgroundColor": "#000",
  "editorOverviewRuler.border": "#000000"
},

// SUPPRIMER - Ligne 75 (utilise notre extension maintenant)
"markdownShiki.theme": "monokai",
```

---

## Setting a conserver

```json
// CONSERVER - concerne l'extension material-icon-theme, pas notre theme
"material-icon-theme.folders.color": "#999",
"material-icon-theme.files.color": "#999",
"workbench.iconTheme": "material-icon-theme",
```

---

## Philosophie des changements

### Pourquoi ces valeurs ?

**Fond noir pur (`#000000`)** : Tu as systematiquement remplace les gris fonces par du noir pur pour :
- Terminal, panels, sidebar, tabs inactifs, title bar, notebooks
- Ca donne un look plus "OLED-friendly" et minimaliste

**Bordures grises (`#333333`)** : Tu utilises `#333` comme bordure subtile pour :
- Panel, sidebar, title bar, notebooks
- Plus visible que les `#131313` / `#222222` du theme original

**Titre bar plus lisible** : `#aaaaaa` au lieu de `#8b888f` = meilleur contraste

### Incertitudes

| Element | Question |
|---------|----------|
| `titleBar.activeForeground` | `#aaaaaa` vs `#8b888f` - Le `#aaa` est plus lisible mais moins "Monokai". Je recommande de garder ta valeur `#aaaaaa`. |
| `notebook.outputContainerBackgroundColor` | Pas defini dans le theme original. L'ajouter ? Je recommande oui. |

---

## Fichier settings.json minimal propose

Voici ton fichier nettoye (sans les overrides de theme) :

```json
{
  // === EDITOR ===
  "editor.detectIndentation": true,
  "editor.dragAndDrop": true,
  "editor.renderWhitespace": "trailing",
  "editor.rulers": [250],
  "editor.wordWrap": "on",
  "editor.glyphMargin": true,
  "editor.guides.indentation": true,
  "editor.cursorStyle": "line",
  "editor.cursorWidth": 3,
  "editor.cursorBlinking": "solid",
  "editor.stickyScroll.enabled": true,
  "editor.stickyScroll.maxLineCount": 20,
  "editor.renderControlCharacters": true,
  "editor.formatOnSave": true,
  "editor.fastScrollSensitivity": 10,
  "editor.mouseWheelScrollSensitivity": 4,
  "editor.smoothScrolling": true,
  "editor.minimap.enabled": false,
  "editor.inlineSuggest.suppressSuggestions": true,

  // === FONTS ===
  "editor.fontFamily": "'Monaspace Argon Var'",
  "editor.fontLigatures": "'calt', 'liga', 'dlig', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08'",
  "terminal.integrated.fontFamily": "'Monaspace Argon Var'",

  // === WORKBENCH ===
  "workbench.startupEditor": "newUntitledFile",
  "workbench.editor.enablePreview": true,
  "workbench.editor.empty.hint": "hidden",
  "workbench.editor.wrapTabs": true,
  "workbench.editor.scrollToSwitchTabs": true,
  "workbench.editor.showTabs": "single",
  "workbench.editor.centeredLayoutAutoResize": false,
  "workbench.sideBar.location": "right",
  "workbench.secondarySideBar.showLabels": false,
  "workbench.list.mouseWheelScrollSensitivity": 4,
  "workbench.list.smoothScrolling": true,
  "workbench.list.fastScrollSensitivity": 10,
  "workbench.colorTheme": "Monokai Black",

  // === ICON THEME (garde - pas notre extension) ===
  "workbench.iconTheme": "material-icon-theme",
  "material-icon-theme.folders.theme": "classic",
  "material-icon-theme.hidesExplorerArrows": false,
  "material-icon-theme.activeIconPack": "angular",
  "material-icon-theme.folders.color": "#999",
  "material-icon-theme.files.color": "#999",

  // === FILES ===
  "files.trimTrailingWhitespace": true,
  "files.trimFinalNewlines": true,
  "files.exclude": { "**/.git": false },
  "explorer.confirmDragAndDrop": false,
  "explorer.openEditors.visible": 20,

  // === EDITOR ASSOCIATIONS ===
  "workbench.editorAssociations": {
    "*.ipynb": "jupyter-notebook",
    "*.md": "vscode.markdown.preview.editor"
  },

  // === NOTEBOOK ===
  "notebook.cellToolbarLocation": { "jupyter-notebook": "left", "default": "left" },
  "notebook.showFoldingControls": "always",
  "notebook.cellToolbarVisibility": "hover",
  "notebook.cellFocusIndicator": "border",
  "notebook.lineNumbers": "on",
  "notebook.stickyScroll.enabled": true,
  "notebook.output.wordWrap": true,
  "notebook.output.scrolling": true,
  "notebook.variablesView": true,
  "notebook.experimental.variablesView": true,
  "notebook.outline.showCodeCellSymbols": false,
  "notebook.editorOptionsCustomizations": {
    "editor.tabSize": 4,
    "editor.indentSize": 4,
    "editor.insertSpaces": false
  },

  // === TERMINAL ===
  "terminal.integrated.gpuAcceleration": "on",
  "terminal.integrated.defaultProfile.windows": "Git Bash",
  "terminal.integrated.scrollback": 30000,
  "terminal.integrated.enableMultiLinePasteWarning": "never",

  // === WINDOW ===
  "window.menuBarVisibility": "classic",
  "window.title": "${dirty}${rootName} / ${activeEditorShort}${separator}${separator}${profileName}${separator}${appName}",

  // === GIT ===
  "git.confirmSync": false,
  "git.postCommitCommand": "push",
  "git.enableSmartCommit": true,
  "git.allowForcePush": true,
  "git.openRepositoryInParentFolders": "never",
  "gitlens.views.branches.showBranchComparison": false,
  "gitlens.ai.model": "vscode",
  "gitlens.ai.vscode.model": "copilot:gpt-4.1",

  // === DIFF ===
  "diffEditor.codeLens": true,
  "diffEditor.renderSideBySide": true,
  "diffEditor.hideUnchangedRegions.enabled": true,

  // === PYTHON ===
  "python.languageServer": "Pylance",
  "python.analysis.typeCheckingMode": "basic",
  "python.analysis.typeEvaluation.strictParameterNoneValue": false,
  "jupyter.askForKernelRestart": false,

  // === FORMATTERS ===
  "[html]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[json]": { "editor.defaultFormatter": "vscode.json-language-features" },
  "[jsonc]": { "editor.defaultFormatter": "vscode.json-language-features" },
  "[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[css]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[typescript]": { "editor.defaultFormatter": "vscode.typescript-language-features" },
  "[yaml]": { "editor.defaultFormatter": "redhat.vscode-yaml" },
  "[dockercompose]": {
    "editor.insertSpaces": true,
    "editor.tabSize": 2,
    "editor.autoIndent": "advanced",
    "editor.quickSuggestions": { "other": true, "comments": false, "strings": true },
    "editor.defaultFormatter": "redhat.vscode-yaml"
  },
  "[github-actions-workflow]": { "editor.defaultFormatter": "redhat.vscode-yaml" },

  // === REMOTE ===
  "remote.SSH.defaultExtensions": ["gitpod.gitpod-remote-ssh"],
  "remote.SSH.remotePlatform": {
    // ... tes hosts
  },

  // === TELEMETRY (off) ===
  "redhat.telemetry.enabled": false,
  "continue.telemetry.enabled": false,
  "database-client.telemetry.usesOnlineServices": false,

  // === COPILOT / AI ===
  "github.copilot.enable": { "*": false, "plaintext": false, "markdown": false, "scminput": false },
  "github.copilot.nextEditSuggestions.enabled": true,
  // ... autres settings copilot

  // === MISC ===
  "timeline.pageOnScroll": false,
  "accessibility.voice.speechLanguage": "en-US",
  "accessibility.voice.speechTimeout": 0,
  "chat.mcp.gallery.enabled": true,
  "claudeCode.preferredLocation": "panel",
  "deno.enable": false,
  "biome.suggestInstallingGlobally": false
}
```

---

## Prochaines etapes

1. **Approuve les changements** ci-dessus
2. Je mets a jour `Monokai Black.json` avec les 20 nouvelles valeurs
3. Je rebuild le VSIX
4. Tu testes et supprimes les overrides de ton settings.json

Confirme si tu veux que j'applique ces changements au theme.
