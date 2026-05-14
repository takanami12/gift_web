const MAX_TEXT = 200;
const HTML_TAG = /<[^>]*>/g;

function isPrintable(codePoint: number): boolean {
  if (codePoint === 0x09 || codePoint === 0x0a || codePoint === 0x0d) return true;
  if (codePoint < 0x20) return false;
  if (codePoint === 0x7f) return false;
  return true;
}

function stripControlChars(input: string): string {
  let out = '';
  for (const ch of input) {
    const cp = ch.codePointAt(0);
    if (cp !== undefined && isPrintable(cp)) out += ch;
  }
  return out;
}

export function sanitizeUserText(input: string): string {
  return stripControlChars(input).replace(HTML_TAG, '').slice(0, MAX_TEXT).trim();
}
