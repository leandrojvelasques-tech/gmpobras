export const appointmentSchedule = {
  weekdays: [1, 3, 5],
  times: ['10:00', '15:00'],
  durationMinutes: 45,
  timeZone: 'America/Argentina/Buenos_Aires',
};
export function argentinaDate(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: appointmentSchedule.timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}
export function proposedTimes(date, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
  if (date.slice(0, 7) > lastBookingMonth(now)) return [];
  const day = new Date(`${date}T12:00:00-03:00`);
  if (Number.isNaN(day.valueOf()) || argentinaDate(day) !== date || !appointmentSchedule.weekdays.includes(day.getUTCDay())) return [];
  return appointmentSchedule.times.filter((time) => new Date(`${date}T${time}:00-03:00`).valueOf() > now.valueOf());
}
export function lastBookingMonth(now = new Date()) {
  const [year, month] = argentinaDate(now).split('-').map(Number);
  return new Date(Date.UTC(year, month, 1)).toISOString().slice(0, 7);
}
export function firstProposedDate(now = new Date()) {
  const start = new Date(`${argentinaDate(now)}T12:00:00-03:00`);
  for (let offset = 0; offset < 14; offset++) {
    const day = new Date(start.valueOf() + offset * 86400000);
    const date = argentinaDate(day);
    if (proposedTimes(date, now).length) return date;
  }
  return '';
}
export function formatAppointmentDate(date) {
  return new Intl.DateTimeFormat('es-AR', { timeZone: appointmentSchedule.timeZone, weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(`${date}T12:00:00-03:00`));
}
