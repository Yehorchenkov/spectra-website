<script>
	import Hero from './main-page/hero.svelte';
	import News from './main-page/news.svelte';
	import Partnership from './main-page/partnership.svelte';
	import Projects from './main-page/projects.svelte';
	import Team from './main-page/team.svelte';
	import SEO from '$lib/SEO.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();
	let showScrollIndicator = $state(true);

	function scrollToContent() {
		window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
	}

	onMount(() => {
		function handleScroll() {
			showScrollIndicator = window.scrollY < 50;
		}

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<SEO
	title={data.heroData?.meta.title}
	description={data.heroData?.meta.description}
	collection="Home Page"
	stripBrand={false}
/>

<div class="">
	<Hero heroContent={data.heroData} />
</div>

<!-- Scroll indicator - visible only on large screens, hides on scroll -->
{#if showScrollIndicator}
	<div class="hidden lg:flex justify-center fixed bottom-2 left-0 right-0 z-10 transition-opacity duration-300">
		<button
			onclick={scrollToContent}
			class="animate-bounce text-primary hover:text-foreground transition-colors cursor-pointer"
			aria-label="Scroll down"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-10 w-10"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
			</svg>
		</button>
	</div>
{/if}

<div class="mt-4 md:mt-8 lg:mt-16">
	<div class="mx-auto flex max-w-screen-xl flex-col items-center px-4 lg:px-6">
		<h2 class="text-foreground mb-4 text-center text-2xl font-extrabold lg:text-4xl">News</h2>
		<News newsData={data.newsData}/>
	</div>
</div>

<!-- <div class="mt-4 md:mt-16 lg:mt-24">
	<div class="mx-auto flex max-w-screen-xl flex-col items-center px-4 lg:px-6">
		<h2 class="text-foreground mb-4 text-center text-2xl font-medium uppercase lg:text-4xl">Projects</h2>
		<Projects />
	</div>
</div> -->

<div class="mt-4 md:mt-8 lg:mt-16">
	<div class="mx-auto flex max-w-screen-xl flex-col items-center px-4 lg:px-6">
		<h2 class="text-foreground mb-4 text-center text-2xl font-extrabold lg:text-4xl">Our Partnership</h2>
		<Partnership data={data.partnersData}/>
	</div>
</div>

<div class="mt-4 md:mt-8 lg:mt-16">
	<div class="mx-auto flex max-w-screen-xl flex-col items-center px-4 lg:px-6">
		<h2 class="text-foreground mb-8 text-center text-2xl font-extrabold lg:text-4xl">Our Team</h2>
		<Team data={data.teamMembersData}/>
	</div>
</div>
