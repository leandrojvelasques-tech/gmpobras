import { writeFileSync } from 'node:fs';
import { renderAppointmentEmail } from '../lib/appointment-email.mjs';
const output = process.argv[2];
if (!output) throw new Error('Indicá el archivo HTML de salida.');
writeFileSync(output, renderAppointmentEmail({ name: 'Nombre de prueba', preferredDay: '2026-11-02', preferredTime: '10:00', meetingMode: 'Presencial en la oficina' }, 'VISTA PREVIA', 'info@leandrovelasques.com.ar', true));
