export const faqGroups = [
  { id: 'consulta-y-obras', title: 'Consulta, obras y precios' },
  { id: 'sistema-cassaforma', title: 'Sistema Cassaforma y experiencia' },
  { id: 'cuidado-de-la-vivienda', title: 'Vivienda, mantenimiento y reparaciones' },
  { id: 'preparar-la-obra', title: 'Terreno, plazos y documentación' },
] as const;

export type Faq = {
  id: string;
  group: (typeof faqGroups)[number]['id'];
  question: string;
  paragraphs: string[];
  listItems?: { label: string; text: string }[];
  closingParagraphs?: string[];
  links?: { href: string; label: string }[];
  showOnHome?: boolean;
};

// Contenido existente del inicio y fichas de app/data/projects.ts.
// Referencia técnica: https://cassaforma.com/panel-simple-normal
// No atribuir una localidad a una obra si su ficha no la identifica.
// Las nueve respuestas incorporadas el 15/10/2026 provienen de Gustavo Pinto
// y del texto revisado y aprobado por Leandro en la conversación del proyecto.
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
    id: 'alcance-del-presupuesto',
    group: 'consulta-y-obras',
    question: '¿Qué incluye el presupuesto y qué gastos quedan afuera?',
    paragraphs: [
      'El presupuesto es gratuito y detalla los trabajos contemplados para cada proyecto. Puede incluir fundaciones, platea, muros, cubierta, instalaciones y terminaciones, según se contrate una obra gris o una ejecución completa.',
      'Las instalaciones también se definen en función de lo que elija el propietario: agua, cloacas, gas, electricidad, desagües pluviales, alarma y calefacción, entre otras.',
      'La estimación inicial de las fundaciones queda sujeta al estudio de suelo y al cálculo estructural. Si el cálculo requiere modificar dimensiones o agregar elementos, se ajusta ese ítem del presupuesto.',
      'Además, hay gastos y honorarios que se detallan por separado según las necesidades de la obra:',
    ],
    listItems: [
      { label: 'Obrador, baño y comedor', text: 'dependen de las instalaciones que ya pueda aportar el propietario.' },
      { label: 'Bateas y retiro de residuos', text: 'se cobran según el uso durante las distintas etapas.' },
      { label: 'Dirección de obra y representación técnica', text: 'se definen según los profesionales que participen y las responsabilidades que asuma cada uno.' },
      { label: 'Logística, movilidad, máquinas y herramientas', text: 'se contempla su provisión y coordinación según el alcance acordado.' },
      { label: 'Planos y trámites municipales', text: 'se detallan los costos de las presentaciones correspondientes.' },
      { label: 'Cálculo y plano estructural', text: 'se cotizan con el ingeniero a partir del proyecto y el estudio de suelo.' },
    ],
    closingParagraphs: [
      'En la contratación completa llave en mano, no cobramos un honorario adicional por la presentación del conforme a obra. Cuando GMP ejecuta sólo una parte y la vivienda se termina posteriormente con otras personas, ese trabajo se cotiza por separado.',
      'Antes de contratar, dejamos detallado qué incluye el presupuesto, qué se paga aparte y qué valores pueden ajustarse.',
    ],
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
    id: 'ampliaciones-y-etapas',
    group: 'consulta-y-obras',
    question: '¿Puedo ampliar mi casa más adelante o combinar Cassaforma con una construcción de ladrillos?',
    paragraphs: [
      'Sí, se puede construir por etapas y evaluar ampliaciones sobre una vivienda existente. Conviene definir desde el proyecto cómo se quiere hacer crecer la casa.',
      'Una primera etapa puede ser ejecutar y terminar las fundaciones. Después se puede avanzar con un sector de la vivienda y completarlo hasta un punto adecuado para detener la obra. Los paneles deben quedar correctamente vinculados, estabilizados y revestidos; no conviene dejarlos expuestos durante períodos prolongados.',
      'Las ampliaciones laterales y las plantas altas requieren evaluaciones distintas. Para agregar una planta alta hay que comprobar que las fundaciones y la estructura puedan recibir las nuevas cargas.',
      'También se puede evaluar la combinación de Cassaforma con una construcción tradicional u otro sistema. La posibilidad y la forma de vincularlos dependen del estado de la construcción existente y del cálculo correspondiente.',
    ],
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
    id: 'viento-y-condiciones-locales',
    group: 'sistema-cassaforma',
    question: '¿Cómo se diseña la vivienda para resistir los vientos de Comodoro y Rada Tilly?',
    paragraphs: [
      'El proyecto requiere un cálculo estructural que considere las condiciones de la obra. Trabajamos con un ingeniero especializado en Cassaforma, a quien se le entrega el proyecto y el estudio de suelo para definir la estructura y las fundaciones.',
      'Durante el montaje, planificamos las tareas según el pronóstico y las condiciones reales de viento. Los paneles se anclan y se estabilizan con puntales y tensores, y avanzamos por sectores para ir dando rigidez al conjunto.',
      'La experiencia en la zona nos llevó a adaptar los anclajes y la forma de organizar el montaje. Si las condiciones no permiten continuar, aseguramos lo ejecutado y suspendemos las tareas hasta que mejore el clima.',
      'El ritmo de trabajo se ajusta para cuidar la seguridad y la calidad de la ejecución.',
    ],
  },
  {
    id: 'aislacion-acustica',
    group: 'sistema-cassaforma',
    question: '¿Qué aislación acústica tiene la casa frente al ruido exterior y entre ambientes?',
    paragraphs: [
      'La aislación acústica depende de la solución completa: paredes, techo, aberturas, puertas y encuentros entre los distintos elementos.',
      'En nuestras obras utilizamos habitualmente paneles de 12 centímetros en las paredes exteriores y de 8 centímetros en las interiores. El espesor del panel es distinto del espesor final de la pared, que incorpora los revestimientos.',
      'Cuando el proyecto necesita mayor aislación, podemos evaluar paneles de mayor espesor y soluciones específicas. Por ejemplo, en sectores de consultorios que estamos construyendo se utilizaron paneles de 20 centímetros.',
      'Para obtener un buen resultado, las puertas y ventanas también deben acompañar la solución. El nivel de aislación necesario se define según la actividad y el uso de cada ambiente.',
    ],
  },
  {
    id: 'humedad-condensacion-y-filtraciones',
    group: 'cuidado-de-la-vivienda',
    question: '¿Cómo se previenen la humedad, la condensación y las filtraciones en una casa con Cassaforma?',
    paragraphs: [
      'La prevención requiere resolver las aislaciones desde las fundaciones hasta la cubierta. En las fundaciones colocamos una lámina de polietileno de 200 micrones antes del armado y el hormigonado, y utilizamos aditivos hidrófugos en los revoques exteriores. Para las losas, nuestra solución habitual es la impermeabilización con membrana asfáltica.',
      'La condensación también depende de las aberturas elegidas y de las condiciones de uso y ventilación de la vivienda. Siempre que el proyecto lo permite, recomendamos aberturas de PVC con doble vidriado para mejorar la aislación térmica y reducir el riesgo de condensación.',
      'Con el paso del tiempo, es importante revisar cubiertas, sellados y terminaciones. Si aparece una filtración, evaluamos su origen para determinar qué reparación corresponde.',
    ],
  },
  {
    id: 'mantenimiento-de-la-vivienda',
    group: 'cuidado-de-la-vivienda',
    question: '¿Qué mantenimiento necesita una vivienda con Cassaforma con el paso de los años?',
    paragraphs: [
      'Los cuidados habituales son similares a los de una vivienda de construcción tradicional: revisar el estado de las pinturas, los revestimientos, los sellados y las instalaciones.',
      'Pueden aparecer fisuras o microfisuras relacionadas con cambios de temperatura o movimientos del terreno. Su origen debe evaluarse para definir la reparación adecuada. En nuestra ejecución incorporamos mallas de refuerzo para reducir su aparición.',
      'Las pinturas y los revestimientos exteriores también necesitan renovación con el tiempo. Su desgaste depende del producto utilizado, el color y la exposición al clima.',
      'Los equipos de calefacción, las calderas y los calefactores requieren su propio mantenimiento, de acuerdo con las indicaciones del fabricante y de un técnico habilitado.',
    ],
  },
  {
    id: 'reparaciones-e-instalaciones',
    group: 'cuidado-de-la-vivienda',
    question: '¿Cómo se repara una cañería o se agrega una instalación cuando la casa ya está terminada?',
    paragraphs: [
      'Las instalaciones se pueden reparar o modificar. Primero hay que evaluar dónde están ubicadas, qué intervención se necesita y cómo afecta a la pared o al sector donde se va a trabajar.',
      'Cuando es necesario intervenir una instalación embutida, el trabajo puede requerir abrir el sector, reparar o agregar la cañería y después recomponer la malla, el revestimiento de cemento y la terminación. Por eso conviene prever la mayor cantidad posible de tomas y conexiones durante el proyecto.',
      'Para algunas ampliaciones eléctricas, una instalación exterior con cablecanal puede ser una alternativa más sencilla y económica. La solución se define según el uso, las condiciones de seguridad y la terminación que busque el propietario.',
      'Al entregar la obra, proporcionamos planos y fotografías de las instalaciones para facilitar futuras intervenciones.',
    ],
  },
  {
    id: 'durabilidad-de-la-vivienda',
    group: 'cuidado-de-la-vivienda',
    question: '¿Cuánto duran estas viviendas y de qué depende su vida útil?',
    paragraphs: [
      'La durabilidad depende del proyecto, los materiales, la ejecución y el mantenimiento que reciba la vivienda.',
      'Para conservar la casa, es importante mantener las pinturas, las impermeabilizaciones, los sellados y las instalaciones. Si aparecen fisuras, hay que revisar su origen y definir cómo repararlas.',
      'En las ampliaciones también es fundamental resolver la vinculación entre las partes nuevas y las existentes, porque sus movimientos pueden generar fisuras en los encuentros.',
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
    id: 'documentacion-controles-y-garantias',
    group: 'preparar-la-obra',
    question: '¿Qué documentación, controles de calidad y garantías recibo al contratar la obra?',
    paragraphs: [
      'En una contratación integral coordinamos las tareas y la documentación desde el estudio de suelo y el proyecto hasta las terminaciones, según el alcance acordado.',
      'Gestionamos la presentación del plano de obra nueva y el permiso municipal correspondiente. Al finalizar, se tramita el plano conforme a obra.',
      'El propietario recibe una carpeta con la documentación generada durante el proceso: planos municipales, permisos, documentación profesional, facturas y los planos de las instalaciones ejecutadas, como agua, gas, electricidad y alarma, cuando corresponda.',
      'También entregamos un registro fotográfico de las distintas etapas. Las imágenes de las instalaciones ayudan a identificar sus recorridos para futuras reparaciones o perforaciones.',
      'Si se detecta un problema atribuible a la ejecución, evaluamos el caso y realizamos la corrección correspondiente. Las condiciones y el alcance de las garantías deben quedar establecidos en la contratación.',
    ],
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
