import assert from 'node:assert/strict';
import test from 'node:test';
import { nextAvailableSlots, availableTimes, argentinaDate } from '../lib/appointment-schedule.mjs';

test('quick choices exclude elapsed and occupied slots and stay chronological', () => {
  const now = new Date('2026-11-18T12:00:00Z');
  assert.deepEqual(nextAvailableSlots([{ date: '2026-11-20', time: '09:00' }], now), [
    { date: '2026-11-18', time: '11:00' },
    { date: '2026-11-20', time: '11:00' },
    { date: '2026-11-23', time: '09:00' },
  ]);
});

test('quick choices handle Argentina midnight and never exceed the booking window', () => {
  const now = new Date('2027-01-01T01:00:00Z');
  assert.equal(argentinaDate(now), '2026-12-31');
  const booked = [];
  for (let d = 1; d <= 31; d++) {
    const date = `2027-01-${String(d).padStart(2, '0')}`;
    for (const time of availableTimes(date, [], now)) booked.push({date,time});
  }
  assert.deepEqual(nextAvailableSlots(booked, now), []);
  assert.deepEqual(nextAvailableSlots(booked.slice(0, -1), now), [booked.at(-1)]);
});
