import { env } from 'cloudflare:workers';
import { eq, and, gt } from 'drizzle-orm';
import { getDb } from '../db';
import { emailNotifications } from '../db/schema';
import { emailSettings, buildEmails, sendEmails } from './email.mjs';

export function notificationSettings() { return emailSettings(env as unknown as Record<string, string>); }

export async function notificationLimited(email: string) {
  const recent = await getDb().select({ id: emailNotifications.id }).from(emailNotifications).where(and(eq(emailNotifications.contactEmail, email), gt(emailNotifications.createdAt, new Date(Date.now() - 60_000).toISOString()))).limit(1);
  return recent.length > 0;
}

export async function notify(kind: string, values: Record<string, unknown>, reference: number) {
  const settings = notificationSettings();
  if (!settings) return 'disabled';
  const id = crypto.randomUUID();
  const messages = buildEmails(settings, kind, values, reference);
  await getDb().insert(emailNotifications).values({ id, kind, reference, contactEmail: String(values.email), payload: JSON.stringify(messages), mode: settings.mode, createdAt: new Date().toISOString() });
  try {
    const providerIds = await sendEmails(settings, messages, id);
    await getDb().update(emailNotifications).set({ status: 'accepted', providerIds: JSON.stringify(providerIds) }).where(eq(emailNotifications.id, id));
    return settings.mode === 'test' ? 'test' : 'accepted';
  } catch {
    console.error('Notificación pendiente de envío', id);
    return 'pending';
  }
}
