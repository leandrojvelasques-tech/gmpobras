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
  assert.match(home, /href="\/sistema-cassaforma"/);
  assert.doesNotMatch(home, /Beneficios del sistema|constructionSystems/);
  const faqCatalog = readFileSync(join(root, 'app/data/faqs.ts'), 'utf8');
  assert.match(home, /<FaqList items=\{homeFaqs\}/);
  assert.match(home, /href="\/preguntas-frecuentes"/);
  assert.match(faqCatalog, /¿Se puede construir en cualquier terreno\?/);
  assert.match(faqCatalog, /¿Entregan con los planos municipales aprobados\?/);
  assert.match(home, /Gustavo Pinto Caetano/);
  assert.doesNotMatch(home, /de un profesional\./);
  assert.doesNotMatch(home, /Componentes del sistema/);
});

test('appointment preview starts with calendar selection and collects project details afterward', () => {
  const source = readFileSync(join(root, 'app/agendar/page.tsx'), 'utf8');
  assert.match(source, /45 minutos/);
  assert.match(source, /Lunes, miércoles y viernes/);
  assert.match(source, /10:00 o 15:00/);
  assert.match(source, /booking-calendar-grid/);
  assert.match(source, /Tus datos para la reserva/);
  assert.match(source, /WhatsApp \(opcional\)/);
  assert.match(source, /Agregar información del proyecto/);
  assert.match(source, /Esta prueba no reserva turnos ni envía correos/);
  assert.doesNotMatch(source, /fetch\(|totalSteps|setStep|72 horas/);
  assert.equal(existsSync(join(root, 'app/api/consultas/route.ts')), true);
});
