<script>
    import RichTextRenderer from '$lib/RichTextRenderer.svelte';
    import TableOfContents from '$lib/ui/components/TableOfContents.svelte';
    import CalendarDots from 'phosphor-svelte/lib/CalendarDots';
    import SEO from '$lib/SEO.svelte';
    import { formatDateLong } from '$lib/utils/dateHelpers';
    
    let { data } = $props();

    let about = $derived(data.aboutData || null);

</script>

<SEO 
    title={about?.meta?.title || 'About Us - SPECTRA'}
    description={about?.meta?.description || 'About SPECTRA Centre of Excellence'}
    collection="About Us"
/>

{#if about}
    <div class="w-full max-w-screen-xl mx-auto p-4 md:p-8 font-sans">
        <!-- Header -->
        <header class="space-y-4 mb-4 border-b-2 border-primary pb-2">
            <h1 class="text-3xl font-bold text-primary">{about.title}</h1>
            
            {#if about.publishedOrUpdatedAt}
                <p class="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDots class="text-lg" />
                    <time datetime={about.publishedOrUpdatedAt}>
                        Last updated: {formatDateLong(about.publishedOrUpdatedAt)}
                    </time>
                </p>
            {/if}
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
            <!-- Content -->
            <main>
                <RichTextRenderer 
                    content={about.content} 
                    class="text-justify"
                />
            </main>

            <!-- Table of Contents - Sticky Sidebar -->
            <aside class="order-first lg:order-last">
                <div class="lg:sticky lg:top-28">
                    <TableOfContents content={about.content} />
                </div>
            </aside>
        </div>
    </div>
{:else}
    <div class="flex justify-center items-center h-64">
        <p class="text-muted-foreground">About Us content not available.</p>
    </div>
{/if}