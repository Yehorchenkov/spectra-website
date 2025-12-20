<script>
  import Badge from '$lib/ui/components/Badge.svelte';
  import { twMerge } from 'tailwind-merge';

  let {
    label,
    href,
    class: className = ''
  } = $props();
</script>

{#if label}
  <Badge
    as={href ? 'a' : 'span'}
    href={href}
    className={twMerge(
      'bg-primary/10 text-primary px-2 py-0.5 text-xs',
      href ? 'hover:bg-primary/20' : '',
      className
    )}
  >
    {label}
  </Badge>
{/if}
