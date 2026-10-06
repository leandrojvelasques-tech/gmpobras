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
  duration?: string;
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
  heading: string;
  seoTitle: string;
  seoDescription: string;
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

const projectCatalog: Project[] = [
  {
    slug: 'volar-sin-escalas',
    title: 'Volar Sin Escalas',
    heading: 'Consultorios médicos Volar Sin Escalas',
    seoTitle: 'Consultorios Volar Sin Escalas | GMP Obras',
    seoDescription: 'Conocé los consultorios Volar Sin Escalas: primera etapa terminada y segunda etapa en curso, con fotografías del proceso y testimonio de su propietaria.',
    status: 'Primera etapa terminada · Segunda etapa en curso',
    subtitle: 'Consultorios médicos: primera etapa terminada y segunda etapa en curso.',
    heroImage: { src: '/volar-sin-escalas-fachada-portada.jpg', alt: 'Consultorios terminados de Volar Sin Escalas' },
    description: 'Seguimiento de fundaciones, estructura, instalaciones y terminaciones desde el inicio.',
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
      { src: '/volar-sin-escalas-etapa-1-demolicion-012.jpg', alt: 'Volar Sin Escalas, foto 12: inicio de la obra y demolición del inmueble existente', sequence: 12 },
      // Fotos 02, 09 y 27: copias web corregidas para conservar los originales sin modificar.
      { src: '/volar-sin-escalas-etapa-1-nivelacion-terreno-030.jpg', alt: 'Volar Sin Escalas, foto 30: movimiento y nivelación del terreno', sequence: 30 },
      { src: '/volar-sin-escalas-etapa-1-preparacion-terreno-031.jpg', alt: 'Volar Sin Escalas, foto 31: preparación inicial del terreno', sequence: 31 },
      { src: '/volar-sin-escalas-etapa-1-descarga-paneles-045.jpg', alt: 'Volar Sin Escalas, foto 45: avance de la preparación de fundaciones', sequence: 45 },
      { src: '/volar-sin-escalas-etapa-1-armadura-platea-055.jpg', alt: 'Volar Sin Escalas, foto 55: trabajo inicial de la obra', sequence: 55 },
      { src: '/volar-sin-escalas-etapa-1-hormigonado-platea-080.jpg', alt: 'Volar Sin Escalas, foto 80: avance de la primera etapa', sequence: 80 },
      { src: '/volar-sin-escalas-etapa-1-nivelacion-hormigon-084.jpg', alt: 'Volar Sin Escalas, foto 84: avance de la primera etapa', sequence: 84 },
      { src: '/volar-sin-escalas-etapa-1-platea-hormigonada-086.jpg', alt: 'Volar Sin Escalas, foto 86: avance de la primera etapa', sequence: 86 },
      { src: '/volar-sin-escalas-etapa-1-montaje-paneles-fachada-113.jpg', alt: 'Volar Sin Escalas, foto 113: avance de la primera etapa', sequence: 113 },
      { src: '/volar-sin-escalas-etapa-1-apuntalamiento-interior-144.jpg', alt: 'Volar Sin Escalas, foto 144: avance de la primera etapa', sequence: 144 },
      { src: '/volar-sin-escalas-etapa-1-preparacion-mezcla-147.jpg', alt: 'Volar Sin Escalas, foto 147: avance de la primera etapa', sequence: 147 },
      { src: '/volar-sin-escalas-etapa-1-paneles-y-apuntalamiento-148.jpg', alt: 'Volar Sin Escalas, foto 148: avance de la primera etapa', sequence: 148 },
      { src: '/volar-sin-escalas-etapa-1-montaje-paneles-losa-195.jpg', alt: 'Volar Sin Escalas, foto 195: avance de la primera etapa', sequence: 195 },
      { src: '/volar-sin-escalas-etapa-1-paneles-acceso-212.jpg', alt: 'Volar Sin Escalas, foto 212: avance de la primera etapa', sequence: 212 },
      { src: '/volar-sin-escalas-etapa-1-equipo-montaje-paneles-216.jpg', alt: 'Volar Sin Escalas, foto 216: avance de la primera etapa', sequence: 216 },
      { src: '/volar-sin-escalas-etapa-1-estructura-fachada-240.jpg', alt: 'Volar Sin Escalas, foto 240: avance de la primera etapa', sequence: 240 },
      { src: '/volar-sin-escalas-etapa-1-paneles-interior-259.jpg', alt: 'Volar Sin Escalas, foto 259: avance de la primera etapa', sequence: 259 },
      { src: '/volar-sin-escalas-etapa-1-revestimiento-muros-330.jpg', alt: 'Volar Sin Escalas, foto 330: avance de la primera etapa', sequence: 330 },
      { src: '/volar-sin-escalas-etapa-1-trabajo-en-andamios-367.jpg', alt: 'Volar Sin Escalas, foto 367: avance de la primera etapa', sequence: 367 },
      { src: '/volar-sin-escalas-etapa-1-proyeccion-muros-368.jpg', alt: 'Volar Sin Escalas, foto 368: avance de la primera etapa', sequence: 368 },
      { src: '/volar-sin-escalas-etapa-1-revestimiento-exterior-369.jpg', alt: 'Volar Sin Escalas, foto 369: avance de la primera etapa', sequence: 369 },
      { src: '/volar-sin-escalas-etapa-1-avance-fachada-371.jpg', alt: 'Volar Sin Escalas, foto 371: avance de la primera etapa', sequence: 371 },
      { src: '/volar-sin-escalas-etapa-1-preparacion-mezcla-392.jpg', alt: 'Volar Sin Escalas, foto 392: avance de la primera etapa', sequence: 392 },
      { src: '/volar-sin-escalas-etapa-1-nivelacion-piso-401.jpg', alt: 'Volar Sin Escalas, foto 401: avance de la primera etapa', sequence: 401 },
      { src: '/volar-sin-escalas-etapa-1-colector-piso-radiante-452.jpg', alt: 'Volar Sin Escalas, foto 452: avance de la primera etapa', sequence: 452 },
      { src: '/volar-sin-escalas-etapa-1-instalacion-piso-radiante-468.jpg', alt: 'Volar Sin Escalas, foto 468: avance de la primera etapa', sequence: 468 },
      { src: '/volar-sin-escalas-etapa-1-terminaciones-interiores-491.jpg', alt: 'Volar Sin Escalas, foto 491: avance de la primera etapa', sequence: 491 },
      { src: '/volar-sin-escalas-etapa-1-colocacion-aberturas-514.jpg', alt: 'Volar Sin Escalas, foto 514: avance de la primera etapa', sequence: 514 },
      { src: '/volar-sin-escalas-etapa-1-cubierta-518.jpg', alt: 'Volar Sin Escalas, foto 518: avance de la primera etapa', sequence: 518 },
      { src: '/volar-sin-escalas-etapa-1-colocacion-piso-540.jpg', alt: 'Volar Sin Escalas, foto 540: avance de la primera etapa', sequence: 540 },
      { src: '/volar-sin-escalas-etapa-1-trabajos-vereda-553.jpg', alt: 'Volar Sin Escalas, foto 553: avance de la primera etapa', sequence: 553 },
      { src: '/volar-sin-escalas-etapa-1-armadura-vereda-591.jpg', alt: 'Volar Sin Escalas, foto 591: avance de la primera etapa', sequence: 591 },
      { src: '/volar-sin-escalas-etapa-1-cielorraso-consultorio-599.jpg', alt: 'Volar Sin Escalas, foto 599: avance de la primera etapa', sequence: 599 },
      { src: '/volar-sin-escalas-etapa-1-pasillo-consultorios-612.jpg', alt: 'Volar Sin Escalas, foto 612: avance de la primera etapa', sequence: 612 },
      { src: '/volar-sin-escalas-etapa-1-terminaciones-recepcion-615.jpg', alt: 'Volar Sin Escalas, foto 615: avance de la primera etapa', sequence: 615 },
      { src: '/volar-sin-escalas-etapa-1-mostrador-recepcion-640.jpg', alt: 'Volar Sin Escalas, foto 640: avance de la primera etapa', sequence: 640 },
      { src: '/volar-sin-escalas-etapa-1-fachada-656.jpg', alt: 'Volar Sin Escalas, foto 656: fachada terminada de la obra', sequence: 656 },
      { src: '/volar-sin-escalas-etapa-1-fachada-frontal-667.jpg', alt: 'Volar Sin Escalas, foto 667: fachada terminada de la obra', sequence: 667 },
      { src: '/volar-sin-escalas-etapa-1-fachada-con-cartel-668.jpg', alt: 'Volar Sin Escalas, foto 668: fachada terminada de la obra', sequence: 668 },
    ],
    stage2Images: [
      { src: '/volar-sin-escalas-etapa-2-excavacion-terreno-016.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 16: excavación y nivelación del terreno', sequence: 16 },
      { src: '/volar-sin-escalas-etapa-2-nivelacion-terreno-035.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 35: excavación y nivelación del terreno', sequence: 35 },
      { src: '/volar-sin-escalas-etapa-2-armado-fundacion-048.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 48: cañería cloacal y preparación de fundaciones', sequence: 48 },
      { src: '/volar-sin-escalas-etapa-2-armadura-platea-094.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 94: encofrado y armadura de fundación', sequence: 94 },
      { src: '/volar-sin-escalas-etapa-2-hormigonado-platea-096.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 96: encofrado y armadura de fundación', sequence: 96 },
      { src: '/volar-sin-escalas-etapa-2-platea-hormigonada-113.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 113: hormigonado de platea', sequence: 113 },
      { src: '/volar-sin-escalas-etapa-2-encofrado-fundacion-118.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 118: hormigonado de platea', sequence: 118 },
      { src: '/volar-sin-escalas-etapa-2-montaje-paneles-130.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 130: montaje de paneles de consultorios', sequence: 130 },
      { src: '/volar-sin-escalas-etapa-2-paneles-exteriores-149.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 149: montaje de paneles de consultorios', sequence: 149 },
      { src: '/volar-sin-escalas-etapa-2-revestimiento-muro-lateral-151.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 151: terminación exterior de paneles', sequence: 151 },
      { src: '/volar-sin-escalas-etapa-2-revestimiento-interior-177.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 177: cañería cloacal exterior', sequence: 177 },
      { src: '/volar-sin-escalas-etapa-2-bombeo-hormigon-213.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 213: hormigonado de fundación lateral', sequence: 213 },
      { src: '/volar-sin-escalas-etapa-2-paneles-y-andamios-228.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 228: paneles de consultorios y muro lateral', sequence: 228 },
      { src: '/volar-sin-escalas-etapa-2-montaje-paneles-losa-185.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 185: losa de paneles', sequence: 185 },
      { src: '/volar-sin-escalas-etapa-2-camion-bomba-hormigon-234.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 234: llegada de hormigón', sequence: 234 },
      { src: '/volar-sin-escalas-etapa-2-encofrado-viga-254.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 254: encofrado y armado de platea exterior', sequence: 254 },
      { src: '/volar-sin-escalas-etapa-2-canerias-exteriores-258.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 258: encofrado y armado de platea exterior', sequence: 258 },
      { src: '/volar-sin-escalas-etapa-2-fundaciones-exteriores-270.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 270: cañería cloacal bajo platea', sequence: 270 },
      { src: '/volar-sin-escalas-etapa-2-armadura-y-pases-platea-280.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 280: armadura y pases sanitarios de platea', sequence: 280 },
      { src: '/volar-sin-escalas-etapa-2-hormigonado-platea-exterior-302.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 302: hormigonado de platea exterior', sequence: 302 },
      { src: '/volar-sin-escalas-etapa-2-nivelacion-platea-exterior-304.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 304: hormigonado de platea exterior', sequence: 304 },
      { src: '/volar-sin-escalas-etapa-2-paneles-pasillo-313.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 313: paneles y espacios interiores de consultorios', sequence: 313 },
      { src: '/volar-sin-escalas-etapa-2-piso-radiante-353.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 353: instalaciones de calefacción por piso', sequence: 353 },
      { src: '/volar-sin-escalas-etapa-2-piso-radiante-interior-368.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 368: armadura de vigas y estructura', sequence: 368 },
      { src: '/volar-sin-escalas-etapa-2-armadura-viga-372.jpg', alt: 'Volar Sin Escalas, etapa 2, foto 372: armadura de vigas y estructura en obra', sequence: 372 },
    ],
    testimonial: {
      person: 'Nadia Snidersich',
      videoSrc: '/testimonio-nadia-web.mp4',
      posterSrc: '/testimonio-nadia-volar-sin-escalas.png',
      title: 'Así fue construir Volar Sin Escalas.',
      description: 'Nadia comparte su experiencia durante el desarrollo de Volar Sin Escalas y el acompañamiento de GMP Obras.',
    },
  },
  {
    slug: 'javier-aguila',
    title: 'Vivienda Javier Águila',
    heading: 'Vivienda en Rada Tilly — Javier Águila',
    seoTitle: 'Vivienda en Rada Tilly: Javier Águila | GMP Obras',
    seoDescription: 'Conocé la vivienda terminada de Javier Águila en Rada Tilly, con fotografías de la obra y su experiencia con GMP Obras.',
    status: 'Proyecto finalizado',
    subtitle: 'Vivienda completa en Rada Tilly.',
    description: 'Registro fotográfico de una vivienda completa y de sus instalaciones exteriores en Rada Tilly.',
    details: {
      workType: 'Vivienda unifamiliar',
      year: '2024–2025',
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
      { src: '/vivienda-javier-aguila-terreno-inicial-001.jpg', alt: 'Foto 1 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-movimiento-suelo-002.jpeg', alt: 'Foto 2 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-armadura-fundaciones-003.jpeg', alt: 'Foto 3 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-armadura-platea-004.jpeg', alt: 'Foto 4 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-hormigonado-platea-005.jpeg', alt: 'Foto 5 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-montaje-paneles-006.jpeg', alt: 'Foto 6 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-revestimiento-muro-lateral-007.jpeg', alt: 'Foto 7 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-paneles-y-apuntalamiento-008.jpeg', alt: 'Foto 8 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-paneles-planta-baja-009.jpeg', alt: 'Foto 9 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-estructura-planta-baja-010.jpg', alt: 'Foto 10 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-apuntalamiento-losa-011.jpeg', alt: 'Foto 11 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-revestimiento-fachada-012.jpeg', alt: 'Foto 12 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-montaje-paneles-losa-013.jpeg', alt: 'Foto 13 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-paneles-losa-014.jpeg', alt: 'Foto 14 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-equipo-montaje-losa-015.jpeg', alt: 'Foto 15 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-hormigonado-losa-016.jpeg', alt: 'Foto 16 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-losa-hormigonada-017.jpeg', alt: 'Foto 17 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-estructura-frontal-018.jpeg', alt: 'Foto 18 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-estructura-lateral-019.jpeg', alt: 'Foto 19 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-montaje-paneles-planta-alta-020.jpeg', alt: 'Foto 20 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-paneles-planta-alta-021.jpeg', alt: 'Foto 21 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-estructura-dos-plantas-022.jpeg', alt: 'Foto 22 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-paneles-y-apuntalamiento-planta-alta-023.jpeg', alt: 'Foto 23 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-paneles-fachada-planta-alta-024.jpeg', alt: 'Foto 24 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-vista-general-estructura-025.jpg', alt: 'Foto 25 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-revestimiento-interior-026.jpeg', alt: 'Foto 26 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-revestimiento-muro-exterior-027.jpeg', alt: 'Foto 27 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-armadura-escalera-028.jpeg', alt: 'Foto 28 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-trabajos-fachada-029.jpeg', alt: 'Foto 29 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-bombeo-hormigon-losa-030.jpeg', alt: 'Foto 30 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-piso-radiante-031.jpg', alt: 'Foto 31 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-instalaciones-interiores-032.jpeg', alt: 'Foto 32 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-colector-piso-radiante-033.jpeg', alt: 'Foto 33 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-piso-radiante-interior-034.jpeg', alt: 'Foto 34 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-canerias-interiores-035.jpeg', alt: 'Foto 35 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-cubierta-036.jpeg', alt: 'Foto 36 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-trabajos-terreno-exterior-037.jpeg', alt: 'Foto 37 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-colocacion-aberturas-038.jpeg', alt: 'Foto 38 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-aberturas-laterales-039.jpeg', alt: 'Foto 39 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-terminaciones-fachada-040.jpeg', alt: 'Foto 40 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-estructura-cielorraso-041.jpeg', alt: 'Foto 41 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-estructura-cielorraso-interior-042.jpeg', alt: 'Foto 42 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-colocacion-piso-043.jpeg', alt: 'Foto 43 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-pintura-exterior-044.jpeg', alt: 'Foto 44 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-pasillo-planta-alta-045.jpeg', alt: 'Foto 45 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-escalera-interior-046.jpeg', alt: 'Foto 46 de la obra de Javier Águila' },
      { src: '/vivienda-javier-aguila-fachada-frontal-047.jpeg', alt: 'Foto 47 de la obra de Javier Águila' },
    ],
    testimonial: {
      person: 'Javier Águila',
      videoSrc: '/testimonio-javier-aguila-web.mp4',
      posterSrc: '/testimonio-javier-aguila-poster.jpg',
      title: 'La experiencia de Javier Águila.',
      description: 'Javier comparte su experiencia durante el desarrollo de su vivienda y el acompañamiento de GMP Obras.',
    },
  },
  {
    slug: 'vivienda-gabriel-ambrozy',
    title: 'Vivienda Gabriel Ambrozy',
    heading: 'Vivienda familiar de Gabriel Ambrozy',
    seoTitle: 'Vivienda con Cassaforma: Gabriel Ambrozy | GMP Obras',
    seoDescription: 'Conocé la vivienda familiar de Gabriel Ambrozy, construida con Cassaforma: fotos del proyecto, etapas de obra y testimonio del propietario.',
    status: 'Proyecto finalizado',
    subtitle: 'Una vivienda familiar resuelta con sistema Cassaforma.',
    heroImage: { src: '/vivienda-gabriel-ambrozy-fachada-portada.jpg', alt: 'Frente finalizado de la vivienda familiar de Gabriel Ambrozy' },
    description: 'Proyecto integral, desde el movimiento de suelo y las fundaciones hasta las instalaciones y terminaciones.',
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
      { src: '/vivienda-gabriel-ambrozy-preparacion-terreno-01.jpg', alt: 'Foto 01 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-armadura-platea-02.jpg', alt: 'Foto 02 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-hormigonado-platea-03.jpg', alt: 'Foto 03 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-armadura-fundaciones-04.jpg', alt: 'Foto 04 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-montaje-paneles-05.jpg', alt: 'Foto 05 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-paneles-vista-general-06.jpg', alt: 'Foto 06 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-equipo-montaje-paneles-07.jpg', alt: 'Foto 07 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-revestimiento-muros-08.jpg', alt: 'Foto 08 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-montaje-paneles-losa-09.jpg', alt: 'Foto 09 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-estructura-fachada-10.jpg', alt: 'Foto 10 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-camion-hormigon-11.jpg', alt: 'Foto 11 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-hormigonado-losa-12.jpg', alt: 'Foto 12 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-piso-radiante-13.jpg', alt: 'Foto 13 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-armadura-y-piso-radiante-14.jpg', alt: 'Foto 14 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-interior-en-obra-15.jpg', alt: 'Foto 15 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-patio-interior-en-obra-16.jpg', alt: 'Foto 16 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-vista-patio-interior-17.jpg', alt: 'Foto 17 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-cubierta-18.jpg', alt: 'Foto 18 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-estructura-cielorraso-19.jpg', alt: 'Foto 19 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-banio-en-terminaciones-20.jpg', alt: 'Foto 20 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-terminaciones-interiores-21.jpg', alt: 'Foto 21 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-canerias-exteriores-22.jpg', alt: 'Foto 22 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-terminaciones-fachada-23.jpg', alt: 'Foto 23 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-aberturas-y-fachada-24.jpg', alt: 'Foto 24 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-vista-general-exterior-25.jpg', alt: 'Foto 25 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-pintura-fachada-26.jpg', alt: 'Foto 26 de la vivienda familiar de Gabriel Ambrozy' },
      { src: '/vivienda-gabriel-ambrozy-fachada-frontal-27.jpg', alt: 'Foto 27 de la vivienda familiar de Gabriel Ambrozy' },
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

const projectOrder = ['volar-sin-escalas', 'vivienda-gabriel-ambrozy', 'javier-aguila'];

export const projects: Project[] = projectOrder.map((slug) => {
  const project = projectCatalog.find((item) => item.slug === slug);
  if (!project) throw new Error(`Missing project: ${slug}`);
  return project;
});
