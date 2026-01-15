import { createHighlighter, type Highlighter, type BundledLanguage } from 'shiki';

// Import the custom Monokai Black theme
import monokaiBlackTheme from '../themes/monokai-black-shiki.json';

// Import custom language grammars not bundled with Shiki
import typeqlGrammar from '../themes/typeql.tmLanguage.json';

// Singleton highlighter instance
let highlighter: Highlighter | null = null;
let highlighterPromise: Promise<Highlighter> | null = null;

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
  'ps': 'powershell',
  'tql': 'typeql'
};

// Custom languages with their TextMate grammars (not bundled with Shiki)
const CUSTOM_LANGUAGES = [
  {
    ...typeqlGrammar,
    name: 'typeql',
    scopeName: 'source.tql'
  }
];

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
    langs: [...SUPPORTED_LANGUAGES, ...CUSTOM_LANGUAGES as any]
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
 * Extension activation function.
 * Returns the markdown-it plugin that VS Code will use.
 */
export function activate() {
  // Start initializing the highlighter immediately in the background
  getHighlighter().catch(err => {
    console.error('[Monokai Black] Failed to initialize Shiki highlighter:', err);
  });

  return {
    extendMarkdownIt(md: any) {

      // Store the original fence renderer for fallback
      const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules);

      // Override the fence renderer - ALWAYS apply Monokai Black highlighting
      // since the user explicitly installed this extension for this purpose
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

        // If no language specified but highlighter is ready, still apply black background
        if (highlighter && !lang) {
          const escaped = escapeHtml(code);
          return `<pre class="shiki" style="background-color:#000000;color:#f7f1ff;padding:16px;border-radius:4px;overflow-x:auto;"><code>${escaped}</code></pre>`;
        }

        // Fallback: use default renderer if available (highlighter not ready)
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
