<script>
	import DottedWorld from '$lib/ui/components/DottedWorld.svelte';
	import ButtonRefAnim from '$lib/ui/components/ButtonRefAnim.svelte';

	let { data } = $props();
	const partners = $derived(data?.docs ?? []);
</script>

<div class="mx-auto w-full text-center">
	<div class="w-full">
		{#if partners.length}
			<DottedWorld partners={partners} shape="circle" />
		{/if}
	</div>
	<div class="mx-auto py-4 lg:py-8">
		<ButtonRefAnim class="ml-4 w-56" href="/partners" text="View all partners" />
	</div>
</div>
