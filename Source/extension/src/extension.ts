import * as vscode from 'vscode';
import { createHighlighter, type Highlighter, type BundledLanguage } from 'shiki';

// Import the custom Monokai Black theme
import monokaiBlackTheme from '../themes/monokai-black-shiki.json';

// Singleton highlighter instance
let highlighter: Highlighter | null = null;
let highlighterPromise: Promise<Highlighter> | null = null;

// Theme name to match
const MONOKAI_BLACK_THEME_NAME = 'Monokai Black';

// Global state key for tracking first-time setup
const MATERIAL_ICON_SETTINGS_APPLIED_KEY = 'monokaiBlack.materialIconSettingsApplied';

// Material Icon Theme settings to apply
const MATERIAL_ICON_SETTINGS: Record<string, any> = {
  'workbench.iconTheme': 'material-icon-theme',
  'material-icon-theme.folders.theme': 'classic',
  'material-icon-theme.hidesExplorerArrows': false,
  'material-icon-theme.activeIconPack': 'angular',
  'material-icon-theme.folders.color': '#999',
  'material-icon-theme.files.color': '#999'
};

// Monaspace Argon font settings
const MONASPACE_FONT_SETTINGS: Record<string, any> = {
  'editor.fontFamily': "'Monaspace Argon Var'",
  'terminal.integrated.fontFamily': "'Monaspace Argon Var'",
  'editor.fontLigatures': "'calt', 'liga', 'dlig', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08'"
};

// Languages to support - common programming languages
const SUPPORTED_LANGUAGES: BundledLanguage[] = [
  'javascript',
  'typescript',
  'python',
  'json',
  'html',
  'css',
  'markdown',
  'bash',
  'shell',
  'yaml',
  'xml',
  'sql',
  'rust',
  'go',
  'java',
  'c',
  'cpp',
  'csharp',
  'ruby',
  'php',
  'swift',
  'kotlin',
  'scala',
  'lua',
  'perl',
  'dockerfile',
  'graphql',
  'tsx',
  'jsx',
  'vue',
  'svelte',
  'scss',
  'less',
  'toml',
  'ini',
  'diff',
  'makefile',
  'powershell'
];

// Language aliases for common shorthand names
const LANGUAGE_ALIASES: Record<string, string> = {
  'js': 'javascript',
  'ts': 'typescript',
  'py': 'python',
  'rb': 'ruby',
  'sh': 'bash',
  'zsh': 'bash',
  'yml': 'yaml',
  'cs': 'csharp',
  'c++': 'cpp',
  'objective-c': 'objc',
  'objc': 'c',
  'htm': 'html',
  'jsonc': 'json',
  'ps1': 'powershell',
  'ps': 'powershell'
};

/**
 * Check if the current VS Code color theme is Monokai Black.
 */
function isMonokaiBlackThemeActive(): boolean {
  const currentTheme = vscode.workspace.getConfiguration('workbench').get<string>('colorTheme');
  return currentTheme === MONOKAI_BLACK_THEME_NAME;
}

/**
 * Lazily initialize the Shiki highlighter.
 * Returns a promise that resolves to the highlighter instance.
 */
async function getHighlighter(): Promise<Highlighter> {
  if (highlighter) {
    return highlighter;
  }

  if (highlighterPromise) {
    return highlighterPromise;
  }

  highlighterPromise = createHighlighter({
    themes: [monokaiBlackTheme as any],
    langs: SUPPORTED_LANGUAGES
  }).then(h => {
    highlighter = h;
    return h;
  });

  return highlighterPromise;
}

/**
 * Normalize a language identifier to a supported Shiki language.
 */
function normalizeLang(lang: string): string {
  const normalized = lang.toLowerCase().trim();
  return LANGUAGE_ALIASES[normalized] || normalized;
}

/**
 * Escape HTML special characters for safe display.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Check if a language is supported by our highlighter.
 */
function isLanguageSupported(lang: string): boolean {
  if (!highlighter) {
    return false;
  }
  const normalizedLang = normalizeLang(lang);
  const loadedLangs = highlighter.getLoadedLanguages();
  return loadedLangs.includes(normalizedLang as BundledLanguage);
}

/**
 * Apply a set of settings to user configuration.
 * Only applies settings that haven't been explicitly set by the user (unless force=true).
 */
async function applySettings(settings: Record<string, any>, force: boolean = false): Promise<{ applied: string[], skipped: string[] }> {
  const applied: string[] = [];
  const skipped: string[] = [];

  for (const [key, value] of Object.entries(settings)) {
    const config = vscode.workspace.getConfiguration();
    const inspection = config.inspect(key);

    // Check if the setting has a user-level value
    const hasUserValue = inspection?.globalValue !== undefined;

    if (force || !hasUserValue) {
      await config.update(key, value, vscode.ConfigurationTarget.Global);
      applied.push(key);
    } else {
      skipped.push(key);
    }
  }

  return { applied, skipped };
}

/**
 * Apply Material Icon Theme settings to user configuration.
 */
