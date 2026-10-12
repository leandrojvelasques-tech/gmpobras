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

test('Cassaforma landing includes the comparison and sustainability information', () => {
  const relativePath = 'app/sistema-cassaforma/page.tsx';
  assert.equal(existsSync(join(root, relativePath)), true, `${relativePath} is missing`);

  const landing = readFileSync(join(root, relativePath), 'utf8');

  assert.match(landing, /Comparación orientativa/);
  assert.match(landing, /Tradicional/);
  assert.match(landing, /Steel Frame/);
  assert.match(landing, /Panel SIP/);
  assert.match(landing, /Modular/);
  assert.match(landing, /Cassaforma/);
  assert.match(landing, /Certificado Producto LEED/);
  assert.match(landing, /Green Group Sustainability Consulting/);
  assert.match(landing, /modelos\/sagitario-casa\.webp/);
  const benefits = readFileSync(join(root, 'app/components/SystemBenefits.tsx'), 'utf8');
  assert.match(benefits, /Beneficios del sistema/);
  assert.match(benefits, /Resistencia al viento/);
  assert.match(benefits, /Ver beneficios siguientes/);
  assert.match(landing, /id="sustentabilidad"/);
  assert.doesNotMatch(landing, /id="proceso"|id="componentes"|Caetano|elaborado manualmente/);
  assert.ok(landing.indexOf('id="que-es"') < landing.indexOf('id="video"'));
  assert.equal((landing.match(/<h1\b/g) ?? []).length, 1);
});

test('Cassaforma video cover uses the official Marcelo Seia thumbnail', () => {
  const component = readFileSync(join(root, 'app/components/CassaformaVideoCover.tsx'), 'utf8');

  assert.match(component, /i\.ytimg\.com\/vi\/vtCQtq4RhqM\/maxresdefault\.jpg/);
  assert.match(component, /Miniatura oficial del video de Marcelo Seia/);
  assert.doesNotMatch(component, /cassaforma-video-cover-gustavo-clean\.png/);
});
