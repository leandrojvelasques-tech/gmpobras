export const bookingReceiptKey = 'gmp-booking-receipt';

// Keep contact details and the private editing token out of the URL and analytics.
export function readBookingReceipt(raw, now = Date.now()) {
  try {
    const value = JSON.parse(raw);
    if (!value || !Number.isSafeInteger(value.id) || value.id <= 0 ||
        typeof value.detailsToken !== 'string' || value.detailsToken.length !== 72 ||
        !/^\d{4}-\d{2}-\d{2}$/.test(value.date) || !['09:00', '11:00', '10:00', '15:00'].includes(value.time) ||
        !['presencial', 'virtual'].includes(value.meetingMode) ||
        !['accepted', 'test', 'pending', 'disabled'].includes(value.notification) ||
        !Number.isFinite(value.createdAt) || value.createdAt > now || now - value.createdAt >= 86400000 ||
        !value.details || typeof value.details !== 'object') return null;
    return value;
  } catch { return null; }
}
