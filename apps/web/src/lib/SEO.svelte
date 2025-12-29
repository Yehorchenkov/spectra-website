<script>
  import { siteConfig } from '$lib/config/site';
  import { page } from '$app/state';
  import { normalizePath } from '$lib/utils/seoFactory';

  // Destructure all props properly
  let {
    title,
    description = siteConfig.description,
    canonical,
    noindex = false,
    manualOgImage,
    collection = 'Page',
    keywords = siteConfig.keywords,
    type = 'website'
  } = $props();

  const baseUrl = siteConfig.url.replace(/\/$/, '');

  // Auto-generate canonical if one isn't provided
  const finalCanonical = $derived.by(() => canonical ?? `${baseUrl}${normalizePath(page.url.pathname)}`);

  const finalTitle = $derived.by(() => title ?? siteConfig.name);

  const ogImageUrl = $derived.by(() => {
    if (manualOgImage) return manualOgImage;
    const params = new URLSearchParams();
    // Use the title but strip the brand if you want cleaner OG images
    const cleanTitle = finalTitle.split(siteConfig.brandSuffix || ' - ')[0];
    params.set('title', cleanTitle);
    params.set('category', collection);
    return `${baseUrl}/api/og?${params.toString()}`;
  });
</script>

<svelte:head>
  <title>{finalTitle}</title>
  <meta name="description" content={description} />
  {#if noindex}
    <meta name="robots" content="noindex,nofollow" />
  {/if}
  <meta name="keywords" content={keywords} />
  <link rel="canonical" href={finalCanonical} />

  <!-- Open Graph -->
  <meta property="og:site_name" content={siteConfig.name} />
  <meta property="og:url" content={finalCanonical} />
  <meta property="og:title" content={finalTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content={type} />
  <meta property="og:image" content={ogImageUrl} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={finalTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImageUrl} />
</svelte:head>