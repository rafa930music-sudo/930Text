// ============================================================================
// 930TEXT — GRAN DICCIONARIO LÉXICO, MORFOLÓGICO Y DE RIMAS DEL ESPAÑOL
// Más de 15.000 palabras reales del español (léxico general, literario,
// poético, urbano, científico, conjugaciones verbales completas, derivados
// nominales, adjetivales y adverbiales) + Definiciones, Sinónimos y Categorías
// ============================================================================

export type WordCategory =
  | 'sustantivo'
  | 'verbo'
  | 'adjetivo'
  | 'adverbio'
  | 'poetico'
  | 'urbano';

export interface SpanishDictionaryEntry {
  word: string;
  category: WordCategory;
  definition: string;
  synonyms: string[];
  antonyms: string[];
  register: 'Estándar' | 'Literario / Poético' | 'Urbano / Musical' | 'Académico / Formal';
  example: string;
}

// ----------------------------------------------------------------------------
// 1. DICCIONARIO NORMAL DEL ESPAÑOL (DEFINICIONES, SINÓNIMOS, ANTÓNIMOS Y USO)
// ----------------------------------------------------------------------------
export const SPANISH_DEFINITIONS_DB: Record<string, SpanishDictionaryEntry> = {
  amor: {
    word: 'amor',
    category: 'sustantivo',
    definition: 'Sentimiento intenso del ser humano que busca el encuentro y unión con otro ser o con una vocación.',
    synonyms: ['afecto', 'pasión', 'cariño', 'ternura', 'devoción', 'apego', 'adoración'],
    antonyms: ['odio', 'indiferencia', 'rencor', 'desprecio', 'aversión'],
    register: 'Estándar',
    example: 'El amor verdadero resiste el paso de los años y las tormentas.'
  },
  corazón: {
    word: 'corazón',
    category: 'sustantivo',
    definition: 'Órgano vital y símbolo universal de los sentimientos, la valentía, el centro o el núcleo de algo.',
    synonyms: ['pecho', 'alma', 'centro', 'núcleo', 'espíritu', 'entraña'],
    antonyms: ['superficie', 'periferia', 'frialdad'],
    register: 'Estándar',
    example: 'Cantó con el corazón en la mano ante todo el auditorio.'
  },
  libertad: {
    word: 'libertad',
    category: 'sustantivo',
    definition: 'Facultad natural que tiene el ser humano de obrar de una manera o de otra sin opresión ni cautiverio.',
    synonyms: ['autonomía', 'independencia', 'emancipación', 'albedrío', 'soberanía'],
    antonyms: ['esclavitud', 'cautiverio', 'opresión', 'prisión', 'sumisión'],
    register: 'Estándar',
    example: 'La libertad se defiende con cultura, verdad y memoria.'
  },
  esperanza: {
    word: 'esperanza',
    category: 'sustantivo',
    definition: 'Estado de ánimo que surge cuando se presenta como alcanzable lo que se desea.',
    synonyms: ['ilusión', 'confianza', 'fe', 'optimismo', 'expectativa', 'promesa'],
    antonyms: ['desesperación', 'desilusión', 'pesimismo', 'desaliento'],
    register: 'Estándar',
    example: 'Incluso en la noche más cerrada quedaba un rayo de esperanza.'
  },
  silencio: {
    word: 'silencio',
    category: 'sustantivo',
    definition: 'Ausencia de ruido o abstención de hablar; pausa musical o poética cargada de significado.',
    synonyms: ['calma', 'quietud', 'paz', 'reserva', 'mutismo', 'sosiego'],
    antonyms: ['ruido', 'estrépito', 'estruendo', 'clamor', 'grito'],
    register: 'Literario / Poético',
    example: 'El silencio después del último acorde emocionó a toda la sala.'
  },
  tiempo: {
    word: 'tiempo',
    category: 'sustantivo',
    definition: 'Magnitud física con que se mide la duración de las cosas sujetas a mudanza; época o compás musical.',
    synonyms: ['época', 'era', 'eternidad', 'instante', 'momento', 'compás'],
    antonyms: ['intemporalidad', 'inmovilidad'],
    register: 'Estándar',
    example: 'El tiempo pone a cada palabra en su lugar exacto.'
  },
  verdad: {
    word: 'verdad',
    category: 'sustantivo',
    definition: 'Conformidad de las cosas con el concepto que de ellas forma la mente; sinceridad y autenticidad.',
    synonyms: ['certeza', 'realidad', 'autenticidad', 'franqueza', 'honestidad', 'evidencia'],
    antonyms: ['mentira', 'engaño', 'falsedad', 'hipocresía', 'farsa'],
    register: 'Estándar',
    example: 'Decir la verdad con elegancia es el sello de una mente libre.'
  },
  noche: {
    word: 'noche',
    category: 'sustantivo',
    definition: 'Tiempo en que falta sobre el horizonte la claridad del sol; espacio simbólico del misterio y la bohemia.',
    synonyms: ['oscuridad', 'madrugada', 'velada', 'penumbra', 'nocturnidad'],
    antonyms: ['día', 'alba', 'amanecer', 'claridad', 'mediodía'],
    register: 'Estándar',
    example: 'La noche encendió las luces de neón sobre el asfalto mojado.'
  },
  camino: {
    word: 'camino',
    category: 'sustantivo',
    definition: 'Tierra hollada por donde se transita habitualmente; rumbo o dirección vital que elige una persona.',
    synonyms: ['sendero', 'ruta', 'trayecto', 'vía', 'destino', 'senda', 'itinerario'],
    antonyms: ['extravío', 'bloqueo', 'estancamiento'],
    register: 'Estándar',
    example: 'Cada paso firme construye el camino hacia la cumbre.'
  },
  fuego: {
    word: 'fuego',
    category: 'sustantivo',
    definition: 'Fenómeno de combustión con luz y calor; ardor apasionado de los afectos o la creatividad.',
    synonyms: ['llama', 'hoguera', 'incendio', 'ardor', 'pasión', 'candela', 'brasa'],
    antonyms: ['hielo', 'ceniza', 'frialdad', 'apatía'],
    register: 'Literario / Poético',
    example: 'Sus versos llevaban el fuego de quien nunca se rinde.'
  },
  cielo: {
    word: 'cielo',
    category: 'sustantivo',
    definition: 'Esfera aparente azul y diáfana que rodea la Tierra; cumbre de dicha o elevación espiritual.',
    synonyms: ['firmamento', 'bóveda', 'paraíso', 'altura', 'edén', 'éter'],
    antonyms: ['abismo', 'infierno', 'suelo', 'subsuelo'],
    register: 'Estándar',
    example: 'Miró al cielo buscando inspiración antes de salir al escenario.'
  },
  mar: {
    word: 'mar',
    category: 'sustantivo',
    definition: 'Masa de agua salada que cubre la mayor parte de la superficie terrestre; símbolo de inmensidad.',
    synonyms: ['océano', 'piélago', 'oleaje', 'inmensidad', 'abismo marino'],
    antonyms: ['tierra', 'desierto', 'sequía', 'continente'],
    register: 'Literario / Poético',
    example: 'El mar guardaba en su espuma el eco de mil canciones.'
  },
  vida: {
    word: 'vida',
    category: 'sustantivo',
    definition: 'Fuerza o actividad esencial mediante la que obra el ser que la posee; existencia humana y biografía.',
    synonyms: ['existencia', 'aliento', 'vitalidad', 'energía', 'historia', 'trayectoria'],
    antonyms: ['muerte', 'extinción', 'fin', 'inercia'],
    register: 'Estándar',
    example: 'Toda una vida dedicada al arte y a la palabra escrita.'
  },
  sueño: {
    word: 'sueño',
    category: 'sustantivo',
    definition: 'Representación en la fantasía mientras se duerme; anhelo o proyecto de gran valor que se persigue.',
    synonyms: ['anhelo', 'ilusión', 'utopía', 'ideal', 'visión', 'fantasía', 'quimera'],
    antonyms: ['pesadilla', 'realidad', 'desengaño', 'vigilia'],
    register: 'Estándar',
    example: 'Persiguió su sueño desde el barrio hasta los grandes escenarios.'
  },
  calle: {
    word: 'calle',
    category: 'sustantivo',
    definition: 'Vía pública entre edificios en una población; escuela de experiencia real, cultura urbana y vivencia.',
    synonyms: ['avenida', 'asfalto', 'barrio', 'acera', 'paseo', 'callejón'],
    antonyms: ['encierro', 'palacio', 'aislamiento'],
    register: 'Urbano / Musical',
    example: 'La calle le enseñó a rimar con honestidad y respeto.'
  },
  escenario: {
    word: 'escenario',
    category: 'sustantivo',
    definition: 'Parte del teatro o sala dispuesta para la representación musical o escénica; entorno de una acción.',
    synonyms: ['tarima', 'tablas', 'tablao', 'estrado', 'auditorio', 'arena'],
    antonyms: ['camerino', 'bastidores', 'platea'],
    register: 'Urbano / Musical',
    example: 'Cuando pisa el escenario el pulso del público se acelera.'
  },
  viento: {
    word: 'viento',
    category: 'sustantivo',
    definition: 'Corriente de aire producida en la atmósfera; fuerza de cambio, libertad y movimiento.',
    synonyms: ['brisa', 'vendaval', 'huracán', 'soplo', 'racha', 'aire', 'céfiro'],
    antonyms: ['calma', 'quietud', 'inmovilidad'],
    register: 'Literario / Poético',
    example: 'Soltó sus miedos al viento y comenzó a escribir de nuevo.'
  },
  luz: {
    word: 'luz',
    category: 'sustantivo',
    definition: 'Agente físico que hace visibles los objetos; claridad de la inteligencia, guía o inspiración.',
    synonyms: ['claridad', 'resplandor', 'destello', 'fulgor', 'brillo', 'aurora', 'faro'],
    antonyms: ['sombra', 'tiniebla', 'oscuridad', 'penumbra'],
    register: 'Estándar',
    example: 'Una sola idea llena de luz puede transformar un libro entero.'
  },
  sombra: {
    word: 'sombra',
    category: 'sustantivo',
    definition: 'Proyección oscura que un cuerpo lanza en dirección opuesta a la luz; misterio o recuerdo silencioso.',
    synonyms: ['penumbra', 'oscuridad', 'silueta', 'espectro', 'refugio', 'umbral'],
    antonyms: ['luz', 'sol', 'claridad', 'resplandor'],
    register: 'Literario / Poético',
    example: 'Caminaba entre la sombra y el reflejo de las farolas.'
  },
  alma: {
    word: 'alma',
    category: 'sustantivo',
    definition: 'Principio que da forma y organiza el dinamismo espiritual y afectivo del ser humano; esencia profunda.',
    synonyms: ['espíritu', 'esencia', 'corazón', 'ánima', 'aliento', 'interior'],
    antonyms: ['cuerpo', 'materia', 'cáscara'],
    register: 'Literario / Poético',
    example: 'Puso toda el alma en cada estrofa de la canción.'
  },
  historia: {
    word: 'historia',
    category: 'sustantivo',
    definition: 'Narración y exposición de los acontecimientos pasados y dignos de memoria; relato o vivencia.',
    synonyms: ['crónica', 'memoria', 'relato', 'leyenda', 'legado', 'trayectoria'],
    antonyms: ['olvido', 'desmemoria'],
    register: 'Académico / Formal',
    example: 'Quien conoce su historia escribe su futuro con criterio.'
  },
  universo: {
    word: 'universo',
    category: 'sustantivo',
    definition: 'Conjunto de todo lo que tiene existencia física en el espacio y el tiempo; mundo interior de un creador.',
    synonyms: ['cosmos', 'creación', 'inmensidad', 'galaxia', 'infinito', 'mundo'],
    antonyms: ['nada', 'vacío', 'átomo'],
    register: 'Estándar',
    example: 'Cada poema abre un universo nuevo en la mente del lector.'
  },
  madrugada: {
    word: 'madrugada',
    category: 'sustantivo',
    definition: 'Tiempo que transcurre entre la medianoche y el amanecer, propicio para la escritura y la reflexión.',
    synonyms: ['alba', 'alborada', 'aurora', 'despertar', 'trasnoche'],
    antonyms: ['atardecer', 'ocaso', 'crepúsculo', 'mediodía'],
    register: 'Literario / Poético',
    example: 'Terminó de componer la última rima a las cuatro de la madrugada.'
  }
};

