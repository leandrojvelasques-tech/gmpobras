import test from 'node:test';
import assert from 'node:assert/strict';
import { availabilityMessage, BookingRequestError, loadAvailability, readBookingResponse } from '../lib/booking-api.mjs';

test('availability recovers after a plain text gateway error without leaking parsing errors', async () => {
  let calls = 0;
  const delays = [];
  const booked = [{ date: '2026-11-18', time: '09:00' }];
  const result = await loadAvailability(async (url, options) => {
    assert.equal(url, '/api/consultas');
    assert.equal(options.method, undefined);
    assert.equal(options.cache, 'no-store');
    return ++calls === 1 ? new Response('Bad Gateway', { status: 502 }) : Response.json({ booked });
  }, async ms => { delays.push(ms); });
  assert.deepEqual(result, booked);
  assert.equal(calls, 2);
  assert.deepEqual(delays, [1000]);
});

test('a persistent outage ends after three attempts and a later request can recover', async () => {
  let calls = 0;
  await assert.rejects(loadAvailability(async () => {
    calls++; throw new TypeError('Failed to fetch');
  }, async () => {}), { message: availabilityMessage });
  assert.equal(calls, 3);
  assert.deepEqual(await loadAvailability(async () => Response.json({ booked: [] })), []);
});

test('invalid JSON and invalid availability cannot become available slots', async () => {
  for (const body of ['Bad Gateway', 'null', '{"booked":[null]}', '{"booked":{}}']) {
    await assert.rejects(loadAvailability(async () => new Response(body, { headers: { 'content-type': 'application/json' } }), async () => {}), { message: availabilityMessage });
  }
});

test('booking responses preserve useful conflicts but hide gateway and server details', async () => {
  await assert.rejects(readBookingResponse(Response.json({ error: 'Ese horario acaba de reservarse.' }, { status: 409 }), 'Error temporal'), { message: 'Ese horario acaba de reservarse.' });
  for (const response of [new Response('Bad Gateway', { status: 502 }), Response.json({ error: 'Internal database details' }, { status: 500 }), new Response('Bad Gateway', { headers: { 'content-type': 'application/json' } })]) {
    await assert.rejects(readBookingResponse(response, 'Error temporal'), error => error instanceof BookingRequestError && error.message === 'Error temporal');
  }
});
