import { ImageResponse } from '@ethercorps/sveltekit-og';
import { siteConfig } from '$lib/config/site';

export const GET = async ({ url }) => {
	const title = url.searchParams.get('title') ?? siteConfig.name;
	const category = url.searchParams.get('category') ?? 'Update';

	return new ImageResponse(
		`
    <div style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; background-color: #0f172a; padding: 80px; font-family: sans-serif;">
      <!-- Category Badge -->
      <div style="font-size: 24px; color: #3b82f6; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; background: rgba(59, 130, 246, 0.1); padding: 8px 16px; border-radius: 8px;">
        ${category}
      </div>
      
      <!-- Page Title -->
      <div style="font-size: 72px; color: white; line-height: 1.1; font-weight: 800; display: flex; margin-bottom: 40px;">
        ${title}
      </div>
      
      <!-- Brand Footer from siteConfig -->
      <div style="position: absolute; bottom: 80px; left: 80px; display: flex; align-items: center; font-size: 24px; color: #94a3b8;">
        <span style="color: #3b82f6; font-weight: bold; margin-right: 12px;">|</span>
        ${siteConfig.url} — ${siteConfig.name}
      </div>
    </div>
    `,
		{ width: 1200, height: 630 }
	);
};
