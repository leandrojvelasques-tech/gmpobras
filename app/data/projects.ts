export type ProjectImage = {
  src: string;
  alt: string;
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
    subtitle: 'Una obra que avanza etapa por etapa.',
    heroImage: { src: '/volar-sin-escalas-hero.jpg', alt: 'Montaje de paneles de consultorios en Volar Sin Escalas' },
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
      { src: '/volar-sin-escalas-montaje-paneles.jpg', alt: 'Montaje de paneles Cassaforma en los consultorios de Volar Sin Escalas' },
      { src: '/volar-sin-escalas-platea.jpg', alt: 'Hormigonado de platea y fundaciones de la obra Volar Sin Escalas' },
      { src: '/volar-sin-escalas-calefaccion-piso.jpg', alt: 'Instalación de calefacción por piso radiante en Volar Sin Escalas' },
      { src: '/volar-sin-escalas-interior-consultorio.jpg', alt: 'Interior de un consultorio durante la ejecución de Volar Sin Escalas' },
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
      { src: '/vivienda-gabriel-ambrozy.jpg', alt: 'Vista exterior de la vivienda familiar de Gabriel Ambrozy' },
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
