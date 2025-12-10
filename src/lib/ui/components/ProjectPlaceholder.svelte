<script>
    let { class: className = '', acronym } = $props();
</script>

<div class="{className}">
    <svg class="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0EA5E9"/>
          <stop offset="100%" stop-color="#6366F1"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#grad)"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
            font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            font-size="120" fill="white" font-weight="700" letter-spacing="4">
        {acronym ? acronym : 'ACRONYM'}
      </text>
    </svg>
</div>