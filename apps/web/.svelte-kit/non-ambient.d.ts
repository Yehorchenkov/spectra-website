
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/about" | "/api" | "/api/coordinators" | "/api/news" | "/api/partners" | "/api/programs" | "/api/projects" | "/api/team-members" | "/blog" | "/events" | "/main-page" | "/network" | "/news" | "/projects" | "/projects/[slug]" | "/repository" | "/services" | "/team-members" | "/team-members/[slug]";
		RouteParams(): {
			"/projects/[slug]": { slug: string };
			"/team-members/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string };
			"/about": Record<string, never>;
			"/api": Record<string, never>;
			"/api/coordinators": Record<string, never>;
			"/api/news": Record<string, never>;
			"/api/partners": Record<string, never>;
			"/api/programs": Record<string, never>;
			"/api/projects": Record<string, never>;
			"/api/team-members": Record<string, never>;
			"/blog": Record<string, never>;
			"/events": Record<string, never>;
			"/main-page": Record<string, never>;
			"/network": Record<string, never>;
			"/news": Record<string, never>;
			"/projects": { slug?: string };
			"/projects/[slug]": { slug: string };
			"/repository": Record<string, never>;
			"/services": Record<string, never>;
			"/team-members": { slug?: string };
			"/team-members/[slug]": { slug: string }
		};
		Pathname(): "/" | "/about" | "/about/" | "/api" | "/api/" | "/api/coordinators" | "/api/coordinators/" | "/api/news" | "/api/news/" | "/api/partners" | "/api/partners/" | "/api/programs" | "/api/programs/" | "/api/projects" | "/api/projects/" | "/api/team-members" | "/api/team-members/" | "/blog" | "/blog/" | "/events" | "/events/" | "/main-page" | "/main-page/" | "/network" | "/network/" | "/news" | "/news/" | "/projects" | "/projects/" | `/projects/${string}` & {} | `/projects/${string}/` & {} | "/repository" | "/repository/" | "/services" | "/services/" | "/team-members" | "/team-members/" | `/team-members/${string}` & {} | `/team-members/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.well-known/appspecific/com.chrome.devtools.json" | "/favicon.png" | string & {};
	}
}