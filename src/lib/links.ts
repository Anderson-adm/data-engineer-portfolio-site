import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { profile } from '../data/profile';

export function httpsUrl(value: string): string | undefined {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined;
  } catch { return undefined; }
}

export const basePath = import.meta.env.BASE_URL;
export const local = (path = '') => `${basePath.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const socialLinks = [
  { label: 'GitHub', href: httpsUrl(profile.github) },
  { label: 'LinkedIn', href: httpsUrl(profile.linkedin) },
].filter((link): link is { label: string; href: string } => Boolean(link.href));
export const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email) ? profile.email : undefined;

const resume = profile.resumePath;
const resumeFile = resolve('public', resume.replace(/^\//, ''));
function verifiedResume(): string | undefined {
  if (!resume.startsWith('/') || resume.includes('..') || !/\.pdf$/i.test(resume)
    || !resumeFile.startsWith(`${resolve('public')}/`)) return undefined;
  try {
    return readFileSync(resumeFile).subarray(0, 5).toString('ascii') === '%PDF-' ? local(resume) : undefined;
  } catch { return undefined; }
}
export const resumeUrl = verifiedResume();
