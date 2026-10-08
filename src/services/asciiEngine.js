const fontEngine = require('./fontEngine');
const borderEngine = require('./borderEngine');
const layoutEngine = require('./layoutEngine');
const environmentEngine = require('./environmentEngine');
const formatter = require('./formatter');
const textGenerator = require('../generators/text');
const bannerGenerator = require('../generators/banner');
const boxGenerator = require('../generators/box');
const tableGenerator = require('../generators/table');
const separatorGenerator = require('../generators/separator');
const headerGenerator = require('../generators/header');
const logoGenerator = require('../generators/logo');
const customGenerator = require('../generators/custom');

const COMMENT_SYNTAX = {
  javascript: { line: '// ', blockStart: '/* ', blockLine: ' * ', blockEnd: ' */' },
  typescript: { line: '// ', blockStart: '/* ', blockLine: ' * ', blockEnd: ' */' },
  python: { line: '# ', blockStart: '""" ', blockLine: '    ', blockEnd: '"""' },
  bash: { line: '# ', blockStart: ': <<', blockLine: '', blockEnd: '' },
  shell: { line: '# ', blockStart: ': <<', blockLine: '', blockEnd: '' },
  powershell: { line: '# ', blockStart: '<#', blockLine: ' #', blockEnd: '#>' },
  c: { line: '// ', blockStart: '/* ', blockLine: ' * ', blockEnd: ' */' },
  cpp: { line: '// ', blockStart: '/* ', blockLine: ' * ', blockEnd: ' */' },
  csharp: { line: '// ', blockStart: '/* ', blockLine: ' * ', blockEnd: ' */' },
  java: { line: '// ', blockStart: '/* ', blockLine: ' * ', blockEnd: ' */' },
  php: { line: '// ', blockStart: '/* ', blockLine: ' * ', blockEnd: ' */' },
  html: { line: '<!-- ', blockStart: '<!--', blockLine: '', blockEnd: '-->' },
  css: { line: '/* ', blockStart: '/* ', blockLine: ' * ', blockEnd: ' */' },
  sql: { line: '-- ', blockStart: '/*', blockLine: ' *', blockEnd: '*/' },
  lua: { line: '-- ', blockStart: '--[[', blockLine: '', blockEnd: ']]' },
  rust: { line: '// ', blockStart: '/* ', blockLine: ' * ', blockEnd: ' */' },
  go: { line: '// ', blockStart: '/* ', blockLine: ' * ', blockEnd: ' */' },
  jsonc: { line: '// ', blockStart: '/* ', blockLine: ' * ', blockEnd: ' */' },
  yaml: { line: '# ', blockStart: '#', blockLine: '#', blockEnd: '#' },
  markdown: { line: null, blockStart: '<!--', blockEnd: '-->', blockLine: '  ' },
};

class AsciiEngine {
  constructor() {
    this.generators = {
      text: textGenerator,
      banner: bannerGenerator,
      box: boxGenerator,
      table: tableGenerator,
      separator: separatorGenerator,
      header: headerGenerator,
      logo: logoGenerator,
      custom: customGenerator
    };
  }

  generate(input = {}) {
    const {
      type = 'text',
      text = '',
      font = 'Standard',
      usage = 'Terminal',
      width = 80,
      height = null,
      border = 'single',
      style = 'Clean',
      language = 'javascript',
      alignment = 'center',
      padding = 0,
      borderThickness = 1,
      title = null,
      footer = null,
      vAlign = 'center',
      pattern = null,
      prefix = '',
      suffix = '',
      headers = [],
      rows = [],
      elements = []
    } = input;

    const env = environmentEngine.getEnvironment(usage);
    const envWidth = env.settings?.maxWidth || width;
    const actualWidth = width || envWidth;

    if (type === 'comment') {
      return this.generateComment(input);
    }

    if (type === 'composition') {
      return this.generateComposition(input);
    }

    const generator = this.generators[type] || this.generators.text;

    let result = generator.generate({
      text,
      font,
      width: actualWidth,
      height,
      border,
      style,
      language,
      alignment,
      padding,
      borderThickness,
      title,
      footer,
      vAlign,
      pattern,
      prefix,
      suffix,
      headers,
      rows,
      elements
    });

    result.output = environmentEngine.adaptToEnvironment(result.output, usage);

    return result;
  }

  generateText(input) {
    return this.generate({ type: 'text', ...input });
  }

  generateBanner(input) {
    return this.generate({ type: 'banner', ...input });
  }

  generateBox(input) {
    return this.generate({ type: 'box', ...input });
  }

  generateTable(input) {
    return this.generate({ type: 'table', ...input });
  }

