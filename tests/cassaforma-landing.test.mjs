import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = process.cwd();

test('home presents Gustavo and Marcelo as complementary Cassaforma voices', () => {
  const home = readFileSync(join(root, 'app/page.tsx'), 'utf8');

  assert.doesNotMatch(home, /href="\/sistema-cassaforma"/);
  assert.match(home, /Sistema Cassaforma/);
  assert.match(home, /La opinión de Gustavo/);
  assert.match(home, /La mirada de un especialista/);
  assert.doesNotMatch(home, /href="https:\/\/cassaforma\.com\/sistema-constructivo"/);
  assert.match(home, /arquitecto Marcelo Seia/);
  assert.doesNotMatch(home, /https:\/\/marceloseia\.com\//);
  assert.match(home, /href="https:\/\/www\.youtube\.com\/@arquitectomarceloseia8716"/);
});

test('Cassaforma landing includes the comparison, process and component assets', () => {
  const relativePath = 'app/sistema-cassaforma/page.tsx';
  assert.equal(existsSync(join(root, relativePath)), true, `${relativePath} is missing`);

  const landing = readFileSync(join(root, relativePath), 'utf8');

  assert.match(landing, /Comparativa de trabajo/);
  assert.match(landing, /Tradicional/);
  assert.match(landing, /Steel Frame/);
  assert.match(landing, /Panel SIP/);
  assert.match(landing, /Modular/);
  assert.match(landing, /Cassaforma/);
  assert.match(landing, /Definir el proyecto/);
  assert.match(landing, /cassaforma-panel-simple\.png/);
  assert.match(landing, /cassaforma-panel-reforzado\.png/);
  assert.match(landing, /cassaforma-mallas\.png/);
  assert.match(landing, /w2nY_C0wBdo/);
  assert.match(landing, /zcGG2Q2swvY/);
  assert.ok(
    landing.indexOf('Comparativa de trabajo') < landing.indexOf('Después de la comparativa'),
    'the comparison should precede the technical explanation',
  );
});

test('Cassaforma video cover uses the official Marcelo Seia thumbnail', () => {
  const component = readFileSync(join(root, 'app/components/CassaformaVideoCover.tsx'), 'utf8');

  assert.match(component, /i\.ytimg\.com\/vi\/vtCQtq4RhqM\/maxresdefault\.jpg/);
  assert.match(component, /Miniatura oficial del video de Marcelo Seia/);
  assert.doesNotMatch(component, /cassaforma-video-cover-gustavo-clean\.png/);
});
