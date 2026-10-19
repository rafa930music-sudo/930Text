export const LEGAL_TABS = [
  { id: 'legal', label: 'Aviso legal' },
  { id: 'privacy', label: 'Privacidad' },
  { id: 'terms', label: 'Términos' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'accessibility', label: 'Accesibilidad' },
  { id: 'credits', label: 'Imágenes' },
  { id: 'contact', label: 'Contacto' }
] as const;

export type LegalTabId = (typeof LEGAL_TABS)[number]['id'];

export const LEGAL_CONTENT: Record<LegalTabId, { title: string; sections: Array<{ heading: string; body: string }> }> = {
  legal: {
    title: 'Aviso legal y Exención de Responsabilidad',
    sections: [
      {
        heading: 'Identificación del responsable',
        body: 'Responsable: Rafael Moreno Roman · NIF: 13372694B · Domicilio: Calle Marte, 10, 08930 Sant Adrià de Besòs, Barcelona, España · Correo electrónico oficial: rafa.930music@gmail.com'
      },
      {
        heading: 'Objeto del sitio',
        body: '930Text ofrece herramientas online para trabajar con textos, fuentes Unicode, traducción, resumen, mejora, limpieza, análisis, conversión y rimas para composición musical. El servicio combina procesamiento local en el navegador con servicios externos de traducción.'
      },
      {
        heading: 'Exención total de garantías y responsabilidad («Tal cual» / As-Is)',
        body: 'Todas las herramientas y descargas de 930Text son 100% gratuitas y se proporcionan «tal cual» («as-is») y según disponibilidad. El titular NO se hace responsable bajo ninguna circunstancia si alguna función, descarga, traducción, API externa, almacenamiento local del navegador o botón no llega a funcionar parcial o totalmente en el dispositivo o navegador del usuario, ni de posibles fallos técnicos, interrupciones, pérdida de borradores locales o incompatibilidades.'
      },
      {
        heading: 'Revisión obligatoria por parte del usuario',
        body: 'Los resultados generados por las herramientas son automatizados y orientativos. El usuario es el único responsable de revisar cualquier texto antes de utilizarlo en contextos profesionales, académicos, jurídicos o comerciales.'
      },
      {
        heading: 'Propiedad intelectual',
        body: 'La marca, interfaz, código, textos y elementos originales de 930Text pertenecen a su titular, salvo que se indique lo contrario. No se autoriza la reutilización del sitio como producto competidor.'
      }
    ]
  },
  privacy: {
    title: 'Política de privacidad',
    sections: [
      {
        heading: 'Responsable del tratamiento',
        body: 'Rafael Moreno Roman · NIF: 13372694B · Calle Marte, 10, 08930 Sant Adrià de Besòs, Barcelona, España · Contacto oficial: rafa.930music@gmail.com'
      },
      {
        heading: 'Tratamientos locales en el navegador',
        body: 'Fuentes, resumen, mejora, limpieza, análisis, conversión, Autopilot y Rimar se ejecutan localmente en el navegador. El tema visual y el historial opcional se guardan únicamente en tu propio navegador/dispositivo y pueden borrarse si limpias los datos o usas modo incógnito.'
      },
      {
        heading: 'Traducción y Valoraciones',
        body: 'Cuando pulsas Traducir, el texto se consulta mediante proveedores públicos de traducción. El formulario de valoración envía tu mensaje a rafa.930music@gmail.com sin exigir registro.'
      },
      {
        heading: 'Donaciones voluntarias mediante PayPal',
        body: 'Todas las herramientas son gratuitas. Si decides realizar una donación voluntaria mediante PayPal.Me, PayPal gestiona la operación directamente en su plataforma segura. 930Text no solicita ni almacena datos bancarios ni de tarjetas.'
      },
      {
        heading: 'Derechos del usuario',
        body: 'Puedes ejercer tus derechos de acceso, rectificación, supresión y demás derechos aplicables escribiendo a rafa.930music@gmail.com, o presentar una reclamación ante la Agencia Española de Protección de Datos.'
      }
    ]
  },
  terms: {
    title: 'Términos de uso y Donaciones Voluntarias',
    sections: [
      {
        heading: 'Acceso 100% gratuito',
        body: 'Todas las herramientas, suites y botones de descarga de 930Text son de acceso libre y gratuito sin necesidad de registro ni suscripción. El usuario se compromete a hacer un uso lícito y razonable del sitio.'
      },
      {
        heading: 'Donaciones voluntarias',
        body: 'Cualquier aportación realizada a través de PayPal.Me tiene carácter de donación libre y voluntaria para apoyar al creador del proyecto, sin constituir la compra de un producto comercial ni generar obligación contractual de soporte o garantía.'
      },
      {
        heading: 'Limitación de responsabilidad técnica',
        body: 'El creador de 930Text no asume responsabilidad alguna si alguna herramienta o función no llega a funcionar, ni por errores de funcionamiento, bloqueadores del navegador, caídas de servicios de terceros (como APIs de traducción o síntesis de voz del sistema operativo) o resultados inexactos. El uso de la web implica la aceptación íntegra de esta cláusula.'
      }
    ]
  },
  cookies: {
    title: 'Cookies y almacenamiento local',
    sections: [
      {
        heading: 'Ausencia de cookies publicitarias',
        body: 'La versión actual no utiliza cookies publicitarias ni rastreadores invasivos de terceros para sus funciones principales.'
      },
      {
        heading: 'Almacenamiento local (localStorage)',
        body: 'El modo claro/oscuro, los borradores automáticos y el historial opcional se guardan en el almacenamiento local del navegador (`localStorage`). Si el usuario limpia los datos del navegador, dichos datos locales se reiniciarán.'
      }
    ]
  },
  accessibility: {
    title: 'Accesibilidad',
    sections: [
      {
        heading: 'Compromiso de diseño accesible',
        body: '930Text ofrece navegación completa por teclado (incluyendo paleta rápida Ctrl/Cmd + K), foco visible, contraste cuidado en modo claro y oscuro, y controles adaptados a pantallas móviles.'
      },
      {
        heading: 'Contacto de accesibilidad',
        body: 'Si detectas cualquier barrera de accesibilidad, puedes comunicarla mediante el formulario de valoración o escribiendo a rafa.930music@gmail.com.'
      }
    ]
  },
  credits: {
    title: 'Imágenes y recursos',
    sections: [
      {
        heading: 'Fotografías e iconografía',
        body: 'La iconografía vectorial se renderiza directamente en SVG para máxima nitidez, velocidad de carga instantánea y mínimo consumo de datos.'
      }
    ]
  },
  contact: {
    title: 'Contacto directo oficial',
    sections: [
      {
        heading: 'Datos de contacto',
        body: 'Rafael Moreno Roman · NIF: 13372694B · Calle Marte, 10, 08930 Sant Adrià de Besòs, Barcelona, España · Correo oficial: rafa.930music@gmail.com'
      },
      {
        heading: 'Soporte y sugerencias',
        body: 'Para sugerencias rápidas utiliza el módulo de valoración al pie de la página o escribe directamente a rafa.930music@gmail.com.'
      }
    ]
  }
};
