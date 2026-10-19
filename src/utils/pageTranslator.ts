// ============================================================================
// MOTOR DE TRADUCCIÓN GLOBAL DE TODA LA PÁGINA (UI + 10 SUITES + EJEMPLOS INTERNOS + 105+ IDIOMAS)
// Traduce automáticamente cualquier texto de la interfaz de 930Text,
// atributos placeholder, title y aria-label, además de traducir en vivo los
// textos de ejemplo ("Ej."), borradores y plantillas internas dentro de las cajas
// de texto para que cualquier usuario del mundo entienda absolutamente todo.
// ============================================================================

import { getLanguageByCode } from '../data/languagesData';

const CACHE_STORAGE_KEY = '930text-page-i18n-cache-v2';

// Variable de bloqueo para evitar bucles infinitos con MutationObserver mientras escribimos en el DOM
let isMutatingDom = false;
export function isPageTranslatorBusy(): boolean {
  return isMutatingDom;
}

// Paquetes de ejemplos localizados instantáneos para los idiomas más usados,
// y traducción automática por IA/GTX para cualquiera de los otros +100 idiomas del mundo.
export interface LocalizedSuiteSamples {
  heroDemo: string;
  fontSample: string;
  fontBio: string;
  fontPromo: string;
  transSample: string;
  sumSample: string;
  impSample: string;
  cleanSample: string;
  anSample: string;
  convSample: string;
  rhymeWord: string;
  schemeSample: string;
  autoSample: string;
  diffSampleA: string;
  diffSampleB: string;
  citeTitle: string;
  tplTopic: string;
  tplRecipient: string;
  tplCta: string;
}

export const BASE_SPANISH_SAMPLES: LocalizedSuiteSamples = {
  heroDemo: 'Escribe mejor, ahorra tiempo y destaca en cualquier lugar',
  fontSample: 'Transforma tus textos, títulos y perfiles profesionales ✨',
  fontBio: 'Especialista en Marketing Digital, Diseño & Estrategia 🚀',
  fontPromo: 'Oferta especial disponible solo por tiempo limitado ✨',
  transSample:
    'Hola equipo, os comparto el resumen del proyecto de esta semana para revisar los próximos objetivos antes del viernes.',
  sumSample:
    'La fotosíntesis es el proceso metabólico mediante el cual las plantas verdes, las algas y algunas bacterias convierten la energía luminosa en energía química. Durante la fase luminosa, la clorofila absorbe la luz solar en los tilacoides para dividir moléculas de agua, liberando oxígeno como subproducto y generando ATP y NADPH. Posteriormente, en el ciclo de Calvin o fase oscura dentro del estroma, el dióxido de carbono atmosférico se fija utilizando esa energía química para sintetizar glucosa, fundamental para el crecimiento vegetal y el equilibrio de la biosfera terrestre.',
  impSample:
    'Hola equipo, o sea les escribo el día de hoy para comentarles que básicamente vamos a llevar a cabo la revisión del proyecto. Pero sin embargo necesitamos subir arriba los documentos finales en base a lo que hablamos ayer, para que todo quede totalmente libre de errores antes de enviarlo al cliente.',
  cleanSample:
    '[00:12]   Informe   trimestral de   ventas <b>2026</b>\n[00:18] Visita https://ejemplo.com para más detalles.\nInforme trimestral de ventas 2026\n   Contacto: soporte@empresa.com   ',
  anSample:
    'El posicionamiento web moderno requiere contenido útil, estructura clara y una velocidad de carga óptima. Cuando un artículo responde directamente a la intención de búsqueda del usuario, aumenta el tiempo de permanencia y mejora la conversión orgánica.',
  convSample: 'Guía definitiva de productividad, diseño web y marketing digital 2026',
  rhymeWord: 'corazón',
  schemeSample:
    'Subo al escenario con la fuerza del motor\nBuscando una salida dentro de mi corazón\nTransformo cada herida en una nueva canción\nDejando en cada barra todo mi valor',
  autoSample:
    'La inteligencia artificial generativa y la automatización de flujos de trabajo están transformando la productividad de estudiantes, empresas y creadores digitales en un 42% anual. Sin embargo, el 68% de los equipos pierde más de 4 horas semanales limpiando documentos PDF mal formateados, redactando correos repetitivos y preparando informes ejecutivos.',
  diffSampleA:
    'Propuesta inicial: El proyecto se entregará en el plazo de 30 días naturales con soporte básico por correo electrónico y una revisión mensual.',
  diffSampleB:
    'Propuesta definitiva: El proyecto completo se entregará en el plazo de 15 días laborables con soporte prioritario 24/7, auditoría SEO y dos revisiones semanales.',
  citeTitle: 'Arquitectura de herramientas lingüísticas y productividad en el navegador',
  tplTopic: 'Automatización de contenidos y auditoría SEO',
  tplRecipient: 'Dirección de Marketing',
  tplCta: '¿Tienes 10 minutos este jueves a las 11:00h para verlo en una llamada rápida?'
};

