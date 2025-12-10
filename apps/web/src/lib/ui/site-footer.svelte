<script>
    import { siteConfig } from "$lib/config/site.js";
    import Envelope from 'phosphor-svelte/lib/Envelope';
    import MapPin from 'phosphor-svelte/lib/MapPin';
    import LinkedinLogo from 'phosphor-svelte/lib/LinkedinLogo';
    import XLogo from 'phosphor-svelte/lib/TwitterLogo';
    import FacebookLogo from 'phosphor-svelte/lib/FacebookLogo';
    import IconNav from "$lib/ui/header/icon-nav.svelte";
    import ButtonLink from "$lib/ui/components/ButtonLink.svelte";
</script>

<footer class="bg-muted border-t border-border mt-auto w-full">
    <div class="w-full max-w-screen-xl mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- Brand & Logo -->
            <div class="space-y-4 md:col-span-2">
                <IconNav class="!flex" />
                <p class="text-sm text-muted-foreground leading-relaxed max-w-sm">
                    Centre of Excellence for advancing research, innovation, and education across Europe and Ukraine.
                </p>
            </div>

            <!-- Quick Links -->
            <div class="space-y-4">
                <h4 class="text-sm font-semibold text-foreground uppercase tracking-wider">Quick Links</h4>
                <nav class="flex flex-col space-y-2">
                    <ButtonLink href="/projects" variant="muted" size="sm">Projects</ButtonLink>
                    <ButtonLink href="/team-members" variant="muted" size="sm">Team</ButtonLink>
                    <ButtonLink href="/publications" variant="muted" size="sm">Publications</ButtonLink>
                    <ButtonLink href="/about" variant="muted" size="sm">About Us</ButtonLink>
                </nav>
            </div>

            <!-- Contact -->
            <div class="space-y-4">
                <h4 class="text-sm font-semibold text-foreground uppercase tracking-wider">Contact</h4>
                <div class="space-y-3">
                    <ButtonLink href="mailto:contact@spectra-ce.eu" variant="muted" size="sm">
                        {#snippet icon()}
                            <Envelope class="text-lg" />
                        {/snippet}
                        contact@spectra-ce.eu
                    </ButtonLink>
                    <div class="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin class="text-lg shrink-0 mt-0.5" />
                        <span>Kyiv, Ukraine</span>
                    </div>
                </div>

                <!-- Social Links -->
                <div class="flex items-center gap-3 pt-2">
                    <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noreferrer"
                        class="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label="LinkedIn"
                    >
                        <LinkedinLogo class="text-lg" />
                    </a>
                    <a 
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noreferrer"
                        class="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label="X (Twitter)"
                    >
                        <XLogo class="text-lg" />
                    </a>
                    <a 
                        href="https://facebook.com" 
                        target="_blank" 
                        rel="noreferrer"
                        class="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label="Facebook"
                    >
                        <FacebookLogo class="text-lg" />
                    </a>
                </div>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Spectra Centre of Excellence EU. All rights reserved.
            </p>
            <div class="flex items-center gap-4 text-sm">
                <ButtonLink href="/privacy" variant="muted" size="sm">Privacy Policy</ButtonLink>
                <span class="text-muted-foreground">•</span>
                <ButtonLink href="https://www.bits-ui.com" external variant="muted" size="sm">
                    Built with Bits UI
                </ButtonLink>
                <span class="text-muted-foreground">•</span>
                <ButtonLink href="https://payloadcms.com" external variant="muted" size="sm">
                    Powered by Payload CMS
                </ButtonLink>
            </div>
        </div>
    </div>
</footer>