<script>
	import ButtonRefAnim from '$lib/ui/components/ButtonRefAnim.svelte';
	import RichTextRenderer from '$lib/RichTextRenderer.svelte';

	let { heroContent } = $props();
	let { title, description, image } = $derived(heroContent);
</script>

<div
	class="relative mx-auto flex flex-col items-center lg:mt-12 lg:mb-0 lg:max-w-5xl lg:flex-row-reverse xl:max-w-6xl"
>
	<!-- Image Column -->
	<div class="h-64 w-full lg:h-auto lg:w-1/2">
		<img
			src={image ? image.url : "$lib/images/hero.jpg"}
			alt={image?.alt ?? 'Hero'}
			class="h-full w-full rounded-lg object-cover shadow-md"
			fetchpriority="high"
		/>
	</div>
	<!-- Close Image Column -->

	<!-- Text Column -->
	<div
		class="bg-card text-card-foreground max-w-lg md:top-0 md:z-10 md:-mt-24 md:max-w-2xl md:rounded-lg md:shadow-lg lg:mt-0 lg:-mr-16 lg:w-3/5 lg:self-center"
	>
		<!-- Text Wrapper -->
		<div class="flex flex-col p-12 md:px-16">
			<h2 class="text-foreground text-center text-2xl font-medium uppercase md:text-left lg:text-3xl">
				{title}
			</h2>
			<div class="prose dark:prose-invert mt-4 text-justify text-lg">
				<RichTextRenderer content={description} />
			</div>

			<div class="mt-8 flex items-center justify-between px-6 space-x-3">
				<ButtonRefAnim href="/about" class="w-36" text="About Us" />
				<ButtonRefAnim href="/network" class="w-36" text="Our Network" />
			</div>
		</div>
		<!-- Close Text Wrapper -->
	</div>
	<!-- Close Text Column -->
</div>
