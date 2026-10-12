import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = process.cwd();

test('home keeps only Gustavo and links to the full system page', () => {
  const home = readFileSync(join(root, 'app/page.tsx'), 'utf8');

  assert.match(home, /href="\/sistema-cassaforma"/);
  assert.match(home, /Sistema Cassaforma/);
  assert.match(home, /variant="gustavo"/);
  assert.match(home, /gustavo-sistema-cassaforma\.mp4/);
  assert.match(home, /Ver más sobre el sistema Cassaforma/);
  assert.doesNotMatch(home, /variant="marcelo"|<SystemBenefits|comparison-table/);
  assert.doesNotMatch(home, /href="https:\/\/cassaforma\.com\/sistema-constructivo"/);
  const landing = readFileSync(join(root, 'app/sistema-cassaforma/page.tsx'), 'utf8');
  assert.match(landing, /variant="marcelo"/);
  assert.match(landing, /arquitecto Marcelo Seia/);
  assert.match(landing, /href="https:\/\/www\.youtube\.com\/@arquitectomarceloseia8716"/);
  assert.match(landing, /<SystemBenefits/);
});

test('Cassaforma landing includes the comparison, process and component assets', () => {
  const relativePath = 'app/sistema-cassaforma/page.tsx';
  assert.equal(existsSync(join(root, relativePath)), true, `${relativePath} is missing`);

  const landing = readFileSync(join(root, relativePath), 'utf8');

  assert.match(landing, /Comparación orientativa/);
  assert.match(landing, /Tradicional/);
  assert.match(landing, /Steel Frame/);
  assert.match(landing, /Panel SIP/);
  assert.match(landing, /Modular/);
  assert.match(landing, /Cassaforma/);
  assert.match(landing, /Definir el proyecto/);
  assert.match(landing, /cassaforma-panel-simple\.png/);
  assert.match(landing, /cassaforma-panel-reforzado\.png/);
  assert.match(landing, /cassaforma-mallas\.png/);
  const benefits = readFileSync(join(root, 'app/components/SystemBenefits.tsx'), 'utf8');
  assert.match(benefits, /Beneficios del sistema/);
  assert.match(benefits, /Resistencia al viento/);
  assert.match(benefits, /Ver beneficios siguientes/);
  assert.match(landing, /id="proceso"/);
  assert.match(landing, /id="componentes"/);
});

test('Cassaforma video cover uses the official Marcelo Seia thumbnail', () => {
  const component = readFileSync(join(root, 'app/components/CassaformaVideoCover.tsx'), 'utf8');

  assert.match(component, /i\.ytimg\.com\/vi\/vtCQtq4RhqM\/maxresdefault\.jpg/);
  assert.match(component, /Miniatura oficial del video de Marcelo Seia/);
  assert.doesNotMatch(component, /cassaforma-video-cover-gustavo-clean\.png/);
});
