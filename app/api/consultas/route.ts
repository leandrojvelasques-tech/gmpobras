import { getDb } from '../../../db';
import { consultations } from '../../../db/schema';
import { and, eq, gt } from 'drizzle-orm';
import { normalizeRequest, validateRequest, normalizeDetails, validateDetails } from '../../../lib/consultation-request.mjs';

const privateHeaders = { 'Cache-Control': 'no-store' };
async function hashToken(token: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}
async function readPayload(request: Request) {
  try {
    const payload = await request.json();
    return payload && typeof payload === 'object' && !Array.isArray(payload) ? payload as Record<string, unknown> : null;
  } catch { return null; }
}
export async function POST(request: Request) {
  const payload = await readPayload(request);
  if (!payload) return Response.json({ error: 'Revisá los datos de la solicitud.' }, { status: 400, headers: privateHeaders });
  const values = normalizeRequest(payload);
  const error = validateRequest(values, payload.acceptedPrivacy);
  if (error) return Response.json({ error }, { status: 400, headers: privateHeaders });
  try {
    const detailsToken = crypto.randomUUID() + crypto.randomUUID();
    const [consultation] = await getDb().insert(consultations).values({
      ...values,
      detailsTokenHash: await hashToken(detailsToken),
      detailsTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }).returning({ id: consultations.id, createdAt: consultations.createdAt });
    return Response.json({ consultation, detailsToken }, { status: 201, headers: privateHeaders });
  } catch (error) {
    console.error('No se pudo registrar la consulta', error);
    return Response.json({ error: 'No pudimos guardar la solicitud. Tus datos siguen en pantalla para volver a intentar.' }, { status: 500, headers: privateHeaders });
  }
}
export async function PATCH(request: Request) {
  const payload = await readPayload(request);
  if (!payload || typeof payload.id !== 'number' || !Number.isSafeInteger(payload.id) || payload.id <= 0 || typeof payload.detailsToken !== 'string' || payload.detailsToken.length !== 72) {
    return Response.json({ error: 'No pudimos identificar tu solicitud.' }, { status: 400, headers: privateHeaders });
  }
  const details = normalizeDetails(payload);
  const error = validateDetails(details);
  if (error) return Response.json({ error }, { status: 400, headers: privateHeaders });
  try {
    const [updated] = await getDb().update(consultations).set(details).where(and(
      eq(consultations.id, payload.id),
      eq(consultations.detailsTokenHash, await hashToken(payload.detailsToken)),
      gt(consultations.detailsTokenExpiresAt, new Date().toISOString()),
    )).returning({ id: consultations.id });
    if (!updated) return Response.json({ error: 'Esta sesión ya no permite agregar información. Tu solicitud sigue registrada.' }, { status: 403, headers: privateHeaders });
    return Response.json({ consultation: updated }, { headers: privateHeaders });
  } catch (error) {
    console.error('No se pudo completar la consulta', error);
    return Response.json({ error: 'No pudimos guardar los detalles. Tu solicitud ya está registrada; podés volver a intentar.' }, { status: 500, headers: privateHeaders });
  }
}
