import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = process.cwd();

test('Home includes the system, FAQ and one appointment conversion path', () => {
  const home = readFileSync(join(root, 'app/page.tsx'), 'utf8');

  assert.match(home, /id="sistema"/);
  assert.match(home, /Sistema Cassaforma/);
  assert.match(home, /id="preguntas-frecuentes"/);
  assert.match(home, /href="\/agendar"/);
  assert.doesNotMatch(home, /contact-form/);
  assert.match(home, /Beneficios del sistema/);
  assert.match(home, /Resistencia ante vientos fuertes/);
  assert.match(home, /Ver beneficios siguientes/);
  assert.doesNotMatch(home, /Componentes del sistema/);
});

test('appointment landing is a multi-step, non-sending local prototype', () => {
  const relativePath = 'app/agendar/page.tsx';
  assert.equal(existsSync(join(root, relativePath)), true, `${relativePath} is missing`);

  const source = readFileSync(join(root, relativePath), 'utf8');
  assert.match(source, /30 minutos/);
  assert.match(source, /72 horas/);
  assert.match(source, /Presupuesto aproximado/);
  assert.match(source, /Entre 25\.000 y 50\.000 dólares/);
  assert.match(source, /Más de 500\.000 dólares/);
  assert.match(source, /Disponés de aproximadamente el siguiente dinero/);
  assert.match(source, /Día preferido/);
  assert.match(source, /sujet(?:a|os) a confirmación/);
  assert.match(source, /Sin costo/);
  assert.match(source, /accept="image\/\*,video\/\*"/);
  assert.match(source, /multiple/);
  assert.match(source, /Google Drive/);
  assert.match(source, /materialLink/);
  assert.match(source, /Comodoro Rivadavia/);
  assert.match(source, /Rada Tilly/);
  assert.match(source, /Dirección de la obra/);
  assert.match(source, /type="checkbox"/);
  assert.match(source, /Google Meet/);
  assert.match(source, /Revisá los datos de tu solicitud/);
  assert.match(source, /Volver y editar/);
  assert.match(source, /Enviar solicitud de reunión/);
  assert.match(source, /Archivos adjuntos/);
});
