<script>
	import '$lib/styles/app.css';
	// import '$lib/styles/debug.css'

	import { ModeWatcher } from 'mode-watcher';
	import SiteHeader from '$lib/ui/site-header.svelte';
	import SiteFooter from '$lib/ui/site-footer.svelte';

	let { children } = $props();
</script>

<ModeWatcher />

<SiteHeader />

<div class="pt-24">
	{@render children()}
</div>

<SiteFooter />