const INSTANT_LOCALIZED_SAMPLES: Record<string, Partial<LocalizedSuiteSamples>> = {
  en: {
    heroDemo: 'Write better, save time and stand out everywhere',
    fontSample: 'Transform your texts, headlines and professional profiles ✨',
    fontBio: 'Digital Marketing, Design & Growth Strategy Specialist 🚀',
    fontPromo: 'Special offer available for a limited time only ✨',
    transSample:
      'Hello team, here is this week’s project summary so we can review the next milestones before Friday.',
    sumSample:
      'Photosynthesis is the metabolic process by which green plants, algae, and certain bacteria convert light energy into chemical energy. During the light-dependent reactions, chlorophyll absorbs sunlight in the thylakoids to split water molecules, releasing oxygen as a byproduct and generating ATP and NADPH. Subsequently, in the Calvin cycle within the stroma, atmospheric carbon dioxide is fixed using that chemical energy to synthesize glucose, which is essential for plant growth and the balance of Earth’s biosphere.',
    impSample:
      'Hello team, I am writing today to let you know that we are going to carry out the project review. However, we need to upload the final documents based on what we discussed yesterday so that everything is completely error-free before sending it to the client.',
    cleanSample:
      '[00:12]   Quarterly   sales   report <b>2026</b>\n[00:18] Visit https://example.com for more details.\nQuarterly sales report 2026\n   Contact: support@company.com   ',
    anSample:
      'Modern search engine optimization requires helpful content, clear structure, and fast page speed. When an article directly answers user search intent, dwell time increases and organic conversion improves.',
    convSample: 'Ultimate Guide to Productivity, Web Design and Digital Marketing 2026',
    rhymeWord: 'fire',
    schemeSample:
      'Walking through the shadows with a burning fire\nRising from the ashes taking everything higher\nBuilding up the vision of a golden empire\nTurning every moment into pure desire',
    autoSample:
      'Generative artificial intelligence and workflow automation are transforming the productivity of students, businesses, and digital creators by 42% annually. However, 68% of teams lose more than 4 hours every week cleaning poorly formatted PDF documents, writing repetitive emails, and preparing executive reports.',
    diffSampleA:
      'Initial proposal: The project will be delivered within 30 calendar days with basic email support and one monthly review.',
    diffSampleB:
      'Final proposal: The complete project will be delivered within 15 business days with 24/7 priority support, SEO audit, and two weekly reviews.',
    citeTitle: 'Linguistic Tool Architecture and Browser Productivity',
    tplTopic: 'Content Automation and Technical SEO Audit',
    tplRecipient: 'Marketing Director',
    tplCta: 'Do you have 10 minutes this Thursday at 11:00 AM for a quick call?'
  },
  fr: {
    heroDemo: 'Écrivez mieux, gagnez du temps et démarquez-vous partout',
    fontSample: 'Transformez vos textes, titres et profils professionnels ✨',
    fontBio: 'Spécialiste en Marketing Digital, Design & Stratégie 🚀',
    fontPromo: 'Offre spéciale disponible pour une durée limitée ✨',
    transSample:
      'Bonjour à toute l’équipe, je partage le résumé du projet de cette semaine pour revoir nos prochains objectifs avant vendredi.',
    sumSample:
      'La photosynthèse est le processus métabolique par lequel les plantes vertes, les algues et certaines bactéries convertissent l’énergie lumineuse en énergie chimique. Pendant la phase lumineuse, la chlorophylle absorbe la lumière solaire pour diviser les molécules d’eau, libérant de l’oxygène et produisant de l’ATP. Ensuite, lors du cycle de Calvin, le dioxyde de carbone atmosphérique est fixé pour synthétiser du glucose essentiel à la biosphère.',
    impSample:
      'Bonjour à tous, je vous écris aujourd’hui pour vous informer que nous allons procéder à la révision du projet. Nous devons télécharger les documents finaux selon ce dont nous avons parlé hier afin que tout soit prêt pour le client.',
    cleanSample:
      '[00:12]   Rapport   trimestriel des   ventes <b>2026</b>\n[00:18] Visitez https://exemple.fr pour plus de détails.\nRapport trimestriel des ventes 2026\n   Contact: support@entreprise.fr   ',
    anSample:
      'Le référencement naturel moderne exige un contenu utile, une structure claire et une vitesse de chargement optimale. Lorsqu’un article répond directement à l’intention de recherche de l’utilisateur, la conversion organique progresse.',
    convSample: 'Guide ultime de la productivité, du design web et du marketing digital 2026',
    rhymeWord: 'amour',
    schemeSample:
      'Je marche dans la nuit guidé par la lumière\nCherchant la vérité au bout de ma prière\nLe rythme de mon cœur résonne dans l’univers\nTransformant chaque pas en un nouveau mystère',
    autoSample:
      'L’intelligence artificielle générative et l’automatisation transforment la productivité des étudiants, des entreprises et des créateurs numériques de 42 % par an. Cependant, 68 % des équipes perdent plus de 4 heures par semaine à nettoyer des documents PDF mal formatés et à préparer des rapports exécutifs.',
    diffSampleA:
      'Proposition initiale : Le projet sera livré dans un délai de 30 jours calendaires avec un support par e-mail de base et une révision mensuelle.',
    diffSampleB:
      'Proposition finale : Le projet complet sera livré sous 15 jours ouvrés avec un support prioritaire 24/7, un audit SEO et deux révisions hebdomadaires.',
    citeTitle: 'Architecture des outils linguistiques et productivité dans le navigateur',
    tplTopic: 'Automatisation de contenu et audit SEO',
    tplRecipient: 'Direction Marketing',
    tplCta: 'Avez-vous 10 minutes ce jeudi à 11h00 pour un appel rapide ?'
  },
  pt: {
    heroDemo: 'Escreva melhor, poupe tempo e destaque-se em qualquer lugar',
    fontSample: 'Transforme seus textos, títulos e perfis profissionais ✨',
    fontBio: 'Especialista em Marketing Digital, Design & Estratégia 🚀',
    fontPromo: 'Oferta especial disponível apenas por tempo limitado ✨',
    transSample:
      'Olá equipa, partilho o resumo do projeto desta semana para revermos os próximos objetivos antes de sexta-feira.',
    sumSample:
      'A fotossíntese é o processo metabólico pelo qual plantas verdes, algas e algumas bactérias convertem energia luminosa em energia química. Durante a fase luminosa, a clorofila absorve a luz solar para dividir moléculas de água, libertando oxigénio e gerando ATP e NADPH. Posteriormente, no ciclo de Calvin, o dióxido de carbono atmosférico é fixado para sintetizar glicose, fundamental para o equilíbrio da biosfera.',
    impSample:
      'Olá equipa, escrevo hoje para informar que vamos realizar a revisão do projeto. Precisamos enviar os documentos finais com base no que conversamos ontem para que tudo fique impecável antes de enviar ao cliente.',
    cleanSample:
      '[00:12]   Relatório   trimestral de   vendas <b>2026</b>\n[00:18] Visite https://exemplo.com para mais detalhes.\nRelatório trimestral de vendas 2026\n   Contacto: suporte@empresa.com   ',
    anSample:
      'O posicionamento web moderno requer conteúdo útil, estrutura clara e velocidade de carregamento ideal. Quando um artigo responde diretamente à intenção de busca do utilizador, melhora a conversão orgânica.',
    convSample: 'Guia definitivo de produtividade, web design e marketing digital 2026',
    rhymeWord: 'coração',
    schemeSample:
      'Subo no palco com a força da canção\nBuscando uma saída dentro do meu coração\nTransformo cada passo numa nova direção\nDeixando em cada verso toda a minha paixão',
    autoSample:
      'A inteligência artificial generativa e a automação de fluxos de trabalho estão transformando a produtividade de estudantes, empresas e criadores digitais em 42% ao ano. No entanto, 68% das equipas perdem mais de 4 horas semanais limpando documentos PDF mal formatados e preparando relatórios executivos.',
    diffSampleA:
      'Proposta inicial: O projeto será entregue no prazo de 30 dias corridos com suporte básico por e-mail e uma revisão mensal.',
    diffSampleB:
      'Proposta definitiva: O projeto completo será entregue em 15 dias úteis com suporte prioritário 24/7, auditoria SEO e duas revisões semanais.',
    citeTitle: 'Arquitetura de ferramentas linguísticas e produtividade no navegador',
    tplTopic: 'Automação de conteúdo e auditoria SEO',
    tplRecipient: 'Direção de Marketing',
    tplCta: 'Tem 10 minutos nesta quinta-feira às 11:00 para vermos numa chamada rápida?'
  },
  it: {
    heroDemo: 'Scrivi meglio, risparmia tempo e distinguiti ovunque',
    fontSample: 'Trasforma i tuoi testi, titoli e profili professionali ✨',
    fontBio: 'Specialista in Digital Marketing, Design & Strategia 🚀',
    fontPromo: 'Offerta speciale disponibile solo per un tempo limitato ✨',
    transSample:
      'Ciao team, condivido il riepilogo del progetto di questa settimana per rivedere i prossimi obiettivi prima di venerdì.',
    convSample: 'Guida definitiva alla produttività, web design e marketing digitale 2026',
    rhymeWord: 'amore',
    schemeSample:
      'Salgo sul palco con la forza del motore\nCercando una risposta dentro al mio cuore\nTrasformo ogni ferita in un nuovo colore\nMentre nella notte brilla tutto il mio valore'
  },
  de: {
    heroDemo: 'Besser schreiben, Zeit sparen und überall überzeugen',
    fontSample: 'Verwandeln Sie Ihre Texte, Titel und Berufsprofile ✨',
    fontBio: 'Spezialist für Digitales Marketing, Design & Strategie 🚀',
    fontPromo: 'Sonderangebot nur für kurze Zeit verfügbar ✨',
    transSample:
      'Hallo Team, hier ist die Projektzusammenfassung dieser Woche, damit wir die nächsten Ziele vor Freitag besprechen können.',
    convSample: 'Der ultimative Leitfaden für Produktivität, Webdesign und Digitales Marketing 2026',
    rhymeWord: 'Nacht',
    schemeSample:
      'Ich gehe durch die Straßen in der stillen Nacht\nEin Funke in der Dunkelheit ist neu erwacht\nAus jedem kleinen Schritt entsteht die große Macht\nBis über unseren Träumen helles Sternenlicht lacht'
  },
  ca: {
    heroDemo: 'Escriu millor, estalvia temps i destaca a qualsevol lloc',
    fontSample: 'Transforma els teus textos, títols i perfils professionals ✨',
    fontBio: 'Especialista en Màrqueting Digital, Disseny i Estratègia 🚀',
    fontPromo: 'Oferta especial disponible només per temps limitat ✨',
    transSample:
      'Hola equip, us comparteixo el resum del projecte d’aquesta setmana per revisar els propers objectius abans de divendres.',
    convSample: 'Guia definitiva de productivitat, disseny web i màrqueting digital 2026',
    rhymeWord: 'llibertat',
    schemeSample:
      'Pujo a l’escenari defensant la veritat\nBuscant una sortida plena de claredat\nTransformo cada passa amb tota intensitat\nMentre brilla al camí la nostra llibertat'
  }
};

