<script>
    import placeholderAvatar from '$lib/images/cat_placeholder.jpg';
    import placeholderAvatarThumbnail from '$lib/images/cat_placeholder-100x100.jpg';

    let {
        class: className,
        photo,
        variant = 'full', // 'full' | 'thumbnail'

        // NEW: optional link + optional hover scaling
        href = undefined,
        target = undefined,
        rel = undefined,
        hoverScale = false,
        ariaLabel = 'Avatar'
    } = $props();

    // Determine source based on variant
    let src = $derived(
        variant === 'thumbnail'
            ? (photo?.thumbnailURL ?? placeholderAvatarThumbnail)
            : (photo?.url ?? placeholderAvatar)
    );

    // Default sizes if no class is provided
    let defaultSize = $derived(
        variant === 'thumbnail' ? 'size-[100px]' : 'size-32'
    );

    let imgBaseClass = $derived(
        "rounded-full shadow-lg object-cover transition-transform duration-200 " +
        (className ?? defaultSize) +
        (hoverScale ? " hover:scale-105" : "")
    );

    // If wrapped in a link, prefer scaling via group-hover so hovering the link triggers it
    let imgClass = $derived(
        href && hoverScale
            ? imgBaseClass.replace(" hover:scale-105", " group-hover:scale-105")
            : imgBaseClass
    );
</script>

{#if href}
    <a
        class="group inline-block"
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
    >
        <img
            class={imgClass}
            src={src}
            alt={photo?.url ? "Avatar" : "Avatar placeholder"}
        />
    </a>
{:else}
    <img
        class={imgClass}
        src={src}
        alt={photo?.url ? "Avatar" : "Avatar placeholder"}
    />
{/if}