import { proposedTimes } from './appointment-schedule.mjs';
export function cleanText(value, maximum) {
  return typeof value === 'string' ? value.trim().slice(0, maximum) : '';
}
export function normalizeDetails(payload) {
  return {
    projectType: cleanText(payload.projectType, 100), city: cleanText(payload.city, 100), address: cleanText(payload.address, 220),
    projectDetail: cleanText(payload.projectDetail, 4000),
    projectStages: JSON.stringify(Array.isArray(payload.projectStages) ? payload.projectStages.filter(stage => typeof stage === 'string').map(stage => cleanText(stage, 120)).slice(0, 8) : []),
    stageDetail: cleanText(payload.stageDetail, 2000) || null,
    materialLink: cleanText(payload.materialLink, 1000) || null, budget: cleanText(payload.budget, 120),
  };
}
export function validateDetails(values) {
  if (values.materialLink) {
    try { if (!['http:', 'https:'].includes(new URL(values.materialLink).protocol)) return 'Usá un enlace que empiece con https:// o http://.'; }
    catch { return 'Revisá el enlace al material.'; }
  }
  return '';
}
export function normalizeRequest(payload) {
  return { ...normalizeDetails(payload), meetingMode: cleanText(payload.meetingMode, 100),
    preferredDay: cleanText(payload.preferredDay, 10), preferredTime: cleanText(payload.preferredTime, 40),
    name: cleanText(payload.name, 160), phone: cleanText(payload.phone, 80), email: cleanText(payload.email, 254).toLowerCase() };
}
export function validateRequest(values, consent, now = new Date()) {
  if (!values.name || !values.email || !values.meetingMode || !values.preferredDay || !values.preferredTime) return 'Completá tu nombre, email, modalidad y horario.';
  if (consent !== true) return 'Aceptá el uso de tus datos para coordinar esta consulta.';
  if (!['Presencial en la oficina', 'Virtual por Google Meet'].includes(values.meetingMode)) return 'Elegí si preferís una consulta presencial o virtual.';
  if (!proposedTimes(values.preferredDay, now).includes(values.preferredTime)) return 'Elegí uno de los horarios propuestos para una fecha futura.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return 'Revisá el correo electrónico.';
  return validateDetails(values);
}
