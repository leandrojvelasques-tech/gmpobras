import { appointmentSchedule } from './appointment-schedule.mjs';

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}
export function googleCalendarLink(values, reference, contactEmail) {
  const start = new Date(`${values.preferredDay}T${values.preferredTime}:00-03:00`);
  const end = new Date(start.valueOf() + appointmentSchedule.durationMinutes * 60000);
  const stamp = (date) => date.toISOString().replace(/[-:]/g, '').replace('.000', '');
  const location = values.meetingMode === 'Presencial en la oficina' ? 'Ramos Mejía 298, Comodoro Rivadavia' : 'Virtual por Google Meet (enlace a coordinar por correo)';
  const params = new URLSearchParams({ action: 'TEMPLATE', text: 'Consulta con Gustavo Pinto · GMP Obras', dates: `${stamp(start)}/${stamp(end)}`, ctz: appointmentSchedule.timeZone, location,
    details: `Consulta inicial sin costo · 45 minutos.\nReserva #${reference}.\nPara reprogramar o cancelar, escribí a ${contactEmail}.\nhttps://www.gmpobras.com.ar/agendar` });
  return `https://calendar.google.com/calendar/render?${params}`;
}
export function renderAppointmentEmail(values, reference, contactEmail, testMode = false) {
  const e = escapeHtml;
  const date = new Intl.DateTimeFormat('es-AR', { timeZone: appointmentSchedule.timeZone, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${values.preferredDay}T12:00:00-03:00`));
  const presencial = values.meetingMode === 'Presencial en la oficina';
  const calendar = googleCalendarLink(values, reference, contactEmail);
  const change = (action) => `mailto:${contactEmail}?subject=${encodeURIComponent(`${action} consulta #${reference} · GMP Obras`)}&body=${encodeURIComponent(`Hola Gustavo, quiero ${action.toLowerCase()} mi consulta del ${date} a las ${values.preferredTime}.\n\nNombre: ${values.name}\nReserva: #${reference}\n`)}`;
  const maps = 'https://www.google.com/maps/dir/?api=1&destination=Ramos+Mej%C3%ADa+298%2C+Comodoro+Rivadavia%2C+Chubut';
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Tu consulta está confirmada · GMP Obras</title></head>
<body style="margin:0;padding:0;background:#eef0f3;color:#17191d;font-family:Arial,Helvetica,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Tu consulta con Gustavo está confirmada para el ${e(date)} a las ${e(values.preferredTime)}.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef0f3;"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;">
<tr><td style="padding:22px 28px;background:#292a2d;"><a href="https://www.gmpobras.com.ar/" style="text-decoration:none;"><img src="https://www.gmpobras.com.ar/logo-gmp-obras-horizontal-cuadrado-punteado.png" alt="GMP Obras" width="200" style="display:block;width:200px;max-width:100%;height:auto;border:0;"></a></td></tr>
${testMode ? '<tr><td style="padding:14px 28px;background:#e7edf9;color:#263b70;font-size:12px;line-height:18px;"><strong>PRUEBA GMP — NO ATENDER.</strong> Este mensaje se envió al correo de pruebas.</td></tr>' : ''}
<tr><td style="padding:30px 28px;background:#263b70;color:#ffffff;"><p style="margin:0 0 14px;font-size:11px;letter-spacing:2px;font-weight:bold;color:#b8cef5;">CONSULTA INICIAL · SIN COSTO</p><h1 style="margin:0;font-size:34px;line-height:39px;font-weight:normal;">Tu consulta está<br>confirmada.</h1><p style="margin:16px 0 0;color:#d8e2f5;font-size:15px;line-height:23px;">Conversemos sobre tu proyecto.</p></td></tr>
<tr><td style="padding:28px;"><p style="margin:0 0 10px;font-size:17px;line-height:26px;">Hola, ${e(values.name)}.</p><p style="margin:0 0 24px;font-size:15px;line-height:24px;color:#62666f;">Te espero para que me cuentes qué querés hacer y dónde.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:3px solid #4163a5;background:#eef0f3;"><tr><td style="padding:20px;"><p style="margin:0 0 7px;color:#4163a5;font-size:11px;font-weight:bold;letter-spacing:1px;">DÍA Y HORARIO</p><p style="margin:0;font-size:20px;line-height:28px;color:#263b70;">${e(date)}</p><p style="margin:6px 0 18px;font-size:16px;line-height:24px;color:#263b70;"><strong>${e(values.preferredTime)}</strong> · 45 minutos · Hora de Argentina</p><p style="margin:0 0 5px;font-size:11px;color:#4163a5;font-weight:bold;letter-spacing:1px;">MODALIDAD</p><p style="margin:0;font-size:16px;line-height:24px;">${presencial ? 'Presencial en mi oficina' : 'Virtual por Google Meet'}</p><p style="margin:6px 0 0;font-size:14px;line-height:22px;color:#62666f;">${presencial ? `Ramos Mejía 298 · Comodoro Rivadavia<br><a href="${e(maps)}" style="color:#263b70;text-decoration:underline;">Cómo llegar</a>` : 'El enlace de la videollamada se coordina por correo con Gustavo.'}</p></td></tr></table>
<p style="margin:24px 0 14px;font-size:15px;line-height:23px;">Agregá la consulta a tu calendario para tenerla a mano.</p>
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td bgcolor="#4163a5" style="background:#4163a5;"><a href="${e(calendar)}" style="display:inline-block;padding:15px 22px;color:#ffffff;font-size:15px;font-weight:bold;line-height:22px;text-decoration:none;">Agregar a Google Calendar →</a></td></tr></table>
<p style="margin:10px 0 26px;font-size:12px;line-height:19px;color:#62666f;">Se abrirá Google Calendar con los datos del turno. Tocá Guardar para agregarlo a tu agenda.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #d8d9dc;"><tr><td style="padding-top:23px;"><h2 style="margin:0 0 9px;color:#263b70;font-size:19px;line-height:25px;font-weight:normal;">¿Necesitás cambiar el turno?</h2><p style="margin:0 0 14px;color:#62666f;font-size:14px;line-height:23px;">Podés responder este correo o escribirme para reprogramar o cancelar la consulta. El cambio se coordina por correo.</p><p style="margin:0;font-size:14px;line-height:26px;"><a href="${e(change('Reprogramar'))}" style="color:#263b70;text-decoration:underline;">Pedir reprogramación</a> &nbsp;·&nbsp; <a href="${e(change('Cancelar'))}" style="color:#263b70;text-decoration:underline;">Pedir cancelación</a></p><p style="margin:14px 0 0;font-size:14px;line-height:23px;"><a href="mailto:${e(contactEmail)}" style="color:#263b70;text-decoration:underline;">${e(contactEmail)}</a></p></td></tr></table>
<p style="margin:28px 0 0;color:#263b70;font-size:15px;line-height:24px;">Gustavo Pinto<br><span style="color:#62666f;font-size:13px;">Maestro mayor de obras · GMP Obras</span></p></td></tr>
<tr><td style="padding:20px 28px;background:#292a2d;color:#d8d9dc;font-size:12px;line-height:21px;">Reserva #${e(reference)}<br>Ramos Mejía 298 · Comodoro Rivadavia<br><a href="https://www.gmpobras.com.ar/" style="color:#ffffff;text-decoration:underline;">www.gmpobras.com.ar</a> &nbsp;·&nbsp; <a href="https://www.instagram.com/gmpobras/" style="color:#ffffff;text-decoration:underline;">Instagram</a></td></tr>
</table></td></tr></table></body></html>`;
}
