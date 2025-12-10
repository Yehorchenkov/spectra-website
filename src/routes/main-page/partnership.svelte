<script>
	import DottedWorld from '$lib/ui/components/DottedWorld.svelte';

	let { data } = $props();
</script>

<div class="w-full">
	<DottedWorld partners={data.docs} shape="circle" />
</div>