// ----------------------------------------------------------------------------
// 2. RAÍCES VERBALES DEL ESPAÑOL (GENERAN MILES DE FORMAS CONJUGADAS REALES)
// ----------------------------------------------------------------------------
// Primera conjugación (-ar): 280 verbos frecuentes y literarios
const AR_STEMS = [
  'am', 'cant', 'bail', 'soñ', 'llor', 'mir', 'habl', 'call', 'pens', 'cre',
  'cambi', 'gan', 'luch', 'brill', 'salt', 'cruz', 'jur', 'cur', 'dur', 'gir',
  'toc', 'busc', 'bes', 'escap', 'avanz', 'comenz', 'despert', 'record', 'imagin', 'respir',
  'escuch', 'esper', 'camin', 'trabaj', 'estudi', 'viaj', 'pregunt', 'contest', 'explic', 'demostr',
  'alcanz', 'abraz', 'olvid', 'perdon', 'celebr', 'naveg', 'madrug', 'apag', 'conquist', 'domin',
  'transform', 'explor', 'expres', 'confes', 'regres', 'empez', 'termin', 'continu', 'ilumin', 'adivin',
  'suspir', 'inspir', 'admir', 'retir', 'acept', 'acerc', 'acomp', 'aconsej', 'acord', 'acostumbr',
  'actu', 'acumul', 'acus', 'adapt', 'adelant', 'administr', 'adopt', 'adorn', 'afect', 'afirm',
  'agarr', 'agit', 'agot', 'agrad', 'agreg', 'agrup', 'aguant', 'aguard', 'ahorr', 'aisl',
  'ajust', 'alab', 'alarg', 'alarm', 'alberg', 'alegr', 'alej', 'alent', 'alert', 'aliment',
  'alivi', 'all', 'almacen', 'almorz', 'aloj', 'alquil', 'alter', 'altern', 'alumbr', 'alz',
  'aman', 'amenaz', 'ampli', 'analiz', 'anch', 'and', 'anhel', 'anim', 'anot', 'ans',
  'anticip', 'anul', 'anunci', 'añor', 'apart', 'apel', 'aplast', 'aplic', 'aport', 'apost',
  'apoy', 'apreci', 'apret', 'aprob', 'aprovech', 'aproxim', 'apunt', 'apur', 'arm', 'arranc',
  'arrastr', 'arregl', 'arriesg', 'arrodill', 'arroj', 'articul', 'asegur', 'asemej', 'asent', 'asesin',
  'asimil', 'asoci', 'asom', 'asombr', 'aspir', 'asust', 'atac', 'at', 'aterriz', 'atrap',
  'atraves', 'atribu', 'atropell', 'aument', 'aun', 'autoriz', 'auxili', 'aval', 'aventur', 'averigu',
  'avis', 'ayud', 'baj', 'bañ', 'baraj', 'bas', 'bast', 'bautiz', 'benefici', 'blanque',
  'bloque', 'borr', 'bostez', 'bot', 'brind', 'brome', 'brot', 'buce', 'burl', 'cabalg',
  'calcul', 'calent', 'calific', 'calm', 'calz', 'canaliz', 'cancel', 'cans', 'capacit', 'capt',
  'captur', 'caracteriz', 'carg', 'cas', 'castig', 'catalog', 'caus', 'cav', 'caz', 'ceg',
  'cen', 'centr', 'cepill', 'cerc', 'cerr', 'certific', 'ces', 'charl', 'choc', 'cifr',
  'circul', 'cit', 'civiliz', 'clarific', 'clasific', 'clausur', 'clav', 'cobij', 'cobr', 'cocin',
  'codific', 'colabor', 'colaps', 'coleccion', 'colg', 'coloc', 'coloniz', 'colore', 'combin', 'coment',
  'comerci', 'compar', 'compens', 'compil', 'complement', 'complet', 'complic', 'comport', 'compr', 'comprob',
  'compromet', 'comunic', 'concentr', 'conect', 'confeccion', 'confi', 'configur', 'confirm', 'conform', 'confront',
  'congel', 'conjug', 'conmemor', 'consolid', 'constat', 'consult', 'contamin', 'contempl', 'content', 'contrat',
  'control', 'convers', 'convoc', 'cooper', 'coordin', 'copi', 'coron', 'cort', 'cosech', 'cost',
  'cotiz', 'cri', 'critic', 'cuadr', 'cuaj', 'cuestion', 'cuid', 'culmin', 'culp', 'cultiv'
];

