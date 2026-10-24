import { renderAppointmentEmail, googleCalendarLink } from './appointment-email.mjs';
const appointmentNotificationTo = 'gustavo@gmpobras.com.ar';
export function emailSettings(env, kind = 'contacto') {
  const mode = kind === 'consulta' ? env.EMAIL_APPOINTMENT_MODE || env.EMAIL_MODE : env.EMAIL_MODE;
  const validEmail = (value) => typeof value === 'string' && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
  if (!['test', 'live'].includes(mode) || !env.RESEND_API_KEY || !validEmail(env.EMAIL_FROM) || !validEmail(env.EMAIL_TO)) return null;
  if (mode === 'test' && !validEmail(env.EMAIL_TEST_TO)) return null;
  return { mode, key: env.RESEND_API_KEY, from: env.EMAIL_FROM, to: env.EMAIL_TO, testTo: env.EMAIL_TEST_TO };
}
export function buildEmails(settings, kind, values, reference) {
  const appointment = kind === 'consulta';
  const businessRecipient = appointment ? appointmentNotificationTo : settings.to;
  const summary = appointment
    ? `Reserva #${reference}\nNombre: ${values.name}\nEmail: ${values.email}\nWhatsApp: ${values.phone || 'Sin indicar'}\nDía: ${values.preferredDay}\nHora: ${values.preferredTime} (Argentina)\nModalidad: ${values.meetingMode}\nDuración: 45 minutos\nEstado: confirmada.`
    : `Mensaje #${reference}\nNombre: ${values.name}\nEmail: ${values.email}\n\n${values.message}`;
  const confirmation = appointment
    ? `Tu consulta #${reference} está confirmada.\n\nDía: ${values.preferredDay}\nHora: ${values.preferredTime} (Argentina)\nDuración: 45 minutos\nModalidad: ${values.meetingMode}\n\nAgregar a Google Calendar: ${googleCalendarLink(values, reference, settings.mode === 'test' ? settings.testTo : businessRecipient)}\n\nPara reprogramar o cancelar, respondé este correo. ${values.meetingMode === 'Presencial en la oficina' ? 'Oficina: Ramos Mejía 298, Comodoro Rivadavia.' : 'El enlace de videollamada se coordina por correo con Gustavo.'}`
    : `Recibimos tu mensaje #${reference}. Gustavo lo revisará y te contactará para responder tu consulta.\n\nGMP Obras`;
  const emails = [
    { from: `GMP Obras <${settings.from}>`, to: [businessRecipient], reply_to: values.email, subject: appointment ? `Nueva consulta confirmada #${reference}` : `Nuevo mensaje de contacto #${reference}`, text: summary },
    { from: `GMP Obras <${settings.from}>`, to: [values.email], reply_to: businessRecipient, subject: appointment ? 'Tu consulta está confirmada · GMP Obras' : 'Recibimos tu mensaje · GMP Obras', text: confirmation,
      ...(appointment ? { html: renderAppointmentEmail(values, reference, settings.mode === 'test' ? settings.testTo : businessRecipient, settings.mode === 'test') } : {}) },
  ];
  if (settings.mode === 'test') for (const email of emails) {
    email.text = `PRUEBA GMP — NO ATENDER\nDestinatario previsto: ${email.to[0]}\n\n${email.text}`;
    email.subject = `[PRUEBA GMP] ${email.subject}`;
    email.to = [settings.testTo];
    email.reply_to = settings.testTo;
  }
  return emails;
}
export async function sendEmails(settings, emails, id, fetcher = fetch) {
  const response = await fetcher('https://api.resend.com/emails/batch', {
    method: 'POST', headers: { Authorization: `Bearer ${settings.key}`, 'Content-Type': 'application/json', 'Idempotency-Key': `gmp-${id}` },
    body: JSON.stringify(emails), signal: AbortSignal.timeout(10000),
  });
  const result = await response.json();
  if (!response.ok || !Array.isArray(result.data) || result.data.length !== emails.length || result.data.some((item) => !item.id)) throw new Error(`Envío no aceptado (${response.status})`);
  return result.data.map((item) => item.id);
}
