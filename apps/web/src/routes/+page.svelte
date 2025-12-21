<script>
	import Hero from './main-page/hero.svelte';
	import News from './main-page/news.svelte';
	import Partnership from './main-page/partnership.svelte';
	import Projects from './main-page/projects.svelte';
	import Team from './main-page/team.svelte';

	let { data } = $props();

</script>

<!-- <div class="divide-y-2"> -->
<div class="">
	<Hero heroContent={data.heroData} />
</div>

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
		<h2 class="text-foreground mb-4 text-center text-2xl font-extrabold lg:text-4xl">Our Team</h2>
		<Team data={data.teamMembersData}/>
	</div>
</div>
