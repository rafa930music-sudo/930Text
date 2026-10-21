export type SocialCardTheme = 'obsidian' | 'aurora' | 'midnight' | 'gold' | 'minimal';
export type SocialCardRatio = '1:1' | '9:16' | '16:9';

export interface SocialCardOptions {
  text: string;
  author?: string;
  theme: SocialCardTheme;
  ratio: SocialCardRatio;
}

export function generateSocialCardBlob(options: SocialCardOptions): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }

    let width = 1080;
    let height = 1080;
    if (options.ratio === '9:16') {
      width = 1080;
      height = 1920;
    } else if (options.ratio === '16:9') {
      width = 1200;
      height = 675;
    }

    canvas.width = width;
    canvas.height = height;

    const { theme, text, author = '930Text' } = options;

    // 1. Draw Background
    if (theme === 'obsidian') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#060810');
      grad.addColorStop(0.5, '#0B0F1E');
      grad.addColorStop(1, '#05070D');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Subtle glow orb
      const orb = ctx.createRadialGradient(width * 0.8, height * 0.2, 50, width * 0.8, height * 0.2, 500);
      orb.addColorStop(0, 'rgba(139, 92, 246, 0.25)');
      orb.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = orb;
      ctx.fillRect(0, 0, width, height);
    } else if (theme === 'aurora') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#1E1035');
      grad.addColorStop(0.5, '#2E1065');
      grad.addColorStop(1, '#0F0922');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const orb1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 20, width * 0.2, height * 0.3, 400);
      orb1.addColorStop(0, 'rgba(236, 72, 153, 0.25)');
      orb1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = orb1;
      ctx.fillRect(0, 0, width, height);
    } else if (theme === 'midnight') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#02182B');
      grad.addColorStop(0.6, '#061324');
      grad.addColorStop(1, '#020914');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const orb = ctx.createRadialGradient(width * 0.7, height * 0.4, 40, width * 0.7, height * 0.4, 450);
      orb.addColorStop(0, 'rgba(56, 232, 255, 0.22)');
      orb.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = orb;
      ctx.fillRect(0, 0, width, height);
    } else if (theme === 'gold') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#121114');
      grad.addColorStop(0.5, '#1C1917');
      grad.addColorStop(1, '#0A0A0B');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const orb = ctx.createRadialGradient(width * 0.3, height * 0.2, 50, width * 0.3, height * 0.2, 400);
      orb.addColorStop(0, 'rgba(245, 158, 11, 0.20)');
      orb.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = orb;
      ctx.fillRect(0, 0, width, height);
    } else {
      // minimal light
      ctx.fillStyle = '#FAFAFA';
      ctx.fillRect(0, 0, width, height);

      // Subtle light border frame
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 12;
      ctx.strokeRect(30, 30, width - 60, height - 60);
    }

    // 2. Draw Decorative Card Frame / Glass Panel
    const pad = Math.round(width * 0.08);
    const cardX = pad;
    const cardY = pad;
    const cardW = width - pad * 2;
    const cardH = height - pad * 2;
    const radius = 36;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cardX + radius, cardY);
    ctx.arcTo(cardX + cardW, cardY, cardX + cardW, cardY + cardH, radius);
    ctx.arcTo(cardX + cardW, cardY + cardH, cardX, cardY + cardH, radius);
    ctx.arcTo(cardX, cardY + cardH, cardX, cardY, radius);
    ctx.arcTo(cardX, cardY, cardX + cardW, cardY, radius);
    ctx.closePath();

    if (theme === 'minimal') {
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.06)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 15;
      ctx.fill();
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 3;
      ctx.stroke();
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 50;
      ctx.shadowOffsetY = 20;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.restore();

    // 3. Draw Brand Badge in top header
    const brandBadgeX = cardX + 44;
    const brandBadgeY = cardY + 44;
    const badgeSize = 48;
    const badgeRadius = 14;

    ctx.save();
    // Squircle background for icon badge
    ctx.beginPath();
    ctx.moveTo(brandBadgeX + badgeRadius, brandBadgeY);
    ctx.arcTo(brandBadgeX + badgeSize, brandBadgeY, brandBadgeX + badgeSize, brandBadgeY + badgeSize, badgeRadius);
    ctx.arcTo(brandBadgeX + badgeSize, brandBadgeY + badgeSize, brandBadgeX, brandBadgeY + badgeSize, badgeRadius);
    ctx.arcTo(brandBadgeX, brandBadgeY + badgeSize, brandBadgeX, brandBadgeY, badgeRadius);
    ctx.arcTo(brandBadgeX, brandBadgeY, brandBadgeX + badgeSize, brandBadgeY, badgeRadius);
    ctx.closePath();

    const badgeGrad = ctx.createLinearGradient(brandBadgeX, brandBadgeY, brandBadgeX + badgeSize, brandBadgeY + badgeSize);
    badgeGrad.addColorStop(0, '#8B5CF6');
    badgeGrad.addColorStop(0.5, '#6366F1');
    badgeGrad.addColorStop(1, '#D97706');
    ctx.fillStyle = badgeGrad;
    ctx.fill();

    // 3 white lines inside badge
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(brandBadgeX + 11, brandBadgeY + 14);
    ctx.lineTo(brandBadgeX + 37, brandBadgeY + 14);
    ctx.moveTo(brandBadgeX + 11, brandBadgeY + 24);
    ctx.lineTo(brandBadgeX + 31, brandBadgeY + 24);
    ctx.moveTo(brandBadgeX + 11, brandBadgeY + 34);
    ctx.lineTo(brandBadgeX + 25, brandBadgeY + 34);
    ctx.stroke();

    // Brand text: 930Text
    ctx.font = '900 32px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = theme === 'minimal' ? '#0F172A' : '#FFFFFF';
    ctx.fillText('930Text', brandBadgeX + badgeSize + 16, brandBadgeY + 35);

    // Tagline / subtitle in header
    ctx.font = '700 14px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = theme === 'minimal' ? '#64748B' : '#38E8FF';
    ctx.fillText('UN TEXTO, MÚLTIPLES POSIBILIDADES', brandBadgeX + badgeSize + 16, brandBadgeY + 52);
    ctx.restore();

    // 4. Central Text with Smart Word-Wrap
    const isDark = theme !== 'minimal';
    const textColor = isDark ? '#FFFFFF' : '#0F172A';
    const textMaxWidth = cardW - 90;
    const cleanText = text.trim();

    // Compute optimal font size based on text length and canvas height
    let fontSize = 42;
    if (cleanText.length < 50) fontSize = 54;
    else if (cleanText.length < 120) fontSize = 46;
    else if (cleanText.length < 250) fontSize = 38;
    else if (cleanText.length < 450) fontSize = 32;
    else fontSize = 26;

    if (options.ratio === '16:9') fontSize = Math.max(22, Math.round(fontSize * 0.85));

    ctx.font = `600 ${fontSize}px system-ui, -apple-system, sans-serif`;
    const lineHeight = Math.round(fontSize * 1.45);

    // Break words into lines
    const words = cleanText.split(/\s+/);
    const lines: string[] = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > textMaxWidth && i > 0) {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    // Center vertically in available space
    const contentStartY = cardY + 160;
    const contentEndY = cardY + cardH - 120;
    const totalContentHeight = lines.length * lineHeight;
    let startY = Math.max(contentStartY, contentStartY + Math.round((contentEndY - contentStartY - totalContentHeight) / 2));

    ctx.save();
    ctx.fillStyle = textColor;
    ctx.font = `600 ${fontSize}px system-ui, -apple-system, sans-serif`;
    ctx.textBaseline = 'top';

    for (const line of lines) {
      if (startY + lineHeight > contentEndY + 20) {
        ctx.fillText(`${line.slice(0, -3)}…`, cardX + 45, startY);
        break;
      }
      ctx.fillText(line, cardX + 45, startY);
      startY += lineHeight;
    }
    ctx.restore();

    // 5. Draw Footer (Author / Signature & Verification Pill)
    const footerY = cardY + cardH - 52;

    ctx.save();
    // Author text
    ctx.font = '700 18px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = isDark ? '#E2E8F0' : '#334155';
    ctx.fillText(author, cardX + 45, footerY);

    // Subtle verified indicator
    ctx.font = '600 14px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
    const webText = '930Text';
    const webWidth = ctx.measureText(webText).width;
    ctx.fillText(webText, cardX + cardW - 45 - webWidth, footerY);
    ctx.restore();

    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to create Blob from canvas'));
    }, 'image/png');
  });
}
