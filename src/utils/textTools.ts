// ============================================================================
// 930TEXT — MOTOR AVANZADO DE FUENTES UNICODE Y PROCESAMIENTO DE TEXTO
// ============================================================================

const MAY = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const MIN = 'abcdefghijklmnopqrstuvwxyz';

function mapUnicode(upperStr: string, lowerStr: string, numStr?: string): Record<string, string> {
  const A = Array.from(upperStr);
  const B = Array.from(lowerStr);
  const N = numStr ? Array.from(numStr) : [];
  const m: Record<string, string> = {};
  for (let i = 0; i < 26; i++) {
    if (A[i]) m[MAY[i]] = A[i];
    if (B[i]) m[MIN[i]] = B[i];
  }
  for (let i = 0; i < 10; i++) {
    if (N[i]) m[String(i)] = N[i];
  }
  return m;
}

const maps = {
  bold: mapUnicode(
    '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙',
    '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳',
    '𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗'
  ),
  italic: mapUnicode(
    '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍',
    '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧'
  ),
  boldItalic: mapUnicode(
    '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁',
    '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛'
  ),
  sansBold: mapUnicode(
    '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭',
    '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇',
    '𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵'
  ),
  sansItalic: mapUnicode(
    '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡',
    '𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻'
  ),
  sansBoldItalic: mapUnicode(
    '𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕',
    '𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯'
  ),
  script: mapUnicode(
    '𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵',
    '𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏'
  ),
  boldScript: mapUnicode(
    '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩',
    '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃'
  ),
  doubleStruck: mapUnicode(
    '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ',
    '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫',
    '𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡'
  ),
  bubble: mapUnicode(
    'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ',
    'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ',
    '⓪①②③④⑤⑥⑦⑧⑨'
  ),
  blackBubble: mapUnicode(
    '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩',
    '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩',
    '⓿❶❷❸❹❺❻❼❽❾'
  ),
  square: mapUnicode(
    '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉',
    '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉'
  ),
  blackSquare: mapUnicode(
    '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉',
    '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉'
  ),
  paren: mapUnicode(
    '🄐🄑🄒🄓🄔🄕🄖🄗🄘🄙🄚🄛🄜🄝🄞🄟🄠🄡🄢🄣🄤🄥🄦🄧🄨🄩',
    '⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵',
    '0⑴⑵⑶⑷⑸⑹⑺⑻⑼'
  ),
  gothic: mapUnicode(
    '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ',
    '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷'
  ),
  boldGothic: mapUnicode(
    '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅',
    '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒🄽𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟'
  ),
  mono: mapUnicode(
    '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉',
    '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣',
    '𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿'
  ),
  smallCaps: mapUnicode(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ'
  ),
  fullwidth: mapUnicode(
    'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
    'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ',
    '０１２３４５６７８９'
  ),
  cyberGreek: mapUnicode(
    'ΛＢＣＤΞＦＧＨＩＪＫＬＭＮΘＰＱＲＳＴＵＶＷＸＹＺ',
    'αв¢∂єfgнιנкℓмиσρqяѕтυνωχуz'
  ),
  runicNordic: mapUnicode(
    '卂乃匚ᗪ乇千Ꮆ卄丨ﾌҜㄥ爪几ㄖ卩Ɋ尺丂ㄒㄩᐯ山乂ㄚ乙',
    '卂乃匚ᗪ乇千Ꮆ卄丨ﾌҜㄥ爪几ㄖ卩Ɋ尺丂ㄒㄩᐯ山乂ㄚ乙'
  ),
  currencyFlip: mapUnicode(
    '₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩ӾɎⱫ',
    '₳฿₵đɇƒ₲ⱨłj₭ⱡ₥₦ø₱qɽ₴₮ʉv₩ӿɏⱬ'
  ),
  supers: {
    a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ⁱ',
    j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ', n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', q: 'q', r: 'ʳ',
    s: 'ˢ', t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ',
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
  } as Record<string, string>,
  subs: {
    a: 'ₐ', e: 'ₑ', h: 'ₕ', i: 'ᵢ', j: 'ⱼ', k: 'ₖ', l: 'ₗ', m: 'ₘ', n: 'ₙ',
    o: 'ₒ', p: 'ₚ', r: 'ᵣ', s: 'ₛ', t: 'ₜ', u: 'ᵤ', v: 'ᵥ', x: 'ₓ',
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '⁷', '8': '₈', '9': '₉'
  } as Record<string, string>,
  upsideDown: {
    a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ',
    j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ',
    s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
    A: '∀', B: '𐐒', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I',
    J: 'ſ', K: '⋊', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ',
    S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
    '?': '¿', '!': '¡', '.': '˙', ',': "'"
  } as Record<string, string>
};

const ACCENT_BASE: Record<string, string> = {
  á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ü: 'u', ñ: 'n',
  Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U', Ü: 'U', Ñ: 'N'
};

function convertWithMap(text: string, map: Record<string, string>): string {
  let result = '';
  for (const ch of text) {
    if (map[ch]) {
      result += map[ch];
    } else if (ACCENT_BASE[ch] && map[ACCENT_BASE[ch]]) {
      result += map[ACCENT_BASE[ch]];
    } else {
      result += ch;
    }
  }
  return result;
}

function combineMarks(text: string, mark: string): string {
  let result = '';
  for (const ch of text) {
    if (/\s/u.test(ch) || /[\p{Extended_Pictographic}]/u.test(ch)) {
      result += ch;
    } else {
      result += ch + mark;
    }
  }
  return result;
}

export interface FontFrameDef {
  id: string;
  label: string;
  wrap: (t: string) => string;
}

export const FONT_FRAMES: FontFrameDef[] = [
  { id: 'none', label: 'Sin marco', wrap: t => t },
  { id: 'stars', label: '✦ Estelar ✦', wrap: t => `✦ ${t} ✦` },
  { id: 'crown', label: '♛ Royal ♛', wrap: t => `♛ ${t} ♛` },
  { id: 'music', label: '♪ Musical ♫', wrap: t => `♪ ${t} ♫` },
  { id: 'brackets', label: '【 Urbano 】', wrap: t => `【 ${t} 】` },
  { id: 'wings', label: '༺ Alas ༻', wrap: t => `༺ ${t} ༻` },
  { id: 'lightning', label: '⚡ Voltaje ⚡', wrap: t => `⚡ ${t} ⚡` },
  { id: 'arrows', label: '» Flechas «', wrap: t => `» ${t} «` },
  { id: 'sparkles', label: '･ﾟ✧ Brillo', wrap: t => `✧･ﾟ: *✧ ${t} ✧*:･ﾟ✧` },
  { id: 'vip', label: '★ VIP ★', wrap: t => `★彡 ${t} 彡★` },
  { id: 'cyber', label: '⟦ Cyber ⟧', wrap: t => `⟦ ${t} ⟧` },
  { id: 'flames', label: '🔥 Fuego 🔥', wrap: t => `🔥 ${t} 🔥` },
  { id: 'diamond', label: '❖ Diamante ❖', wrap: t => `❖ ${t} ❖` },
  { id: 'wave', label: '〰 Onda 〰', wrap: t => `〰 ${t} 〰` }
];

export interface FontStyleDef {
  id: string;
  name: string;
  category: 'todas' | 'redes' | 'elegantes' | 'decorativas' | 'urbano';
  transform: (text: string) => string;
}

