'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Clock3, MapPin } from 'lucide-react';
import Image from 'next/image';

type Answers = {
  projectType: string;
  city: string;
  address: string;
  projectDetail: string;
  projectStages: string[];
  stageDetail: string;
  materialLink: string;
  budget: string;
  meetingMode: string;
  preferredDay: string;
  preferredTime: string;
  name: string;
  phone: string;
  email: string;
};

const initialAnswers: Answers = {
  projectType: '',
  city: '',
  address: '',
  projectDetail: '',
  projectStages: [],
  stageDetail: '',
  materialLink: '',
  budget: '',
  meetingMode: '',
  preferredDay: '',
  preferredTime: '',
  name: '',
  phone: '',
  email: '',
};

const projectTypes = ['Vivienda nueva', 'Ampliación', 'Consultorio', 'Local comercial', 'Otro proyecto'];
const projectStages = [
  'Todavía es una idea inicial',
  'Ya tengo terreno o inmueble',
  'Ya tengo anteproyecto o planos',
  'La obra ya está iniciada',
  'Necesito continuar o revisar una obra existente',
];
const budgetRanges = [
  'Entre 25.000 y 50.000 dólares',
  'Entre 50.000 y 100.000 dólares',
  'Entre 100.000 y 200.000 dólares',
  'Entre 200.000 y 500.000 dólares',
  'Más de 500.000 dólares',
];
export default function AppointmentPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [reviewing, setReviewing] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [confirmationId, setConfirmationId] = useState<number | null>(null);
  const totalSteps = 5;

  const canContinue = useMemo(() => {
    if (step === 0) return Boolean(answers.projectType && answers.city && answers.address.trim());
    if (step === 1) return Boolean(answers.projectDetail.trim() && answers.projectStages.length);
    if (step === 2) return Boolean(answers.budget);
    if (step === 3) return Boolean(answers.meetingMode && answers.preferredDay && answers.preferredTime);
    return Boolean(answers.name.trim() && answers.phone.trim() && answers.email.trim() && acceptedPrivacy);
  }, [acceptedPrivacy, answers, step]);

  function update<K extends keyof Answers>(field: K, value: Answers[K]) {
    setAnswers((current) => ({ ...current, [field]: value }));
  }

  function toggleProjectStage(option: string) {
    setAnswers((current) => ({
      ...current,
      projectStages: current.projectStages.includes(option)
        ? current.projectStages.filter((item) => item !== option)
        : [...current.projectStages, option],
    }));
  }

  function next() {
    if (!canContinue) return;
    if (step < totalSteps - 1) setStep((current) => current + 1);
    else setReviewing(true);
  }

  async function submitAppointment() {
    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/consultas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      });
      const result = (await response.json()) as { consultation?: { id: number }; error?: string };

      if (!response.ok || !result.consultation) {
        throw new Error(result.error || 'No pudimos guardar la solicitud.');
      }

      setConfirmationId(result.consultation.id);
      setPrepared(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'No pudimos guardar la solicitud.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="booking-page">
      <header className="booking-header">
        <a href="/" className="booking-brand" aria-label="Volver al inicio de GMP Obras">
          <span className="official-logo" aria-hidden="true"><Image src="/logo-gmp-horizontal-3-capas.png" alt="" width={1258} height={343} unoptimized /></span>
        </a>
        <a href="/" className="booking-back"><ArrowLeft aria-hidden="true" size={17} /> Volver al sitio</a>
      </header>

      <div className="booking-layout">
        <aside className="booking-intro">
          <p className="section-kicker section-kicker-light">Consulta inicial · Sin costo</p>
          <h1>30 minutos para entender tu proyecto.</h1>
          <p>Contanos de qué trata tu proyecto y te ofrecemos una consulta inicial sin costo de 30 minutos, presencial o virtual.</p>
          <div className="booking-promises">
            <p><Clock3 aria-hidden="true" size={19} /><span><strong>30 minutos</strong> de conversación enfocada en tu proyecto.</span></p>
            <p><MapPin aria-hidden="true" size={19} /><span><strong>En la oficina de GMP Obras o por Google Meet.</strong></span></p>
            <p><Check aria-hidden="true" size={19} /><span>Si corresponde, luego de la reunión recibís el <strong>presupuesto dentro de las siguientes 72 horas.</strong></span></p>
          </div>
          <small>Esta primera versión de la consulta es gratuita.</small>
        </aside>

        <section className="booking-card" aria-labelledby="booking-step-title">
          <div className="booking-progress">
            <progress max={totalSteps} value={reviewing || prepared ? totalSteps : step + 1} aria-label={reviewing ? 'Revisión final' : `Paso ${step + 1} de ${totalSteps}`} />
            <p>{reviewing ? 'Revisión final' : prepared ? 'Solicitud preparada' : `Paso ${step + 1} de ${totalSteps}`}</p>
          </div>

          {prepared ? (
            <div className="booking-prepared" aria-live="polite">
              <span><Check aria-hidden="true" size={28} /></span>
              <p className="section-kicker">Solicitud registrada</p>
              <h2 id="booking-step-title">Recibimos tu consulta.</h2>
              <p>La información quedó guardada con el número <strong>#{confirmationId}</strong>. GMP Obras la revisará para confirmar la disponibilidad y coordinar la reunión.</p>
              <small>La fecha y el turno elegidos todavía están sujetos a confirmación.</small>
              <a className="button button-primary" href="/">Volver al sitio</a>
            </div>
          ) : reviewing ? (
            <div className="booking-review">
              <p className="section-kicker">Antes de enviar</p>
              <h2 id="booking-step-title">Revisá los datos de tu solicitud.</h2>
              <p>Podés volver para corregir cualquier respuesta o enviar la solicitud de reunión.</p>

              <dl className="booking-review-list">
                <div><dt>Tipo de proyecto</dt><dd>{answers.projectType}</dd></div>
                <div><dt>Ubicación de la obra</dt><dd>{answers.address}, {answers.city}</dd></div>
                <div className="is-wide"><dt>Detalle de la obra</dt><dd>{answers.projectDetail}</dd></div>
                <div className="is-wide"><dt>Estado actual</dt><dd>{answers.projectStages.join(' · ')}</dd></div>
                {answers.stageDetail && <div className="is-wide"><dt>Información adicional</dt><dd>{answers.stageDetail}</dd></div>}
                <div><dt>Presupuesto aproximado</dt><dd>{answers.budget}</dd></div>
                <div><dt>Modalidad</dt><dd>{answers.meetingMode}</dd></div>
                <div><dt>Preferencia</dt><dd>{answers.preferredDay} · {answers.preferredTime}</dd></div>
                <div><dt>Nombre</dt><dd>{answers.name}</dd></div>
                <div><dt>Teléfono</dt><dd>{answers.phone}</dd></div>
                <div><dt>Email</dt><dd>{answers.email}</dd></div>
                {answers.materialLink && <div className="is-wide"><dt>Material en Google Drive</dt><dd>{answers.materialLink}</dd></div>}
              </dl>

              <small>Al enviar, la información quedará registrada en la base de datos de GMP Obras.</small>
              {submitError && <p className="booking-submit-error" role="alert">{submitError}</p>}
              <div className="booking-actions booking-review-actions">
                <button type="button" className="booking-prev" onClick={() => setReviewing(false)}><ArrowLeft aria-hidden="true" size={18} /> Volver y editar</button>
                <button type="button" className="button button-primary" onClick={submitAppointment} disabled={submitting}>{submitting ? 'Guardando solicitud…' : 'Enviar solicitud de reunión'} {!submitting && <ArrowRight aria-hidden="true" size={18} />}</button>
              </div>
            </div>
          ) : (
            <>
              {step === 0 && (
                <fieldset className="booking-step">
                  <legend id="booking-step-title">¿Qué querés construir?</legend>
                  <p>Elegí la opción que más se aproxima. Después vas a poder contarnos el detalle.</p>
                  <div className="choice-grid">
                    {projectTypes.map((option) => (
                      <label key={option} className={answers.projectType === option ? 'is-selected' : ''}>
                        <input type="radio" name="projectType" value={option} checked={answers.projectType === option} onChange={() => update('projectType', option)} />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  <div className="field-row">
                    <label>Ciudad<select value={answers.city} onChange={(event) => update('city', event.target.value)} autoComplete="address-level2"><option value="" disabled>Seleccioná una ciudad</option><option>Comodoro Rivadavia</option><option>Rada Tilly</option></select></label>
                    <label>Dirección de la obra<input value={answers.address} onChange={(event) => update('address', event.target.value)} placeholder="Calle y altura" autoComplete="street-address" /></label>
                  </div>
                </fieldset>
              )}

              {step === 1 && (
                <fieldset className="booking-step">
                  <legend id="booking-step-title">Contanos sobre la obra</legend>
                  <p>Cuanto más detalle tengamos, mejor podemos aprovechar la primera conversación.</p>
                  <label>Detallanos la obra que querés hacer de la manera más precisa posible<textarea rows={6} value={answers.projectDetail} onChange={(event) => update('projectDetail', event.target.value)} placeholder="Qué querés construir, ampliar o modificar; para qué uso y qué necesitás resolver." /></label>
                  <fieldset className="stage-fieldset">
                    <legend>¿Cuál es el estado actual?</legend>
                    <p>Marcá todas las opciones que correspondan.</p>
                    <div className="choice-grid choice-grid-single">
                      {projectStages.map((option) => (
                        <label key={option} className={answers.projectStages.includes(option) ? 'is-selected' : ''}>
                          <input type="checkbox" checked={answers.projectStages.includes(option)} onChange={() => toggleProjectStage(option)} />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <label>¿Hay algo más que necesitemos saber sobre el estado actual?<textarea rows={3} value={answers.stageDetail} onChange={(event) => update('stageDetail', event.target.value)} placeholder="Opcional: contanos avances, dificultades o decisiones ya tomadas." /></label>
                  <div className="booking-material">
                    <div>
                      <h3>Fotos o videos del lugar</h3>
                      <p>Si ya tenés una casa, terreno o local, podés sumar material para que Gustavo llegue mejor preparado a la cita.</p>
                    </div>
                    <label>
                      Subí el material a Google Drive y pegá el enlace
                      <input type="url" value={answers.materialLink} onChange={(event) => update('materialLink', event.target.value)} placeholder="https://drive.google.com/..." />
                    </label>
                    <small>El enlace es opcional y quedará guardado junto con la consulta.</small>
                  </div>
                </fieldset>
              )}

              {step === 2 && (
                <fieldset className="booking-step">
                  <legend id="booking-step-title">Presupuesto aproximado</legend>
                  <p>Disponés de aproximadamente el siguiente dinero para afrontar o realizar la obra.</p>
                  <div className="choice-grid choice-grid-single">
                    {budgetRanges.map((option) => (
                      <label key={option} className={answers.budget === option ? 'is-selected' : ''}>
                        <input type="radio" name="budget" value={option} checked={answers.budget === option} onChange={() => update('budget', option)} />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  <small>Elegí el rango más cercano. No hace falta que sea un cálculo cerrado.</small>
                </fieldset>
              )}

              {step === 3 && (
                <fieldset className="booking-step">
                  <legend id="booking-step-title">Elegí una preferencia para la cita</legend>
                  <p>Puede ser presencial o por Google Meet. La fecha y el turno quedan sujetos a confirmación de GMP Obras.</p>
                  <label>Modalidad<select value={answers.meetingMode} onChange={(event) => update('meetingMode', event.target.value)}><option value="" disabled>Seleccioná una modalidad</option><option>Presencial en la oficina</option><option>Virtual por Google Meet</option></select></label>
                  <label>Día preferido<input type="date" value={answers.preferredDay} onChange={(event) => update('preferredDay', event.target.value)} /></label>
                  <label>Turno preferido<select value={answers.preferredTime} onChange={(event) => update('preferredTime', event.target.value)}><option value="" disabled>Seleccioná un turno</option><option value="mañana">Mañana</option><option value="mediodía">Mediodía</option><option value="tarde">Tarde</option></select></label>
                </fieldset>
              )}

              {step === 4 && (
                <fieldset className="booking-step">
                  <legend id="booking-step-title">¿Cómo nos comunicamos con vos?</legend>
                  <p>Estos datos se usarán para confirmar la disponibilidad y coordinar la reunión.</p>
                  <label>Nombre y apellido<input autoComplete="name" value={answers.name} onChange={(event) => update('name', event.target.value)} /></label>
                  <label>Teléfono<input type="tel" autoComplete="tel" value={answers.phone} onChange={(event) => update('phone', event.target.value)} /></label>
                  <label>Email<input type="email" autoComplete="email" value={answers.email} onChange={(event) => update('email', event.target.value)} /></label>
                  <label className="booking-consent"><input type="checkbox" checked={acceptedPrivacy} onChange={(event) => setAcceptedPrivacy(event.target.checked)} /><span>Acepto que GMP Obras guarde estos datos y los utilice para contactarme por esta consulta.</span></label>
                </fieldset>
              )}

              <div className="booking-actions">
                <button type="button" className="booking-prev" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}><ArrowLeft aria-hidden="true" size={18} /> Anterior</button>
                <button type="button" className="button button-primary" onClick={next} disabled={!canContinue}>{step === totalSteps - 1 ? 'Revisar solicitud' : 'Continuar'} <ArrowRight aria-hidden="true" size={18} /></button>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
