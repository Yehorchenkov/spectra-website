<script>
	import '$lib/styles/app.css';
	// import '$lib/styles/debug.css'

	import { ModeWatcher } from 'mode-watcher';
	import SiteHeader from '$lib/ui/site-header.svelte';
	import SiteFooter from '$lib/ui/site-footer.svelte';

	let { children, data } = $props();

</script>

<ModeWatcher />

<div class="flex min-h-screen flex-col">
	<SiteHeader data={data.headerData}/>

	<main class="grow pt-16 md:pt-32">
		{@render children()}
	</main>

	<SiteFooter footer={data.footerData} />
</div>
