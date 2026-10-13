export function emailSettings(env) {
  const mode = env.EMAIL_MODE;
  const validEmail = (value) => typeof value === 'string' && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
  if (!['test', 'live'].includes(mode) || !env.RESEND_API_KEY || !validEmail(env.EMAIL_FROM) || !validEmail(env.EMAIL_TO)) return null;
  if (mode === 'test' && !validEmail(env.EMAIL_TEST_TO)) return null;
  return { mode, key: env.RESEND_API_KEY, from: env.EMAIL_FROM, to: env.EMAIL_TO, testTo: env.EMAIL_TEST_TO };
}
export function buildEmails(settings, kind, values, reference) {
  const appointment = kind === 'consulta';
  const summary = appointment
    ? `Solicitud #${reference}\nNombre: ${values.name}\nEmail: ${values.email}\nWhatsApp: ${values.phone || 'Sin indicar'}\nDía: ${values.preferredDay}\nHora: ${values.preferredTime} (Argentina)\nModalidad: ${values.meetingMode}\nDuración: 45 minutos\nEstado: pendiente de confirmación.`
    : `Mensaje #${reference}\nNombre: ${values.name}\nEmail: ${values.email}\n\n${values.message}`;
  const confirmation = appointment
    ? `Recibimos tu solicitud de consulta #${reference}.\n\nDía solicitado: ${values.preferredDay}\nHora: ${values.preferredTime} (Argentina)\nModalidad: ${values.meetingMode}\n\nEl turno está pendiente de confirmación. Gustavo revisará la disponibilidad y te contactará. Este mensaje no confirma una cita ni incluye un enlace de videollamada.`
    : `Recibimos tu mensaje #${reference}. Gustavo lo revisará y te contactará para responder tu consulta.\n\nGMP Obras`;
  const emails = [
    { from: `GMP Obras <${settings.from}>`, to: [settings.to], reply_to: values.email, subject: appointment ? `Nueva solicitud de consulta #${reference}` : `Nuevo mensaje de contacto #${reference}`, text: summary },
    { from: `GMP Obras <${settings.from}>`, to: [values.email], reply_to: settings.to, subject: appointment ? 'Recibimos tu solicitud · GMP Obras' : 'Recibimos tu mensaje · GMP Obras', text: confirmation },
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