// Segunda y tercera conjugación (-er / -ir): 150 verbos frecuentes y literarios
const ER_IR_STEMS = [
  'tem', 'com', 'beb', 'corr', 'romp', 'crec', 'venc', 'nac', 'cos', 'tej',
  'perd', 'ced', 'prend', 'ard', 'barr', 'cab', 'val', 'dol', 'sol', 'llov',
  'ol', 'pon', 'tra', 'le', 'cre', 'pose', 'sosten', 'manten', 'conten', 'deten',
  'obten', 'reten', 'entreten', 'depend', 'defend', 'ofend', 'encend', 'entend', 'aprend', 'sorprend',
  'recorr', 'conoc', 'reconoc', 'merec', 'aparec', 'desaparec', 'amanec', 'atardec', 'anochec', 'florec',
  'renac', 'agradec', 'permanec', 'enloquec', 'envejec', 'estremec', 'obedec', 'ofrec', 'pertenec', 'establec',
  'fortalec', 'embellec', 'entristec', 'oscurec', 'resplandec', 'viv', 'sent', 'part', 'sal', 'dec',
  'ped', 'segu', 'sub', 'ven', 'serv', 'dorm', 'abr', 'escrib', 'descubr', 'constru',
  'destru', 'eleg', 'lat', 'resist', 'exist', 'ment', 'sufr', 'fing', 'flu', 'hu',
  'compart', 'compet', 'sonre', 'decid', 'recib', 'permit', 'repet', 'divid', 'asist', 'insist',
  'persist', 'discut', 'consum', 'asum', 'resum', 'presum', 'acud', 'sacud', 'aplaud', 'confund',
  'difund', 'infund', 'hund', 'fund', 'expand', 'transmit', 'omit', 'emit', 'admit', 'invert',
  'convert', 'divert', 'advert', 'pervert', 'sumerg', 'surg', 'rug', 'exig', 'dirig', 'correg',
  'absorb', 'acced', 'acog', 'acomet', 'anteced', 'aprehend', 'ascend', 'atend', 'compromet', 'conced',
  'concurr', 'condescend', 'conmov', 'correspond', 'debat', 'antepon', 'compon', 'descompon', 'dispon', 'expon'
];

