export type ProjectImage = {
  src: string;
  alt: string;
  sequence?: number;
};

export type ProjectStage = {
  id: string;
  label: string;
  status: string;
  images: ProjectImage[];
};

export type ProjectDetails = {
  workType: string;
  year: string;
  duration: string;
  area: string;
  floors: string;
  delivery: string;
  tasksLabel: string;
  tasks: string[];
};

export type ProjectTestimonial = {
  person: string;
  videoSrc: string;
  posterSrc: string;
  title: string;
  description: string;
};

export type Project = {
  slug: string;
  title: string;
  status: string;
  subtitle: string;
  description: string;
  images: ProjectImage[];
  stage2Images?: ProjectImage[];
  heroImage?: ProjectImage;
  provisional?: boolean;
  details?: ProjectDetails;
  testimonial?: ProjectTestimonial;
};

export const projects: Project[] = [
  {
    slug: 'volar-sin-escalas',
    title: 'Volar Sin Escalas',
    status: 'Proyecto en curso',
    subtitle: 'Una obra de consultorios médicos que avanza etapa por etapa, desde las fundaciones hasta las instalaciones y terminaciones.',
    heroImage: { src: '/volar-sin-escalas-final.jpg', alt: 'Consultorios terminados de Volar Sin Escalas' },
    description: 'Proyecto de consultorios médicos desarrollado por etapas, con seguimiento de fundaciones, estructura, instalaciones y terminaciones.',
    details: {
      workType: 'Consultorios médicos',
      year: '2021',
      duration: '15 meses',
      area: '424 m²',
      floors: '2 plantas',
      delivery: 'Llave en mano',
      tasksLabel: 'Tareas realizadas',
      tasks: [
        'Movimiento de suelo',
        'Fundaciones con vigas de fundación y platea',
        'Tabiques y losa de paneles Cassaforma',
        'Instalaciones de cloaca, gas, electricidad, agua, calefacción por piso radiante, alarma, aire acondicionado, internet y desagües pluviales',
        'Cielorraso de placas de yeso desmontables',
        'Pintura interior y exterior',
        'Colocación de piso de porcelanato',
        'Armado de baños completos',
        'Colocación de aberturas',
        'Membrana asfáltica en techos',
        'Vereda municipal',
      ],
    },
    images: [
      { src: '/volar-sin-escalas-etapa-012.jpg', alt: 'Volar Sin Escalas, foto 12: inicio de la obra y demolición del inmueble existente', sequence: 12 },
      // Fotos 02, 09 y 27: copias web corregidas para conservar los originales sin modificar.
      { src: '/volar-sin-escalas-etapa-030-rotated.jpg', alt: 'Volar Sin Escalas, foto 30: movimiento y nivelación del terreno', sequence: 30 },
      { src: '/volar-sin-escalas-etapa-031.jpg', alt: 'Volar Sin Escalas, foto 31: preparación inicial del terreno', sequence: 31 },
      { src: '/volar-sin-escalas-etapa-045.jpg', alt: 'Volar Sin Escalas, foto 45: avance de la preparación de fundaciones', sequence: 45 },
      { src: '/volar-sin-escalas-etapa-055.jpg', alt: 'Volar Sin Escalas, foto 55: trabajo inicial de la obra', sequence: 55 },
      { src: '/volar-sin-escalas-etapa-080.jpg', alt: 'Volar Sin Escalas, foto 80: avance de la primera etapa', sequence: 80 },
      { src: '/volar-sin-escalas-etapa-084.jpg', alt: 'Volar Sin Escalas, foto 84: avance de la primera etapa', sequence: 84 },
      { src: '/volar-sin-escalas-etapa-086.jpg', alt: 'Volar Sin Escalas, foto 86: avance de la primera etapa', sequence: 86 },
      { src: '/volar-sin-escalas-etapa-113-rotated.jpg', alt: 'Volar Sin Escalas, foto 113: avance de la primera etapa', sequence: 113 },
      { src: '/volar-sin-escalas-etapa-144.jpg', alt: 'Volar Sin Escalas, foto 144: avance de la primera etapa', sequence: 144 },
      { src: '/volar-sin-escalas-etapa-147.jpg', alt: 'Volar Sin Escalas, foto 147: avance de la primera etapa', sequence: 147 },
      { src: '/volar-sin-escalas-etapa-148.jpg', alt: 'Volar Sin Escalas, foto 148: avance de la primera etapa', sequence: 148 },
      { src: '/volar-sin-escalas-etapa-195.jpg', alt: 'Volar Sin Escalas, foto 195: avance de la primera etapa', sequence: 195 },
      { src: '/volar-sin-escalas-etapa-212.jpg', alt: 'Volar Sin Escalas, foto 212: avance de la primera etapa', sequence: 212 },
      { src: '/volar-sin-escalas-etapa-216.jpg', alt: 'Volar Sin Escalas, foto 216: avance de la primera etapa', sequence: 216 },
      { src: '/volar-sin-escalas-etapa-240.jpg', alt: 'Volar Sin Escalas, foto 240: avance de la primera etapa', sequence: 240 },
      { src: '/volar-sin-escalas-etapa-259.jpg', alt: 'Volar Sin Escalas, foto 259: avance de la primera etapa', sequence: 259 },
      { src: '/volar-sin-escalas-etapa-330.jpg', alt: 'Volar Sin Escalas, foto 330: avance de la primera etapa', sequence: 330 },
      { src: '/volar-sin-escalas-etapa-367.jpg', alt: 'Volar Sin Escalas, foto 367: avance de la primera etapa', sequence: 367 },
      { src: '/volar-sin-escalas-etapa-368.jpg', alt: 'Volar Sin Escalas, foto 368: avance de la primera etapa', sequence: 368 },
      { src: '/volar-sin-escalas-etapa-369.jpg', alt: 'Volar Sin Escalas, foto 369: avance de la primera etapa', sequence: 369 },
      { src: '/volar-sin-escalas-etapa-371.jpg', alt: 'Volar Sin Escalas, foto 371: avance de la primera etapa', sequence: 371 },
      { src: '/volar-sin-escalas-etapa-392.jpg', alt: 'Volar Sin Escalas, foto 392: avance de la primera etapa', sequence: 392 },
      { src: '/volar-sin-escalas-etapa-401.jpg', alt: 'Volar Sin Escalas, foto 401: avance de la primera etapa', sequence: 401 },
      { src: '/volar-sin-escalas-etapa-452.jpg', alt: 'Volar Sin Escalas, foto 452: avance de la primera etapa', sequence: 452 },
      { src: '/volar-sin-escalas-etapa-468.jpg', alt: 'Volar Sin Escalas, foto 468: avance de la primera etapa', sequence: 468 },
      { src: '/volar-sin-escalas-etapa-491-rotated.jpg', alt: 'Volar Sin Escalas, foto 491: avance de la primera etapa', sequence: 491 },
      { src: '/volar-sin-escalas-etapa-514.jpg', alt: 'Volar Sin Escalas, foto 514: avance de la primera etapa', sequence: 514 },
      { src: '/volar-sin-escalas-etapa-518.jpg', alt: 'Volar Sin Escalas, foto 518: avance de la primera etapa', sequence: 518 },
      { src: '/volar-sin-escalas-etapa-540.jpg', alt: 'Volar Sin Escalas, foto 540: avance de la primera etapa', sequence: 540 },
      { src: '/volar-sin-escalas-etapa-553.jpg', alt: 'Volar Sin Escalas, foto 553: avance de la primera etapa', sequence: 553 },
      { src: '/volar-sin-escalas-etapa-591.jpg', alt: 'Volar Sin Escalas, foto 591: avance de la primera etapa', sequence: 591 },
      { src: '/volar-sin-escalas-etapa-599.jpg', alt: 'Volar Sin Escalas, foto 599: avance de la primera etapa', sequence: 599 },
      { src: '/volar-sin-escalas-etapa-612.jpg', alt: 'Volar Sin Escalas, foto 612: avance de la primera etapa', sequence: 612 },
      { src: '/volar-sin-escalas-etapa-615.jpg', alt: 'Volar Sin Escalas, foto 615: avance de la primera etapa', sequence: 615 },
      { src: '/volar-sin-escalas-etapa-640.jpg', alt: 'Volar Sin Escalas, foto 640: avance de la primera etapa', sequence: 640 },
      { src: '/volar-sin-escalas-etapa-656.jpg', alt: 'Volar Sin Escalas, foto 656: fachada terminada de la obra', sequence: 656 },
      { src: '/volar-sin-escalas-etapa-667.jpg', alt: 'Volar Sin Escalas, foto 667: fachada terminada de la obra', sequence: 667 },
      { src: '/volar-sin-escalas-etapa-668.jpg', alt: 'Volar Sin Escalas, foto 668: fachada terminada de la obra', sequence: 668 },
    ],
    stage2Images: [
      { src: '/volar-sin-escalas-etapa-2-016.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 16: excavación y nivelación del terreno', sequence: 16 },
      { src: '/volar-sin-escalas-etapa-2-035.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 35: excavación y nivelación del terreno', sequence: 35 },
      { src: '/volar-sin-escalas-etapa-2-048.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 48: cañería cloacal y preparación de fundaciones', sequence: 48 },
      { src: '/volar-sin-escalas-etapa-2-094.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 94: encofrado y armadura de fundación', sequence: 94 },
      { src: '/volar-sin-escalas-etapa-2-096.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 96: encofrado y armadura de fundación', sequence: 96 },
      { src: '/volar-sin-escalas-etapa-2-113.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 113: hormigonado de platea', sequence: 113 },
      { src: '/volar-sin-escalas-etapa-2-118.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 118: hormigonado de platea', sequence: 118 },
      { src: '/volar-sin-escalas-etapa-2-130.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 130: montaje de paneles de consultorios', sequence: 130 },
      { src: '/volar-sin-escalas-etapa-2-149.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 149: montaje de paneles de consultorios', sequence: 149 },
      { src: '/volar-sin-escalas-etapa-2-151.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 151: terminación exterior de paneles', sequence: 151 },
      { src: '/volar-sin-escalas-etapa-2-177.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 177: cañería cloacal exterior', sequence: 177 },
      { src: '/volar-sin-escalas-etapa-2-213.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 213: hormigonado de fundación lateral', sequence: 213 },
      { src: '/volar-sin-escalas-etapa-2-228.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 228: paneles de consultorios y muro lateral', sequence: 228 },
      { src: '/volar-sin-escalas-etapa-2-185.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 185: losa de paneles', sequence: 185 },
      { src: '/volar-sin-escalas-etapa-2-234.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 234: llegada de hormigón', sequence: 234 },
      { src: '/volar-sin-escalas-etapa-2-254.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 254: encofrado y armado de platea exterior', sequence: 254 },
      { src: '/volar-sin-escalas-etapa-2-258.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 258: encofrado y armado de platea exterior', sequence: 258 },
      { src: '/volar-sin-escalas-etapa-2-270.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 270: cañería cloacal bajo platea', sequence: 270 },
      { src: '/volar-sin-escalas-etapa-2-280.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 280: armadura y pases sanitarios de platea', sequence: 280 },
      { src: '/volar-sin-escalas-etapa-2-302.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 302: hormigonado de platea exterior', sequence: 302 },
      { src: '/volar-sin-escalas-etapa-2-304.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 304: hormigonado de platea exterior', sequence: 304 },
      { src: '/volar-sin-escalas-etapa-2-313.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 313: paneles y espacios interiores de consultorios', sequence: 313 },
      { src: '/volar-sin-escalas-etapa-2-353.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 353: instalaciones de calefacción por piso', sequence: 353 },
      { src: '/volar-sin-escalas-etapa-2-368.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 368: armadura de vigas y estructura', sequence: 368 },
      { src: '/volar-sin-escalas-etapa-2-372.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 372: armadura de vigas y estructura', sequence: 372 },
    ],
    testimonial: {
      person: 'Nadia Snidersich',
      videoSrc: '/testimonio-nadia-web.mp4',
      posterSrc: '/testimonio-nadia-poster.png',
      title: 'Así fue construir Volar Sin Escalas.',
      description: 'Nadia comparte su experiencia durante el desarrollo de Volar Sin Escalas y el acompañamiento de GMP Obras.',
    },
  },
  {
    slug: 'game-over',
    title: 'Bar Game Over',
    status: 'Proyecto finalizado',
    subtitle: 'Un restobar temático para viajar al pasado.',
    description: 'Obra para un restobar inspirado en el universo arcade y retro, con una identidad espacial propia.',
    details: {
      workType: 'Resto bar “Game Over”',
      year: '2022',
      duration: '14 meses',
      area: '288 m²',
      floors: '2 plantas',
      delivery: 'Obra gris',
      tasksLabel: 'Tareas realizadas',
      tasks: [
        'Movimiento de suelo',
        'Fundaciones con pilotes, cabezales, vigas de fundación y platea',
        'Tabiques y losa de paneles Cassaforma',
        'Instalaciones de cloaca, gas, electricidad, agua y desagües pluviales',
        'Revestimiento texturado exterior',
      ],
    },
    images: [
      { src: '/game-over-fachada.png', alt: 'Fachada temática del restobar Game Over' },
    ],
  },
  {
    slug: 'cristian-paez',
    title: 'Cristian Páez',
    status: 'Proyecto finalizado',
    subtitle: 'Vivienda particular construida con sistema Cassaforma.',
    description: 'Vivienda particular con ambientes terminados, espacios exteriores y una resolución integral del proyecto.',
    images: [
      { src: '/cristian-421.jpg', alt: 'Vista exterior de la vivienda de Cristian Páez' },
      { src: '/cristian-422.jpg', alt: 'Ambiente interior terminado de la vivienda de Cristian Páez' },
      { src: '/cristian-423.jpg', alt: 'Interior de la vivienda de Cristian Páez con escalera' },
    ],
  },
  {
    slug: 'javier-aguila',
    title: 'Javier Águila',
    status: 'Proyecto finalizado',
    subtitle: 'Vivienda completa en Rada Tilly.',
    description: 'Registro fotográfico de una vivienda completa y de sus instalaciones exteriores en Rada Tilly.',
    details: {
      workType: 'Vivienda unifamiliar',
      year: '2024–2025',
      duration: 'Actualmente en construcción',
      area: '195 m²',
      floors: '2 plantas',
      delivery: 'Llave en mano',
      tasksLabel: 'Tareas encomendadas',
      tasks: [
        'Movimiento de suelo',
        'Fundaciones con vigas de fundación y platea',
        'Tabiques y losa de paneles Cassaforma',
        'Instalaciones de cloaca, gas, agua, calefacción por piso radiante, alarma, aire acondicionado, internet y desagües pluviales',
        'Cielorraso de yeso',
        'Pintura interior y exterior',
        'Colocación de piso de porcelanato',
        'Armado de baños completos',
      ],
    },
    images: [
      { src: '/javier-033.jpeg', alt: 'Vista de la vivienda de Javier Águila' },
      { src: '/javier-048.jpeg', alt: 'Avance de obra de la vivienda de Javier Águila' },
      { src: '/javier-057.jpeg', alt: 'Detalle constructivo de la vivienda de Javier Águila' },
      { src: '/javier-068.jpeg', alt: 'Espacio exterior de la vivienda de Javier Águila' },
      { src: '/javier-084.jpeg', alt: 'Proceso de ejecución de la vivienda de Javier Águila' },
      { src: '/javier-100.jpeg', alt: 'Vista general de la vivienda de Javier Águila' },
      { src: '/javier-126.jpeg', alt: 'Detalle de la obra de Javier Águila' },
      { src: '/javier-137.jpeg', alt: 'Instalaciones de la vivienda de Javier Águila' },
      { src: '/javier-167.jpeg', alt: 'Terminaciones de la vivienda de Javier Águila' },
      { src: '/javier-290.jpg', alt: 'Vista de la vivienda de Javier Águila en Rada Tilly' },
      { src: '/javier-600.jpeg', alt: 'Detalle exterior de la vivienda de Javier Águila' },
      { src: '/javier-627.jpeg', alt: 'Vista final de la vivienda de Javier Águila' },
      { src: '/javier-629.jpeg', alt: 'Fachada de la vivienda de Javier Águila' },
    ],
  },
  {
    slug: 'vivienda-gabriel-ambrozy',
    title: 'Vivienda Gabriel Ambrozy',
    status: 'Proyecto finalizado',
    subtitle: 'Una vivienda familiar resuelta con sistema Cassaforma.',
    heroImage: { src: '/vivienda-gabriel-ambrozy-hero.jpg', alt: 'Frente finalizado de la vivienda familiar de Gabriel Ambrozy' },
    description: 'Construcción integral de una vivienda unifamiliar, desde el movimiento de suelo y las fundaciones hasta las instalaciones y terminaciones.',
    details: {
      workType: 'Vivienda unifamiliar',
      year: '2020',
      duration: '12 meses durante la pandemia',
      area: '188 m²',
      floors: '1 planta',
      delivery: 'Llave en mano',
      tasksLabel: 'Tareas realizadas',
      tasks: [
        'Movimiento de suelo',
        'Fundaciones con vigas de fundación y platea',
        'Tabiques y losa de paneles Cassaforma',
        'Instalaciones de cloaca, gas, electricidad, agua, calefacción por piso radiante, alarma, aire acondicionado, internet y desagües pluviales',
        'Cielorraso de placas de yeso',
        'Pintura interior y exterior',
        'Colocación de piso de porcelanato',
        'Armado de baños completos',
        'Colocación de aberturas',
      ],
    },
    images: [
      { src: '/gabriel-ambrozy-01.jpg', alt: 'Foto 01 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-02.jpg', alt: 'Foto 02 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-03.jpg', alt: 'Foto 03 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-04.jpg', alt: 'Foto 04 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-05.jpg', alt: 'Foto 05 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-06.jpg', alt: 'Foto 06 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-07.jpg', alt: 'Foto 07 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-08.jpg', alt: 'Foto 08 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-09.jpg', alt: 'Foto 09 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-10.jpg', alt: 'Foto 10 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-11.jpg', alt: 'Foto 11 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-12.jpg', alt: 'Foto 12 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-13.jpg', alt: 'Foto 13 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-14.jpg', alt: 'Foto 14 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-15.jpg', alt: 'Foto 15 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-16.jpg', alt: 'Foto 16 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-17.jpg', alt: 'Foto 17 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-18.jpg', alt: 'Foto 18 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-19.jpg', alt: 'Foto 19 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-20.jpg', alt: 'Foto 20 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-21.jpg', alt: 'Foto 21 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-22.jpg', alt: 'Foto 22 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-23.jpg', alt: 'Foto 23 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-24.jpg', alt: 'Foto 24 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-25.jpg', alt: 'Foto 25 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-26.jpg', alt: 'Foto 26 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/gabriel-ambrozy-27.jpg', alt: 'Foto 27 de la vivienda familiar de Gabriel Ambrozy' },
    ],
    testimonial: {
      person: 'Gabriel Ambrozy',
      videoSrc: '/testimonio-gabriel-web.mp4',
      posterSrc: '/testimonio-gabriel-ambrozy-poster.jpg',
      title: 'La rapidez del sistema y el confort de la vivienda fueron claves para construir.',
      description: 'Gabriel cuenta cómo fue construir su vivienda familiar con el sistema Cassaforma y el acompañamiento de GMP Obras.',
    },
  },
];
