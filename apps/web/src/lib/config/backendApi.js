import { PUBLIC_API_URL } from '$env/static/public';

const baseUrl = PUBLIC_API_URL.replace(/\/$/, '');
export const API_BASE = `${baseUrl}/api`;