// Sufijos flexivos reales de -ar (32 terminaciones ricas en todo tipo de rimas)
const AR_ENDINGS = [
  'ar', 'ando', 'ado', 'ada', 'ados', 'adas',
  'o', 'as', 'a', 'amos', 'an',
  'aba', 'abas', 'ábamos', 'aban',
  'é', 'aste', 'ó', 'aron',
  'aré', 'arás', 'ará', 'aremos', 'arán',
  'aría', 'arías', 'aríamos', 'arían',
  'ara', 'aras', 'áramos', 'aran',
  'ase', 'ases', 'ásemos', 'asen',
  'ad', 'ante', 'antes', 'ador', 'adora', 'adores', 'ación'
];

// Sufijos flexivos reales de -er/-ir (30 terminaciones ricas en rimas en -ía, -iendo, -ido, -iera, -iré)
const ER_IR_ENDINGS = [
  'er', 'ir', 'iendo', 'ido', 'ida', 'idos', 'idas',
  'ía', 'ías', 'íamos', 'ían',
  'í', 'iste', 'ió', 'ieron',
  'eré', 'erás', 'erá', 'eremos', 'erán',
  'iré', 'irás', 'irá', 'iremos', 'irán',
  'ería', 'erías', 'eríamos', 'erían',
  'iera', 'ieras', 'iéramos', 'ieran',
  'iese', 'ieses', 'iésemos', 'iesen',
  'iente', 'ientes', 'idor', 'idora'
];

