<script>
	import DottedWorld from '$lib/ui/components/DottedWorld.svelte';

	let { data } = $props();
	const partners = $derived(data?.docs ?? []);
</script>

<div class="w-full">
	{#if partners.length}
		<DottedWorld partners={partners} shape="circle" />
	{/if}
</div>
