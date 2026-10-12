import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeRequest, validateRequest, normalizeDetails, validateDetails } from '../lib/consultation-request.mjs';
const now = new Date('2026-10-11T20:00:00Z');
const minimal = { name: 'Prueba local', email: 'prueba@example.com', meetingMode: 'Presencial en la oficina', preferredDay: '2026-10-12', preferredTime: '10:00' };
test('a request accepts only contact and meeting preference, with no mandatory project details or WhatsApp', () => {
  const values = normalizeRequest(minimal);
  assert.equal(validateRequest(values, true, now), '');
  assert.equal(values.projectStages, '[]');
  assert.equal(values.phone, '');
});
test('both meeting modes are accepted and consent, email and a future offered slot are required', () => {
  assert.equal(validateRequest(normalizeRequest({ ...minimal, meetingMode: 'Virtual por Google Meet' }), true, now), '');
  for (const changes of [{ email: 'bad' }, { preferredDay: '2026-10-13' }, { preferredTime: '11:00' }, { meetingMode: 'other' }, { name: '' }]) {
    assert.ok(validateRequest(normalizeRequest({ ...minimal, ...changes }), true, now));
  }
  assert.ok(validateRequest(normalizeRequest(minimal), false, now));
});
test('detail updates cannot change meeting, status or contact and reject unsafe material links', () => {
  const details = normalizeDetails({ projectDetail: 'Ampliación', name: 'Other', email: 'other@example.com', status: 'confirmado', preferredTime: '15:00', detailsTokenHash: 'spoof' });
  assert.equal(details.projectDetail, 'Ampliación');
  for (const field of ['name','email','status','preferredTime','detailsTokenHash']) assert.equal(field in details, false);
  assert.equal(validateDetails(normalizeDetails({ materialLink: 'https://drive.google.com/example' })), '');
  assert.ok(validateDetails(normalizeDetails({ materialLink: 'javascript:alert(1)' })));
});
