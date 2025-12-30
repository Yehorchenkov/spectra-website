<script>
    import ModeToggler from "$lib/ui/header/mode-toggler.svelte";
    import MainNav from "$lib/ui/header/main-nav.svelte";
    import IconNav from "$lib/ui/header/icon-nav.svelte";
    import MobileNav from "$lib/ui/header/mobile-nav.svelte";
    import Search from "$lib/ui/header/search.svelte";

    let y = $state(0);
</script>

<svelte:window bind:scrollY={y} />

<!-- <header class="z-50 top-0 p-2 border-border bg-background fixed w-full backdrop-blur items-end transition-all { y <= 20 ? 'py-2 md:pt-8 md:pb-2' : 'py-2 md:pt-2 md:pb-2 shadow-md dark:shadow-slate-500' }">
    <section class="mx-auto flex w-full max-w-screen-xl items-center justify-between px-3 sm:px-4 lg:px-6">
		<div class="flex items-center gap-2">
			<IconNav />
			<MobileNav />
		</div>

		<div class="hidden items-center space-x-1 md:flex">
			<MainNav />
		</div>

		<div class="flex items-center gap-0 sm:gap-2">
			<Search />
			<ModeToggler />
		</div>
	</section>
</header> -->

<header
	class="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur
	transition-all duration-300 flex items-center
	min-h-16 py-2 md:py-0
	{y > 20
		? 'md:h-16 shadow-md dark:shadow-slate-500/20'
		: 'md:h-32'
	}"
>
	<section class="mx-auto flex w-full max-w-screen-xl items-center justify-between px-3 sm:px-4 lg:px-6">
		<div class="flex items-center gap-2 shrink-0">
			<IconNav />
			<MobileNav />
		</div>

		<div class="hidden items-center space-x-1 md:flex">
			<MainNav />
		</div>

		<div class="flex items-center gap-0 sm:gap-2 shrink-0">
			<Search />
			<ModeToggler />
		</div>
	</section>
</header>
