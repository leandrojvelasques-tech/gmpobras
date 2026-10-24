import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';
import { googleCalendarLink, renderAppointmentEmail } from '../lib/appointment-email.mjs';
import { availableTimes, firstAvailableDate } from '../lib/appointment-schedule.mjs';

test('database atomically allows one confirmed reservation per slot and releases cancelled slots', () => {
  const db = new DatabaseSync(':memory:');
  try {
    for (const file of readdirSync('drizzle').filter(file => file.endsWith('.sql')).sort()) db.exec(readFileSync(`drizzle/${file}`, 'utf8'));
    const insert = db.prepare(`INSERT INTO consultations (status,project_type,city,address,project_detail,project_stages,meeting_mode,preferred_day,preferred_time,name,phone,email,budget) VALUES (?, '', '', '', '', '[]', 'Presencial en la oficina', '2026-11-02', ?, 'Prueba', '', 'prueba@example.invalid', '') ON CONFLICT DO NOTHING RETURNING id`);
    assert.ok(insert.get('pendiente', '09:00'));
    const booking = insert.get('confirmada', '09:00');
    assert.ok(booking);
    assert.equal(insert.get('confirmada', '09:00'), undefined);
    assert.ok(insert.get('confirmada', '11:00'));
    db.prepare("UPDATE consultations SET status='cancelada' WHERE id=?").run(booking.id);
    assert.ok(insert.get('confirmada', '09:00'));
  } finally { db.close(); }
});
test('availability skips booked hours and a fully booked first day', () => {
  const now = new Date('2026-10-13T12:00:00Z');
  const booked = [{ date: '2026-10-14', time: '09:00' }, { date: '2026-10-14', time: '11:00' }];
  assert.deepEqual(availableTimes('2026-10-14', booked, now), []);
  assert.equal(firstAvailableDate(booked, now), '2026-10-16');
});
test('Calendar link preserves Argentina start, 45-minute duration, address and contact', () => {
  const values = { name: 'Nombre de prueba', preferredDay: '2026-11-02', preferredTime: '09:00', meetingMode: 'Presencial en la oficina' };
  const link = new URL(googleCalendarLink(values, 77, 'info@leandrovelasques.com.ar'));
  assert.equal(link.origin, 'https://calendar.google.com');
  assert.equal(link.searchParams.get('dates'), '20261102T120000Z/20261102T124500Z');
  assert.equal(link.searchParams.get('ctz'), 'America/Argentina/Buenos_Aires');
  assert.match(link.searchParams.get('location'), /Ramos Mejía 298/);
  assert.match(link.searchParams.get('details'), /info@leandrovelasques.com.ar/);
  const html = renderAppointmentEmail({ ...values, name: '<img src=x onerror=alert(1)>' }, 77, 'info@leandrovelasques.com.ar', true);
  assert.doesNotMatch(html, /<img src=x/);
  assert.match(html, /&lt;img src=x/);
  assert.match(html, /Pedir reprogramación/);
  assert.match(html, /Pedir cancelación/);
  assert.match(html, /logo-gmp-obras-horizontal-cuadrado-punteado.png/);
  assert.match(html, /PRUEBA GMP/);
});
