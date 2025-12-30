<script>
	import '$lib/styles/app.css';
	// import '$lib/styles/debug.css'

	import { ModeWatcher } from 'mode-watcher';
	import SiteHeader from '$lib/ui/site-header.svelte';
	import SiteFooter from '$lib/ui/site-footer.svelte';

	let { children, data } = $props();
</script>

<ModeWatcher />

<SiteHeader />

<div class="pt-16 md:pt-32 overflow-x-hidden">
	{@render children()}
</div>

<SiteFooter footer={data.footerData} />
