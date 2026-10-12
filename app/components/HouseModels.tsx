'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import './HouseModels.css';

const acuarioViews = [
  {
    src: '/modelos/acuario-casa.webp',
    label: 'Vista exterior',
    alt: 'Visualización del modelo Acuario: vivienda de una planta con fachada blanca, detalles de madera y aberturas oscuras',
  },
  {
    src: '/modelos/acuario-ficha.webp',
    label: 'Plano y características',
    alt: 'Ficha del modelo Acuario: plano de cocina y estar/comedor integrados, una habitación y un baño, con 40,15 metros cuadrados cubiertos',
  },
];

type HouseModel = {
  name: string;
  slug: string;
  facts?: string;
  description?: string;
  views: typeof acuarioViews;
};

const preparedModels = [
  {
    "name": "Cáncer",
    "slug": "cancer",
    "area": "60,20",
    "areaLabel": "cubiertos",
    "description": "Dúplex de 60,20 m² cubiertos con una habitación, baño, toilette y lavadero bajo escalera."
  },
  {
    "name": "Capricornio",
    "slug": "capricornio",
    "area": "67,30",
    "areaLabel": "cubiertos",
    "description": "Vivienda de 67,30 m² cubiertos con dos habitaciones, un baño y parrilla interior."
  },
  {
    "name": "Escorpio",
    "slug": "escorpio",
    "area": "87,60",
    "areaLabel": "cubiertos",
    "description": "Vivienda de 87,60 m² cubiertos con dos habitaciones, lavadero y cochera semicubierta."
  },
  {
    "name": "Géminis",
    "slug": "geminis",
    "area": "93",
    "areaLabel": "cubiertos",
    "description": "Vivienda de 93 m² cubiertos con tres habitaciones, pérgola delantera y parrilla."
  },
  {
    "name": "Leo",
    "slug": "leo",
    "area": "144,30",
    "areaLabel": "cubiertos",
    "description": "Vivienda de 144,30 m² cubiertos con dos habitaciones en planta baja y una habitación en suite."
  },
  {
    "name": "Piscis",
    "slug": "piscis",
    "area": "155",
    "areaLabel": "cubiertos",
    "description": "Vivienda de 155 m² cubiertos con dos habitaciones y estudio, patios internos y entrada vehicular."
  },
  {
    "name": "Sagitario",
    "slug": "sagitario",
    "area": "130,13",
    "areaLabel": "cubiertos",
    "description": "Vivienda de 130,13 m² cubiertos con una habitación en suite, dos habitaciones y sala de juegos."
  },
  {
    "name": "Tauro",
    "slug": "tauro",
    "area": "96,15",
    "areaLabel": "cubiertos",
    "description": "Vivienda de 96,15 m² cubiertos con cuatro dormitorios, uno de ellos adaptable como estudio."
  },
  {
    "name": "Virgo",
    "slug": "virgo",
    "area": "96",
    "areaLabel": "cubiertos",
    "description": "Dúplex de 96 m² cubiertos con dos habitaciones, baño, toilette y vestidor."
  },
  {
    "name": "Libra",
    "slug": "libra",
    "area": "79,73",
    "areaLabel": "cubiertos",
    "description": "Vivienda de 79,73 m² cubiertos con tres habitaciones, un baño y lavadero."
  },
  {
    "name": "Aries",
    "slug": "aries",
    "area": "45,50",
    "areaLabel": "superficie",
    "description": "Vivienda de 45,50 m² con una habitación, un baño, cocina y estar/comedor."
  }
];

const models: HouseModel[] = [
  {
    name: 'Acuario', slug: 'acuario',
    facts: '40,15 m² cubiertos · 1 habitación · 1 baño',
    description: 'Cocina y estar/comedor integrados, una habitación y un baño.',
    views: acuarioViews,
  },
  ...preparedModels.map(({ name, slug, area, areaLabel, description }) => ({
    name, slug, description,
    facts: `${area} m²${areaLabel === 'cubiertos' ? ' cubiertos' : ''}`,
    views: [
      {
        src: `/modelos/${slug}-casa.webp`,
        label: 'Vista exterior',
        alt: `Visualización arquitectónica del modelo ${name}, preparada a partir de la lámina original de GMP Obras`,
      },
      {
        src: `/modelos/${slug}-ficha.webp`,
        label: 'Plano y características',
        alt: `Ficha del modelo ${name}, con su plano y características. Superficie indicada: ${area} metros cuadrados`,
      },
    ],
  })),
];

