// ============================================================================
// 930TEXT — PLANTILLAS UNIVERSALES Y CASOS DE USO PARA TODO EL MUNDO
// ============================================================================

export interface UniversalPreset {
  id: string;
  audience: 'estudiantes' | 'trabajo' | 'creadores' | 'musica' | 'negocios';
  audienceLabel: string;
  title: string;
  description: string;
  targetToolId: string;
  sampleText: string;
}

export const UNIVERSAL_PRESETS: UniversalPreset[] = [
  {
    id: 'uni-estudio',
    audience: 'estudiantes',
    audienceLabel: 'Estudiantes y Opositores',
    title: 'Resumir apuntes y crear preguntas de examen',
    description: 'Convierte un tema largo en ficha ejecutiva, viñetas o preguntas tipo test al instante.',
    targetToolId: 'resumidor',
    sampleText:
      'La fotosíntesis es el proceso metabólico mediante el cual las plantas verdes, las algas y algunas bacterias convierten la energía luminosa en energía química. Durante la fase luminosa, la clorofila absorbe la luz solar en los tilacoides para dividir moléculas de agua, liberando oxígeno como subproducto y generando ATP y NADPH. Posteriormente, en el ciclo de Calvin o fase oscura dentro del estroma, el dióxido de carbono atmosférico se fija utilizando esa energía química para sintetizar glucosa, fundamental para el crecimiento vegetal y el equilibrio de la biosfera terrestre.'
  },
  {
    id: 'uni-ortografia',
    audience: 'trabajo',
    audienceLabel: 'Corrección Ortográfica Profunda',
    title: 'Corregir texto con faltas graves, k/b/v y tildes',
    description: 'Repara errores fonéticos (abia, ke, faltavan, espasio, pasao), nombres y puntuación.',
    targetToolId: 'mejorador',
    sampleText:
      'Ayer abi en la tarde yo fui al supermercao porq abia ke comprar barias kosas que me faltavan en la kasa. Iba con mi amigo juan, el kual abia yegado kasi ase una ora de biajar. Cuando yegamos al parkeo, abia un carro mal estacionado ke nos kito el espasio. Juan se enojo mucho y empeso a ablar vien fuerte, disiendo: «¡ay no puede ser, esto es un desastre!».\nAl entrar, fuimos direktamente a la sersion de frutas. Yo keria saver cuamto costavan las manzanas, pero no abia presio por ningun lado. Al final agarramos dos kilo de platano, una bolsa de patajas y un bote de lele que estava caducao desde el mes pasao. ¿Por que la jente no revisa la fec.'
  },
  {
    id: 'uni-correo',
    audience: 'trabajo',
    audienceLabel: 'Oficina y Profesionales',
    title: 'Pulir un correo o informe ejecutivo',
    description: 'Elimina muletillas, corrige puntuación, pleonasmos y deja el texto impecable.',
    targetToolId: 'mejorador',
    sampleText:
      'Hola equipo, o sea les escribo el día de hoy para comentarles que básicamente vamos a llevar a cabo la revisión del proyecto. Pero sin embargo necesitamos subir arriba los documentos finales en base a lo que hablamos ayer, para que todo quede totalmente gratis de errores antes de enviarlo al cliente.'
  },
  {
    id: 'uni-redes',
    audience: 'creadores',
    audienceLabel: 'Redes Sociales y Marcas',
    title: 'Destacar biografía y titulares en Instagram / TikTok / LinkedIn',
    description: 'Genera 44 fuentes Unicode con 14 marcos elegantes que llaman la atención en el feed.',
    targetToolId: 'fuente',
    sampleText: 'Comunicación clara, estrategia digital y resultados reales ✨'
  },
  {
    id: 'uni-limpieza',
    audience: 'negocios',
    audienceLabel: 'Administración y Webs',
    title: 'Limpiar texto copiado de PDFs, Excels o subtítulos',
    description: 'Quita saltos rotos, marcas de tiempo [00:15], enlaces, HTML y líneas repetidas.',
    targetToolId: 'limpiador',
    sampleText:
      '[00:12]   Informe   trimestral de   ventas <b>2026</b>\n[00:18] Visita https://ejemplo.com para más detalles.\nInforme trimestral de ventas 2026\n   Contacto: soporte@empresa.com   '
  },
  {
    id: 'uni-rimas',
    audience: 'musica',
    audienceLabel: 'Poetas, Compositores y Músicos',
    title: 'Encontrar rimas, medir sílabas y estructurar estrofas',
    description: 'Rimas consonantes, asonantes y multisilábicas con escáner métrico y pulso BPM.',
    targetToolId: 'rimar',
    sampleText:
      'Busco la palabra exacta que ilumine la canción\nCada verso tiene el pulso que me dicta el corazón\nSubo firme al escenario defendiendo mi verdad\nMientras brilla en el espejo toda nuestra libertad'
  },
  {
    id: 'uni-seo',
    audience: 'creadores',
    audienceLabel: 'Bloggers, Copywriters y SEO',
    title: 'Auditar legibilidad y densidad de palabras clave',
    description: 'Calcula índice Fernández Huerta, tiempo de locución, bigramas, trigramas y límites.',
    targetToolId: 'analizador',
    sampleText:
      'El posicionamiento web moderno requiere contenido útil, estructura clara y una velocidad de carga óptima. Cuando un artículo responde directamente a la intención de búsqueda del usuario, aumenta el tiempo de permanencia y mejora la conversión orgánica.'
  },
  {
    id: 'uni-tabla',
    audience: 'negocios',
    audienceLabel: 'Programadores, Notion y Datos',
    title: 'Convertir lista CSV en Tabla Markdown o slugs SEO',
    description: 'Transforma datos separados por comas en tablas listas para copiar o código limpio.',
    targetToolId: 'convertidor',
    sampleText:
      'Herramienta, Categoría, Estado\nResumidor Pro, Estudio y Empresa, Activo\nCorrector Ortográfico, Redacción, Activo\nRimas y Métrica, Composición, Activo'
  },
  {
    id: 'uni-traduccion',
    audience: 'estudiantes',
    audienceLabel: 'Idiomas, Viajes y Clientes',
    title: 'Traducir comunicados en 6 idiomas con pronunciación',
    description: 'Traduce textos extensos al inglés, francés, alemán, portugués o italiano con voz.',
    targetToolId: 'traductor',
    sampleText:
      'Buenos días, adjuntamos el resumen ejecutivo del proyecto junto con las métricas principales del trimestre. Quedamos a su disposición para cualquier consulta.'
  },
  {
    id: 'uni-poetica',
    audience: 'musica',
    audienceLabel: 'Literatura y Arte Mayor',
    title: 'Escansión de versos endecasílabos y cuartetos',
    description: 'Mide sinalefas y comprueba la regularidad silábica en sonetos, décimas o canciones.',
    targetToolId: 'rimar',
    sampleText:
      'En el silencio claro de la noche\nbrilla una estrella sobre el horizonte\nmientras el viento cruza por el monte\nsin que la sombra empañe su derroche'
  }
];

export interface DonationTier {
  amount: string;
  title: string;
  badge: string;
  desc: string;
  featured?: boolean;
}

export const DONATION_TIERS: DonationTier[] = [
  {
    amount: '2',
    title: 'Aportación Simbólica ☕',
    badge: 'Apoyo inicial',
    desc: 'Contribución voluntaria para respaldar el acceso abierto y gratuito de la plataforma.'
  },
  {
    amount: '5',
    title: 'Impulso Editorial ⚡',
    badge: 'Más habitual',
    desc: 'Ayuda al mantenimiento continuo y optimización de las 10 suites lingüísticas.',
    featured: true
  },
  {
    amount: '10',
    title: 'Mecenas del Proyecto 🏆',
    badge: 'Gran apoyo',
    desc: 'Respaldo para mantener la plataforma 100% privada y sin publicidad intrusiva.'
  },
  {
    amount: '20',
    title: 'Patrocinador Principal 💎',
    badge: 'Máximo respaldo',
    desc: 'Contribución prioritaria para la investigación y desarrollo de nuevos algoritmos.'
  }
];


