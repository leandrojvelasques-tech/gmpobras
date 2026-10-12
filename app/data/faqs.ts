export const faqGroups = [
  { id: 'consulta-y-obras', title: 'Consulta, obras y precios' },
  { id: 'sistema-cassaforma', title: 'Sistema Cassaforma y experiencia' },
  { id: 'preparar-la-obra', title: 'Terreno, plazos y documentación' },
] as const;

export type Faq = {
  id: string;
  group: (typeof faqGroups)[number]['id'];
  question: string;
  paragraphs: string[];
  links?: { href: string; label: string }[];
  showOnHome?: boolean;
};

// Contenido existente del inicio y fichas de app/data/projects.ts.
// Referencia técnica: https://cassaforma.com/panel-simple-normal
// No atribuir una localidad a una obra si su ficha no la identifica.
export const faqs: Faq[] = [
  {
    id: 'tipos-de-obras',
    group: 'consulta-y-obras',
    question: '¿Qué tipos de obras realiza GMP Obras?',
    paragraphs: [
      'GMP Obras realiza viviendas, ampliaciones, consultorios y locales comerciales. Cada consulta se evalúa según su alcance, ubicación y estado actual.',
      'Entre los proyectos documentados podés conocer los consultorios Volar Sin Escalas y la vivienda de Javier Águila en Rada Tilly, con fotografías y el detalle de las tareas realizadas.',
    ],
    links: [
      { href: '/proyectos/volar-sin-escalas', label: 'Ver los consultorios Volar Sin Escalas' },
      { href: '/proyectos/javier-aguila', label: 'Ver la vivienda de Javier Águila' },
    ],
    showOnHome: true,
  },
  {
    id: 'precio-metro-cuadrado',
    group: 'consulta-y-obras',
    question: '¿Cuál es el precio por metro cuadrado?',
    paragraphs: [
      'El precio por metro cuadrado depende del modelo de vivienda, las condiciones del terreno, los materiales y las terminaciones elegidas, además de las instalaciones y el sistema de calefacción.',
      'GMP Obras no tiene un precio estándar por metro cuadrado. Después de una consulta inicial, podemos preparar un presupuesto según lo que querés construir y tus expectativas, para que tengas una noción del costo de tu vivienda.',
    ],
    links: [{ href: '/agendar', label: 'Agendar una consulta para evaluar el costo de tu vivienda' }],
    showOnHome: true,
  },
  {
    id: 'zonas-de-trabajo',
    group: 'consulta-y-obras',
    question: '¿En qué zonas trabaja GMP Obras?',
    paragraphs: [
      'GMP Obras trabaja en Comodoro Rivadavia y Rada Tilly. La ubicación de la obra se revisa en la primera consulta, junto con el tipo de proyecto y su alcance.',
      'La vivienda de Javier Águila es uno de los proyectos documentados de GMP Obras en Rada Tilly. Su ficha reúne fotografías, características de la obra y el testimonio del propietario.',
    ],
    links: [{ href: '/proyectos/javier-aguila', label: 'Ver una obra de GMP en Rada Tilly' }],
    showOnHome: true,
  },
  {
    id: 'consulta-inicial',
    group: 'consulta-y-obras',
    question: '¿Puedo consultar si todavía no tengo el proyecto definido?',
    paragraphs: [
      'Sí. Recomendamos hacer la consulta antes de definir el proyecto. La primera reunión es gratuita y sirve para analizar qué querés construir, conocer el terreno y ordenar los próximos pasos con criterio técnico.',
      'Para iniciar la conversación con GMP Obras, podés indicar el tipo de obra, la ubicación y en qué etapa estás. Si ya tenés planos o material de referencia, también podés compartirlos al solicitar la reunión.',
    ],
    links: [{ href: '/agendar', label: 'Agendar una consulta gratuita' }],
  },
  {
    id: 'que-es-cassaforma',
    group: 'sistema-cassaforma',
    question: '¿Qué es el sistema Cassaforma?',
    paragraphs: [
      'Cassaforma es un sistema constructivo que utiliza paneles con un núcleo de poliestireno expandido (EPS) y mallas de acero, completados en obra con un revestimiento estructural.',
      'GMP Obras utiliza este sistema en sus proyectos. Entre las obras documentadas se encuentran los consultorios Volar Sin Escalas y las viviendas de Gabriel Ambrozy y Javier Águila. Sus fichas muestran fotografías del proceso y las tareas realizadas con paneles Cassaforma.',
    ],
    links: [
      { href: '/#obras', label: 'Ver proyectos reales con Cassaforma' },
      { href: '/sistema-cassaforma', label: 'Conocer cómo funciona el sistema' },
    ],
    showOnHome: true,
  },
  {
    id: 'experiencia-con-cassaforma',
    group: 'sistema-cassaforma',
    question: '¿Qué obras realizó GMP Obras con Cassaforma?',
    paragraphs: [
      'GMP Obras ha utilizado paneles Cassaforma en los consultorios Volar Sin Escalas y en las viviendas de Gabriel Ambrozy y Javier Águila. En las tres fichas se documentan tabiques y losas realizados con este sistema.',
      'Podés consultar fotografías de las etapas de construcción, el alcance de cada proyecto y los testimonios de sus propietarios. La vivienda de Javier Águila está ubicada en Rada Tilly.',
    ],
    links: [
      { href: '/proyectos/volar-sin-escalas', label: 'Ver Volar Sin Escalas' },
      { href: '/proyectos/vivienda-gabriel-ambrozy', label: 'Ver la vivienda de Gabriel Ambrozy' },
      { href: '/proyectos/javier-aguila', label: 'Ver la vivienda de Javier Águila' },
    ],
  },
  {
    id: 'plazos-de-obra',
    group: 'preparar-la-obra',
    question: '¿Cuánto demora una obra?',
    paragraphs: [
      'El plazo depende del tipo de obra, la superficie, el proyecto y las condiciones del terreno. Antes de darte una fecha, GMP Obras revisa esa información y arma un plazo de trabajo para tu caso.',
      'Los proyectos reales permiten conocer la escala y las etapas de obras anteriores. Sus tiempos corresponden a esas obras y no representan un plazo garantizado para un proyecto nuevo.',
    ],
    links: [{ href: '/proyectos/volar-sin-escalas', label: 'Ver las etapas de Volar Sin Escalas' }],
  },
  {
    id: 'condiciones-del-terreno',
    group: 'preparar-la-obra',
    question: '¿Se puede construir en cualquier terreno?',
    paragraphs: [
      'La posibilidad de construir depende de las condiciones del terreno. Antes de proyectar la obra, GMP Obras realiza un estudio de suelo para definir la solución adecuada y prevenir inconvenientes durante la construcción.',
      'Las fundaciones y la solución estructural se definen para cada proyecto. En la ficha de la vivienda de Gabriel Ambrozy podés ver el registro del movimiento de suelo y las fundaciones de esa obra.',
    ],
    links: [{ href: '/proyectos/vivienda-gabriel-ambrozy', label: 'Ver el terreno y las fundaciones de una obra real' }],
  },
  {
    id: 'planos-municipales',
    group: 'preparar-la-obra',
    question: '¿Entregan con los planos municipales aprobados?',
    paragraphs: [
      'Sí. GMP Obras acompaña el proceso para que la obra cumpla con la normativa local y no inicia la construcción sin la aprobación del municipio correspondiente.',
      'En obras llave en mano, al finalizar se presenta el conforme de obra y se actualizan las modificaciones realizadas, si las hubiera. El alcance y la documentación de tu proyecto se revisan en la consulta inicial.',
    ],
    links: [{ href: '/agendar', label: 'Consultar por la documentación de tu obra' }],
  },
];

export const homeFaqs = faqs.filter((faq) => faq.showOnHome);
