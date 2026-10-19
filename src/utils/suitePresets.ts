// =============================================================================
// PRESETS REALES DE 1-CLIC PARA LAS 10 SUITES DE 930TEXT
// Permite a cualquier usuario, estudiante o profesional probar la potencia en 1 clic
// =============================================================================

export interface SuitePreset {
  id: string;
  label: string;
  iconName?: string;
  badge?: string;
  text: string;
}

export const SUITE_PRESETS: Record<string, SuitePreset[]> = {
  // SUITE 01: FUENTES UNICODE PRO
  fuente: [
    {
      id: 'ig-bio',
      label: 'Bio Instagram Pro',
      badge: 'Redes',
      text: 'Creador Digital & Estratega · Transformando ideas en impacto · Sígueme para más tips'
    },
    {
      id: 'linkedin-title',
      label: 'Titular LinkedIn',
      badge: 'B2B',
      text: 'Product Designer & Senior Software Engineer · Especialista en Interfaces Web'
    },
    {
      id: 'tiktok-nick',
      label: 'Nick Viral TikTok',
      badge: 'Gamer',
      text: 'Rafa Moreno · Beats & Producción Urbana'
    },
    {
      id: 'oferta-banner',
      label: 'Titular de Oferta',
      badge: 'Ventas',
      text: 'OFERTA EXCLUSIVA: 50% de Descuento Solo Hoy · Unidades Limitadas'
    }
  ],

  // SUITE 02: ESPEJO BILINGÜE
  traductor: [
    {
      id: 'b2b-email',
      label: 'Email B2B a Cliente',
      badge: 'Negocios',
      text: 'Estimado cliente, le escribo para confirmar que la propuesta técnica ha sido aprobada. Quedamos a su entera disposición para coordinar la reunión de lanzamiento el próximo lunes.'
    },
    {
      id: 'hotel-booking',
      label: 'Reserva & Viajes',
      badge: 'Viajes',
      text: 'Hola, tengo una reserva confirmada para este fin de semana. ¿Sería posible solicitar un registro de entrada temprano y confirmar si el desayuno está incluido?'
    },
    {
      id: 'tech-summary',
      label: 'Resumen Tecnológico',
      badge: 'Tech',
      text: 'Esta arquitectura web sin servidor procesa todo el contenido lingüístico directamente en el navegador del usuario, garantizando máxima velocidad y total privacidad.'
    }
  ],

  // SUITE 03: RESUMIDOR INTELIGENTE
  resumidor: [
    {
      id: 'paper-ia',
      label: 'Artículo sobre IA & Trabajo',
      badge: 'Científico',
      text: 'La inteligencia artificial generativa ha experimentado un crecimiento exponencial en el último bienio, revolucionando sectores clave desde el desarrollo de software hasta la redacción editorial y la traducción jurídica. Los estudios más recientes demuestran que los profesionales que incorporan herramientas automatizadas aumentan su productividad entre un 35% y un 55%, reduciendo el tiempo dedicado a tareas repetitivas de formateo y corrección. No obstante, los expertos coinciden en que la supervisión humana sigue siendo fundamental para garantizar el tono, la precisión ética y la adecuación contextual en documentos críticos.'
    },
    {
      id: 'reunion-acta',
      label: 'Acta de Reunión Corporativa',
      badge: 'Empresa',
      text: 'En la sesión del comité ejecutivo del 12 de octubre se revisaron los objetivos del cuarto trimestre. Se aprobó por unanimidad la asignación de 25.000 euros para modernizar la infraestructura digital y mejorar la experiencia de usuario. El equipo de desarrollo se comprometió a entregar la versión definitiva de la plataforma antes del 15 de noviembre. Asimismo, se acordó realizar pruebas de carga exhaustivas para asegurar que el sistema soporte picos de tráfico superiores a 50.000 usuarios concurrentes sin degradación del servicio.'
    },
    {
      id: 'apuntes-historia',
      label: 'Apuntes de Examen',
      badge: 'Estudio',
      text: 'La Revolución Industrial iniciada en la segunda mitad del siglo XVIII en Gran Bretaña transformó radicalmente las estructuras socioeconómicas globales. El paso de una economía agraria y artesanal a otra dominada por la industria manufacturera y la maquinaria a vapor aceleró la urbanización, dio origen a la clase obrera industrial y propició nuevos modelos de comercio internacional basados en la producción en masa y la reducción drástica de costes logísticos.'
    }
  ],

  // SUITE 04: CORRECTOR ORTOGRÁFICO & DE ESTILO
  mejorador: [
    {
      id: 'errores-comunes',
      label: 'Texto con Faltas Comunes',
      badge: 'Prueba',
      text: 'Ayer abi en la tarde yo fui al supermercao porq abia ke comprar barias kosas que me faltavan en la kasa. Espero que haiga suficiente comida para toda la jente que vendra el sabado.'
    },
    {
      id: 'carta-formal',
      label: 'Borrador de Solicitud',
      badge: 'Formal',
      text: 'Buenas tardes senor director le escribo este correo para ver si me puede dar permiso el proximo viernes por motivos personales ya que tengo que hacer unos papeles urgentes.'
    },
    {
      id: 'copy-ventas',
      label: 'Copy de Ventas Coloquial',
      badge: 'Marketing',
      text: 'Nuestra app es la mas mejor de todas por que te hace ganar tiempo y es muy super facil de usar para todo el mundo sin tener que pagar un pastizal.'
    }
  ],

  // SUITE 05: LIMPIADOR PROFUNDO
  limpiador: [
    {
      id: 'pdf-roto',
      label: 'Texto Pegado de PDF Roto',
      badge: 'Reparar',
      text: 'Este  texto fue copiado    de un documento PDF\nque tenía saltos de línea\nrotos en mitad de cada fra-\nse y espacios     dobles   por todos lados.\n\n\nAdemás tenía varias líneas en blanco consecutivas.'
    },
    {
      id: 'html-sucio',
      label: 'Texto con Etiquetas HTML & URLs',
      badge: 'HTML',
      text: '<div class="article"><p>Visita nuestro sitio en <a href="https://ejemplo.com/prueba?ref=123">https://ejemplo.com</a> para más detalles.</p><p>Escríbenos a soporte@ejemplo.com o info@empresa.es</p></div>'
    },
    {
      id: 'lista-duplicados',
      label: 'Lista Desordenada con Duplicados',
      badge: 'Ordenar',
      text: 'Madrid\nBarcelona\nValencia\nMadrid\nSevilla\nZaragoza\nBarcelona\nBilbao\nValencia'
    }
  ],

  // SUITE 06: ANALIZADOR & SEO
  analizador: [
    {
      id: 'articulo-seo',
      label: 'Post de Blog Optimizado',
      badge: 'SEO',
      text: 'Las mejores herramientas de texto online gratuitas permiten a redactores, estudiantes y profesionales ahorrar horas de trabajo semanal. Al elegir un software editorial de calidad, es crucial verificar la precisión de su corrector ortográfico, la velocidad del motor de resumen y la seguridad de privacidad del usuario. En esta guía completa exploramos las claves esenciales para maximizar la productividad y optimizar contenidos para motores de búsqueda como Google.'
    },
    {
      id: 'post-linkedin',
      label: 'Post para LinkedIn',
      badge: 'Social',
      text: '¿Cuánto tiempo pierdes a la semana corrigiendo documentos y dando formato a textos? La mayoría de profesionales dedican más de 4 horas semanales a tareas que un buen flujo de trabajo automatizado puede resolver en segundos. Aquí tienes las 3 estrategias que implementé este mes para multiplicar mi rendimiento.'
    }
  ],

  // SUITE 07: CONVERTIDOR DE CASO
  convertidor: [
    {
      id: 'lista-tabla',
      label: 'Lista para Tabla Markdown',
      badge: 'Tabla MD',
      text: 'Producto, Precio, Stock\nMacBook Pro 16, 2499, 12\nTeclado Mecánico, 149, 45\nMonitor 4K Studio, 699, 8'
    },
    {
      id: 'variables-codigo',
      label: 'Nombres para Programación',
      badge: 'Código',
      text: 'usuario autenticado activo\nfecha creacion registro\ntotal pedidos confirmados'
    }
  ],

  // SUITE 08: RIMAS & DICCIONARIO
  rimar: [
    {
      id: 'rap-urbano',
      label: 'Compás de Rap / Trap',
      badge: 'Urbano',
      text: 'Escribo en la libreta lo que siente el corazón\nBuscando en cada barra una nueva sensación\nEl tiempo se me escapa sin pedirme perdón\nCamino por la acera persiguiendo mi pasión'
    },
    {
      id: 'poema-octosilabo',
      label: 'Poema en Octosílabos',
      badge: 'Poesía',
      text: 'Bajo la luna plateada\nCanta la brisa del mar\nUna guitarra afinada\nNo se cansa de soñar'
    }
  ],

  // SUITE 09: AUTOPILOT 1-CLIC
  autopilot: [
    {
      id: 'borrador-completo',
      label: 'Borrador Empresarial con Fallos',
      badge: 'Completo',
      text: 'En el informe de resultados del segundo trimestre se a detectado que las bentas han subido un 28% gracias a la campana digital en redes. No obstante, los costes operativos an augmentado en un 12% devido a los retrasos en la distribucion logistica. Recomendamos implemetar un plan de choque inmediato para optimisar los recursos y asegurar la rentavilidad en el proximo ejercicio anual.'
    },
    {
      id: 'comunicado-prensa',
      label: 'Nota de Prensa de Lanzamiento',
      badge: 'Prensa',
      text: '930Text anuncia hoy el lanzamiento oficial de su nueva suite editorial unificada con 10 herramientas lingüísticas gratuitas. La plataforma opera completamente en el navegador del usuario y ofrece soporte en más de 105 idiomas, consolidándose como una de las alternativas más completas del mercado hispanohablante.'
    }
  ],

  // SUITE 10: COMPARADOR DIFF & CITAS
  laboratorio: [
    {
      id: 'contrato-ab',
      label: 'Cláusula de Contrato A/B',
      badge: 'Legal',
      text: 'Versión A: El cliente abonará el 50% al inicio y el 50% a la entrega en un plazo de 30 días.\nVersión B: El cliente abonará el 40% al inicio, 30% en el hito intermedio y 30% final en 15 días.'
    },
    {
      id: 'cita-cientifica',
      label: 'Cita Académica de Prueba',
      badge: 'APA 7',
      text: 'Autor: Moreno Roman, Rafael. Año: 2026. Título: Optimización y Procesamiento Lingüístico en Clientes Web. Revista: Revista Internacional de Ingeniería de Software.'
    }
  ]
};
