import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(),
		tailwindcss(),
	],
	server: {
		proxy: {
			'/api/media': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				// Optionally, rewrite the URL path if needed:
				// rewrite: (path) => path.replace(/^\/api\/media/, '/api/media')
			},
			'/api/user-media': {
				target: 'http://localhost:3000',
				changeOrigin: true,
			}
		}
	}
});
