<script>
    import ButtonLink from '$lib/ui/components/ButtonLink.svelte';
    import Avatar from '$lib/ui/components/Avatar.svelte';
    import RichTextRenderer from '$lib/RichTextRenderer.svelte';
    import ProjectStateBadge from '$lib/ui/components/ProjectStateBadge.svelte';
    import SocialIcon from '$lib/ui/components/SocialIcon.svelte';
    import SEO from '$lib/SEO.svelte';

    import { Button } from 'bits-ui';

    // Import Phosphor icons for social media platforms
    import Envelope from 'phosphor-svelte/lib/Envelope';
    import Building from 'phosphor-svelte/lib/Building';
    import Globe from 'phosphor-svelte/lib/Globe';
    import Link from 'phosphor-svelte/lib/Link';
    import FunnelSimple from 'phosphor-svelte/lib/FunnelSimple';

    let { data } = $props();

    let subcentre = $derived(data.subcentre);
</script>

<SEO
    title={subcentre.meta?.title || subcentre?.name || 'Subcentre Profile'}
    description={subcentre.meta?.description || `Profile of ${subcentre?.name || 'our subcentre'}`}
    collection={subcentre.meta?.label || 'Subcentres'}
/>

{#if subcentre}
    <div class="w-full max-w-screen-xl mx-auto p-4 md:p-8 font-sans">
        <article class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column: Photo, Contact, Links -->
            <aside class="lg:col-span-1 flex flex-col items-center lg:items-start space-y-6">
                <img 
                        src={subcentre.logo?.url} alt={subcentre.logo?.alt || subcentre.title + " logo"} 
                        class="mx-auto mb-4 h-36 w-full object-contain" 
                    />
                <div class="text-center lg:text-left w-full">
                    <h1 class="text-xl font-bold text-foreground">{subcentre.title}</h1>
                    <!-- <p class="text-lg text-primary">{teamMember.title}</p> -->
                </div>

                <div class="w-full space-y-3 pt-4 border-t border-border">
                    <h3 class="text-md font-semibold text-muted-foreground uppercase tracking-wider">
                        Head of the Subcentre
                    </h3>
                    <ButtonLink
                            class="gap-3"
                            href="/team-members/{subcentre.head.slug}"
                        >
                            {#snippet icon()}
                                <Avatar photo={subcentre.head.photo} class="size-8" />
                            {/snippet}
                            {subcentre.head.name}
                    </ButtonLink>
                </div>
            </aside>

            <!-- Right Column: Profile -->
            <main class="lg:col-span-2 space-y-8">
                <section>
                    <h2 class="text-2xl font-bold text-foreground border-b-2 border-primary pb-2 mb-4">
                        Profile
                    </h2>
                    <div class="prose dark:prose-invert max-w-none text-foreground">
                        <RichTextRenderer content={subcentre.content} />
                    </div>
                </section>
            </main>
        </article>
    </div>
{:else}
    <div class="flex justify-center items-center h-64">
        <p class="text-muted-foreground">Subcentre not found.</p>
    </div>
{/if}