async function applyMaterialIconSettings(force: boolean = false): Promise<{ applied: string[], skipped: string[] }> {
  return applySettings(MATERIAL_ICON_SETTINGS, force);
}

/**
 * Apply Monaspace Argon font settings to user configuration.
 */
async function applyFontSettings(force: boolean = false): Promise<{ applied: string[], skipped: string[] }> {
  return applySettings(MONASPACE_FONT_SETTINGS, force);
}

/**
 * Extension activation function.
 * Returns the markdown-it plugin that VS Code will use.
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('[Monokai Black] Extension activating...');

  // Start initializing the highlighter immediately in the background
  getHighlighter()
    .then(() => {
      console.log('[Monokai Black] Shiki highlighter initialized successfully');
    })
    .catch(err => {
      console.error('[Monokai Black] Failed to initialize Shiki highlighter:', err);
    });

  // Register the command to apply Material Icon Theme settings
  const applyIconSettingsCommand = vscode.commands.registerCommand(
    'monokaiBlack.applyMaterialIconSettings',
    async () => {
      const result = await applyMaterialIconSettings(true);
      if (result.applied.length > 0) {
        vscode.window.showInformationMessage(
          `Monokai Black: Applied ${result.applied.length} Material Icon Theme settings.`
        );
      } else {
        vscode.window.showInformationMessage(
          'Monokai Black: All Material Icon Theme settings are already configured.'
        );
      }
    }
  );
  context.subscriptions.push(applyIconSettingsCommand);

  // Register the command to apply Monaspace Argon font settings
  const applyFontSettingsCommand = vscode.commands.registerCommand(
    'monokaiBlack.applyFontSettings',
    async () => {
      const result = await applyFontSettings(true);
      if (result.applied.length > 0) {
        vscode.window.showInformationMessage(
          `Monokai Black: Applied Monaspace Argon font settings (${result.applied.length} settings).`
        );
      } else {
        vscode.window.showInformationMessage(
          'Monokai Black: Font settings are already configured.'
        );
      }
    }
  );
  context.subscriptions.push(applyFontSettingsCommand);

  // Check if this is the first activation (settings never applied)
  const settingsApplied = context.globalState.get<boolean>(MATERIAL_ICON_SETTINGS_APPLIED_KEY, false);

  if (!settingsApplied && isMonokaiBlackThemeActive()) {
    // First time activation with Monokai Black theme - apply settings automatically
    applyMaterialIconSettings(false).then(result => {
      if (result.applied.length > 0) {
        console.log('[Monokai Black] Auto-applied Material Icon settings:', result.applied);
        vscode.window.showInformationMessage(
          `Monokai Black: Configured Material Icon Theme with ${result.applied.length} settings.`
        );
      }
      // Mark as applied so we don't do this again
      context.globalState.update(MATERIAL_ICON_SETTINGS_APPLIED_KEY, true);
    });
  }

  return {
    extendMarkdownIt(md: any) {
      console.log('[Monokai Black] extendMarkdownIt called');
      // Store the original fence renderer
      const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules);

      // Override the fence renderer
      md.renderer.rules.fence = (
        tokens: any[],
        idx: number,
        options: any,
        env: any,
        self: any
      ): string => {
        const token = tokens[idx];
        const info = token.info ? token.info.trim() : '';
        const lang = info.split(/\s+/)[0] || '';
        const code = token.content;

        // Only apply Monokai Black highlighting if the theme is active
        if (!isMonokaiBlackThemeActive()) {
          // Theme not active - use default renderer
          if (defaultFence) {
            return defaultFence(tokens, idx, options, env, self);
          }
          // Ultimate fallback without Monokai styling
          const escaped = escapeHtml(code);
          const langClass = lang ? ` class="language-${escapeHtml(lang)}"` : '';
          return `<pre><code${langClass}>${escaped}</code></pre>`;
        }

        // Try to highlight with Shiki if the highlighter is ready
        if (highlighter && lang) {
          try {
            const normalizedLang = normalizeLang(lang);

            if (isLanguageSupported(normalizedLang)) {
              const highlighted = highlighter.codeToHtml(code, {
                lang: normalizedLang as BundledLanguage,
                theme: 'Monokai Black'
              });
              return highlighted;
            }
          } catch (err) {
            console.error('[Monokai Black] Shiki highlighting error:', err);
          }
        }

        // Fallback: use default renderer if available
        if (defaultFence) {
          return defaultFence(tokens, idx, options, env, self);
        }

        // Ultimate fallback: render with basic Monokai Black styling
        const escaped = escapeHtml(code);
        const langClass = lang ? ` class="language-${escapeHtml(lang)}"` : '';
        return `<pre class="shiki" style="background-color:#000000;color:#f7f1ff;padding:16px;border-radius:4px;overflow-x:auto;"><code${langClass}>${escaped}</code></pre>`;
      };

      return md;
    }
  };
}

/**
 * Extension deactivation function.
 */
export function deactivate() {
  if (highlighter) {
    highlighter.dispose();
    highlighter = null;
  }
  highlighterPromise = null;
}
