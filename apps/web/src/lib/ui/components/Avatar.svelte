<script>
    import placeholderAvatar from '$lib/images/cat_placeholder.jpg';
    import placeholderAvatarThumbnail from '$lib/images/cat_placeholder-100x100.jpg';

    let { 
        class: className, 
        photo, 
        variant = 'full' // 'full' | 'thumbnail'
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
</script>

<img
    class={"rounded-full shadow-lg object-cover " + (className ?? defaultSize)}
    src={src}
    alt={photo?.url ? "Avatar" : 'Avatar placeholder'}
/>