  generateSeparator(input) {
    return this.generate({ type: 'separator', ...input });
  }

  generateHeader(input) {
    return this.generate({ type: 'header', ...input });
  }

  generateComment(input) {
    const {
      text = '',
      language = 'javascript',
      style = 'Clean',
      width = 80,
      border = 'single',
      prefix = '',
      suffix = ''
    } = input;

    const syntax = COMMENT_SYNTAX[language] || COMMENT_SYNTAX.javascript;
    const env = environmentEngine.getEnvironment('Code Comment');
    const envWidth = env.settings?.maxWidth || width;
    const actualWidth = Math.min(envWidth, width || envWidth);

    const lines = String(text).split('\n');
    const { textWidth } = require('../utils/textWidth');
    const { alignText } = require('../utils/formatting');

    const innerWidth = Math.min(actualWidth - (prefix.length + suffix.length || 0) - 4, 76);
    const linePrefix = prefix + (syntax.line || '');
    const lineWidth = innerWidth;

    if (border && border !== 'none' && syntax.line) {
      const b = borderEngine.getBorder(border);
      const chars = b.chars;
      const contentWidth = lineWidth - 2;
      const horizontalLine = chars.horizontal.repeat(contentWidth);

      const result = [];

      result.push(linePrefix + chars.topLeft + horizontalLine + chars.topRight + suffix);

      for (const l of lines) {
        const padded = l + ' '.repeat(Math.max(0, contentWidth - textWidth(l)));
        result.push(linePrefix + chars.vertical + ' ' + padded + ' ' + chars.vertical + suffix);
      }

      result.push(linePrefix + chars.bottomLeft + horizontalLine + chars.bottomRight + suffix);

      return {
        success: true,
        output: result.join('\n'),
        metadata: {
          language,
          style,
          width: actualWidth,
          border
        }
      };
    } else if (syntax.line) {
      const output = lines.map(l => {
        if (l.trim() === '') return prefix + syntax.line.trim();
        return prefix + syntax.line + l;
      }).join('\n');

      return {
        success: true,
        output,
        metadata: {
          language,
          style,
          width: actualWidth,
          border
        }
      };
    } else {
      const b = border && border !== 'none' ? borderEngine.getBorder(border) : null;
      const chars = b ? b.chars : {};
      const contentWidth = border && border !== 'none' ? innerWidth : Math.max(...lines.map(l => textWidth(l)));
      const horizontalLine = chars.horizontal ? chars.horizontal.repeat(contentWidth) : '';
      const result = [];

      if (chars.topLeft) {
        result.push(prefix + chars.topLeft + horizontalLine + chars.topRight + suffix);
      } else {
        result.push(prefix + syntax.blockStart + suffix);
      }

      for (const l of lines) {
        const padded = l + ' '.repeat(Math.max(0, contentWidth - textWidth(l)));
        if (chars.vertical) {
          result.push(prefix + chars.vertical + ' ' + padded + ' ' + chars.vertical + suffix);
        } else {
          result.push(prefix + syntax.blockLine + padded + suffix);
        }
      }

      if (chars.bottomLeft) {
        result.push(prefix + chars.bottomLeft + horizontalLine + chars.bottomRight + suffix);
      } else {
        result.push(prefix + syntax.blockEnd + suffix);
      }

      return {
        success: true,
        output: result.join('\n'),
        metadata: {
          language,
          style,
          width: actualWidth,
          border
        }
      };
    }
  }

  generateLogo(input) {
    return this.generate({ type: 'logo', ...input });
  }

  generateComposition(input) {
    const {
      elements = [],
      width = 80,
      border = 'single',
      style = 'Clean',
      alignment = 'center'
    } = input;

    const rendered = [];
    for (const el of elements) {
      let result;
      if (el.type === 'separator') {
        const sepGenerator = require('../generators/separator');
        result = sepGenerator.generate(el);
      } else if (el.type === 'table') {
        const tableGenerator = require('../generators/table');
        result = tableGenerator.generate(el);
      } else {
        const generator = this.generators[el.type] || this.generators.text;
        result = generator.generate(el);
      }
      rendered.push(result.output);
    }

    const combined = rendered.join('\n\n');

    return {
      success: true,
      output: combined,
      metadata: {
        elements: elements.length,
        border,
        width,
        alignment,
        style
      }
    };
  }

  generateTablePreview(input) {
    return this.generateTable(input);
  }

  getCommentSyntax(language) {
    return COMMENT_SYNTAX[language] || COMMENT_SYNTAX.javascript;
  }

  listLanguages() {
    return Object.keys(COMMENT_SYNTAX);
  }
}

module.exports = new AsciiEngine();
