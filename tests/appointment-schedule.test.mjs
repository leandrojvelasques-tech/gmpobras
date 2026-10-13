import assert from 'node:assert/strict';
import test from 'node:test';
import { firstProposedDate, proposedTimes, argentinaDate, lastBookingMonth } from '../lib/appointment-schedule.mjs';

test('proposal has six slots per week: Monday, Wednesday and Friday at 10 and 15', () => {
  const before = new Date('2026-10-11T20:00:00Z');
  const dates = ['2026-10-12','2026-10-13','2026-10-14','2026-10-15','2026-10-16','2026-10-17','2026-10-18'];
  assert.deepEqual(dates.map((date) => proposedTimes(date, before)), [['10:00','15:00'],[],['10:00','15:00'],[],['10:00','15:00'],[],[]]);
});

test('only the current and next Argentina calendar months accept appointments', () => {
  const october = new Date('2026-10-13T12:00:00Z');
  assert.equal(lastBookingMonth(october), '2026-11');
  assert.deepEqual(proposedTimes('2026-11-30', october), ['10:00', '15:00']);
  assert.deepEqual(proposedTimes('2026-12-02', october), []);
  assert.equal(lastBookingMonth(new Date('2027-01-01T01:00:00Z')), '2027-01');
  assert.equal(lastBookingMonth(new Date('2027-01-01T04:00:00Z')), '2027-02');
});
test('past hours and dates cannot be selected, including exact start time', () => {
  const now = new Date('2026-10-12T13:00:00Z');
  assert.deepEqual(proposedTimes('2026-10-12', now), ['15:00']);
  assert.deepEqual(proposedTimes('2026-10-09', now), []);
  assert.equal(firstProposedDate(new Date('2026-10-12T18:00:00Z')), '2026-10-14');
});
test('calendar dates use Argentina timezone across UTC midnight and month boundaries', () => {
  assert.equal(argentinaDate(new Date('2026-11-01T01:00:00Z')), '2026-10-31');
  assert.equal(firstProposedDate(new Date('2026-10-31T23:00:00Z')), '2026-11-02');
  assert.deepEqual(proposedTimes('2026-02-30', new Date('2026-01-01T00:00:00Z')), []);
  assert.deepEqual(proposedTimes('garbage'), []);
});
