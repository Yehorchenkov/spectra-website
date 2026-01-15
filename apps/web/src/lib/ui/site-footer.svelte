<script>
    import Envelope from 'phosphor-svelte/lib/Envelope';
    import MapPin from 'phosphor-svelte/lib/MapPin';
    import IconNav from "$lib/ui/header/icon-nav.svelte";
    import ButtonLink from "$lib/ui/components/ButtonLink.svelte";
    import SocialIcon from "$lib/ui/components/SocialIcon.svelte";
    import { getLinkUrl } from '$lib/utils/helpers';

    let { footer } = $props();

    // Safely derive arrays to avoid undefined errors
    const quickLinks = $derived(footer?.quickLinks || []);
    const bottomLinks = $derived(footer?.bottomLinks || []);
    const socialLinks = $derived(footer?.socialLinks || []);
</script>

<footer class="bg-muted border-t border-border mt-auto w-full">
    <div class="w-full max-w-screen-xl mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- Brand & Logo -->
            <div class="space-y-4 md:col-span-2">
                <IconNav class="flex!" />
                {#if footer?.brandDescription}
                    <p class="text-sm text-muted-foreground leading-relaxed max-w-sm">
                        {footer.brandDescription}
                    </p>
                {/if}
            </div>

            <!-- Quick Links -->
            {#if quickLinks.length > 0}
                <div class="space-y-4">
                    <h4 class="text-sm font-semibold text-foreground uppercase tracking-wider">Quick Links</h4>
                    <nav class="flex flex-col space-y-2">
                        {#each quickLinks as item (item.id)}
                            {#if item.link}
                                <ButtonLink 
                                    href={getLinkUrl(item.link)} 
                                    external={item.link.newTab}
                                    variant="muted" 
                                    size="sm"
                                >
                                    {item.link.label}
                                </ButtonLink>
                            {/if}
                        {/each}
                    </nav>
                </div>
            {/if}

            <!-- Contact -->
            <div class="space-y-4">
                <h4 class="text-sm font-semibold text-foreground uppercase tracking-wider">Contact</h4>
                <div class="space-y-3">
                    {#if footer?.contact?.email}
                        <ButtonLink href="mailto:{footer.contact.email}" variant="muted" size="sm">
                            {#snippet icon()}
                                <Envelope class="text-lg" />
                            {/snippet}
                            {footer.contact.email}
                        </ButtonLink>
                    {/if}
                    {#if footer?.contact?.location}
                        <div class="flex items-start gap-1 text-sm text-muted-foreground">
                            <MapPin class="text-lg shrink-0 mt-0.5" />
                            <span>{footer.contact.location}</span>
                        </div>
                    {/if}
                </div>

                <!-- Social Links -->
                {#if socialLinks.length > 0}
                    <div class="flex items-center gap-3 pt-2">
                        {#each socialLinks as social (social.id)}
                            <a 
                                href={social.url} 
                                target="_blank" 
                                rel="noreferrer"
                                class="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                                aria-label={social.platform?.platformName || 'Social Media'}
                            >
                                {#if social.platform?.platformName}
                                    <SocialIcon platform={social.platform.platformName} class="text-lg" />
                                {/if}
                            </a>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            {#if footer?.copyrightText}
                <p class="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} {footer.copyrightText}
                </p>
            {/if}
            
            {#if bottomLinks.length > 0}
                <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    {#each bottomLinks as item, i (item.id)}
                        {#if i > 0}
                            <span class="text-muted-foreground">•</span>
                        {/if}
                        {#if item.link}
                            <ButtonLink 
                                href={getLinkUrl(item.link)} 
                                external={item.link.newTab}
                                variant="muted" 
                                size="sm"
                            >
                                {item.link.label}
                            </ButtonLink>
                        {/if}
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</footer>