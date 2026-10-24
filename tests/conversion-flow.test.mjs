import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = process.cwd();

test('Home links to dedicated pages while contact keeps its form and appointment path', () => {
  const home = readFileSync(join(root, 'app/page.tsx'), 'utf8');

  assert.match(home, /id="sistema"/);
  assert.match(home, /Sistema Cassaforma/);
  assert.match(home, /id="preguntas-frecuentes"/);
  assert.match(home, /href="\/agendar"/);
  const contact = readFileSync(join(root, 'app/contacto/page.tsx'), 'utf8');
  const contactForm = readFileSync(join(root, 'app/components/ContactForm.tsx'), 'utf8');
  assert.match(contactForm, /className="contact-form"/);
  assert.match(contact, /id="contacto"/);
  assert.match(home, /href="\/contacto"/);
  assert.match(home, /href="\/proyectos"/);
  assert.doesNotMatch(home, /className="contact-form"/);
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

test('appointment request starts with calendar selection and collects project details afterward', () => {
  const source = readFileSync(join(root, 'app/components/AppointmentFlow.tsx'), 'utf8');
  assert.match(source, /45 minutos/);
  assert.match(source, /Presupuestos en 72 horas/);
  assert.match(source, /Lunes, miércoles y viernes/);
  assert.match(source, /09:00 o 11:00/);
  assert.match(source, /booking-calendar-grid/);
  assert.match(source, /Tus datos para la consulta/);
  assert.match(source, /WhatsApp \(opcional\)/);
  assert.match(source, /Agregar información del proyecto/);
  assert.match(source, /El horario ya está reservado para vos/);
  assert.match(source, /Consulta confirmada/);
  assert.match(source, /Agregar a Google Calendar/);
  assert.match(source, /Guardar detalles/);
  assert.match(source, /Ramos Mejía 298/);
  assert.doesNotMatch(source, /totalSteps|setStep|Probar reserva/);
  assert.equal(existsSync(join(root, 'app/api/consultas/route.ts')), true);
});