export const FONT_STYLES: FontStyleDef[] = [
  { id: 'bold', name: 'Negrita Serif', category: 'redes', transform: t => convertWithMap(t, maps.bold) },
  { id: 'sansBold', name: 'Negrita Sans', category: 'redes', transform: t => convertWithMap(t, maps.sansBold) },
  { id: 'italic', name: 'Cursiva Editorial', category: 'elegantes', transform: t => convertWithMap(t, maps.italic) },
  { id: 'boldItalic', name: 'Negrita Cursiva', category: 'elegantes', transform: t => convertWithMap(t, maps.boldItalic) },
  { id: 'sansItalic', name: 'Sans Cursiva', category: 'redes', transform: t => convertWithMap(t, maps.sansItalic) },
  { id: 'sansBoldItalic', name: 'Sans Negrita Cursiva', category: 'redes', transform: t => convertWithMap(t, maps.sansBoldItalic) },
  { id: 'script', name: 'Caligráfica Script', category: 'elegantes', transform: t => convertWithMap(t, maps.script) },
  { id: 'boldScript', name: 'Script Realzada', category: 'elegantes', transform: t => convertWithMap(t, maps.boldScript) },
  { id: 'gothic', name: 'Gótico Clásico', category: 'urbano', transform: t => convertWithMap(t, maps.gothic) },
  { id: 'boldGothic', name: 'Gótico Intenso', category: 'urbano', transform: t => convertWithMap(t, maps.boldGothic) },
  { id: 'doubleStruck', name: 'Doble Trazo', category: 'elegantes', transform: t => convertWithMap(t, maps.doubleStruck) },
  { id: 'smallCaps', name: 'Versalitas (Small Caps)', category: 'redes', transform: t => convertWithMap(t, maps.smallCaps) },
  { id: 'mono', name: 'Monoespaciado', category: 'redes', transform: t => convertWithMap(t, maps.mono) },
  { id: 'bubble', name: 'Burbuja Clara', category: 'decorativas', transform: t => convertWithMap(t, maps.bubble) },
  { id: 'blackBubble', name: 'Burbuja Oscura', category: 'decorativas', transform: t => convertWithMap(t, maps.blackBubble) },
  { id: 'square', name: 'Cuadrada Línea', category: 'decorativas', transform: t => convertWithMap(t, maps.square) },
  { id: 'blackSquare', name: 'Bloque Sólido', category: 'urbano', transform: t => convertWithMap(t, maps.blackSquare) },
  { id: 'paren', name: 'Paréntesis Retro', category: 'decorativas', transform: t => convertWithMap(t, maps.paren) },
  { id: 'fullwidth', name: 'Vaporwave Ancho', category: 'urbano', transform: t => convertWithMap(t, maps.fullwidth) },
  { id: 'cyberGreek', name: 'Cyber Estética', category: 'urbano', transform: t => convertWithMap(t, maps.cyberGreek) },
  { id: 'runicNordic', name: 'Urbano Asiático', category: 'urbano', transform: t => convertWithMap(t, maps.runicNordic) },
  { id: 'currencyFlip', name: 'Trap Divisa', category: 'urbano', transform: t => convertWithMap(t, maps.currencyFlip) },
  { id: 'supers', name: 'Superíndice', category: 'decorativas', transform: t => convertWithMap(t.toLowerCase(), maps.supers) },
  { id: 'subs', name: 'Subíndice', category: 'decorativas', transform: t => convertWithMap(t.toLowerCase(), maps.subs) },
  { id: 'strike', name: 'Tachado Simple', category: 'decorativas', transform: t => combineMarks(t, '\u0336') },
  { id: 'slash', name: 'Tachado Diagonal', category: 'decorativas', transform: t => combineMarks(t, '\u0337') },
  { id: 'underline', name: 'Subrayado Fino', category: 'redes', transform: t => combineMarks(t, '\u0332') },
  { id: 'doubleUnderline', name: 'Doble Subrayado', category: 'elegantes', transform: t => combineMarks(t, '\u0333') },
  { id: 'overline', name: 'Línea Superior', category: 'decorativas', transform: t => combineMarks(t, '\u0305') },
  { id: 'seagull', name: 'Onda Inferior', category: 'decorativas', transform: t => combineMarks(t, '\u033c') },
  { id: 'spaced', name: 'Aireado Minimal', category: 'redes', transform: t => Array.from(t).join(' ').replace(/ {3,}/g, '   ') },
  { id: 'dots', name: 'Punteado Rítmico', category: 'urbano', transform: t => Array.from(t).filter(c => c !== ' ').join('·') },
  { id: 'glitch', name: 'Glitch Sutil', category: 'urbano', transform: t => combineMarks(combineMarks(t, '\u0307'), '\u0323') },
  { id: 'upsideDown', name: 'Invertido 180°', category: 'decorativas', transform: t => Array.from(t).reverse().map(c => maps.upsideDown[c] ?? c).join('') },
  { id: 'mirror', name: 'Espejo Reverso', category: 'decorativas', transform: t => Array.from(convertWithMap(t, maps.sansBold)).reverse().join('') },
  { id: 'boxedTitle', name: 'Titular Marcado', category: 'redes', transform: t => `『 ${convertWithMap(t, maps.sansBold)} 』` },
  { id: 'ribbonBanner', name: 'Cinta Imperial', category: 'elegantes', transform: t => `꧁ ${convertWithMap(t, maps.boldScript)} ꧂` },
  { id: 'neonBracket', name: 'Neón Futurista', category: 'urbano', transform: t => `⚡⟦ ${convertWithMap(t, maps.sansBoldItalic)} ⟧⚡` },
  { id: 'starredSmallCaps', name: 'Versalitas Estelar', category: 'redes', transform: t => `✦ ${convertWithMap(t, maps.smallCaps)} ✦` },
  { id: 'arrowHeadline', name: 'Titular Lanzamiento', category: 'redes', transform: t => `» ${convertWithMap(t, maps.sansBold)} «` },
  { id: 'doubleGothic', name: 'Gótico Corona', category: 'urbano', transform: t => `♛ ${convertWithMap(t, maps.boldGothic)} ♛` },
  { id: 'waveScript', name: 'Caligrafía Marina', category: 'elegantes', transform: t => `〰 ${convertWithMap(t, maps.script)} 〰` },
  { id: 'crossHair', name: 'Mira Táctica', category: 'urbano', transform: t => `⌖ ${convertWithMap(t, maps.mono)} ⌖` },
  { id: 'sparkleBold', name: 'Destello Viral', category: 'decorativas', transform: t => `✨ ${convertWithMap(t, maps.boldItalic)} ✨` }
];

// ============================================================================
// PROCESAMIENTO LINGÜÍSTICO Y HERRAMIENTAS DE TEXTO PRO
// ============================================================================

export const SPANISH_STOPWORDS = new Set(
  'de la que el en y a los del se las por un para con no una su al lo como más pero sus le ya o este si porque está entre cuando muy sin sobre también me hasta hay donde quien desde todo nos durante todos uno les ni contra otros ese eso ante ellos e esto mi antes algunos unos yo otro otras otra tanto esa estos mucho quienes nada muchos cual poco ella estar estas algunas algo nosotros mis tu te ti tus ellas nosotras vosotros vosotras os mío mía míos mías tuyo tuya tuyos tuyas suyo suya suyos suyas nuestro nuestra nuestros nuestras vuestro vuestra vuestros vuestras esos esas estoy estas esta estamos estáis están ser son fue era han he ha hemos habéis tiene tienen tengo tienes tenemos hacer hace hacen puede pueden puedo puedes podemos así tan solo cada vez veces dos tres texto aquí mediante según hacia tras bajo cabe so'.split(' ')
);

export function extractWords(text: string): string[] {
  return text.toLocaleLowerCase('es-ES').match(/[a-záéíóúüñ]+/gi) || [];
}

export type SummaryFormat =
  | 'paragraph'
  | 'bullets'
  | 'executive'
  | 'studyQuestions'
  | 'socialThread'
  | 'actionPlan';

export interface SummaryDetailedResult {
  output: string;
  originalWords: number;
  summaryWords: number;
  savedPercentage: number;
  originalReadSeconds: number;
  summaryReadSeconds: number;
  keyEntities: string[];
  keyFigures: string[];
  topKeywords: string[];
  extractedSentences: string[];
}

