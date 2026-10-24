import test from 'node:test';
import assert from 'node:assert/strict';
import { readBookingReceipt } from '../lib/booking-receipt.mjs';

const now = Date.now();
const receipt = { id: 7, detailsToken: 'a'.repeat(72), date: '2026-11-02', time: '09:00', meetingMode: 'presencial', notification: 'accepted', createdAt: now, details: {}, tracked: false };

test('receipt survives navigation and reload without requiring another booking', () => {
  assert.deepEqual(readBookingReceipt(JSON.stringify(receipt), now), receipt);
  assert.equal(readBookingReceipt(JSON.stringify({ ...receipt, tracked: true }), now).tracked, true);
  for (const time of ['10:00', '15:00']) {
    assert.equal(readBookingReceipt(JSON.stringify({ ...receipt, time }), now).time, time);
  }
});

test('direct visits, malformed receipts and expired editing sessions cannot show a booking confirmation', () => {
  for (const raw of [null, '', '{', '{}', JSON.stringify({ ...receipt, id: 0 }), JSON.stringify({ ...receipt, detailsToken: '' }), JSON.stringify({ ...receipt, createdAt: now - 86400000 })]) {
    assert.equal(readBookingReceipt(raw, now), null);
  }
});
