<script>
    import RichTextRenderer from '$lib/RichTextRenderer.svelte';
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
        <article class="grid grid-cols-1 gap-8">
            <!-- Header -->
            <header class="space-y-4">
                <h1 class="text-2xl font-bold text-primary">{data.privacyData.title}</h1>
                
                {#if data.privacyData.lastUpdated}
                    <p class="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDots class="text-lg" />
                        <span>Last updated: {formatDate(data.privacyData.lastUpdated)}</span>
                    </p>
                {/if}
            </header>

            <!-- Content -->
            <main class="border-t border-border pt-8">
                <div class="prose dark:prose-invert max-w-none text-foreground">
                    <RichTextRenderer content={data.privacyData.content} />
                </div>
            </main>
        </article>
    </div>
{:else}
    <div class="flex justify-center items-center h-64">
        <p class="text-muted-foreground">Privacy policy not available.</p>
    </div>
{/if}