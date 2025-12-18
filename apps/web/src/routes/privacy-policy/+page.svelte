<script>
    import RichTextRenderer from '$lib/RichTextRenderer.svelte';
    import TableOfContents from '$lib/ui/components/TableOfContents.svelte';
    import CalendarDots from 'phosphor-svelte/lib/CalendarDots';
    
    let { data } = $props();

    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
</script>

<svelte:head>
    <title>{data.privacyData?.title || 'Privacy Policy'} | SPECTRA CE EU</title>
</svelte:head>

{#if data.privacyData}
    <div class="w-full max-w-screen-xl mx-auto p-4 md:p-8 font-sans">
        <!-- Header -->
        <header class="space-y-4 mb-8">
            <h1 class="text-2xl font-bold text-primary">{data.privacyData.title}</h1>
            
            {#if data.privacyData.lastUpdated}
                <p class="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDots class="text-lg" />
                    <span>Last updated: {formatDate(data.privacyData.lastUpdated)}</span>
                </p>
            {/if}
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
            <!-- Content -->
            <main>
                <RichTextRenderer 
                    content={data.privacyData.content} 
                    class="text-left prose-headings:text-foreground prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-p:my-4 prose-p:leading-relaxed prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6 prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6 prose-li:my-1"
                />
            </main>

            <!-- Table of Contents - Sticky Sidebar -->
            <aside class="order-first lg:order-last">
                <div class="lg:sticky lg:top-28">
                    <TableOfContents content={data.privacyData.content} />
                </div>
            </aside>
        </div>
    </div>
{:else}
    <div class="flex justify-center items-center h-64">
        <p class="text-muted-foreground">Privacy policy not available.</p>
    </div>
{/if}