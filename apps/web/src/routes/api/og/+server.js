import { ImageResponse } from '@ethercorps/sveltekit-og';
import { siteConfig } from '$lib/config/site';
import { dev } from '$app/environment';
import fs from 'node:fs';
import path from 'node:path';

// Read and encode the static logo once at server startup
let logoBase64 = '';
try {
  // Support both monorepo root and apps/web root paths
  const possiblePaths = [
    path.resolve('static/logo_Spectra_dark.svg'),
    path.resolve('apps/web/static/logo_Spectra_dark.svg')
  ];

  const logoPath = possiblePaths.find((p) => fs.existsSync(p));

  if (logoPath) {
    const fileBuffer = fs.readFileSync(logoPath);
    logoBase64 = `data:image/svg+xml;base64,${fileBuffer.toString('base64')}`;
  }
} catch (error) {
  console.error('OG Generator: Failed to read logo_Spectra_dark.svg', error);
}

const escapeHtml = (str = '') =>
  String(str).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );

export const GET = async ({ url }) => {
  const rawTitle = url.searchParams.get('title') || siteConfig.name || 'SPECTRA CE EU';
  const rawCategory = url.searchParams.get('category') || 'Resource';
  const rawDesc = url.searchParams.get('desc') || '';

  const title = escapeHtml(rawTitle);
  const category = escapeHtml(rawCategory);
  const desc = escapeHtml(rawDesc);
  const siteName = escapeHtml(siteConfig.name || 'SPECTRA');

  return new ImageResponse(
    `
    <div style="height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: space-between; background: linear-gradient(140deg, #090e1a 0%, #0f172a 60%, #1e293b 100%); padding: 70px 80px; font-family: sans-serif; box-sizing: border-box;">
      
      <!-- Top Row: Category Pill & Brand Logo -->
      <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
        <div style="font-size: 20px; font-weight: 700; color: #60a5fa; text-transform: uppercase; letter-spacing: 1.5px; background: rgba(30, 41, 59, 0.9); padding: 8px 18px; border-radius: 9999px; border: 1px solid rgba(96, 165, 250, 0.3); display: flex;">
          ${category}
        </div>
        
        <div style="display: flex; align-items: center;">
          ${
            logoBase64
              ? `<img src="${logoBase64}" height="48" style="height: 48px; object-fit: contain;" alt="Logo" />`
              : `<div style="font-size: 24px; font-weight: 800; color: #cbd5e1;">${siteName}</div>`
          }
        </div>
      </div>

      <!-- Center: Contextual Title & Optional Subtitle -->
      <div style="display: flex; flex-direction: column; max-width: 1040px; margin-top: auto; margin-bottom: auto;">
        <div style="font-size: 64px; font-weight: 800; color: #f8fafc; line-height: 1.15; letter-spacing: -0.02em; display: flex;">
          ${title}
        </div>
        ${
          desc
            ? `<div style="font-size: 26px; color: #94a3b8; line-height: 1.4; margin-top: 18px; display: flex;">${desc}</div>`
            : ''
        }
      </div>

      <!-- Bottom Accent: Clean Domain Indicator -->
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; border-top: 1px solid rgba(148, 163, 184, 0.15); padding-top: 24px; font-size: 20px; color: #64748b;">
        <span>${siteName}</span>
        <span>${escapeHtml(siteConfig.url.replace(/^https?:\/\//, ''))}</span>
      </div>
    </div>
    `,
    {
      width: 1200,
      height: 630,
      headers: {
        'cache-control': dev
          ? 'no-cache, no-store, must-revalidate'
          : 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400'
      }
    }
  );
};