const assert = require('assert');
const fontEngine = require('../src/services/fontEngine');
const borderEngine = require('../src/services/borderEngine');
const boxEngine = require('../src/services/boxEngine');
const environmentEngine = require('../src/services/environmentEngine');
const asciiEngine = require('../src/services/asciiEngine');
const { textWidth } = require('../src/utils/textWidth');
const { padRight, centerText, alignText } = require('../src/utils/formatting');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log('  PASS: ' + name);
  } catch (err) {
    failed++;
    console.error('  FAIL: ' + name + ' - ' + err.message);
  }
}

console.log('\nRunning MindASCII tests...\n');

console.log('ASCII Generation');
test('Generate text with Standard font', () => {
  const result = fontEngine.renderText('HELLO', 'Standard');
  assert.ok(result.length > 0);
  assert.ok(result.includes('|'));
});

test('Generate text with Block font', () => {
  const result = fontEngine.renderText('ABC', 'Block');
  assert.ok(result.length > 0);
  assert.ok(result.includes('█'));
});

test('Generate text with Slant font', () => {
  const result = fontEngine.renderText('TEST', 'Slant');
  assert.ok(result.length > 0);
  assert.ok(result.includes('/'));
});

test('Handle unknown characters', () => {
  const result = fontEngine.renderText('XYZ', 'Standard');
  assert.ok(result.length > 0);
});

test('Render empty text', () => {
  const result = fontEngine.renderText('', 'Standard');
  assert.strictEqual(result, '');
});

console.log('\nFont Loading');
test('List all fonts', () => {
  const fonts = fontEngine.listFonts();
  assert.ok(fonts.length > 0);
  const names = fonts.map(f => f.name);
  assert.ok(names.includes('Standard'));
  assert.ok(names.includes('Block'));
  assert.ok(names.includes('Slant'));
});

test('Get specific font', () => {
  const font = fontEngine.getFont('Block');
  assert.ok(font);
  assert.ok(font.characters);
});

test('Fallback to Standard font', () => {
  const font = fontEngine.getFont('NonExistent');
  assert.ok(font);
  assert.ok(font.name === 'Standard' || font.name === 'Block');
});

test('List all styles', () => {
  const styles = fontEngine.listStyles();
  assert.ok(styles.length >= 5);
});

console.log('\nBorder Generation');
test('List all borders', () => {
  const borders = borderEngine.listBorders();
  assert.ok(borders.length >= 5);
  const types = borders.map(b => b.type);
  assert.ok(types.includes('single'));
  assert.ok(types.includes('double'));
  assert.ok(types.includes('rounded'));
  assert.ok(types.includes('heavy'));
  assert.ok(types.includes('ascii'));
});

test('Get single border', () => {
  const border = borderEngine.getBorder('single');
  assert.ok(border);
  assert.ok(border.chars.topLeft === '┌');
});

test('Get double border', () => {
  const border = borderEngine.getBorder('double');
  assert.ok(border.chars.topLeft === '╔');
});

test('Draw box with single border', () => {
  const result = borderEngine.drawBox(['Hello'], { border: 'single' });
  assert.ok(result.includes('┌'));
  assert.ok(result.includes('┐'));
  assert.ok(result.includes('└'));
  assert.ok(result.includes('┘'));
  assert.ok(result.includes('│'));
  assert.ok(result.includes('Hello'));
});

test('Draw box with double border', () => {
  const result = borderEngine.drawBox(['Test'], { border: 'double' });
  assert.ok(result.includes('╔'));
  assert.ok(result.includes('╗'));
});

test('Draw box with ASCII border', () => {
  const result = borderEngine.drawBox(['ASCII'], { border: 'ascii' });
  assert.ok(result.includes('+'));
  assert.ok(result.includes('-'));
  assert.ok(result.includes('|'));
});

test('Draw table', () => {
  const result = borderEngine.drawTable(['Name', 'Port'], [['MindASCII', '3050']], { border: 'single' });
  assert.ok(result.includes('┌'));
  assert.ok(result.includes('├'));
  assert.ok(result.includes('└'));
});

console.log('\nText Width Calculations');
test('Calculate ASCII text width', () => {
  assert.strictEqual(textWidth('hello'), 5);
  assert.strictEqual(textWidth('hello world'), 11);
});

test('Calculate Unicode text width', () => {
  const w = textWidth('你好');
  assert.ok(w >= 4);
});

test('Calculate mixed text width', () => {
  const w = textWidth('A你好B');
  assert.ok(w >= 6);
});

console.log('\nText Formatting');
test('Pad right to width', () => {
  assert.strictEqual(padRight('abc', 5), 'abc  ');
});

test('Center text', () => {
  const result = centerText('abc', 7);
  assert.strictEqual(result.length, 7);
  assert.ok(result.includes('abc'));
});

test('Align text left', () => {
  const result = alignText('abc', 5, 'left');
  assert.strictEqual(result, 'abc  ');
});

test('Align text center', () => {
  const result = alignText('abc', 7, 'center');
  assert.strictEqual(result, '  abc  ');
});

test('Align text right', () => {
  const result = alignText('abc', 5, 'right');
  assert.strictEqual(result, '  abc');
});

console.log('\nBox Generation');
test('Generate box with text', () => {
  const result = boxEngine.createBox('Hello World', { border: 'double', width: 20 });
  assert.ok(result.includes('╔'));
  assert.ok(result.includes('Hello World'));
});