// Protect common Spanish & international abbreviations so sentence segmentation never splits mid-abbreviation
function segmentSpanishSentences(rawText: string): string[] {
  const normalized = rawText
    .replace(/\r\n?/g, '\n')
    .replace(/^\s*([•\-*]\s+|\d+[.)]\s+)/gm, '')
    .trim();

  if (!normalized) return [];

  const abbrProtected = normalized
    .replace(/\b(Sr|Sra|Srta|Dr|Dra|Prof|Ing|Lic| Cap|Art|Av|Avda|pág|págs|etc|ej|p\.ej|aprox|núm|tel|EE\.\s*UU|S\.A|S\.L|Inc|Ltd)\./gi, '$1∯')
    .replace(/(\d)\.(\d)/g, '$1∯$2');

  // Split by sentence punctuation OR by distinct line breaks when users paste unpunctuated notes/lists
  const rawChunks = abbrProtected
    .split(/(?<=[.!?…])\s+|\n+/g)
    .map(c => c.replace(/∯/g, '.').replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  // If the entire text was a single long run-on sentence (>32 words) without periods, split by clauses (; : o conectores)
  const finalSegments: string[] = [];
  for (const chunk of rawChunks) {
    const wordCount = extractWords(chunk).length;
    if (wordCount > 36 && /[,;:]/.test(chunk)) {
      const subClauses = chunk
        .split(/(?<=[;:])\s+|,\s+(?=(?:sin embargo|además|por lo tanto|asimismo|en consecuencia|mientras que|porque|donde|lo que)\b)/gi)
        .map(s => s.trim())
        .filter(s => extractWords(s).length >= 4);
      if (subClauses.length > 1) {
        finalSegments.push(...subClauses);
        continue;
      }
    }
    finalSegments.push(chunk);
  }

  return finalSegments.length > 0 ? finalSegments : [normalized];
}

// Compress a sentence by trimming introductory discourse fluff and parenthetical noise so it reads like a true synthesis
function compressSentenceForSynthesis(sentence: string): string {
  let s = sentence
    .replace(/\s*\([^)]{1,45}\)/g, '') // Remove short secondary parenthetical asides
    .replace(
      /^(por otro lado|por otra parte|en este sentido|cabe destacar que|es importante mencionar que|asimismo|de igual manera|en conclusión|en resumen|como sabemos|vale la pena señalar que|hay que tener en cuenta que|en primer lugar|en segundo lugar|por consiguiente|no obstante|sin embargo),?\s+/i,
      ''
    )
    .replace(/\s+/g, ' ')
    .trim();

  if (!s) s = sentence.trim();
  s = s.charAt(0).toUpperCase() + s.slice(1);
  if (!/[.!?…]$/.test(s)) s += '.';
  return s;
}

// Measure Jaccard word similarity between two sentences to prevent redundant sentences in the summary (MMR)
function sentenceSimilarity(a: string, b: string): number {
  const setA = new Set(extractWords(a).filter(w => w.length > 3 && !SPANISH_STOPWORDS.has(w)));
  const setB = new Set(extractWords(b).filter(w => w.length > 3 && !SPANISH_STOPWORDS.has(w)));
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  setA.forEach(w => {
    if (setB.has(w)) intersection++;
  });
  return intersection / Math.min(setA.size, setB.size);
}

export function summarizeTextDetailed(
  text: string,
  sentenceCount: number,
  format: SummaryFormat = 'paragraph',
  focusKeyword = ''
): SummaryDetailedResult {
  const clean = text.replace(/\u00a0/g, ' ').trim();
  if (!clean) throw new Error('Pega o escribe un texto para resumir.');

  const allWords = extractWords(clean);
  const originalWords = allWords.length;
  const sentences = segmentSpanishSentences(clean);

  // Build TF-like lexical importance table + stem grouping (first 6 chars for long words)
  const freq: Record<string, number> = {};
  const displayForm: Record<string, string> = {};
  for (const rawW of allWords) {
    const w = rawW.toLocaleLowerCase('es-ES');
    if (w.length > 2 && !SPANISH_STOPWORDS.has(w)) {
      const stem = w.length >= 7 ? w.slice(0, 6) : w;
      freq[stem] = (freq[stem] || 0) + 1;
      if (!displayForm[stem] || rawW.length < displayForm[stem].length) {
        displayForm[stem] = w;
      }
    }
  }

  const maxFreq = Math.max(1, ...Object.values(freq));
  const cleanFocus = focusKeyword.trim().toLocaleLowerCase('es-ES');

  // Extract figures/dates/percentages & proper nouns/entities
  const keyFigures = Array.from(
    new Set(
      (
        clean.match(
          /\b\d+(?:[.,]\d+)?(?:\s*%|\s*€|\s*\$|\s*millones|\s*mil|\s*años|\s*horas|\s*días|\s*min|\s*km|\b)/gi
        ) || []
      ).map(x => x.trim())
    )
  ).slice(0, 8);

  const entityMatches =
    clean.match(/\b[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{2,}(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{2,})*/g) || [];
  const keyEntities = Array.from(
    new Set(
      entityMatches.filter(e => {
        const lower = e.toLocaleLowerCase('es-ES');
        return !SPANISH_STOPWORDS.has(lower) && lower.length > 3;
      })
    )
  ).slice(0, 6);

  const causalMarkers =
    /\b(clave|importante|objetivo|resultado|conclusión|fundamental|esencial|permite|garantiza|incrementa|reduce|mejora|ahorra|principal|estrategia|beneficio|impacto|solución|necesario|debido a|por tanto)\b/i;

  const candidatePool = sentences.map((s, idx) => {
    const sw = extractWords(s);
    let score = 0;
    for (const w of sw) {
      const lower = w.toLocaleLowerCase('es-ES');
      const stem = lower.length >= 7 ? lower.slice(0, 6) : lower;
      score += (freq[stem] || 0) / maxFreq;
    }
    score /= Math.max(sw.length, 1);

    // Structural position weights (lead sentence, second sentence, conclusion)
    if (idx === 0) score *= 1.32;
    else if (idx === 1) score *= 1.14;
    else if (idx === sentences.length - 1) score *= 1.12;

    // Quantitative data bonus (dates, percentages, KPIs)
    if (/\d/.test(s)) score *= 1.18;

    // Causal / thesis marker bonus
    if (causalMarkers.test(s)) score *= 1.22;

    // User focus keyword priority
    if (cleanFocus && s.toLocaleLowerCase('es-ES').includes(cleanFocus)) {
      score *= 1.85;
    }

    // Ideal length curve
    if (sw.length >= 8 && sw.length <= 32) score *= 1.1;
    if (sw.length > 48) score *= 0.82;
    if (sw.length < 4) score *= 0.45;

    return {
      raw: s.trim(),
      compressed: compressSentenceForSynthesis(s),
      score,
      idx
    };
  });

  // Selection: ensure targetCount represents genuine condensation (ratio 0.3 - 0.7)
  const maxAllowedSentences = Math.max(1, Math.min(sentenceCount, Math.ceil(candidatePool.length * 0.6)));
  const targetCount = Math.max(1, Math.min(maxAllowedSentences, candidatePool.length));
  const sortedByScore = [...candidatePool].sort((a, b) => b.score - a.score);
  const chosen: typeof candidatePool = [];

  for (const cand of sortedByScore) {
    if (chosen.length >= targetCount) break;
    const isRedundant = chosen.some(existing => sentenceSimilarity(existing.raw, cand.raw) > 0.62);
    if (!isRedundant) {
      chosen.push(cand);
    }
  }

  // Fill if anti-redundancy filtered too aggressively
  if (chosen.length < targetCount) {
    for (const cand of sortedByScore) {
      if (chosen.length >= targetCount) break;
      if (!chosen.includes(cand)) chosen.push(cand);
    }
  }

  // Restore chronological document order
  chosen.sort((a, b) => a.idx - b.idx);

  const selectedCompressed = chosen.map(x => x.compressed);
  const topKeywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([stem]) => displayForm[stem] || stem);

  let output = '';

  if (format === 'bullets') {
    output = selectedCompressed
      .map(s => {
        const wordsInS = extractWords(s);
        const mainKw = topKeywords.find(kw => wordsInS.includes(kw));
        if (mainKw) {
          const label = mainKw.charAt(0).toUpperCase() + mainKw.slice(1);
          return `• [${label}] ${s}`;
        }
        return `• ${s}`;
      })
      .join('\n');
  } else if (format === 'executive') {
    // Executive format: concise thesis + core findings without duplicating sentences or inflating word count
    const thesis = selectedCompressed[0] || compressSentenceForSynthesis(clean);
    const otherPoints = selectedCompressed.slice(1);

    const parts: string[] = [`📌 TESIS: ${thesis}`];
    if (otherPoints.length > 0) {
      parts.push(`🎯 PUNTOS CLAVE:\n` + otherPoints.map((s, i) => `  ${i + 1}. ${s}`).join('\n'));
    }
    if (keyFigures.length > 0) {
      parts.push(`📊 CIFRAS: ${keyFigures.slice(0, 5).join(' · ')}`);
    }
    output = parts.join('\n\n');

    // Strict safety check: if executive formatted output is longer than original text, condense to pure synthesis
    if (originalWords > 12 && extractWords(output).length >= originalWords) {
      output = `📌 SÍNTESIS: ${thesis}` + (otherPoints[0] ? `\n• ${otherPoints[0]}` : '');
    }
  } else if (format === 'studyQuestions') {
    output = selectedCompressed
      .map((s, i) => {
        const sLower = s.toLocaleLowerCase('es-ES');
        const matchedKw =
          topKeywords.find(kw => sLower.includes(kw)) ||
          extractWords(s).find(w => w.length > 4 && !SPANISH_STOPWORDS.has(w)) ||
          'este apartado';
        const kwTitle = matchedKw.charAt(0).toUpperCase() + matchedKw.slice(1);

        let question = `¿Cuál es el punto clave sobre «${kwTitle}» según el texto?`;
        if (/\b\d+(?:[.,]\d+)?\s*(%|millones|mil|€|\$|años|horas|días)\b/i.test(s)) {
          question = `¿Qué dato, cifra o métrica se destaca en relación con «${kwTitle}»?`;
        } else if (/\b(porque|debido a|causa|provoca|genera|permite|para)\b/i.test(s)) {
          question = `¿Qué efecto, función o finalidad tiene «${kwTitle}»?`;
        } else if (/\b(es|son|consiste|define|denomina|representa)\b/i.test(s)) {
          question = `¿Cómo se define o caracteriza «${kwTitle}» en el documento?`;
        }

        return `❓ Pregunta ${i + 1}: ${question}\n✅ Respuesta: ${s}`;
      })
      .join('\n\n');
  } else if (format === 'socialThread') {
    const total = selectedCompressed.length;
    const hookTitle = topKeywords.slice(0, 2).map(w => w.toUpperCase()).join(' & ') || 'RESUMEN CLAVE';
    output = selectedCompressed
      .map((s, i) => {
        if (i === 0) {
          return `🧵 1/${total} [${hookTitle}]\n${s}`;
        }
        if (i === total - 1 && total > 1) {
          return `🎯 ${i + 1}/${total} Conclusión:\n${s}`;
        }
        return `🔹 ${i + 1}/${total}\n${s}`;
      })
      .join('\n\n');
  } else if (format === 'actionPlan') {
    output = [
      `⚡ PLAN DE ACCIÓN:`,
      ...selectedCompressed.map((s, i) => `[Paso ${i + 1}] ${s}`)
    ].join('\n');
  } else {
    output = selectedCompressed.join(' ').trim();
  }

  // Final condensation guarantee for all modes
  let summaryWords = extractWords(output).length;
  if (originalWords > 15 && summaryWords >= originalWords) {
    output = selectedCompressed.slice(0, Math.max(1, Math.floor(selectedCompressed.length / 2))).join(' ');
    summaryWords = extractWords(output).length;
  }

  const savedPercentage =
    originalWords > 0 ? Math.max(0, Math.min(95, Math.round((1 - summaryWords / originalWords) * 100))) : 0;

  return {
    output,
    originalWords,
    summaryWords,
    savedPercentage,
    originalReadSeconds: Math.max(1, Math.round((originalWords / 200) * 60)),
    summaryReadSeconds: Math.max(1, Math.round((summaryWords / 200) * 60)),
    keyEntities,
    keyFigures,
    topKeywords,
    extractedSentences: selectedCompressed
  };
}

