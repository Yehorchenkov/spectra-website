<script>
    import Envelope from 'phosphor-svelte/lib/Envelope';
    import MapPin from 'phosphor-svelte/lib/MapPin';
    import LinkedinLogo from 'phosphor-svelte/lib/LinkedinLogo';
    import XLogo from 'phosphor-svelte/lib/XLogo';
    import YoutubeLogo from 'phosphor-svelte/lib/YoutubeLogo';
    import FacebookLogo from 'phosphor-svelte/lib/FacebookLogo';
    import InstagramLogo from 'phosphor-svelte/lib/InstagramLogo';
    import IconNav from "$lib/ui/header/icon-nav.svelte";
    import ButtonLink from "$lib/ui/components/ButtonLink.svelte";

    /** @type {{ footer: import('$lib/types').Footer }} */
    let { footer } = $props();

    const socialIcons = {
        linkedin: LinkedinLogo,
        facebook: FacebookLogo,
        X: XLogo,
        youtube: YoutubeLogo,
        instagram: InstagramLogo,
    };
</script>

<footer class="bg-muted border-t border-border mt-auto w-full">
    <div class="w-full max-w-screen-xl mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- Brand & Logo -->
            <div class="space-y-4 md:col-span-2">
                <IconNav class="!flex" />
                {#if footer?.brandDescription}
                    <p class="text-sm text-muted-foreground leading-relaxed max-w-sm">
                        {footer.brandDescription}
                    </p>
                {/if}
            </div>

            <!-- Quick Links -->
            {#if footer?.quickLinks?.length}
                <div class="space-y-4">
                    <h4 class="text-sm font-semibold text-foreground uppercase tracking-wider">Quick Links</h4>
                    <nav class="flex flex-col space-y-2">
                        {#each footer.quickLinks as link}
                            <ButtonLink href={link.href} variant="muted" size="sm">{link.label}</ButtonLink>
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
                        <div class="flex items-start gap-2 text-sm text-muted-foreground">
                            <MapPin class="text-lg shrink-0 mt-0.5" />
                            <span>{footer.contact.location}</span>
                        </div>
                    {/if}
                </div>

                <!-- Social Links -->
                {#if footer?.socialLinks?.length}
                    <div class="flex items-center gap-3 pt-2">
                        {#each footer.socialLinks as social}
                            {@const IconComponent = socialIcons[social.platform]}
                            {#if IconComponent}
                                <a 
                                    href={social.url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    class="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                                    aria-label={social.platform}
                                >
                                    <IconComponent class="text-lg" />
                                </a>
                            {/if}
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
            {#if footer?.bottomLinks?.length}
                <div class="flex items-center gap-4 text-sm">
                    {#each footer.bottomLinks as link, i}
                        {#if i > 0}
                            <span class="text-muted-foreground">•</span>
                        {/if}
                        <ButtonLink 
                            href={link.href} 
                            external={link.external} 
                            variant="muted" 
                            size="sm"
                        >
                            {link.label}
                        </ButtonLink>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</footer>