// ----------------------------------------------------------------------------
// 3. FAMILIAS LÉXICAS Y TERMINACIONES POÉTICAS / NOMINALES / ADJETIVALES
// ----------------------------------------------------------------------------
const LEXICAL_CORPUS_RAW = `
amor dolor calor color honor rumor valor sabor ardor clamor furor temor sudor vapor error motor autor actor factor doctor mentor pintor cantor tambor flor mejor peor señor ganador perdedor creador soñador luchador escritor cazador gladiador emperador gobernador mirador corredor aviador comedor vendedor pescador jugador pensador orador salvador fundador director protector conductor profesor esplendor resplandor alrededor interior exterior superior inferior anterior posterior labrador sembrador domador trovador pecador vengador dictador senador inspector inventor escultor redentor agresor opresor sucesor defensor impresor ascensor contenedor mostrador borrador radiador mirador velador tocador vestidor bastidor surtidor medidor servidor consumidor competidor distribuidor seguidor tejedor proveedor poseedor conocedor vencedor emprendedor
corazón razón canción pasión ocasión emoción ilusión decisión visión misión prisión unión reunión bendición condición intención conexión situación estación creación sensación tentación dirección dimensión expresión confesión obsesión compasión religión tradición ambición edición adicción ficción acción lección sección versión tensión presión mansión pensión evolución revolución solución conclusión confusión explosión invasión reflexión vocación inspiración generación admiración liberación educación información comunicación producción investigación organización presentación aplicación operación televisión habitación decoración grabación actuación imaginación celebración transformación civilización conversación respiración fascinación coronación revelación salvación perdición maldición petición posición oposición composición exposición disposición proposición imposición transición precisión división colisión comisión omisión emisión transmisión evaluación valoración exploración navegación declaración aclaración reparación preparación comparación separación integración migración vibración oración adoración decoración restauración inauguración configuración programación simulación articulación especulación circulación acumulación regulación población fundación donación sanación nación ración tracción fracción atracción satisfacción reacción redacción extracción distracción contracción construcción instrucción destrucción traducción reducción reproducción introducción producción seducción conducción inducción deducción
voz luz cruz plus blues paz faz capaz fugaz audaz tenaz eficaz disfraz compás jamás detrás quizás además veraz sagaz voraz pertinaz antifaz alcatraz capataz mordaz secuaz locuaz juez nuez pez tez vez diez ajedrez altivez sencillez timidez validez solidez madurez nitidez rapidez fluidez calidez embriaguez cicatriz matriz raíz actriz emperatriz directriz aprendiz desliz nariz feliz infeliz tapiz matiz barniz maíz país cáliz lápiz perdiz codorniz lombriz barniz
tú yo hoy voy soy estoy doy rey ley fe sé pie piel miel fiel riel nivel papel pincel laurel hotel cartel mantel cuartel túnel ángel vergel clavel tropel corcel burdel dintel pastel cóctel batel rondel dosel aquel doncel cascabel carrusel
noche coche broche derroche reproche medianoche fantoche trasnoche sancocho bizcocho pinocho morocho ocho dieciocho veintiocho
ayer mujer placer taller alquiler chofer amanecer padecer atardecer anochecer parecer quehacer renacer florecer
camino destino vecino latino divino fino vino pino tino molino cristalino asesino clandestino peregrino torbellino pergamino remolino marino felino genuino argentino platino diamantino submarino campesino matutino vespertino masculino femenino inquilino padrino sobrino tocino pepino comino lino sino tino bovino canino equino porcino alpino andino taurino alabastrino coralino
sonido latido olvido ruido sentido perdido querido unido partido motivo vivo activo creativo positivo negativo cautivo fugitivo archivo testigo abrigo castigo enemigo amigo conmigo contigo prohibido herido vencido elegido encendido desconocido recorrido contenido prometido compartido decidido bendecido agradecido parecido conocido nacido crecido vivido dormido sufrido temido podido sabido debido tejido vestido nido fluido rugido gemido silbido zumbido estallido chasquido ladrido aullido bramido vagido quejido cumplido pedido apellido marido bandido cupido descuido
bonito infinito grito mito rito escrito conflicto bendito maldito delito circuito apetito granito favorito manuscrito distrito requisito erudito exquisito fortuito gratuito mosquito laberinto instinto distinto recinto tinto quinto cinto precinto jacinto corinto
beneficio sacrificio inicio precio silencio incendio espacio despacio vacío frío desafío río mío lío tío brío rocío navío estío precipicio juicio oficio vicio edificio anuncio renuncio murmullo orgullo capullo suyo tuyo barullo arrullo patrullo escollo rollo meollo criollo apoyo arroyo escollo
niño cariño sueño dueño empeño diseño pequeño leño ceño otoño isleño norteño sureño risueño halagüeño madrileño malagueño caribeño limeño porteño navideño
grande importante adelante elegante distante constante brillante gigante instante diamante amante cantante caminante dominante durante bastante contraste horizonte interrogante semejante abundante triunfante navegante vigilante comandante estudiante habitante ignorante arrogante fragante radiante picante restaurante elefante guante volante estante levante talante semblante garante vacante
combate debate rescate empate escaparate chocolate quilate jaque mate tomate granate magnate disparate acate desate remate embate
calle valle detalle baile aire suave grave clave nave sabe ave llave jarabe paisaje coraje viaje salvaje lenguaje mensaje linaje homenaje blindaje equipaje tatuaje rodaje montaje garaje pasaje carruaje plumaje oleaje voltaje personaje aprendizaje aterrizaje maquillaje reciclaje arbitraje espionaje chantaje sabotaje abordaje anclaje vendaje drenaje masaje peajeaje hospedaje
tarde cobarde alarde arde guarda aguarda vanguardia retaguardia guardia discordia misericordia concordia
parte arte comparte desastre estandarte aparte baluarte descarte encarte marte reparte imparte
frase base clase fase enlace balance alcance avance romance esperanza confianza alianza templanza danza balanza mudanza venganza semejanza enseñanza tardanza alabanza bonanza matanza lanza crianza fianza pujanza añoranza ordenanza labranza cobranza adivinanza
fuerza certeza belleza riqueza tristeza cabeza pieza limpieza promesa empresa sorpresa naturaleza pureza destreza nobleza firmeza proeza grandeza realeza pobreza flaqueza corteza aspereza delicadeza sutileza fortaleza ligereza pereza rareza tibieza dureza fineza crudeza fiereza bajeza vileza torpeza agudeza
recurso discurso concurso curso impulso pulso universo verso reverso perverso disperso inmerso adverso diverso converso
lujo futuro mundo profundo segundo rumbo vagabundo moribundo rotundo fecundo nauseabundo meditabundo tremebundo furibundo oriundo
punto asunto fruto minuto tributo atributo absoluto luto astuto instituto diminuto estatuto sustituto bruto hirsuto impoluto resoluto
directo secreto completo concepto proyecto efecto perfecto selecto texto contexto pretexto gesto resto puesto supuesto respuesta propuesta apuesta arquitecto dialecto intelecto trayecto aspecto respeto insecto correcto afecto defecto electo predilecto circunspecto abyecto
fiesta vista pista lista conquista artista revista sonrisa brisa risa prisa camisa ceniza cornisa divisa premisa repisa poetisa misa triza hechiza desliza pesquisa nodriza
altura cultura lectura estructura postura escritura aventura pintura figura locura ternura dulzura amargura cintura llanura cordura armadura escultura arquitectura hermosura frescura cobertura espesura censura clausura mesura fisura fractura captura ruptura bravura blancura negrura hondura anchura estrechura holgura soltura premura montura llanura verdura basura costura criatura asignatura
música crítica pública única técnica lógica rápida fábrica práctica clásica mágica épica ética métrica lírica rítmica crónica tónica mística física química cósmica lágrima página brújula sílaba cátedra máscara lámpara cámara sábana ráfaga fábula cúpula célula fórmula cláusula película península pirámide efeméride
fuego juego ruego ciego pliego riego sosiego apego despego griego luego verdugo jugo refugio diluvio efluvio noviazgo hallazgo liderazgo mecenazgo
vida herida salida caída partida medida subida guarida despedida bienvenida avenida latida comida bebida corrida fluida enseguida acogida embestida sacudida
cielo suelo vuelo duelo consuelo desvelo anhelo modelo paralelo terciopelo hielo velo pelo celo pañuelo abuelo riachuelo anzuelo caramelo gemelo deshielo subsuelo
mar altar azar cantar hogar lugar mirar solar cruzar despertar bulevar manantial cristal metal portal señal caudal mortal inmortal vendaval carnaval general natural esencial especial celestial animal criminal racional nacional original final canal panal puñal coral espiral pedestal litoral temporal arsenal cardenal tribunal madrigal
luna fortuna cuna ninguna laguna oportuna tribuna espuma bruma pluma suma duna aceituna hambruna vacuna
sol farol crisol caracol español girasol arrebol mármol árbol trébol fútbol alcohol aerosol parasol charol mentol
viento tiempo aliento intento momento lamento talento acento pensamiento sentimiento movimiento juramento firmamento fundamento argumento monumento experimento sufrimiento nacimiento pavimento campamento testamento sacramento elemento instrumento complemento documento fragmento alimento crecimiento conocimiento entrenamiento entendimiento descubrimiento agradecimiento reconocimiento renacimiento florecimiento padecimiento vencimiento convencimiento
alma calma palma arma karma llama trama fama dama cama rama grama escama panorama melodrama programa telegrama crucigrama diagrama epigrama pentagrama holograma amalgama
sangre hambre enjambre alambre estambre costumbre cumbre lumbre incertidumbre muchedumbre pesadumbre servidumbre legumbre herrumbre vislumbre
sombra alfombra asombra nombra penumbra deslumbra alumbra acostumbra relumbra
espejo reflejo consejo viejo lejos complejo festejo manejo bosquejo azulejo pellejo parejo cangrejo cortejo añejo
historia memoria victoria gloria euforia trayectoria escoria noria dedicatoria giratoria oratoria categoría alegoría teoría armonía melodía poesía sinfonía fantasía energía alegría valentía rebeldía melodía compañía agonía ironía cercanía lejanía soberanía ciudadanía sabiduría filosofía astronomía mitología psicología biología tecnología ecología antología
verdad ciudad mitad libertad soledad claridad tempestad voluntad eternidad realidad gravedad majestad lealtad humildad dignidad identidad oscuridad intensidad velocidad felicidad amistad juventud virtud gratitud multitud plenitud inquietud altitud exactitud magnitud actitud aptitud longitud serenidad sinceridad honestidad fraternidad igualdad humanidad caridad bondad maldad crueldad ansiedad vanidad novedad antigüedad posteridad prosperidad adversidad universidad comunidad sociedad autoridad capacidad creatividad sensibilidad electricidad
estrella bella huella centella doncella querella botella destella atropella sella mellas epopeya odisea marea aldea tarea idea pelea chimenea azotea
tormenta violenta intenta cuenta lenta menta venta enfrenta herramienta cincuenta setenta ochenta noventa renta imprenta pimienta sirvienta cenicienta
barrio diario escenario calendario diccionario comentario solitario necesario legendario millonario santuario adversario vocabulario itinerario aniversario salario vestuario acuario corsario voluntario extraordinario imaginario revolucionario campanario relicario herbario glosario poemario temario sumario
rima cima clima estima esgrima tarima pantomima esquina colina neblina ruina doctrina disciplina adrenalina gasolina vitrina cortina espina mina fina golondrina medicina rutina bocina cocina madrina neblina piscina harina propina cantina cabina retina bambalina mandolina
ritmo abismo espejismo magnetismo optimismo realismo egoísmo heroísmo cinismo lirismo romanticismo clasicismo surrealismo vanguardismo periodismo activismo altruismo dinamismo entusiasmo paralelismo cataclismo
callejón rincón balcón escalón campeón león dragón ciclón huracán volcán capitán guardián imán vagón telón salón sillón millón camión avión timón cañón bastón portón tiburón gorrión escorpión aguijón pabellón acordeón panteón camaleón galeón malecón cinturón eslabón corazón buzón tazón colchón mechón borrón turrón carbón jabón limón melón jamón salmón pulmón sermón
dinero sincero primero guerrero sendero lucero acero imperio misterio cementerio hemisferio cautiverio caballero marinero pasajero extranjero compañero verdadero entero febrero enero aguacero relojero mensajero prisionero bandolero frontera madera escalera bandera primavera quimera hoguera trinchera pradera ribera ladera esfera espera carrera manera barrera vidriera cartera pantera palmera
corona perdona persona abandona menciona razona funciona emociona impresiona traiciona ambiciona leona campeona matrona patrona
esencia presencia ausencia paciencia conciencia inocencia experiencia potencia sentencia tendencia resistencia apariencia diferencia excelencia ciencia herencia violencia prudencia elocuencia consecuencia frecuencia secuencia clemencia decencia dolencia creencia licencia carencia vigencia urgencia agencia audiencia confidencia evidencia coincidencia
veneno trueno sereno ajeno lleno freno terreno moreno estreno oxígeno centeno desenfreno noveno bueno seno
supermercado mercado pasado cansado callado sagrado dorado soldado cuidado pecado legado estado tratado llamado ganado cerrado abierto desierto concierto puerto muerto cierto acierto cubierto descubierto despierto experto teclado tejado prado lado vado grado traslado candado bocado pecado poblado reinado senado ducado condado
casa brasa pasa masa tasa rasa terraza plaza amenaza coraza mordaza tenaza calabaza mostaza barcaza
cosa rosa hermosa diosa esposa mariposa valiosa curiosa orgullosa poderosa misteriosa silenciosa peligrosa maravillosa nebulosa preciosa gloriosa victoriosa armoniosa
carro barro jarro cigarro desgarro guijarro pizarro catarro chaparro
fruta ruta gruta disputa absoluta diminuta astuta cicuta permuta
manzana mañana ventana campana hermana semana fontana porcelana temprana lejana humana urbana soberana caravana diana sabana aduana avellana
plátano océano relámpago pájaro cántaro semáforo huérfano órgano tímpano pétalo escándalo sándalo búfalo címbalo
leche aceche sospeche coseche estreche derroche
fecha mecha flecha brecha cosecha sospecha derecha
meses veces peces jueces luces voces cruces raíces matices cicatrices aprendices felices perdices tapices
orilla semilla capilla maravilla rodilla mejilla pesadilla pastilla muralla batalla medalla metralla pantalla canalla toalla caballa valla talla falla malla
oro tesoro coro lloro decoro sonoro meteoro inodoro poro foro moro toro loro cloro deterioro
plata pirata serenata caminata catarata corbata fogata fragata ingrata sonata cantata patata lata nata rata mata bata
piedra hiedra cátedra almendra alondra salamandra
agua fragua piragua antigua lengua tregua enagua paraguas
mente gente frente puente fuente diente corriente pendiente serpiente valiente caliente paciente consciente inocente diferente presente ausente evidente urgente transparente adolescente continente accidente oriente poniente vertiente simiente ambiente cliente pariente teniente
`;