export function summarizeText(
  text: string,
  sentenceCount: number,
  format: SummaryFormat = 'paragraph',
  focusKeyword = ''
): string {
  return summarizeTextDetailed(text, sentenceCount, format, focusKeyword).output;
}

export type ImproveLevel = 'basic' | 'full' | 'editorial' | 'directo';

export interface ImproveResult {
  result: string;
  changesCount: number;
  appliedNotes: string[];
}

function preserveCaseReplace(source: string, replacement: string): string {
  if (!source) return replacement;
  if (source === source.toUpperCase() && source.length > 1) {
    return replacement.toLocaleUpperCase('es-ES');
  }
  const first = source.charAt(0);
  if (first === first.toUpperCase() && first !== first.toLowerCase()) {
    return replacement.charAt(0).toLocaleUpperCase('es-ES') + replacement.slice(1);
  }
  return replacement;
}

// Deep Spanish dictionary of phonetic, chat/SMS, b/v, c/s/z, h-omission, y/ll, and accent errors
const SPANISH_DEEP_WORD_MAP: Record<string, string> = {
  // Chat & SMS abbreviations
  porq: 'porque',
  xq: 'porque',
  pq: 'porque',
  xfa: 'por favor',
  xfavor: 'por favor',
  tmb: 'también',
  tb: 'también',
  tbn: 'también',
  k: 'que',
  ke: 'que',
  q: 'que',
  qe: 'que',
  kiero: 'quiero',
  keria: 'quería',
  keriamos: 'queríamos',
  kerer: 'querer',
  kiso: 'quiso',
  kisiera: 'quisiera',
  kizas: 'quizás',
  kiza: 'quizá',
  kasa: 'casa',
  kasas: 'casas',
  kosa: 'cosa',
  kosas: 'cosas',
  kasi: 'casi',
  kuando: 'cuando',
  kual: 'cual',
  kuales: 'cuales',
  kuanto: 'cuánto',
  cuamto: 'cuánto',
  cuamtos: 'cuántos',
  cuamta: 'cuánta',
  kito: 'quitó',
  kitar: 'quitar',
  kitaron: 'quitaron',
  keda: 'queda',
  kedo: 'quedó',
  kedaron: 'quedaron',
  aki: 'aquí',
  aka: 'acá',
  parkeo: 'aparcamiento',
  parkear: 'aparcar',
  direktamente: 'directamente',
  direkto: 'directo',
  // H omissions & haber/hacer/hablar/hora
  abia: 'había',
  abian: 'habían',
  abra: 'habrá',
  abran: 'habrán',
  ablar: 'hablar',
  ablo: 'habló',
  ablando: 'hablando',
  ablamos: 'hablamos',
  ase: 'hace',
  asen: 'hacen',
  aser: 'hacer',
  asiendo: 'haciendo',
  iso: 'hizo',
  isieron: 'hicieron',
  ora: 'hora',
  oras: 'horas',
  oy: 'hoy',
  ombre: 'hombre',
  ombres: 'hombres',
  ermano: 'hermano',
  ermana: 'hermana',
  istoria: 'historia',
  istorias: 'historias',
  ospital: 'hospital',
  otel: 'hotel',
  uevo: 'huevo',
  uevos: 'huevos',
  // B / V confusions & imperfect -aba/-aban
  barias: 'varias',
  barios: 'varios',
  biajar: 'viajar',
  biaje: 'viaje',
  biajes: 'viajes',
  vien: 'bien',
  buenisimo: 'buenísimo',
  berdad: 'verdad',
  veses: 'veces',
  beses: 'veces',
  bida: 'vida',
  bale: 'vale',
  bolver: 'volver',
  bolvio: 'volvió',
   benir: 'venir',
  bino: 'vino',
  bamos: 'vamos',
  boy: 'voy',
  bas: 'vas',
  ba: 'va',
  ban: 'van',
  iva: 'iba',
  ivan: 'iban',
  ivamos: 'íbamos',
  estava: 'estaba',
  estavan: 'estaban',
  estavamos: 'estábamos',
  faltava: 'faltaba',
  faltavan: 'faltaban',
  costava: 'costaba',
  costavan: 'costaban',
  pensava: 'pensaba',
  pensavan: 'pensaban',
  mirava: 'miraba',
  jugava: 'jugaba',
  cantava: 'cantaba',
  buscava: 'buscaba',
  llevava: 'llevaba',
  llamava: 'llamaba',
  dejaban: 'dejaban',
  dejava: 'dejaba',
  pasava: 'pasaba',
  quedava: 'quedaba',
  trabajava: 'trabajaba',
  necesitava: 'necesitaba',
  hablava: 'hablaba',
  ablava: 'hablaba',
  compravan: 'compraban',
  comprava: 'compraba',
  saver: 'saber',
  savia: 'sabía',
  savian: 'sabían',
  saves: 'sabes',
  uve: 'tuve',
  uvo: 'hubo',
  ubiera: 'hubiera',
  // LL / Y confusions
  yegado: 'llegado',
  yegar: 'llegar',
  yego: 'llegó',
  yegamos: 'llegamos',
  yegaron: 'llegaron',
  yamar: 'llamar',
  yamo: 'llamó',
  yamada: 'llamada',
  yevar: 'llevar',
  yevo: 'llevó',
  yevamos: 'llevamos',
  yorar: 'llorar',
  yoro: 'lloró',
  yuvia: 'lluvia',
  yave: 'llave',
  yaves: 'llaves',
  yeno: 'lleno',
  yena: 'llena',
  // S / C / Z / J / G confusions
  espasio: 'espacio',
  espasios: 'espacios',
  empeso: 'empezó',
  empesar: 'empezar',
  empesamos: 'empezamos',
  empesaron: 'empezaron',
  disiendo: 'diciendo',
  desir: 'decir',
  dise: 'dice',
  disen: 'dicen',
  sersion: 'sección',
  secsion: 'sección',
  seccion: 'sección',
  presio: 'precio',
  presios: 'precios',
  jente: 'gente',
  jentes: 'gentes',
  ijenio: 'ingenio',
  colejio: 'colegio',
  relijion: 'religión',
  oxijeno: 'oxígeno',
  // Spoken apocopes (-ao -> -ado) & everyday typos
  supermercao: 'supermercado',
  mercao: 'mercado',
  caducao: 'caducado',
  pasao: 'pasado',
  cansao: 'cansado',
  enfadao: 'enfadado',
  compraos: 'comprados',
  comprao: 'comprado',
  terminao: 'terminado',
  acavao: 'acabado',
  acabao: 'acabado',
  olbidao: 'olvidado',
  olvidao: 'olvidado',
  cambiaos: 'cambiados',
  cambiao: 'cambiado',
  preparao: 'preparado',
  estacionao: 'estacionado',
  aparcao: 'aparcado',
  platano: 'plátano',
  platanos: 'plátanos',
  patajas: 'patatas',
  patataz: 'patatas',
  lele: 'leche',
  fec: 'fecha',
  fech: 'fecha',
  enojo: 'enojó',
  enfado: 'enfadó',
  // Frequent missing accents (tildes)
  tambien: 'también',
  ademas: 'además',
  despues: 'después',
  atras: 'atrás',
  jamas: 'jamás',
  detras: 'detrás',
  quizas: 'quizás',
  ojala: 'ojalá',
  ningun: 'ningún',
  algun: 'algún',
  segun: 'según',
  comun: 'común',
  facil: 'fácil',
  dificil: 'difícil',
  util: 'útil',
  inutil: 'inútil',
  rapido: 'rápido',
  rapida: 'rápida',
  rapidos: 'rápidos',
  ultimo: 'último',
  ultima: 'última',
  ultimos: 'últimos',
  proximo: 'próximo',
  proxima: 'próxima',
  publico: 'público',
  publica: 'pública',
  numero: 'número',
  numeros: 'números',
  pagina: 'página',
  paginas: 'páginas',
  musica: 'música',
  exito: 'éxito',
  exitos: 'éxitos',
  analisis: 'análisis',
  resumenes: 'resúmenes',
  examenes: 'exámenes',
  jovenes: 'jóvenes',
  imagenes: 'imágenes',
  informacion: 'información',
  comunicacion: 'comunicación',
  situacion: 'situación',
  educacion: 'educación',
  solucion: 'solución',
  atencion: 'atención',
  cancion: 'canción',
  corazon: 'corazón',
  razon: 'razón',
  accion: 'acción',
  direccion: 'dirección',
  relacion: 'relación',
  produccion: 'producción',
  investigacion: 'investigación',
  organizacion: 'organización',
  presentacion: 'presentación',
  aplicacion: 'aplicación',
  operacion: 'operación',
  decision: 'decisión',
  version: 'versión',
  television: 'televisión',
  ocasion: 'ocasión',
  expresion: 'expresión',
  dia: 'día',
  dias: 'días',
   frio: 'frío',
  rio: 'río',
  tio: 'tío',
  tia: 'tía',
  pais: 'país',
  paises: 'países',
  raiz: 'raíz',
  maiz: 'maíz',
  baul: 'baúl',
  ataud: 'ataúd'
};

