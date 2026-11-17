export const availabilityMessage = 'No pudimos actualizar los horarios. Volvé a intentar o consultanos por WhatsApp.';

export class BookingRequestError extends Error {}

// Gateways can return plain text or HTML even when the application returns JSON.
export async function readBookingResponse(response, fallback) {
  let result;
  try {
    if (!response.headers.get('content-type')?.includes('application/json')) throw new Error();
    result = await response.json();
    if (!result || typeof result !== 'object' || Array.isArray(result)) throw new Error();
  } catch { throw new BookingRequestError(fallback); }
  if (!response.ok) {
    throw new BookingRequestError(response.status < 500 && typeof result.error === 'string' ? result.error : fallback);
  }
  return result;
}

// Retry only the read: a reservation must never be submitted again automatically.
export async function loadAvailability(fetcher = fetch, wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetcher('/api/consultas', { cache: 'no-store', signal: AbortSignal.timeout(10000) });
      const result = await readBookingResponse(response, availabilityMessage);
      if (!Array.isArray(result.booked) || !result.booked.every(slot => slot && typeof slot.date === 'string' && typeof slot.time === 'string')) {
        throw new BookingRequestError(availabilityMessage);
      }
      return result.booked;
    } catch {
      if (attempt === 2) throw new BookingRequestError(availabilityMessage);
      await wait((attempt + 1) * 1000);
    }
  }
}
