<script>
  import { siteConfig } from '$lib/config/site';
  import { page } from '$app/state';
  import { dev } from '$app/environment';
  import { normalizePath } from '$lib/utils/seoFactory';

  const OG_IMAGE_VERSION = 4;

  let {
    title,
    description = siteConfig.description,
    canonical,
    noindex = false,
    manualOgImage,
    collection = 'Page',
    keywords = siteConfig.keywords,
    type = 'website',
    stripBrand = false // defaults to keeping the full title
  } = $props();

  // Use local port during development, production URL in build
  const baseUrl = $derived(
    dev ? page.url.origin : siteConfig.url.replace(/\/$/, '')
  );

  const finalCanonical = $derived(canonical ?? `${baseUrl}${normalizePath(page.url.pathname)}`);
  const finalTitle = $derived(title ?? siteConfig.name);

  const ogImageUrl = $derived.by(() => {
    if (manualOgImage) return manualOgImage;

    const params = new URLSearchParams();
    const ogTitle = stripBrand
      ? finalTitle.split(siteConfig.brandSuffix || ' - ')[0].trim()
      : finalTitle;

    params.set('title', ogTitle);
    params.set('category', collection);
    params.set('v', OG_IMAGE_VERSION.toString());

    if (description) {
      const trimmedDesc = description.length > 120 ? `${description.slice(0, 117)}...` : description;
      params.set('desc', trimmedDesc);
    }

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