'use client';

import { useRef, useState } from 'react';
import { ArrowRight, BroomSparkles, Cable, ChevronLeft, ChevronRight, Paintbrush, Ruler, Shapes, ShieldCheck, Thermometer, Wind, Zap } from 'lucide-react';

const systemBenefits = [
  {
    title: 'Velocidad de ejecución',
    description: 'El montaje de paneles permite organizar el avance de la obra por etapas.',
    icon: Zap,
  },
  {
    title: 'Aislamiento térmico',
    description: 'El núcleo de EPS aporta aislamiento dentro de la solución constructiva.',
    icon: Thermometer,
  },
  {
    title: 'Versatilidad',
    description: 'Se adapta a viviendas, ampliaciones, consultorios y locales comerciales.',
    icon: Shapes,
  },
  {
    title: 'Paneles a medida',
    description: 'Las piezas se definen de acuerdo con las necesidades y medidas del proyecto.',
    icon: Ruler,
  },
  {
    title: 'Obra más limpia',
    description: 'El montaje ordenado ayuda a reducir desperdicios y tareas innecesarias en obra.',
    icon: BroomSparkles,
  },
  {
    title: 'Variedad',
    description: 'Admite diferentes acabados interiores y exteriores según el diseño buscado.',
    icon: Paintbrush,
  },
  {
    title: 'Integración',
    description: 'Las instalaciones se prevén dentro del sistema antes del hormigón proyectado.',
    icon: Cable,
  },
  {
    title: 'Resistencia estructural',
    description: 'Paneles, mallas y hormigón trabajan como una solución estructural continua.',
    icon: ShieldCheck,
  },
  {
    title: 'Resistencia al viento',
    description: 'La estructura se define y calcula según el proyecto, contemplando los vientos fuertes de la Patagonia.',
    icon: Wind,
  },
];

export function SystemBenefits() {
  const [activeBenefit, setActiveBenefit] = useState(0);
  const benefitTrackRef = useRef<HTMLDivElement>(null);

  function moveBenefitCarousel(direction: number) {
    const track = benefitTrackRef.current;
    if (!track) return;

    const visibleCards = window.matchMedia('(max-width: 640px)').matches ? 1 : 3;
    const lastStart = Math.max(0, systemBenefits.length - visibleCards);
    let nextIndex = activeBenefit + direction * visibleCards;

    if (nextIndex > lastStart) nextIndex = 0;
    if (nextIndex < 0) nextIndex = lastStart;

    const firstCard = track.firstElementChild as HTMLElement | null;
    if (!firstCard) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || '0');

    setActiveBenefit(nextIndex);
    track.scrollTo({ left: nextIndex * (firstCard.offsetWidth + gap), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  function syncBenefitIndex() {
    const track = benefitTrackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap || '0');
    const index = Math.round(track.scrollLeft / (firstCard.offsetWidth + gap));
    setActiveBenefit(Math.min(systemBenefits.length - 1, Math.max(0, index)));
  }

  return (
    <section className="system-section system-landing-benefits" id="beneficios-detalle" aria-labelledby="system-benefits-title">
        <div className="system-benefits-heading">
          <div>
            <p className="section-kicker section-kicker-light">Beneficios del sistema</p>
            <h2 id="system-benefits-title">Ventajas que se traducen en una obra mejor organizada.</h2>
          </div>
          <div className="benefit-carousel-meta">
            <span aria-live="polite">{String(activeBenefit + 1).padStart(2, '0')} / {String(systemBenefits.length).padStart(2, '0')}</span>
            <div className="benefit-carousel-controls">
              <button type="button" onClick={() => moveBenefitCarousel(-1)} aria-label="Ver beneficios anteriores"><ChevronLeft aria-hidden="true" size={21} /></button>
              <button type="button" onClick={() => moveBenefitCarousel(1)} aria-label="Ver beneficios siguientes"><ChevronRight aria-hidden="true" size={21} /></button>
            </div>
          </div>
        </div>
        <div ref={benefitTrackRef} className="benefits-track" onScroll={syncBenefitIndex} aria-label="Beneficios del sistema Cassaforma">
          {systemBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <article key={benefit.title}>
                <div className="benefit-card-head">
                  <div className="benefit-icon"><Icon aria-hidden="true" size={26} strokeWidth={1.7} /></div>
                  <div className="benefit-card-title">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{benefit.title}</h3>
                  </div>
                </div>
                <p>{benefit.description}</p>
              </article>
            );
          })}
        </div>
        <div className="system-benefits-cta">
          <p>¿Querés saber si este sistema sirve para tu proyecto?</p>
          <a href="/agendar">Agendar cita <ArrowRight aria-hidden="true" size={18} /></a>
        </div>

    </section>
  );
}
