<script>
    import ModeToggler from "$lib/ui/header/mode-toggler.svelte";
    import MainNav from "$lib/ui/header/main-nav.svelte";
    import IconNav from "$lib/ui/header/icon-nav.svelte";
    import MobileNav from "$lib/ui/header/mobile-nav.svelte";
    import Search from "$lib/ui/header/search.svelte";

    let y = $state(0);
</script>

<svelte:window bind:scrollY={y} />

<!-- <header class="z-50 top-0 p-2 border-border bg-background dark:bg-backgroundDark fixed w-full backdrop-blur items-end transition-all { y <= 20 ? " pt-8" : " shadow-md dark:shadow-slate-500" }"> -->
<header class="z-50 top-0 p-2 border-border bg-background fixed w-full backdrop-blur items-end transition-all { y <= 20 ? " pt-8" : " shadow-md dark:shadow-slate-500" }">
     <section class="flex mx-auto justify-between items-center max-w-screen-xl">
        <div class="flex">
            <IconNav />
            <MobileNav />
        </div>
        <div class="hidden md:flex items-center space-x-1">
            <MainNav />
        </div>
        <div class="flex items-center">
            <Search />
            <ModeToggler />
        </div>
    </section>
</header>