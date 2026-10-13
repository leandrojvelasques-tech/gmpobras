import { getDb } from '../../../db';
import { contactMessages } from '../../../db/schema';
import { notificationSettings, notificationLimited, notify } from '../../../lib/notifications';
import { cleanText } from '../../../lib/consultation-request.mjs';

const headers = { 'Cache-Control': 'no-store' };
export async function POST(request: Request) {
  if (!notificationSettings()) return Response.json({ error: 'El envío desde la web todavía no está disponible.', fallback: true }, { status: 503, headers });
  let raw: unknown;
  try { raw = await request.json(); } catch { return Response.json({ error: 'Revisá el mensaje.' }, { status: 400, headers }); }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return Response.json({ error: 'Revisá el mensaje.' }, { status: 400, headers });
  const payload = raw as Record<string, unknown>;
  const values = { name: cleanText(payload.name, 160), email: cleanText(payload.email, 254).toLowerCase(), message: cleanText(payload.message, 4000) };
  if (!values.name || !values.message || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(values.email)) return Response.json({ error: 'Completá tu nombre, un email válido y tu mensaje.' }, { status: 400, headers });
  if (payload.website) return Response.json({ error: 'No pudimos recibir el mensaje.' }, { status: 400, headers });
  try {
    if (await notificationLimited(values.email)) return Response.json({ error: 'Esperá un minuto antes de enviar otro mensaje.' }, { status: 429, headers });
    const [saved] = await getDb().insert(contactMessages).values(values).returning({ id: contactMessages.id });
    let notification = 'pending';
    try { notification = await notify('contacto', values, saved.id); } catch { console.error('Aviso de contacto pendiente', saved.id); }
    return Response.json({ id: saved.id, notification }, { status: 201, headers });
  } catch {
    return Response.json({ error: 'No pudimos registrar el mensaje. Volvé a intentar.' }, { status: 500, headers });
  }
}