// Instant static dictionary for the most common UI phrases in top languages
// so switching to EN / FR / PT / IT / DE / CA is instantaneous before any network call
const STATIC_UI_DICTIONARY: Record<string, Record<string, string>> = {
  en: {
    'Suites (10)': 'Suites (10)',
    'Fuentes': 'Fonts',
    'Traducir': 'Translate',
    'Resumir': 'Summarize',
    'Corrector': 'Proofreader',
    'Rimas & Diccionario': 'Rhymes & Dictionary',
    'Rimar': 'Rhymes',
    'Menú (10)': 'Menu (10)',
    'Donar': 'Donate',
    'Idioma Web': 'Site Language',
    'Traduciendo…': 'Translating…',
    'ESTUDIANTES · PROFESIONALES · CREADORES · ESCRITORES': 'STUDENTS · PROFESSIONALS · CREATORS · WRITERS',
    'Todo lo que necesitas hacer con tu texto,': 'Everything you need to do with your text,',
    'resuelto en segundos.': 'solved in seconds.',
    'Ver las 10 Suites': 'Explore all 10 Suites',
    'Autopilot 5 en 1': '5-in-1 Autopilot',
    '10 Suites': '10 Suites',
    'Integradas en 1 web': 'Integrated in 1 web app',
    'Voces y rimas en español': 'Words & multilingual rhymes',
    '100% Gratis': '100% Free',
    'Sin registro ni límites': 'No sign-up or limits',
    'PRUEBA RÁPIDA EN VIVO': 'LIVE INSTANT DEMO',
    'Transforma cualquier frase al instante': 'Transform any phrase instantly',
    'Formatos': 'Formats',
    'Métricas': 'Metrics',
    'Rimas': 'Rhymes',
    'Escribe una frase, titular o verso:': 'Type a phrase, headline, or verse:',
    'Copiar': 'Copy',
    'Palabras': 'Words',
    'Caracteres': 'Characters',
    'Haz clic en cualquier tarjeta para copiar': 'Click any card to copy',
    'Abrir en suite completa →': 'Open in full suite →',
    'CENTRO DE OPERACIONES': 'OPERATIONS CENTER',
    'Las 10 Suites de 930Text': 'The 10 Suites of 930Text',
    'Recientes:': 'Recent:',
    'Limpiar': 'Clear',
    'Ejemplo': 'Example',
    'Vaciar': 'Clear all',
    'Fuentes Unicode Pro': 'Unicode Fonts Pro',
    'Traductor Universal (105+ Idiomas)': 'Universal Translator (105+ Languages)',
    'Resumidor Extractivo': 'Extractive Summarizer',
    'Corrector de Estilo': 'Style & Grammar Checker',
    'Limpiador Profundo': 'Deep Text Cleaner',
    'Analizador & SEO': 'Text & SEO Analyzer',
    'Convertidor & Formatos': 'Case & Format Converter',
    'Rimar Multi-Idioma & Diccionario': 'Multi-Language Rhymes & Dictionary',
    'Autopilot 1-Clic (5 en 1)': '1-Click Autopilot (5-in-1)',
    'Comparador, Citas APA & Plantillas': 'Diff Compare, APA Citations & Templates',
    'Pegar': 'Paste',
    'Dictar': 'Dictate',
    'Escuchando…': 'Listening…',
    'Detener': 'Stop',
    'Subir archivo': 'Upload file',
    'Guardar': 'Save',
    'Compartir': 'Share',
    'Compartir enlace': 'Share link',
    'Descargar TXT': 'Download TXT',
    'Copiar todo': 'Copy all',
    'Pack 44 Fuentes': '44 Fonts Pack',
    'Traducir ahora': 'Translate now',
    'Traducir al instante': 'Translate instantly',
    'Copiar traducción': 'Copy translation',
    'Espejo Bilingüe': 'Bilingual Mirror',
    'Escuchar': 'Listen',
    'Generar resumen': 'Generate summary',
    'Actualizar resumen al detalle': 'Update detailed summary',
    'Copiar resumen': 'Copy summary',
    'Perfeccionar texto': 'Perfect text',
    'Mejorar texto': 'Improve text',
    'Copiar texto': 'Copy text',
    'Ejecutar limpieza Pro': 'Run Pro cleaner',
    'Limpiar campo': 'Clear field',
    'Convertir ahora': 'Convert now',
    'Copiar resultado': 'Copy result',
    'Buscar rimas': 'Find rhymes',
    'Preguntas frecuentes': 'Frequently Asked Questions',
    'Enviar valoración': 'Send rating',
    'Correo directo': 'Direct email',
    'Donar en PayPal': 'Donate on PayPal',
    'Donar voluntariamente en PayPal': 'Donate voluntarily on PayPal',
    'Historial local': 'Local history'
  },
  fr: {
    'Suites (10)': 'Suites (10)',
    'Fuentes': 'Polices',
    'Traducir': 'Traduire',
    'Resumir': 'Résumer',
    'Corrector': 'Correcteur',
    'Rimas & Diccionario': 'Rimes & Dictionnaire',
    'Rimar': 'Rimes',
    'Menú (10)': 'Menu (10)',
    'Donar': 'Faire un don',
    'Idioma Web': 'Langue du site',
    'Traduciendo…': 'Traduction…',
    'ESTUDIANTES · PROFESIONALES · CREADORES · ESCRITORES': 'ÉTUDIANTS · PROFESSIONNELS · CRÉATEURS · ÉCRIVAINS',
    'Todo lo que necesitas hacer con tu texto,': 'Tout ce que vous devez faire avec votre texte,',
    'resuelto en segundos.': 'résolu en quelques secondes.',
    'Ver las 10 Suites': 'Voir les 10 Suites',
    'Autopilot 5 en 1': 'Autopilote 5 en 1',
    '10 Suites': '10 Suites',
    'Integradas en 1 web': 'Intégrées sur 1 site',
    '100% Gratis': '100% Gratuit',
    'Sin registro ni límites': 'Sans inscription ni limites',
    'PRUEBA RÁPIDA EN VIVO': 'DÉMO EN DIRECT',
    'Transforma cualquier frase al instante': 'Transformez toute phrase instantanément',
    'Formatos': 'Formats',
    'Métricas': 'Métriques',
    'Rimas': 'Rimes',
    'Copiar': 'Copier',
    'Palabras': 'Mots',
    'Caracteres': 'Caractères',
    'CENTRO DE OPERACIONES': 'CENTRE D’OPÉRATIONS',
    'Las 10 Suites de 930Text': 'Les 10 Suites de 930Text',
    'Pegar': 'Coller',
    'Dictar': 'Dicter',
    'Ejemplo': 'Exemple',
    'Limpiar': 'Effacer',
    'Vaciar': 'Vider',
    'Guardar': 'Enregistrer',
    'Compartir': 'Partager',
    'Descargar TXT': 'Télécharger TXT',
    'Copiar todo': 'Tout copier',
    'Pack 44 Fuentes': 'Pack 44 Polices',
    'Traducir ahora': 'Traduire maintenant',
    'Copiar traducción': 'Copier la traduction',
    'Espejo Bilingüe': 'Miroir Bilingue',
    'Generar resumen': 'Générer le résumé',
    'Mejorar texto': 'Améliorer le texte',
    'Limpiar ahora': 'Nettoyer maintenant',
    'Buscar rimas': 'Chercher des rimes',
    'Preguntas frecuentes': 'Questions fréquentes'
  },
  pt: {
    'Suites (10)': 'Suítes (10)',
    'Fuentes': 'Fontes',
    'Traducir': 'Traduzir',
    'Resumir': 'Resumir',
    'Corrector': 'Corretor',
    'Rimas & Diccionario': 'Rimas & Dicionário',
    'Rimar': 'Rimar',
    'Menú (10)': 'Menu (10)',
    'Donar': 'Doar',
    'Idioma Web': 'Idioma do site',
    'Traduciendo…': 'Traduzindo…',
    'ESTUDIANTES · PROFESIONALES · CREADORES · ESCRITORES': 'ESTUDANTES · PROFISSIONAIS · CRIADORES · ESCRITORES',
    'Todo lo que necesitas hacer con tu texto,': 'Tudo o que você precisa fazer com seu texto,',
    'resuelto en segundos.': 'resolvido em segundos.',
    'Ver las 10 Suites': 'Ver as 10 Suítes',
    'Autopilot 5 en 1': 'Autopiloto 5 em 1',
    '100% Gratis': '100% Grátis',
    'Sin registro ni límites': 'Sem registo nem limites',
    'Transforma cualquier frase al instante': 'Transforme qualquer frase instantaneamente',
    'Copiar': 'Copiar',
    'Palabras': 'Palavras',
    'Caracteres': 'Caracteres',
    'Las 10 Suites de 930Text': 'As 10 Suítes do 930Text',
    'Pegar': 'Colar',
    'Dictar': 'Ditar',
    'Ejemplo': 'Exemplo',
    'Limpiar': 'Limpar',
    'Vaciar': 'Esvaziar',
    'Guardar': 'Guardar',
    'Compartir': 'Partilhar',
    'Descargar TXT': 'Baixar TXT',
    'Copiar todo': 'Copiar tudo',
    'Pack 44 Fuentes': 'Pacote 44 Fontes',
    'Traducir ahora': 'Traduzir agora',
    'Copiar traducción': 'Copiar tradução',
    'Espejo Bilingüe': 'Espelho Bilíngue',
    'Generar resumen': 'Gerar resumo',
    'Mejorar texto': 'Melhorar texto',
    'Limpiar ahora': 'Limpar agora',
    'Buscar rimas': 'Buscar rimas',
    'Preguntas frecuentes': 'Perguntas frequentes'
  },
  it: {
    'Fuentes': 'Font',
    'Traducir': 'Traduci',
    'Resumir': 'Riassumi',
    'Corrector': 'Correttore',
    'Rimas & Diccionario': 'Rime & Dizionario',
    'Donar': 'Dona',
    'Idioma Web': 'Lingua del sito',
    'Todo lo que necesitas hacer con tu texto,': 'Tutto ciò che devi fare con il tuo testo,',
    'resuelto en segundos.': 'risolto in pochi secondi.',
    'Ver las 10 Suites': 'Vedi le 10 Suite',
    '100% Gratis': '100% Gratis',
    'Sin registro ni límites': 'Senza registrazione né limiti',
    'Copiar': 'Copia',
    'Palabras': 'Parole',
    'Caracteres': 'Caratteri',
    'Pegar': 'Incolla',
    'Ejemplo': 'Esempio',
    'Guardar': 'Salva',
    'Compartir': 'Condividi',
    'Descargar TXT': 'Scarica TXT',
    'Copiar todo': 'Copia tutto',
    'Pack 44 Fuentes': 'Pack 44 Font',
    'Traducir ahora': 'Traduci ora',
    'Copiar traducción': 'Copia traduzione',
    'Generar resumen': 'Genera riassunto',
    'Mejorar texto': 'Migliora testo',
    'Limpiar ahora': 'Pulisci ora',
    'Buscar rimas': 'Cerca rime',
    'Preguntas frecuentes': 'Domande frequenti'
  },
  de: {
    'Fuentes': 'Schriften',
    'Traducir': 'Übersetzen',
    'Resumir': 'Zusammenfassen',
    'Corrector': 'Korrektor',
    'Rimas & Diccionario': 'Reime & Wörterbuch',
    'Donar': 'Spenden',
    'Idioma Web': 'Web-Sprache',
    'Todo lo que necesitas hacer con tu texto,': 'Alles, was Sie mit Ihrem Text tun müssen,',
    'resuelto en segundos.': 'in Sekunden gelöst.',
    'Ver las 10 Suites': 'Alle 10 Suiten ansehen',
    '100% Gratis': '100% Kostenlos',
    'Sin registro ni límites': 'Ohne Registrierung oder Limits',
    'Copiar': 'Kopieren',
    'Palabras': 'Wörter',
    'Caracteres': 'Zeichen',
    'Pegar': 'Einfügen',
    'Ejemplo': 'Beispiel',
    'Guardar': 'Speichern',
    'Compartir': 'Teilen',
    'Descargar TXT': 'TXT herunterladen',
    'Copiar todo': 'Alles kopieren',
    'Pack 44 Fuentes': '44-Schriften-Paket',
    'Traducir ahora': 'Jetzt übersetzen',
    'Copiar traducción': 'Übersetzung kopieren',
    'Generar resumen': 'Zusammenfassung erstellen',
    'Mejorar texto': 'Text verbessern',
    'Limpiar ahora': 'Jetzt bereinigen',
    'Buscar rimas': 'Reime suchen',
    'Preguntas frecuentes': 'Häufig gestellte Fragen'
  },
  ca: {
    'Fuentes': 'Fonts',
    'Traducir': 'Traduir',
    'Resumir': 'Resumir',
    'Corrector': 'Corrector',
    'Rimas & Diccionario': 'Rimes i Diccionari',
    'Donar': 'Donar',
    'Idioma Web': 'Idioma Web',
    'Todo lo que necesitas hacer con tu texto,': 'Tot el que necessites fer amb el teu text,',
    'resuelto en segundos.': 'resolt en segons.',
    'Ver las 10 Suites': 'Veure les 10 Suites',
    '100% Gratis': '100% Gratis',
    'Sin registro ni límites': 'Sense registre ni límits',
    'Copiar': 'Copiar',
    'Palabras': 'Paraules',
    'Caracteres': 'Caràcters',
    'Pegar': 'Enganxar',
    'Ejemplo': 'Exemple',
    'Guardar': 'Desar',
    'Compartir': 'Compartir',
    'Descargar TXT': 'Descarregar TXT',
    'Copiar todo': 'Copiar tot',
    'Pack 44 Fuentes': 'Pack 44 Fonts',
    'Traducir ahora': 'Traduir ara',
    'Copiar traducción': 'Copiar traducció',
    'Generar resumen': 'Generar resum',
    'Mejorar texto': 'Millorar text',
    'Limpiar ahora': 'Netejar ara',
    'Buscar rimas': 'Cercar rimes',
    'Preguntas frecuentes': 'Preguntes freqüents'
  }
};