export function HouseModels() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeView, setActiveView] = useState(0);
  const [activeModel, setActiveModel] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const model = models[activeModel];
  const views = model.views;

  function moveModel(direction: number) {
    setActiveModel((current) => (current + direction + models.length) % models.length);
    setActiveView(0);
  }

  function openView(index: number) {
    setActiveView(index);
    dialogRef.current?.showModal();
  }

  return (
    <section className="house-models" id="modelos" aria-labelledby="house-models-title">
      <div className="house-models-heading">
        <div>
          <p className="section-kicker">Viviendas con diseño definido</p>
          <h2 id="house-models-title">Modelos prearmados.</h2>
        </div>
        <p>
          Partir de un modelo prearmado permite reducir los costos de diseño
          y avanzar sobre una distribución ya definida. Evaluamos su adaptación
          al terreno y a lo que necesitás.
        </p>
      </div>

      <article className="house-model-dossier" aria-labelledby="active-model-title" aria-roledescription="carrusel">
        <div className="house-model-title-row">
          <h3 id="active-model-title" aria-live="polite" aria-atomic="true">Modelo {model.name}</h3>
          <div className="house-model-meta">
            {model.facts && <span>{model.facts}</span>}
            <span className="house-model-count" aria-label={`Modelo ${activeModel + 1} de ${models.length}`}>{activeModel + 1} / {models.length}</span>
          </div>
        </div>
        <div className={`house-model-stage${views.length === 1 ? ' is-original' : ''}`}
          onTouchStart={(event) => {
            if (event.touches.length !== 1) { touchStart.current = null; return; }
            touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
          }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start || !event.changedTouches.length) return;
            const dx = event.changedTouches[0].clientX - start.x;
            const dy = event.changedTouches[0].clientY - start.y;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) moveModel(dx < 0 ? 1 : -1);
          }}
          onTouchCancel={() => { touchStart.current = null; }}
        >
        <div className="house-model-views">
          {views.map((view, index) => (
            <figure key={view.src}>
              <button type="button" onClick={() => openView(index)} aria-label={`Ampliar ${view.label.toLowerCase()} del modelo ${model.name}`}>
                <Image src={view.src} alt={view.alt} width={1448} height={1086} unoptimized loading="lazy" />
                <span className="house-model-enlarge" aria-hidden="true"><ArrowUpRight size={22} /></span>
              </button>
              <figcaption>{view.label}<span>Ampliar <ArrowUpRight size={15} aria-hidden="true" /></span></figcaption>
            </figure>
          ))}
        </div>
        <div className="house-model-controls" aria-label="Navegar entre modelos">
          <button type="button" className="house-model-previous" onClick={() => moveModel(-1)} aria-label="Ver modelo anterior"><ChevronLeft size={26} aria-hidden="true" /></button>
          <button type="button" className="house-model-next" onClick={() => moveModel(1)} aria-label="Ver modelo siguiente"><ChevronRight size={26} aria-hidden="true" /></button>
        </div>
        </div>
        <div className="house-model-footer">
          <p>{model.description || 'Ampliá la lámina para ver el plano y las características.'}</p>
          <a href={`/agendar?modelo=${model.slug}`}>Consultar por {model.name} <ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </article>

      <dialog className="house-model-dialog" ref={dialogRef} aria-labelledby="house-model-dialog-title" onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}>
        <div className="house-model-dialog-heading">
          <h3 id="house-model-dialog-title">Modelo {model.name} · {views[activeView].label}</h3>
          <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Cerrar imagen ampliada" autoFocus><X size={24} /></button>
        </div>
        <Image src={views[activeView].src} alt={views[activeView].alt} width={1448} height={1086} unoptimized />
        <a className="house-model-original" href={views[activeView].src} target="_blank" rel="noopener noreferrer">Abrir imagen completa <ArrowUpRight size={16} aria-hidden="true" /></a>
      </dialog>
    </section>
  );
}
