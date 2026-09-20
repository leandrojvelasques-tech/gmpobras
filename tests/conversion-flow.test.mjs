import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = process.cwd();

test('Home includes the system, FAQ, contact form and appointment conversion path', () => {
  const home = readFileSync(join(root, 'app/page.tsx'), 'utf8');

  assert.match(home, /id="sistema"/);
  assert.match(home, /Sistema Cassaforma/);
  assert.match(home, /id="preguntas-frecuentes"/);
  assert.match(home, /href="\/agendar"/);
  assert.match(home, /className="contact-form"/);
  assert.match(home, /id="contacto"/);
  assert.match(home, /Agendar cita/);
  assert.match(home, /Beneficios del sistema/);
  assert.match(home, /Resistencia ante vientos fuertes/);
  assert.match(home, /Ver beneficios siguientes/);
  assert.match(home, /Comparación orientativa/);
  assert.match(home, /constructionSystems/);
  assert.match(home, /¿Se puede construir en cualquier terreno\?/);
  assert.match(home, /¿Entregan con los planos municipales aprobados\?/);
  assert.match(home, /Gustavo Pinto Caetano/);
  assert.doesNotMatch(home, /de un profesional\./);
  assert.doesNotMatch(home, /Componentes del sistema/);
});

test('appointment landing is a multi-step flow backed by persistent storage', () => {
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
  assert.match(source, /fetch\('\/api\/consultas'/);
  assert.match(source, /Solicitud registrada/);
  assert.match(source, /guarde estos datos/);
  assert.equal(existsSync(join(root, 'app/api/consultas/route.ts')), true);
  assert.equal(existsSync(join(root, 'db/schema.ts')), true);
});
