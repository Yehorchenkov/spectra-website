<script>
    import FacebookLogo from 'phosphor-svelte/lib/FacebookLogo';
    import InstagramLogo from 'phosphor-svelte/lib/InstagramLogo';
    import XLogo from 'phosphor-svelte/lib/XLogo';
    import LinkedinLogo from 'phosphor-svelte/lib/LinkedinLogo';
    import YoutubeLogo from 'phosphor-svelte/lib/YoutubeLogo';
    import Globe from 'phosphor-svelte/lib/Globe';
    import Link from 'phosphor-svelte/lib/Link';

    /** @type {{ platform: string, class?: string }} */
    let { platform, class: className = '' } = $props();

    const iconMap = {
        facebook: FacebookLogo,
        instagram: InstagramLogo,
        x: XLogo,
        twitter: XLogo,
        linkedin: LinkedinLogo,
        youtube: YoutubeLogo,
        website: Globe
    };

    const IconComponent = $derived(
        iconMap[platform?.toLowerCase()] || Link
    );
</script>

<IconComponent class={className} />