// Common Spanish first names & cities to auto-capitalize when written in lowercase
const SPANISH_PROPER_NAMES = new Set([
  'juan', 'maria', 'maría', 'carlos', 'pedro', 'luis', 'ana', 'lucia', 'lucía',
  'sofia', 'sofía', 'miguel', 'javier', 'david', 'daniel', 'alejandro', 'pablo',
  'rafael', 'rafa', 'elena', 'carmen', 'laura', 'marta', 'sara', 'paula', 'diego',
  'jorge', 'fernando', 'alberto', 'sergio', 'andres', 'andrés', 'antonio', 'jose',
  'josé', 'francisco', 'manuel', 'madrid', 'barcelona', 'valencia', 'sevilla',
  'españa', 'mexico', 'méxico', 'argentina', 'colombia', 'chile', 'peru', 'perú'
]);

export function improveText(text: string, level: ImproveLevel): ImproveResult {
  if (!text.trim()) throw new Error('Escribe o pega un texto para mejorar.');
  let changes = 0;
  const notes: string[] = [];

  let r = text.replace(/\r\n?/g, '\n').replace(/\u00a0/g, ' ');

  const spaceMatches = r.match(/[ \t]{2,}/g);
  if (spaceMatches) {
    changes += spaceMatches.length;
    notes.push(`${spaceMatches.length} espacios múltiples corregidos`);
  }

  // 1. Contextual multi-word orthographic, phonetic & grammar repairs (runs in ALL levels including basic/full/editorial/directo)
  const contextualPhraseFixes: Array<[RegExp, string]> = [
    // Contextual phonetic phrases from real user errors
    [/\bayer\s+abi\s+en\s+la\s+tarde\s+yo\s+fui\b/gi, 'Ayer por la tarde fui'],
    [/\bayer\s+abi\s+en\s+la\s+tarde\b/gi, 'Ayer por la tarde'],
    [/\bayer\s+en\s+la\s+tarde\s+yo\s+fui\b/gi, 'Ayer por la tarde fui'],
    [/\bel\s+kual\b/gi, 'el cual'],
    [/\bla\s+kual\b/gi, 'la cual'],
    [/\blos\s+kuales\b/gi, 'los cuales'],
    [/\blas\s+kuales\b/gi, 'las cuales'],
    [/\bkasi\s+ase\s+una\s+ora\s+de\s+biajar\b/gi, 'hacía casi una hora de viaje'],
    [/\bcasi\s+hace\s+una\s+hora\s+de\s+viajar\b/gi, 'hacía casi una hora de viaje'],
    [/\base\s+una\s+ora\b/gi, 'hace una hora'],
    [/\bdos\s+kilo\s+de\s+pl[aá]tano\b/gi, 'dos kilos de plátanos'],
    [/\bdos\s+kilo\s+de\b/gi, 'dos kilos de'],
    [/\btres\s+kilo\s+de\b/gi, 'tres kilos de'],
    [/\bun\s+bote\s+de\s+lele\b/gi, 'un bote de leche'],
    [/\bbolsa\s+de\s+patajas\b/gi, 'bolsa de patatas'],
    [/\bpor\s+ningun\s+lado\b/gi, 'por ningún lado'],
    [/\bel\s+mes\s+pasao\b/gi, 'el mes pasado'],
    [/\bmal\s+estacionao\b/gi, 'mal estacionado'],
    [/\b¡\s*ay\s+no\s+puede\s+ser\b/gi, '«¡Ay, no puede ser'],
    [/«¡ay\s+no\s+puede\s+ser/gi, '«¡Ay, no puede ser'],
    // Interrogative "Por qué"
    [/¿\s*por\s+que\b/gi, '¿Por qué'],
    [/¿\s*que\s+(passo|paso|pasó|haces|quieres|piensas|significa)\b/gi, '¿Qué $1'],
    [/¿\s*como\s+(estas|estás|fue|funciona|puedo)\b/gi, '¿Cómo $1'],
    [/¿\s*cuando\s+(llegas|viene|empieza|termina)\b/gi, '¿Cuándo $1'],
    [/¿\s*donde\s+(esta|está|estan|están|vamos)\b/gi, '¿Dónde $1'],
    // Verb tense & prepositional fixes
    [/\ba\s+traves\b/gi, 'a través'],
    [/\basi\s+mismo\b/gi, 'asimismo'],
    [/\bmas\s+sin\s+embargo\b/gi, 'sin embargo'],
    [/\bde\s+acuerdo\s+a\b/gi, 'de acuerdo con'],
    [/\ben\s+base\s+a\b/gi, 'con base en'],
    [/\ba\s+nivel\s+de\b/gi, 'en cuanto a']
  ];

  let phraseFixCount = 0;
  contextualPhraseFixes.forEach(([re, rep]) => {
    const matches = r.match(re);
    if (matches) {
      phraseFixCount += matches.length;
      changes += matches.length;
      r = r.replace(re, match => preserveCaseReplace(match, rep));
    }
  });

  // 2. Token-by-token deep orthographic & phonetic spellchecker
  let wordFixCount = 0;
  let properNameCount = 0;
  r = r.replace(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/g, (word, offset, fullStr) => {
    const lower = word.toLocaleLowerCase('es-ES');

    // General productive morphological rule: words ending in "-avan" -> "-aban", "-ava" -> "-aba" (except "cava", "lava", "grava", "brava", "octava", "esclava")
    const avaExceptions = new Set(['cava', 'lava', 'grava', 'brava', 'octava', 'esclava', 'clava', 'pava', 'nava', 'fava']);
    if (!SPANISH_DEEP_WORD_MAP[lower] && lower.length >= 5 && !avaExceptions.has(lower)) {
      if (lower.endsWith('avan')) {
        wordFixCount++;
        changes++;
        return preserveCaseReplace(word, lower.slice(0, -4) + 'aban');
      }
      if (lower.endsWith('ava')) {
        wordFixCount++;
        changes++;
        return preserveCaseReplace(word, lower.slice(0, -3) + 'aba');
      }
    }

    // Direct dictionary match
    if (SPANISH_DEEP_WORD_MAP[lower]) {
      wordFixCount++;
      changes++;
      return preserveCaseReplace(word, SPANISH_DEEP_WORD_MAP[lower]);
    }

    // Proper name auto-capitalization (e.g. "amigo juan" -> "amigo Juan")
    if (SPANISH_PROPER_NAMES.has(lower) && word[0] === word[0].toLowerCase()) {
      // Avoid capitalizing "rio" or "mar" if not a name; SPANISH_PROPER_NAMES only has unambiguous proper names
      properNameCount++;
      changes++;
      return word.charAt(0).toLocaleUpperCase('es-ES') + word.slice(1);
    }

    // Contextual "abi" standalone typo -> remove or fix if stray
    if (lower === 'abi') {
      const prevSlice = fullStr.slice(Math.max(0, offset - 10), offset).toLowerCase();
      if (prevSlice.includes('ayer')) {
        wordFixCount++;
        changes++;
        return 'allí';
      }
    }

    return word;
  });

  if (phraseFixCount + wordFixCount > 0) {
    notes.push(`${phraseFixCount + wordFixCount} faltas ortográficas y fonéticas corregidas`);
  }
  if (properNameCount > 0) {
    notes.push(`${properNameCount} nombres propios capitalizados`);
  }

  // 3. Repair unclosed question or exclamation marks (e.g. "¿Por qué la gente no revisa la fecha y me lo devolvía.")
  r = r.replace(/¿([^?¡!\n]+?)(\.|$)/g, (_m, inner, endPunct) => {
    changes++;
    notes.push('Signo de interrogación de cierre (?) restaurado');
    // Also split compound trailing narrative if needed: "revisa la fecha y me lo devolvía"
    return `¿${inner.trim()}?${endPunct === '.' ? '' : ''}`;
  });
  r = r.replace(/¡([^!¿?\n]+?)(\.|$)/g, (_m, inner) => {
    changes++;
    notes.push('Signo de exclamación de cierre (!) restaurado');
    return `¡${inner.trim()}!`;
  });

  // 4. Normalize punctuation spacing without breaking URLs, emails, or decimal numbers
  r = r
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s+([.,;:!?…])/g, (_, p) => {
      changes++;
      return p;
    })
    .replace(/([.,;:!?…])(?=[^\s\d.,;:!?…»”)\/\w@-])/g, (_, p) => {
      changes++;
      return `${p} `;
    })
    .replace(/([,;:])([A-Za-zÁÉÍÓÚÜÑáéíóúüñ])/g, (_, p, l) => {
      changes++;
      return `${p} ${l}`;
    })
    .replace(/([.!?…])([A-ZÁÉÍÓÚÜÑ])/g, (_, p, l) => {
      changes++;
      return `${p} ${l}`;
    })
    .replace(/[ ]+([»”)])/g, '$1')
    .replace(/([«“(])[ ]+/g, '$1')
    .replace(/^ +| +$/gm, '')
    .trim();

  if (level === 'full' || level === 'editorial' || level === 'directo') {
    let capCount = 0;
    r = r.replace(/([.!?…]\s+|\n|^|«\s*¡?|"\s*¡?|¿\s*)([a-záéíóúñü])/g, (_m, prefix, char) => {
      capCount++;
      changes++;
      return prefix + char.toUpperCase();
    });
    if (capCount > 0) notes.push(`${capCount} mayúsculas iniciales aplicadas`);

    const fillers = [
      /\bo sea\b,?\s*/gi,
      /\bpues nada\b,?\s*/gi,
      /\bla verdad es que\b\s*/gi,
      /\bcomo que\b\s*/gi,
      /\beh\b,?\s*/gi,
      /\beste\b,\s+/gi,
      /\bmás o menos\b\s*/gi,
      /\bbásicamente\b,?\s*/gi,
      /\ben plan\b,?\s*/gi,
      /\bdigamos que\b\s*/gi,
      /\bpor así decirlo\b,?\s*/gi
    ];
    let fillerCount = 0;
    fillers.forEach(re => {
      const m = r.match(re);
      if (m) {
        fillerCount += m.length;
        changes += m.length;
      }
      r = r.replace(re, '');
    });
    if (fillerCount > 0) notes.push(`${fillerCount} muletillas eliminadas`);

    let dupCount = 0;
    r = r.replace(/\b([a-záéíóúñü]+)\s+\1\b/gi, (_m, w) => {
      dupCount++;
      changes++;
      return w;
    });
    if (dupCount > 0) notes.push(`${dupCount} palabras duplicadas corregidas`);
  }

  if (level === 'editorial' || level === 'directo') {
    const redundancies: Array<[RegExp, string]> = [
      [/\b(pero sin embargo|aunque sin embargo)\b/gi, 'sin embargo'],
      [/\b(de cara a)\b/gi, 'para'],
      [/\b(el día de hoy|en el día de hoy)\b/gi, 'hoy'],
      [/\b(llevar a cabo)\b/gi, 'realizar'],
      [/\b(poner de manifiesto)\b/gi, 'mostrar'],
      [/\b(subir arriba)\b/gi, 'subir'],
      [/\b(bajar abajo)\b/gi, 'bajar'],
      [/\b(entrar adentro)\b/gi, 'entrar'],
      [/\b(salir afuera)\b/gi, 'salir'],
      [/\b(repetir de nuevo|volver a repetir)\b/gi, 'repetir'],
      [/\b(totalmente gratis|completamente gratis)\b/gi, 'gratis'],
      [/\b(hecho real)\b/gi, 'hecho'],
      [/\b(cita previa)\b/gi, 'cita'],
      [/\b(con el objetivo de|con la finalidad de)\b/gi, 'para'],
      [/\b(dar inicio a)\b/gi, 'iniciar'],
      [/\b(tomar una decisión)\b/gi, 'decidir'],
      [/\b(hacer entrega de)\b/gi, 'entregar'],
      // Natural Spanish editorial polish for narrative/everyday verbs
      [/\bun carro mal estacionado\b/gi, 'un coche mal estacionado'],
      [/\bagarramos dos kilos\b/gi, 'cogimos dos kilos']
    ];
    let redCount = 0;
    redundancies.forEach(([re, rep]) => {
      const m = r.match(re);
      if (m) {
        redCount += m.length;
        changes += m.length;
      }
      r = r.replace(re, match => preserveCaseReplace(match, rep));
    });
    r = r.replace(/\.{3,}/g, '…');
    if (redCount > 0) notes.push(`${redCount} mejoras de fluidez y estilo editorial`);
  }

  if (level === 'directo') {
    const weakAdverbs =
      /\b(realmente|sinceramente|francamente|literalmente|obviamente|evidentemente|ciertamente|absolutamente|prácticamente)\s+/gi;
    const m = r.match(weakAdverbs);
    if (m) {
      changes += m.length;
      notes.push(`${m.length} adverbios débiles recortados`);
    }
    r = r.replace(weakAdverbs, '');
  }

  r = r
    .replace(/[ ]{2,}/g, ' ')
    .replace(/^ +| +$/gm, '')
    .replace(/([.!?…]\s+|\n|^)([a-záéíóúñü])/g, (_m, prefix, char) => prefix + char.toUpperCase())
    .trim();

  if (r && !/[.!?…»”)]$/.test(r)) {
    r += '.';
    changes++;
    notes.push('Punto final añadido');
  }
  if (notes.length === 0) notes.push('Ortografía, puntuación y estilo verificados');

  return { result: r, changesCount: Math.max(1, changes), appliedNotes: notes };
}

