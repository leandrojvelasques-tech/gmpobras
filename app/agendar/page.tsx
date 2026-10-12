'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, MapPin, Video } from 'lucide-react';
import Image from 'next/image';
import { argentinaDate, firstProposedDate, proposedTimes, formatAppointmentDate } from '../../lib/appointment-schedule.mjs';

const projectTypes = ['Vivienda nueva', 'Ampliación', 'Consultorio', 'Local comercial', 'Otro proyecto'];
const projectStages = ['Todavía es una idea inicial', 'Ya tengo terreno o inmueble', 'Ya tengo anteproyecto o planos', 'La obra ya está iniciada'];
const initialDetails = { projectType: '', city: '', address: '', projectDetail: '', stage: '', budget: '', materialLink: '' };
const officeAddress = 'Ramos Mejía 298 · Comodoro Rivadavia';
const officeMapUrl = 'https://www.google.com/maps/dir/?api=1&destination=Ramos+Mej%C3%ADa+298%2C+Comodoro+Rivadavia%2C+Chubut';

export default function AppointmentPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [month, setMonth] = useState('');
  const [today, setToday] = useState('');
  const [contact, setContact] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [meetingMode, setMeetingMode] = useState<'presencial' | 'virtual' | ''>('');
  const [confirmed, setConfirmed] = useState(false);
  const [confirmationId, setConfirmationId] = useState<number | null>(null);
  const [detailsToken, setDetailsToken] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [savingDetails, setSavingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [details, setDetails] = useState(initialDetails);
  const [detailsSaved, setDetailsSaved] = useState(false);
  const [error, setError] = useState('');
  const confirmationHeading = useRef<HTMLHeadingElement>(null);
  const contactHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const date = firstProposedDate();
    setToday(argentinaDate()); setSelectedDate(date); setMonth(date.slice(0, 7));
    const model = new URLSearchParams(window.location.search).get('modelo');
    if (model) setDetails((current) => ({ ...current, projectType: 'Vivienda nueva', projectDetail: `Me interesa el modelo ${model}.` }));
  }, []);
  useEffect(() => { if (confirmed) confirmationHeading.current?.focus(); }, [confirmed]);
  useEffect(() => { if (selectedTime) contactHeading.current?.focus(); }, [selectedTime]);

  const dates: (string | null)[] = [];
  if (month) {
    const [year, monthNumber] = month.split('-').map(Number);
    const firstDay = new Date(Date.UTC(year, monthNumber - 1, 1));
    for (let i = 0; i < (firstDay.getUTCDay() + 6) % 7; i++) dates.push(null);
    const days = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
    for (let day = 1; day <= days; day++) dates.push(`${month}-${String(day).padStart(2, '0')}`);
  }
  const monthLabel = month ? new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${month}-01T12:00:00Z`)) : '';
  const times = selectedDate ? proposedTimes(selectedDate) : [];
  function changeMonth(offset: number) {
    const [year, monthNumber] = month.split('-').map(Number);
    const date = new Date(Date.UTC(year, monthNumber - 1 + offset, 1));
    setMonth(date.toISOString().slice(0, 7));
    setSelectedDate(''); setSelectedTime(''); setError('');
  }
  function updateDetail(field: keyof typeof details, value: string) {
    setDetails((current) => ({ ...current, [field]: value })); setDetailsSaved(false);
  }
  async function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!meetingMode || !acceptedPrivacy || submitting) return;
    if (!proposedTimes(selectedDate).includes(selectedTime)) { setSelectedTime(''); setError('Elegí un horario futuro para solicitar la consulta.'); return; }
    setError(''); setSubmitting(true);
    try {
      const response = await fetch('/api/consultas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        name: `${contact.firstName.trim()} ${contact.lastName.trim()}`, email: contact.email, phone: contact.phone,
        meetingMode: meetingMode === 'presencial' ? 'Presencial en la oficina' : 'Virtual por Google Meet',
        preferredDay: selectedDate, preferredTime: selectedTime, acceptedPrivacy,
      }) });
      const result = await response.json() as { consultation?: { id: number }; detailsToken?: string; error?: string };
      if (!response.ok || !result.consultation?.id || !result.detailsToken) throw new Error(result.error || 'No pudimos guardar la solicitud.');
      setConfirmationId(result.consultation.id); setDetailsToken(result.detailsToken); setConfirmed(true);
    } catch (error) { setError(error instanceof Error ? error.message : 'No pudimos guardar la solicitud. Tus datos siguen en pantalla.'); }
    finally { setSubmitting(false); }
  }
  async function saveDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingDetails) return;
    setSavingDetails(true); setDetailsError(''); setDetailsSaved(false);
    try {
      const response = await fetch('/api/consultas', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        ...details, projectStages: details.stage ? [details.stage] : [], id: confirmationId, detailsToken,
      }) });
      const result = await response.json() as { consultation?: { id: number }; detailsToken?: string; error?: string };
      if (!response.ok || !result.consultation) throw new Error(result.error || 'No pudimos guardar los detalles.');
      setDetailsSaved(true);
    } catch (error) { setDetailsError(error instanceof Error ? error.message : 'No pudimos guardar los detalles.'); }
    finally { setSavingDetails(false); }
  }

  return (
    <main className="booking-page booking-direct">
      <header className="booking-header">
        <a href="/" className="booking-brand" aria-label="Volver al inicio de GMP Obras"><span className="official-logo" aria-hidden="true"><Image src="/logo-gmp-obras-horizontal.png" alt="" width={1258} height={343} unoptimized /></span></a>
        <a href="/" className="booking-back"><ArrowLeft aria-hidden="true" size={17} /> Volver al sitio</a>
      </header>
      <div className="booking-layout">
        <aside className="booking-intro">
          <div className="booking-intro-copy">
            <p className="section-kicker section-kicker-light">Consulta inicial · Sin costo</p>
            <h1>Conversemos sobre tu proyecto.</h1>
            <p>Contame qué querés hacer y dónde. Podemos reunirnos en mi oficina o por videollamada.</p>
            <div className="booking-facts"><span><Clock3 size={17} aria-hidden="true" />45 minutos</span><span><MapPin size={17} aria-hidden="true" />Comodoro Rivadavia · Rada Tilly</span></div>
            <a className="booking-mobile-link" href="#elegir-turno">Elegir un horario <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
          <figure className="booking-photo">
            <Image src="/gustavo-pinto-atendiendo-consulta.webp" alt="Gustavo Pinto atiende una consulta por teléfono mientras revisa planos en su oficina." width={1000} height={1333} unoptimized priority />
            <figcaption><strong>Gustavo Pinto</strong><span>Maestro mayor de obras · GMP Obras</span></figcaption>
          </figure>
        </aside>
        <section className="booking-card" id="elegir-turno" aria-labelledby="booking-title">
          {confirmed ? (
            <div className="booking-prepared">
              <span><Check size={28} aria-hidden="true" /></span>
              <p className="section-kicker">Solicitud registrada</p>
              <h2 id="booking-title" ref={confirmationHeading} tabIndex={-1}>Recibimos tu solicitud.</h2>
              <p className="booking-date-summary"><CalendarDays size={20} aria-hidden="true" /><strong>{formatAppointmentDate(selectedDate)}<br />{selectedTime} · 45 minutos</strong></p>
              <div className="booking-meeting-summary">
                {meetingMode === 'presencial' ? <><MapPin size={20} aria-hidden="true" /><div><strong>Presencial en la oficina</strong><p>{officeAddress}</p><a href={officeMapUrl} target="_blank" rel="noreferrer">Cómo llegar</a></div></> : <><Video size={20} aria-hidden="true" /><div><strong>Virtual por Google Meet</strong><p>El enlace se coordina cuando Gustavo confirme la consulta.</p></div></>}
              </div>
              <p>Tu solicitud quedó guardada con el número <strong>#{confirmationId}</strong>. GMP Obras revisará el horario elegido y te contactará para coordinar la consulta.</p>
              <p className="booking-demo-confirmation">El horario queda sujeto a confirmación. Todavía no se creó una cita en Google Calendar ni se enviaron correos automáticos.</p>
              <div className="booking-optional-invitation">
                <h3>¿Querés contarle algo de la obra?</h3>
                <p>Podés sumar una idea, la ubicación o un enlace a tus planos. Es opcional.</p>
                <button type="button" className="booking-text-button" aria-expanded={detailsOpen} onClick={() => setDetailsOpen(!detailsOpen)}>{detailsOpen ? 'Ocultar detalles' : 'Agregar información del proyecto'}<ArrowRight size={17} aria-hidden="true" /></button>
              </div>
              {detailsOpen && <form className="booking-step booking-optional-form" onSubmit={saveDetails}>
                <div className="field-row"><label>Tipo de proyecto (opcional)<select value={details.projectType} onChange={(event) => updateDetail('projectType', event.target.value)}><option value="">Sin definir</option>{projectTypes.map((type) => <option key={type}>{type}</option>)}</select></label><label>Ciudad (opcional)<select value={details.city} onChange={(event) => updateDetail('city', event.target.value)}><option value="">Sin definir</option><option>Comodoro Rivadavia</option><option>Rada Tilly</option><option>Otra localidad</option></select></label></div>
                <label>Dirección de la obra (opcional)<input autoComplete="street-address" value={details.address} onChange={(event) => updateDetail('address', event.target.value)} /></label>
                <label>¿Qué querés construir o resolver? (opcional)<textarea rows={4} maxLength={4000} value={details.projectDetail} onChange={(event) => updateDetail('projectDetail', event.target.value)} placeholder="Contanos lo que tengas definido hasta ahora." /></label>
                <div className="field-row"><label>Estado del proyecto (opcional)<select value={details.stage} onChange={(event) => updateDetail('stage', event.target.value)}><option value="">Sin definir</option>{projectStages.map((stage) => <option key={stage}>{stage}</option>)}</select></label><label>Presupuesto aproximado (opcional)<input value={details.budget} onChange={(event) => updateDetail('budget', event.target.value)} placeholder="Si ya tenés una idea" /></label></div>
                <label>Enlace a fotos o planos (opcional)<input type="url" value={details.materialLink} onChange={(event) => updateDetail('materialLink', event.target.value)} placeholder="Enlace de Google Drive u otro servicio" /></label>
                <button className="button button-primary" type="submit" disabled={savingDetails}>{savingDetails ? 'Guardando detalles…' : 'Guardar detalles'}<ArrowRight size={18} aria-hidden="true" /></button>
                {detailsError && <p className="booking-submit-error" role="alert">{detailsError}</p>}
                {detailsSaved && <p className="booking-details-feedback" role="status">Los detalles quedaron guardados junto con tu solicitud.</p>}
              </form>}
              <div className="booking-end-actions"><a href="/">Volver al sitio</a><button type="button" onClick={() => { setConfirmed(false); setSelectedTime(''); setDetailsOpen(false); setDetailsSaved(false); setDetailsError(''); setConfirmationId(null); setDetailsToken(''); }}>Solicitar otra consulta</button></div>
            </div>
          ) : (
            <>
              <p className="section-kicker">Con Gustavo Pinto</p>
              <h2 id="booking-title">Elegí el día y la hora.</h2>
              <p className="booking-lead">Lunes, miércoles y viernes · 10:00 o 15:00</p>
              <div className="booking-calendar-layout">
                <div className="booking-calendar">
                  <div className="booking-month"><h3 aria-live="polite">{monthLabel}</h3><div><button type="button" aria-label="Mes anterior" disabled={!month || month <= today.slice(0, 7)} onClick={() => changeMonth(-1)}><ChevronLeft size={20} /></button><button type="button" aria-label="Mes siguiente" disabled={!month} onClick={() => changeMonth(1)}><ChevronRight size={20} /></button></div></div>
                  <div className="booking-calendar-grid"><span aria-label="Lunes">L</span><span aria-label="Martes">M</span><span aria-label="Miércoles">M</span><span aria-label="Jueves">J</span><span aria-label="Viernes">V</span><span aria-label="Sábado">S</span><span aria-label="Domingo">D</span>
                    {dates.map((date, index) => date ? <button type="button" key={date} disabled={!proposedTimes(date).length} aria-label={formatAppointmentDate(date)} aria-pressed={selectedDate === date} className={selectedDate === date ? 'is-selected' : ''} onClick={() => { setSelectedDate(date); setSelectedTime(''); setError(''); }}>{Number(date.slice(-2))}</button> : <span key={`empty-${index}`} />)}
                  </div>
                  <small className="booking-zone">Hora de Argentina (UTC−3)</small>
                </div>
                <div className="booking-times"><h3>{selectedDate ? formatAppointmentDate(selectedDate) : month ? 'Elegí un día' : 'Cargando fechas…'}</h3><p>Horarios propuestos</p>{times.map((time) => <button key={time} type="button" aria-pressed={selectedTime === time} className={selectedTime === time ? 'is-selected' : ''} onClick={() => { setSelectedTime(time); setError(''); }}><Clock3 size={16} aria-hidden="true" />{time}<ArrowRight size={16} aria-hidden="true" /></button>)}<small>45 minutos por consulta</small></div>
              </div>
              {error && <p role="alert" className="booking-submit-error">{error}</p>}
              {selectedTime ? <form className="booking-contact-form booking-step" onSubmit={submitRequest}>
                <h3 ref={contactHeading} tabIndex={-1}>Tus datos para la consulta</h3>
                <p className="booking-selection">{formatAppointmentDate(selectedDate)} · {selectedTime}<button type="button" onClick={() => setSelectedTime('')}>Cambiar</button></p>
                <fieldset className="booking-meeting-mode">
                  <legend>¿Cómo preferís la consulta?</legend>
                  <div className="booking-meeting-options">
                    <label className={`booking-meeting-option ${meetingMode === 'presencial' ? 'is-selected' : ''}`}>
                      <input type="radio" name="meetingMode" value="presencial" required checked={meetingMode === 'presencial'} onChange={() => setMeetingMode('presencial')} />
                      <span><strong><MapPin size={17} aria-hidden="true" />Presencial</strong><small>{officeAddress}</small></span>
                    </label>
                    <label className={`booking-meeting-option ${meetingMode === 'virtual' ? 'is-selected' : ''}`}>
                      <input type="radio" name="meetingMode" value="virtual" required checked={meetingMode === 'virtual'} onChange={() => setMeetingMode('virtual')} />
                      <span><strong><Video size={17} aria-hidden="true" />Virtual</strong><small>Por Google Meet</small></span>
                    </label>
                  </div>
                  {meetingMode === 'presencial' && <a className="booking-office-map" href={officeMapUrl} target="_blank" rel="noreferrer">Ver cómo llegar a la oficina<ArrowRight size={15} aria-hidden="true" /></a>}
                </fieldset>
                <div className="field-row"><label>Nombre<input required autoComplete="given-name" maxLength={80} value={contact.firstName} onChange={(event) => setContact({ ...contact, firstName: event.target.value })} /></label><label>Apellido<input required autoComplete="family-name" maxLength={80} value={contact.lastName} onChange={(event) => setContact({ ...contact, lastName: event.target.value })} /></label></div>
                <label>Email<input type="email" required autoComplete="email" maxLength={254} value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} placeholder="Para coordinar la consulta" /></label>
                <label>WhatsApp (opcional)<input type="tel" autoComplete="tel" maxLength={80} value={contact.phone} onChange={(event) => setContact({ ...contact, phone: event.target.value })} /></label>
                <label className="booking-consent"><input type="checkbox" required checked={acceptedPrivacy} onChange={(event) => setAcceptedPrivacy(event.target.checked)} /><span>Acepto que GMP Obras guarde estos datos para contactarme y coordinar esta consulta.</span></label>
                <small>La información del proyecto es opcional y podés agregarla después de enviar la solicitud.</small>
                <button type="submit" className="button button-primary" disabled={submitting}>{submitting ? 'Guardando solicitud…' : 'Solicitar consulta'}<ArrowRight size={18} aria-hidden="true" /></button>
              </form> : <p className="booking-bottom-note">Elegí el horario que preferís. Te confirmo la disponibilidad.</p>}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