test('Generate box with padding', () => {
  const result = boxEngine.createBox('Test', { border: 'single', padding: 2, width: 20 });
  assert.ok(result.includes('┌'));
  assert.ok(result.includes('└'));
});

console.log('\nEnvironment Engine');
test('List environments', () => {
  const envs = environmentEngine.listEnvironments();
  assert.ok(envs.length >= 4);
});

test('Get VS Code environment', () => {
  const env = environmentEngine.getEnvironment('VS Code');
  assert.ok(env);
  assert.ok(env.settings.maxWidth);
});

test('Adapt output for ASCII-only environment', () => {
  const output = 'Hello ┌─┐ World';
  const adapted = environmentEngine.adaptToEnvironment(output, 'Code Comment');
  assert.ok(adapted.includes('Hello'));
});

console.log('\nLayout Engine');
const layoutEngine = require('../src/services/layoutEngine');

test('Layout text to width', () => {
  const result = layoutEngine.layout('Hello World', { width: 80, alignment: 'center' });
  assert.ok(typeof result === 'string');
});

test('Get text bounds', () => {
  const bounds = layoutEngine.getBounds('Hello\nWorld');
  assert.ok(bounds.width > 0);
  assert.strictEqual(bounds.height, 2);
});

console.log('\nASCII Engine');
test('Generate text via asciiEngine', () => {
  const result = asciiEngine.generate({
    type: 'text',
    text: 'TEST',
    font: 'Standard'
  });
  assert.ok(result.success);
  assert.ok(result.output.length > 0);
});

test('Generate banner via asciiEngine', () => {
  const result = asciiEngine.generate({
    type: 'banner',
    text: 'Hi',
    font: 'Block',
    border: 'double'
  });
  assert.ok(result.success);
  assert.ok(result.output.includes('╔'));
});

test('Generate separator via asciiEngine', () => {
  const result = asciiEngine.generate({
    type: 'separator',
    text: 'Test',
    character: '-',
    length: 20
  });
  assert.ok(result.success);
  assert.ok(result.output.length >= 20);
});

test('Generate header via asciiEngine', () => {
  const result = asciiEngine.generate({
    type: 'header',
    text: 'Section',
    border: 'double'
  });
  assert.ok(result.success);
});

test('Generate code comment', () => {
  const result = asciiEngine.generateComment({
    text: 'Hello World',
    language: 'javascript',
    border: 'single'
  });
  assert.ok(result.success);
  assert.ok(result.output.includes('Hello World'));
});

test('List comment languages', () => {
  const langs = asciiEngine.listLanguages();
  assert.ok(langs.includes('javascript'));
  assert.ok(langs.includes('python'));
  assert.ok(langs.includes('bash'));
});

console.log('\nExport Service');
const exportService = require('../src/services/exportService');

test('Export as text', () => {
  const result = exportService.exportAsText('Hello World');
  assert.ok(result.success);
  assert.strictEqual(result.format, 'txt');
});

test('Export as markdown', () => {
  const result = exportService.exportAsMarkdown('Hello World');
  assert.ok(result.success);
  assert.strictEqual(result.format, 'md');
  assert.ok(result.output.includes('```'));
});

test('Export as JSON', () => {
  const result = exportService.exportAsJson('Hello World', { font: 'Standard' });
  assert.ok(result.success);
  assert.strictEqual(result.format, 'json');
});

console.log('\nProject Service');
const projectService = require('../src/services/projectService');

test('Save and retrieve project', () => {
  const saveResult = projectService.saveProject({
    name: 'Test Project',
    type: 'text',
    output: 'Hello World',
    settings: {}
  });
  assert.ok(saveResult.success);
  assert.ok(saveResult.project.id);

  const getResult = projectService.getProject(saveResult.project.id);
  assert.ok(getResult.success);
  assert.strictEqual(getResult.project.name, 'Test Project');
});

test('List projects', () => {
  const result = projectService.getProjects();
  assert.ok(result.success);
  assert.ok(Array.isArray(result.projects));
});

test('Delete project', () => {
  const saveResult = projectService.saveProject({ name: 'To Delete', type: 'text', output: 'test' });
  const delResult = projectService.deleteProject(saveResult.project.id);
  assert.ok(delResult.success);
  assert.ok(delResult.deleted);
});

test('Save and retrieve template', () => {
  const saveResult = projectService.saveTemplate({
    name: 'Test Template',
    content: 'Hello',
    output: 'Hello World'
  });
  assert.ok(saveResult.success);

  const { templates } = projectService.getTemplates();
  assert.ok(templates.some(t => t.name === 'Test Template'));
});

console.log('\nValidation');
const { validateGenerateInput } = require('../src/utils/validation');

test('Validate valid input', () => {
  const result = validateGenerateInput({ type: 'text', text: 'hello', width: 80 });
  assert.ok(result.valid);
  assert.strictEqual(result.errors.length, 0);
});

test('Validate invalid width', () => {
  const result = validateGenerateInput({ width: -1 });
  assert.ok(!result.valid);
});

test('Validate non-string text', () => {
  const result = validateGenerateInput({ text: 123 });
  assert.ok(!result.valid);
});

console.log('\n--- Results ---');
console.log('Passed: ' + passed);
console.log('Failed: ' + failed);
console.log('Total:  ' + (passed + failed));

if (failed > 0) {
  console.error('\n' + failed + ' test(s) failed');
  process.exit(1);
} else {
  console.log('\nAll tests passed!');
}
