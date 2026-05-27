import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Locale } from './i18n';

type Doc = 'privacy' | 'terms';

const ROOT = path.join(process.cwd(), 'content');

export async function loadDoc(doc: Doc, locale: Locale): Promise<string> {
  const file = path.join(ROOT, `${doc}.${locale}.md`);
  try {
    return await readFile(file, 'utf8');
  } catch {
    return await readFile(path.join(ROOT, `${doc}.en.md`), 'utf8');
  }
}