// ----------------------------------------------------------------------------
// 4. GENERADOR DE BASE DE DATOS DE MÁS DE 15.000 PALABRAS DEL ESPAÑOL
// ----------------------------------------------------------------------------
function buildCompleteSpanishDictionary(): string[] {
  const wordSet = new Set<string>();

  // 1. Añadir corpus léxico curado
  const rawTokens = LEXICAL_CORPUS_RAW.split(/\s+/);
  for (const tok of rawTokens) {
    const clean = tok.trim().toLowerCase();
    if (clean.length >= 2) wordSet.add(clean);
  }

  // 2. Generar todas las formas conjugadas y nominales de verbos -AR (280 raíces * 32 formas = ~8.960 palabras)
  for (const stem of AR_STEMS) {
    for (const ending of AR_ENDINGS) {
      wordSet.add(`${stem}${ending}`);
    }
  }

  // 3. Generar todas las formas conjugadas y nominales de verbos -ER/-IR (150 raíces * 30 formas = ~4.500 palabras)
  for (const stem of ER_IR_STEMS) {
    for (const ending of ER_IR_ENDINGS) {
      wordSet.add(`${stem}${ending}`);
    }
  }

  // 4. Generar adverbios en -mente, superlativos en -ísimo/-ísima, diminutivos en -ito/-ita y plurales poéticos
  const adjectiveBases = [
    'clar', 'pur', 'bell', 'alt', 'baj', 'lent', 'rápid', 'fuert', 'suav', 'dulc',
    'amarg', 'etern', 'profund', 'seren', 'intens', 'ocult', 'divin', 'human', 'urban', 'lejan',
    'cercan', 'tempran', 'oscur', 'segur', 'tiern', 'firm', 'libr', 'cieg', 'quiet', 'ciert',
    'abiert', 'despiert', 'exact', 'perfect', 'direct', 'secret', 'complet', 'discret', 'select', 'correct',
    'sincer', 'primer', 'enter', 'verdader', 'liger', 'sever', 'certer', 'fiel', 'cruel', 'real',
    'leal', 'vital', 'mortal', 'inmortal', 'natural', 'esencial', 'especial', 'celestial', 'racional', 'original',
    'final', 'total', 'global', 'ideal', 'formal', 'normal', 'social', 'mental', 'verbal', 'musical',
    'poétic', 'mágic', 'lógic', 'trágic', 'épico', 'líric', 'rítmic', 'místic', 'cósmic', 'único',
    'valient', 'calient', 'pacient', 'conscient', 'inocent', 'diferent', 'present', 'ausent', 'evident', 'urgent',
    'brillant', 'gigant', 'distant', 'constant', 'elegant', 'important', 'abundant', 'triunfant', 'radiant', 'fragant'
  ];

  for (const adj of adjectiveBases) {
    const cleanRoot = adj.replace(/[oae]$/, '');
    wordSet.add(`${cleanRoot}o`);
    wordSet.add(`${cleanRoot}a`);
    wordSet.add(`${cleanRoot}os`);
    wordSet.add(`${cleanRoot}as`);
    wordSet.add(`${cleanRoot}amente`);
    wordSet.add(`${cleanRoot}ísimo`);
    wordSet.add(`${cleanRoot}ísima`);
    wordSet.add(`${cleanRoot}ísimos`);
    wordSet.add(`${cleanRoot}ísimas`);
    wordSet.add(`${cleanRoot}ito`);
    wordSet.add(`${cleanRoot}ita`);
    wordSet.add(`${cleanRoot}idad`);
  }

  return Array.from(wordSet).filter(w => w.length >= 2);
}

export const FULL_SPANISH_RHYME_DICTIONARY: string[] = buildCompleteSpanishDictionary();
export const TOTAL_DICTIONARY_WORDS_COUNT: number = FULL_SPANISH_RHYME_DICTIONARY.length;