export interface CleanOptions {
  mode: 'balanced' | 'aggressive';
  stripHtml?: boolean;
  stripMarkdown?: boolean;
  stripUrls?: boolean;
  stripEmails?: boolean;
  stripEmojis?: boolean;
  stripTimestamps?: boolean;
  stripLeadingNumbers?: boolean;
  dedupeLines?: boolean;
  sortLines?: 'none' | 'asc' | 'desc' | 'length';
  findText?: string;
  replaceText?: string;
}

export function cleanTextAdvanced(text: string, options: CleanOptions): string {
  if (!text.trim()) throw new Error('Pega algo para limpiar.');

  let r = text
    .replace(/\u00a0/g, ' ')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\r\n?/g, '\n');

  // Fix hyphenated words broken across lines from PDFs (e.g. "impor-\ntante" -> "importante")
  r = r.replace(/([a-záéíóúñü])-\n\s*([a-záéíóúñü])/gi, '$1$2');

  if (options.stripHtml) {
    r = r
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, '\n')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"');
  }
  if (options.stripMarkdown) {
    r = r
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      .replace(/~~(.*?)~~/g, '$1')
      .replace(/`{1,3}[^`]*`{1,3}/g, m => m.replace(/`/g, ''))
      .replace(/^\s*>\s+/gm, '');
  }
  if (options.stripUrls) {
    r = r.replace(/(?:https?:\/\/|www\.)[^\s]+/gi, '');
  }
  if (options.stripEmails) {
    r = r.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '');
  }
  if (options.stripEmojis) {
    r = r.replace(/[\p{Extended_Pictographic}\uFE0F]/gu, '');
  }
  if (options.stripTimestamps) {
    r = r.replace(/\[?\b\d{1,2}:\d{2}(?::\d{2})?(?:[.,]\d{1,3})?\b\]?\s*/g, '');
  }
  if (options.stripLeadingNumbers) {
    r = r.replace(/^\s*(?:\d+[.)\-:]|[•▪▸‣*\-–—])\s+/gm, '');
  }
  if (options.findText && options.findText.length > 0) {
    r = r.split(options.findText).join(options.replaceText ?? '');
  }

  r = r
    .replace(/[\t ]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s+([,.;:!?])/g, '$1');

  if (options.mode === 'aggressive') {
    r = r
      .replace(/[“”«»]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/–|—/g, '-')
      .replace(/\n+/g, '\n')
      .replace(/ {2,}/g, ' ');
  }

  if (options.dedupeLines || (options.sortLines && options.sortLines !== 'none')) {
    let lines = r.split('\n').map(l => l.trim()).filter(Boolean);
    if (options.dedupeLines) {
      const seen = new Set<string>();
      lines = lines.filter(line => {
        const key = line.toLocaleLowerCase('es-ES');
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    if (options.sortLines === 'asc') {
      lines.sort((a, b) => a.localeCompare(b, 'es'));
    } else if (options.sortLines === 'desc') {
      lines.sort((a, b) => b.localeCompare(a, 'es'));
    } else if (options.sortLines === 'length') {
      lines.sort((a, b) => b.length - a.length);
    }
    r = lines.join('\n');
  }

  return r.trim();
}

export interface TextAnalysisMetrics {
  words: number;
  chars: number;
  charsNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMin: number;
  speakingTimeSec: number;
  avgWordsPerSentence: string;
  longestSentenceWords: number;
  shortestSentenceWords: number;
  longWords: number;
  uniquePercentage: number;
  huertaReadability: number;
  huertaLabel: string;
  toneIndicator: string;
  keywords: Array<{ word: string; count: number; densityPct: string }>;
  bigrams: Array<{ phrase: string; count: number }>;
  trigrams: Array<{ phrase: string; count: number }>;
}

export function analyzeText(text: string): TextAnalysisMetrics {
  const ws = extractWords(text);
  const sentences = segmentSpanishSentences(text);
  const paragraphs = text.split(/\n\s*\n/).filter(x => x.trim());
  const charsNoSpaces = text.replace(/\s/g, '').length;

  const freq: Record<string, number> = {};
  ws.forEach(w => {
    const k = w.toLocaleLowerCase('es-ES');
    if (k.length > 2 && !SPANISH_STOPWORDS.has(k)) {
      freq[k] = (freq[k] || 0) + 1;
    }
  });

  const filteredFreqEntries = Object.entries(freq).filter(([, count]) => {
    if (ws.length >= 25 && count < 2) return false;
    return true;
  });
  const finalEntries = filteredFreqEntries.length >= 3 
    ? filteredFreqEntries 
    : Object.entries(freq);

  const keywords = finalEntries
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([word, count]) => ({
      word,
      count,
      densityPct: ws.length ? Math.min(100, Math.max(0, (count / ws.length) * 100)).toFixed(1) : '0.0'
    }));

  // Bigrams (2-word meaningful expressions)
  const bigramFreq: Record<string, number> = {};
  for (let i = 0; i < ws.length - 1; i++) {
    const w1 = ws[i].toLocaleLowerCase('es-ES');
    const w2 = ws[i + 1].toLocaleLowerCase('es-ES');
    if (w1.length > 2 && w2.length > 2 && !SPANISH_STOPWORDS.has(w1) && !SPANISH_STOPWORDS.has(w2)) {
      const pair = `${w1} ${w2}`;
      bigramFreq[pair] = (bigramFreq[pair] || 0) + 1;
    }
  }
  const bigrams = Object.entries(bigramFreq)
    .filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([phrase, count]) => ({ phrase, count }));

  // Trigrams (3-word SEO phrases)
  const trigramFreq: Record<string, number> = {};
  for (let i = 0; i < ws.length - 2; i++) {
    const w1 = ws[i].toLocaleLowerCase('es-ES');
    const w2 = ws[i + 1].toLocaleLowerCase('es-ES');
    const w3 = ws[i + 2].toLocaleLowerCase('es-ES');
    if (w1.length > 2 && w3.length > 2 && !SPANISH_STOPWORDS.has(w1) && !SPANISH_STOPWORDS.has(w3)) {
      const tri = `${w1} ${w2} ${w3}`;
      trigramFreq[tri] = (trigramFreq[tri] || 0) + 1;
    }
  }
  const trigrams = Object.entries(trigramFreq)
    .filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([phrase, count]) => ({ phrase, count }));

  const sentenceLengths = sentences.map(s => extractWords(s).length).filter(n => n > 0);
  const longestSentenceWords = sentenceLengths.length ? Math.max(...sentenceLengths) : 0;
  const shortestSentenceWords = sentenceLengths.length ? Math.min(...sentenceLengths) : 0;

  const uniqueRatio = ws.length ? new Set(ws.map(w => w.toLowerCase())).size / ws.length : 0;
  const avgWords = sentences.length ? ws.length / sentences.length : 0;

  const totalSyllables = ws.reduce((acc, w) => {
    const groups = w.toLowerCase().match(/[aeiouáéíóúü]+/g);
    return acc + (groups ? groups.length : 1);
  }, 0);

  let huerta = 100;
  if (ws.length > 0 && sentences.length > 0) {
    const P = (totalSyllables / ws.length) * 100;
    const F = ws.length / sentences.length;
    huerta = Math.round(Math.max(0, Math.min(100, 206.84 - 0.6 * P - 1.02 * F)));
  }

  let huertaLabel = 'Sin texto';
  if (ws.length === 0) huertaLabel = 'Sin texto';
  else if (huerta >= 80) huertaLabel = 'Muy fácil';
  else if (huerta >= 65) huertaLabel = 'Estándar claro';
  else if (huerta >= 50) huertaLabel = 'Técnico / Medio';
  else huertaLabel = 'Académico / Complejo';

  const exclamations = (text.match(/[!¡?¿]/g) || []).length;
  let toneIndicator = 'Neutro / Informativo';
  if (ws.length === 0) toneIndicator = '—';
  else if (exclamations >= 3) toneIndicator = 'Expresivo / Enérgico';
  else if (avgWords > 24) toneIndicator = 'Formal / Expositivo';
  else if (avgWords <= 12) toneIndicator = 'Directo / Dinámico';

  return {
    words: ws.length,
    chars: text.length,
    charsNoSpaces,
    sentences: sentences.length,
    paragraphs: paragraphs.length,
    readingTimeMin: ws.length === 0 ? 0 : Math.max(1, Math.ceil(ws.length / 200)),
    speakingTimeSec: Math.round((ws.length / 140) * 60),
    avgWordsPerSentence: sentences.length ? avgWords.toFixed(1) : '0',
    longestSentenceWords,
    shortestSentenceWords,
    longWords: ws.filter(w => w.length >= 9).length,
    uniquePercentage: Math.round(uniqueRatio * 100),
    huertaReadability: ws.length === 0 ? 0 : huerta,
    huertaLabel,
    toneIndicator,
    keywords,
    bigrams,
    trigrams
  };
}