// Memory cache of translated strings per target language
const memoryTranslationCache: Record<string, Record<string, string>> = {};

function loadCacheFromStorage(): void {
  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      Object.assign(memoryTranslationCache, parsed);
    }
  } catch {
    // ignore storage errors
  }
}

function saveCacheToStorage(): void {
  try {
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(memoryTranslationCache));
  } catch {
    // ignore quota errors
  }
}

loadCacheFromStorage();

// WeakMaps to remember the original Spanish text of every DOM Text node and Element attribute
const originalTextNodeMap = new WeakMap<Text, string>();
const originalPlaceholderMap = new WeakMap<Element, string>();
const originalTitleMap = new WeakMap<Element, string>();
const originalAriaLabelMap = new WeakMap<Element, string>();
const originalOptgroupLabelMap = new WeakMap<Element, string>();
const trackedTextNodes = new Set<Text>();
const trackedElements = new Set<Element>();

function shouldSkipText(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length < 2) return true;
  // Skip pure numbers, symbols, URLs, emails, or single keyboard shortcuts
  if (/^[0-9.,:%+\-/×→←⇄★☆♥⌘✓!@#$^&*()[\]{}|<>~`"'_=\s]+$/.test(trimmed)) return true;
  if (/^(https?:\/\/|mailto:|rafa\.930music@|PayPal\.Me)/i.test(trimmed)) return true;
  if (/930/i.test(trimmed) || trimmed === '⌘K' || trimmed === 'TXT' || trimmed === 'BPM') return true;
  return false;
}

function shouldSkipElement(el: Element | null, isAttributeCheck = false): boolean {
  if (!el) return true;
  const tag = el.tagName;
  if (
    tag === 'SCRIPT' ||
    tag === 'STYLE' ||
    tag === 'NOSCRIPT' ||
    tag === 'CODE' ||
    tag === 'KBD' ||
    tag === 'SVG' ||
    tag === 'PATH'
  ) {
    return true;
  }
  // Skip textNode children inside TEXTAREA, but DO allow translating TEXTAREA attributes (placeholder, aria-label, title)
  if (!isAttributeCheck && tag === 'TEXTAREA') {
    return true;
  }
  if (el.closest('[data-no-i18n="true"]')) {
    return true;
  }
  return false;
}

async function translateSingleChunkGtx(text: string, targetLang: string): Promise<string | null> {
  try {
    const gUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=${encodeURIComponent(
      targetLang
    )}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(gUrl);
    if (!res.ok) return null;
    const data = await res.json();
    let fullTranslated: string = Array.isArray(data?.[0])
      ? data[0].map((part: unknown[]) => (typeof part?.[0] === 'string' ? part[0] : '')).join('')
      : '';
    
    // BRAND PROTECTION: Ensure 930Text is never translated or altered
    if (text.includes('930Text')) {
      fullTranslated = fullTranslated.replace(/930\s*Texto?/gi, '930Text');
    }
    return fullTranslated.trim() || null;
  } catch {
    return null;
  }
}

// Translate a single dynamic string or sample text into the user's chosen language
export async function translateSingleDynamicString(text: string, targetLang: string): Promise<string> {
  const clean = (text || '').trim();
  if (!clean || targetLang === 'es') return text;

  if (!memoryTranslationCache[targetLang]) {
    memoryTranslationCache[targetLang] = {};
  }
  if (STATIC_UI_DICTIONARY[targetLang]) {
    Object.assign(memoryTranslationCache[targetLang], STATIC_UI_DICTIONARY[targetLang]);
  }
  const langCache = memoryTranslationCache[targetLang];
  if (langCache[clean]) return langCache[clean];

  const translated = await translateSingleChunkGtx(clean, targetLang);
  if (translated) {
    langCache[clean] = translated;
    saveCacheToStorage();
    return translated;
  }
  return text;
}

// Returns localized internal examples ("Ej.", sample texts, default words, templates) for ANY of the 105+ languages
export async function getLocalizedSuiteSamples(targetLang: string): Promise<LocalizedSuiteSamples> {
  if (!targetLang || targetLang === 'es') {
    return BASE_SPANISH_SAMPLES;
  }

  const baseLang = targetLang.split('-')[0].toLowerCase();
  const presetPartial = INSTANT_LOCALIZED_SAMPLES[targetLang] || INSTANT_LOCALIZED_SAMPLES[baseLang] || {};

  const result: LocalizedSuiteSamples = {
    ...BASE_SPANISH_SAMPLES,
    ...presetPartial
  };

  // For any field not covered by the instant dictionary (or for any of the other 100+ languages),
  // translate them in a single fast batch so all internal examples are in the user's language
  const keysToTranslate = (Object.keys(BASE_SPANISH_SAMPLES) as Array<keyof LocalizedSuiteSamples>).filter(
    k => !presetPartial[k]
  );

  if (keysToTranslate.length > 0) {
    const texts = keysToTranslate.map(k => BASE_SPANISH_SAMPLES[k]);
    await fetchBatchTranslations(texts, targetLang);
    const langCache = memoryTranslationCache[targetLang] || {};
    keysToTranslate.forEach(k => {
      const orig = BASE_SPANISH_SAMPLES[k];
      if (langCache[orig]) {
        result[k] = langCache[orig];
      }
    });
  }

  return result;
}

async function fetchBatchTranslations(
  texts: string[],
  targetLang: string,
  onProgress?: () => void
): Promise<void> {
  if (!memoryTranslationCache[targetLang]) {
    memoryTranslationCache[targetLang] = {};
  }
  const langCache = memoryTranslationCache[targetLang];

  // Seed static dictionary first
  const shortLang = targetLang.split('-')[0].toLowerCase();
  if (STATIC_UI_DICTIONARY[shortLang]) {
    Object.assign(langCache, STATIC_UI_DICTIONARY[shortLang]);
  }
  if (STATIC_UI_DICTIONARY[targetLang]) {
    Object.assign(langCache, STATIC_UI_DICTIONARY[targetLang]);
  }

  const missing = Array.from(new Set(texts.filter(t => !langCache[t] && !shouldSkipText(t))));
  if (missing.length === 0) return;

  const BATCH_SIZE = 22;
  const chunks: string[][] = [];
  for (let i = 0; i < missing.length; i += BATCH_SIZE) {
    chunks.push(missing.slice(i, i + BATCH_SIZE));
  }

  // Process all chunks in parallel for instant multi-sentence loading
  await Promise.all(
    chunks.map(async chunk => {
      const multiLineItems = chunk.filter(item => item.includes('\n') || item.length > 220);
      const singleLineItems = chunk.filter(item => !item.includes('\n') && item.length <= 220);

      const multiPromises = multiLineItems.map(async ml => {
        const tr = await translateSingleChunkGtx(ml, targetLang);
        if (tr) langCache[ml] = tr;
      });

      const singlePromise = (async () => {
        if (singleLineItems.length === 0) return;
        const joined = singleLineItems.map(s => s.replace(/\n/g, ' ')).join('\n___TT_SEP___\n');
        const fullTranslated = await translateSingleChunkGtx(joined, targetLang);
        if (fullTranslated) {
          const splitParts = fullTranslated.split(/\s*___TT_SEP___\s*/i);
          if (splitParts.length === singleLineItems.length) {
            singleLineItems.forEach((orig, idx) => {
              const cleaned = (splitParts[idx] || '').trim();
              if (cleaned) langCache[orig] = cleaned;
            });
          } else {
            await Promise.all(
              singleLineItems.map(async orig => {
                if (!langCache[orig]) {
                  const singleTr = await translateSingleChunkGtx(orig, targetLang);
                  if (singleTr) langCache[orig] = singleTr;
                }
              })
            );
          }
        }
      })();

      await Promise.all([...multiPromises, singlePromise]);
      if (onProgress) {
        onProgress();
      }
    })
  );

  saveCacheToStorage();
}

export async function applyWholePageLanguage(targetLang: string): Promise<void> {
  const root = document.getElementById('root');
  if (!root) return;

  const langMeta = getLanguageByCode(targetLang);
  document.documentElement.lang = langMeta.code;
  document.documentElement.dir = ['ar', 'he', 'fa', 'ur', 'ps', 'yi'].includes(langMeta.code) ? 'rtl' : 'ltr';

  // If returning to Spanish ('es'), restore all original Spanish strings immediately
  if (targetLang === 'es') {
    isMutatingDom = true;
    try {
      trackedTextNodes.forEach(node => {
        const orig = originalTextNodeMap.get(node);
        if (typeof orig === 'string' && node.nodeValue !== orig) {
          node.nodeValue = orig;
        }
      });
      trackedElements.forEach(el => {
        const origPh = originalPlaceholderMap.get(el);
        if (typeof origPh === 'string' && el.getAttribute('placeholder') !== origPh) {
          el.setAttribute('placeholder', origPh);
        }
        const origTitle = originalTitleMap.get(el);
        if (typeof origTitle === 'string' && el.getAttribute('title') !== origTitle) {
          el.setAttribute('title', origTitle);
        }
        const origAria = originalAriaLabelMap.get(el);
        if (typeof origAria === 'string' && el.getAttribute('aria-label') !== origAria) {
          el.setAttribute('aria-label', origAria);
        }
        const origOpt = originalOptgroupLabelMap.get(el);
        if (typeof origOpt === 'string' && el.getAttribute('label') !== origOpt) {
          el.setAttribute('label', origOpt);
        }
      });
    } finally {
      isMutatingDom = false;
    }
    return;
  }

  if (!memoryTranslationCache[targetLang]) {
    memoryTranslationCache[targetLang] = {};
  }
  const shortLang = targetLang.split('-')[0].toLowerCase();
  if (STATIC_UI_DICTIONARY[shortLang]) {
    Object.assign(memoryTranslationCache[targetLang], STATIC_UI_DICTIONARY[shortLang]);
  }
  if (STATIC_UI_DICTIONARY[targetLang]) {
    Object.assign(memoryTranslationCache[targetLang], STATIC_UI_DICTIONARY[targetLang]);
  }
  const langCache = memoryTranslationCache[targetLang];

  // Collect all visible text nodes & attributes
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodesToProcess: { node: Text; origTrimmed: string; leading: string; trailing: string }[] = [];
  const stringsNeeded: string[] = [];

  let currentNode = walker.nextNode();
  while (currentNode) {
    const textNode = currentNode as Text;
    const parent = textNode.parentElement;
    if (!shouldSkipElement(parent, false)) {
      const currentVal = textNode.nodeValue || '';
      const storedOrig = originalTextNodeMap.get(textNode);

      // Detect if React updated this textNode dynamically (e.g. counter, status message, or dynamic label)
      if (storedOrig === undefined) {
        originalTextNodeMap.set(textNode, currentVal);
        trackedTextNodes.add(textNode);
      } else {
        const prevTrimmed = storedOrig.trim();
        const prevTranslated = langCache[prevTrimmed];
        const currentTrimmed = currentVal.trim();
        if (currentTrimmed && currentTrimmed !== prevTrimmed && currentTrimmed !== prevTranslated) {
          // React changed the underlying Spanish text! Update our original reference
          originalTextNodeMap.set(textNode, currentVal);
        }
      }

      const origFull = originalTextNodeMap.get(textNode) || '';
      const origTrimmed = origFull.trim();
      if (!shouldSkipText(origTrimmed)) {
        const leadingMatch = origFull.match(/^\s*/);
        const trailingMatch = origFull.match(/\s*$/);
        nodesToProcess.push({
          node: textNode,
          origTrimmed,
          leading: leadingMatch ? leadingMatch[0] : '',
          trailing: trailingMatch ? trailingMatch[0] : ''
        });
        if (!langCache[origTrimmed]) {
          stringsNeeded.push(origTrimmed);
        }
      }
    }
    currentNode = walker.nextNode();
  }

  // Collect attributes (placeholder, title, aria-label, and optgroup labels)
  const attrElements = root.querySelectorAll('[placeholder], [title], [aria-label], optgroup[label]');
  attrElements.forEach(el => {
    if (shouldSkipElement(el, true)) return;
    trackedElements.add(el);

    const ph = el.getAttribute('placeholder');
    if (ph) {
      if (!originalPlaceholderMap.has(el)) originalPlaceholderMap.set(el, ph);
      const origPh = (originalPlaceholderMap.get(el) || '').trim();
      if (!shouldSkipText(origPh) && !langCache[origPh]) stringsNeeded.push(origPh);
    }

    const ti = el.getAttribute('title');
    if (ti) {
      if (!originalTitleMap.has(el)) originalTitleMap.set(el, ti);
      const origTi = (originalTitleMap.get(el) || '').trim();
      if (!shouldSkipText(origTi) && !langCache[origTi]) stringsNeeded.push(origTi);
    }

    const ar = el.getAttribute('aria-label');
    if (ar) {
      if (!originalAriaLabelMap.has(el)) originalAriaLabelMap.set(el, ar);
      const origAr = (originalAriaLabelMap.get(el) || '').trim();
      if (!shouldSkipText(origAr) && !langCache[origAr]) stringsNeeded.push(origAr);
    }

    if (el.tagName === 'OPTGROUP') {
      const lb = el.getAttribute('label');
      if (lb) {
        if (!originalOptgroupLabelMap.has(el)) originalOptgroupLabelMap.set(el, lb);
        const origLb = (originalOptgroupLabelMap.get(el) || '').trim();
        if (!shouldSkipText(origLb) && !langCache[origLb]) stringsNeeded.push(origLb);
      }
    }
  });

  // Apply already-cached translations immediately (instant feedback)
  const applyFromCache = () => {
    isMutatingDom = true;
    try {
      nodesToProcess.forEach(({ node, origTrimmed, leading, trailing }) => {
        const translated = langCache[origTrimmed];
        if (translated) {
          const nextVal = `${leading}${translated}${trailing}`;
          if (node.nodeValue !== nextVal) {
            node.nodeValue = nextVal;
          }
        }
      });

      attrElements.forEach(el => {
        if (shouldSkipElement(el, true)) return;
        const origPh = (originalPlaceholderMap.get(el) || '').trim();
        if (origPh && langCache[origPh] && el.getAttribute('placeholder') !== langCache[origPh]) {
          el.setAttribute('placeholder', langCache[origPh]);
        }
        const origTi = (originalTitleMap.get(el) || '').trim();
        if (origTi && langCache[origTi] && el.getAttribute('title') !== langCache[origTi]) {
          el.setAttribute('title', langCache[origTi]);
        }
        const origAr = (originalAriaLabelMap.get(el) || '').trim();
        if (origAr && langCache[origAr] && el.getAttribute('aria-label') !== langCache[origAr]) {
          el.setAttribute('aria-label', langCache[origAr]);
        }
        if (el.tagName === 'OPTGROUP') {
          const origLb = (originalOptgroupLabelMap.get(el) || '').trim();
          if (origLb && langCache[origLb] && el.getAttribute('label') !== langCache[origLb]) {
            el.setAttribute('label', langCache[origLb]);
          }
        }
      });
    } finally {
      isMutatingDom = false;
    }
  };

  applyFromCache();

  if (stringsNeeded.length > 0) {
    await fetchBatchTranslations(stringsNeeded, targetLang, () => {
      applyFromCache();
    });
    applyFromCache();
  }
}
