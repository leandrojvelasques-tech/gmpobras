import test from 'node:test';
import assert from 'node:assert/strict';
import { emailSettings, buildEmails, sendEmails } from '../lib/email.mjs';
const env = { EMAIL_MODE: 'test', RESEND_API_KEY: 'fake-local-key', EMAIL_FROM: 'info@leandrovelasques.com.ar', EMAIL_TO: 'gpinto@gmpobras.com', EMAIL_TEST_TO: 'info@leandrovelasques.com.ar' };
const values = { name: 'Prueba', email: 'visitante@example.invalid', phone: '', preferredDay: '2026-11-02', preferredTime: '10:00', meetingMode: 'Virtual por Google Meet' };
test('unconfigured or incomplete test delivery cannot send to visitors', () => {
  assert.equal(emailSettings({}), null);
  assert.equal(emailSettings({ ...env, EMAIL_TEST_TO: '' }), null);
  assert.equal(emailSettings({ ...env, EMAIL_MODE: 'invalid' }), null);
  assert.equal(emailSettings({ ...env, EMAIL_FROM: 'bad\naddress' }), null);
});
test('test mode redirects owner and visitor notices exclusively to the test mailbox', () => {
  const messages = buildEmails(emailSettings(env), 'consulta', { ...values, detailsToken: 'NEVER_EXPOSE' }, 17);
  assert.equal(messages.length, 2);
  for (const message of messages) {
    assert.deepEqual(message.to, ['info@leandrovelasques.com.ar']);
    assert.equal(message.reply_to, 'info@leandrovelasques.com.ar');
    assert.match(message.subject, /PRUEBA GMP/);
    assert.doesNotMatch(message.text, /NEVER_EXPOSE/);
  }
  assert.match(messages[1].text, /pendiente de confirmación/);
});
test('live delivery keeps visitor and business recipients distinct', () => {
  const messages = buildEmails(emailSettings({ ...env, EMAIL_MODE: 'live' }), 'contacto', { ...values, message: 'Hola' }, 19);
  assert.deepEqual(messages.map(message => message.to[0]), ['gpinto@gmpobras.com', 'visitante@example.invalid']);
  assert.equal(messages[0].reply_to, values.email);
  assert.doesNotMatch(messages[1].text, /Hola/);
});
test('sender uses stable idempotency and propagates rejection or malformed acceptance', async () => {
  const settings = emailSettings(env);
  const messages = buildEmails(settings, 'consulta', values, 17);
  const ids = await sendEmails(settings, messages, 'unique-id', async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails/batch');
    assert.equal(options.headers['Idempotency-Key'], 'gmp-unique-id');
    assert.equal(options.headers.Authorization, 'Bearer fake-local-key');
    assert.deepEqual(JSON.parse(options.body), messages);
    return Response.json({ data: [{ id: 'a' }, { id: 'b' }] });
  });
  assert.deepEqual(ids, ['a', 'b']);
  await assert.rejects(sendEmails(settings, messages, 'unique-id', async () => Response.json({ message: 'No' }, { status: 403 })));
  await assert.rejects(sendEmails(settings, messages, 'unique-id', async () => Response.json({ data: [] })));
});