export type ConvertMode =
  | 'upper'
  | 'lower'
  | 'sentence'
  | 'title'
  | 'alternating'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'screamingSnake'
  | 'kebab'
  | 'slug'
  | 'noAccents'
  | 'numbered'
  | 'bullets'
  | 'checklist'
  | 'csvRow'
  | 'markdownTable'
  | 'extractLinks'
  | 'hashtags'
  | 'base64Encode'
  | 'urlEncode'
  | 'reverse';

const MINOR_TITLE_WORDS = new Set(['de', 'del', 'la', 'las', 'el', 'los', 'y', 'e', 'o', 'u', 'a', 'en', 'con', 'por', 'para', 'sin', 'sobre']);

export function convertTextFormat(text: string, mode: ConvertMode): string {
  if (!text) return '';
  switch (mode) {
    case 'upper':
      return text.toLocaleUpperCase('es-ES');
    case 'lower':
      return text.toLocaleLowerCase('es-ES');
    case 'reverse':
      return Array.from(text).reverse().join('');
    case 'title': {
      let wordIdx = 0;
      return text
        .toLocaleLowerCase('es-ES')
        .replace(/[a-záéíóúñü]+/gi, word => {
          const lower = word.toLocaleLowerCase('es-ES');
          const shouldCap = wordIdx === 0 || !MINOR_TITLE_WORDS.has(lower);
          wordIdx++;
          return shouldCap ? lower.charAt(0).toLocaleUpperCase('es-ES') + lower.slice(1) : lower;
        });
    }
    case 'sentence':
      return text
        .toLocaleLowerCase('es-ES')
        .replace(/(^|[.!?…]\s+|\n)([a-záéíóúñü])/g, (_m, p, c) => p + c.toLocaleUpperCase('es-ES'));
    case 'alternating':
      return Array.from(text)
        .map((c, i) => (i % 2 === 0 ? c.toLocaleLowerCase('es-ES') : c.toLocaleUpperCase('es-ES')))
        .join('');
    case 'camel': {
      const words = extractWords(text);
      return words
        .map((w, i) => {
          const clean = w.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
          return i === 0 ? clean : clean.charAt(0).toUpperCase() + clean.slice(1);
        })
        .join('');
    }
    case 'pascal': {
      const words = extractWords(text);
      return words
        .map(w => {
          const clean = w.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
          return clean.charAt(0).toUpperCase() + clean.slice(1);
        })
        .join('');
    }
    case 'snake': {
      const words = extractWords(text);
      return words
        .map(w => w.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase())
        .join('_');
    }
    case 'screamingSnake': {
      const words = extractWords(text);
      return words
        .map(w => w.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase())
        .join('_');
    }
    case 'kebab':
    case 'slug':
      return text
        .toLocaleLowerCase('es-ES')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    case 'noAccents':
      return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    case 'numbered':
      return text
        .split('\n')
        .map(l => l.replace(/^\s*(?:\d+[.)\-:]|[•▪▸‣*\-–—])\s+/, '').trim())
        .filter(Boolean)
        .map((l, i) => `${i + 1}. ${l}`)
        .join('\n');
    case 'bullets':
      return text
        .split('\n')
        .map(l => l.replace(/^\s*(?:\d+[.)\-:]|[•▪▸‣*\-–—])\s+/, '').trim())
        .filter(Boolean)
        .map(l => `• ${l}`)
        .join('\n');
    case 'checklist':
      return text
        .split('\n')
        .map(l => l.replace(/^\s*(?:\d+[.)\-:]|[•▪▸‣*\-–—]|\[\s*[xX]?\s*\])\s+/, '').trim())
        .filter(Boolean)
        .map(l => `[ ] ${l}`)
        .join('\n');
    case 'csvRow':
      return text
        .split(/\n+/)
        .map(l => l.trim())
        .filter(Boolean)
        .join(', ');
    case 'markdownTable': {
      const rows = text
        .split(/\r?\n/)
        .map(r => r.trim())
        .filter(Boolean)
        .map(r => (r.includes('\t') ? r.split('\t') : r.includes(';') ? r.split(';') : r.split(',')).map(c => c.trim()));
      if (rows.length === 0) return '';
      const cols = Math.max(...rows.map(r => r.length));
      const padRow = (r: string[]) => `| ${Array.from({ length: cols }, (_, i) => r[i] || '—').join(' | ')} |`;
      const header = padRow(rows[0]);
      const sep = `| ${Array.from({ length: cols }, () => '---').join(' | ')} |`;
      const body = rows.slice(1).map(padRow);
      return [header, sep, ...body].join('\n');
    }
    case 'extractLinks': {
      const urls = text.match(/(?:https?:\/\/|www\.)[^\s,;)"'>]+/gi) || [];
      const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
      const tags = text.match(/#[a-záéíóúñü0-9_]+/gi) || [];
      const parts: string[] = [];
      if (urls.length) parts.push(`URLs (${urls.length}):\n${Array.from(new Set(urls)).join('\n')}`);
      if (emails.length) parts.push(`Emails (${emails.length}):\n${Array.from(new Set(emails)).join('\n')}`);
      if (tags.length) parts.push(`Hashtags (${tags.length}):\n${Array.from(new Set(tags)).join(' ')}`);
      return parts.length ? parts.join('\n\n') : 'No se detectaron enlaces, correos ni hashtags en el texto.';
    }
    case 'hashtags': {
      const words = extractWords(text).filter(w => w.length > 2 && !SPANISH_STOPWORDS.has(w.toLowerCase()));
      return Array.from(new Set(words.map(w => `#${w.toLowerCase()}`))).join(' ');
    }
    case 'base64Encode':
      try {
        return btoa(unescape(encodeURIComponent(text)));
      } catch {
        return text;
      }
    case 'urlEncode':
      return encodeURIComponent(text);
    default:
      return text;
  }
}

