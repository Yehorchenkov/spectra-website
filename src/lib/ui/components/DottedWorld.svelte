<script>
    import { onMount } from 'svelte';
    import DottedMap from 'dotted-map/without-countries';
    import precomputedMap from '$lib/maps/world-60-vertical.json';
    import { Tooltip } from 'bits-ui';

    let {
        partners = [],
        shape = 'circle',
        backgroundColor = 'background',
        defaultDotColor = 'border',
        defaultDotRadius = 0.3,
        defaultPinRadius = 0.6,
        defaultPinColor = 'primary',
        class: className = ''
    } = $props();

    let svg = $state('');
    let currentTheme = $state('');
    let windowWidth = $state(1024);
    let isTooltipOpen = $state(false);
    let customAnchor = $state(null);
    let hoveredPin = $state(null);

    // Derived responsive pin radius multiplier
    const pinRadiusMultiplier = $derived(
        windowWidth < 640 ? 1.8 : windowWidth < 1024 ? 1.4 : 1
    );

    const getCSSColor = (name) =>
        typeof window === 'undefined'
            ? name
            : getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim() || name;

    const getResponsivePinRadius = (baseRadius) => baseRadius * pinRadiusMultiplier;

    const createPulseRing = (x, y, r, fill, strokeWidth, delay = '') => `
        <circle cx="${x}" cy="${y}" r="${r}" 
            fill="none" stroke="${fill}" stroke-width="${strokeWidth}" 
            opacity="0.5" pointer-events="none">
            <animate attributeName="r" values="${r};${r * 2.5}" dur="2s" ${delay}repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0" dur="2s" ${delay}repeatCount="indefinite"/>
            <animate attributeName="stroke-width" values="${strokeWidth};0" dur="2s" ${delay}repeatCount="indefinite"/>
        </circle>`;

    const createPinSVG = (x, y, data) => {
        const r = getResponsivePinRadius(data?.radius ?? defaultPinRadius);
        const fill = getCSSColor(data?.color ?? defaultPinColor);
        const pulse = data?.pulse !== false;
        const strokeWidth = r * 0.2;
        const encodedData = encodeURIComponent(JSON.stringify(data));

        const breatheAnimation = pulse
            ? `<animate attributeName="r" values="${r * 0.95};${r};${r * 0.95}" 
                dur="2s" repeatCount="indefinite" calcMode="spline" 
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"/>`
            : '';

        const pulseRings = pulse
            ? createPulseRing(x, y, r, fill, strokeWidth) +
                createPulseRing(x, y, r, fill, strokeWidth, 'begin="1s" ')
            : '';

        return `
            <g class="pin">
                <circle cx="${x}" cy="${y}" r="${r * 1.5}" fill="transparent" style="cursor:pointer"
                    onmouseenter="window.dottedMapHandlePin(event,'${encodedData}',true)"
                    onmouseleave="window.dottedMapHandlePin(event,'${encodedData}',false)"
                    aria-label="${data?.label ?? ''}"/>
                <circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" pointer-events="none">
                    ${breatheAnimation}
                </circle>
                ${pulseRings}
            </g>`;
    };

    const renderMap = () => {
        const map = new DottedMap({ map: precomputedMap });

        partners.forEach((pin) => {
            if (pin?.lat != null && pin?.lon != null) {
                map.addPin({
                    lat: pin.lat,
                    lng: pin.lon,
                    svgOptions: {
                        color: getCSSColor(pin.color || defaultPinColor),
                        radius: pin.radius ?? defaultPinRadius
                    },
                    data: pin
                });
            }
        });

        const baseSvg = map.getSVG({
            shape,
            backgroundColor: getCSSColor(backgroundColor),
            color: getCSSColor(defaultDotColor),
            radius: defaultDotRadius
        });

        const pins = map.getPoints().filter((p) => p.data);
        const pinsOverlay = `<g data-layer="pins-top">${pins.map((p) => createPinSVG(p.x, p.y, p.data)).join('')}</g>`;

        svg = baseSvg.replace('</svg>', `${pinsOverlay}</svg>`);
        currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    };

    onMount(() => {
        windowWidth = window.innerWidth;
        renderMap();

        window.dottedMapHandlePin = (event, encodedData, isEnter) => {
            try {
                const pinData = JSON.parse(decodeURIComponent(encodedData));
                if (isEnter) {
                    customAnchor = event.currentTarget;
                    hoveredPin = pinData;
                    isTooltipOpen = true;
                } else {
                    isTooltipOpen = false;
                    hoveredPin = null;
                }
            } catch (e) {
                console.error('Error handling pin event', e);
            }
        };

        const observer = new MutationObserver(() => {
            const newTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            if (newTheme !== currentTheme) renderMap();
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        const onResize = () => {
            windowWidth = window.innerWidth;
            renderMap();
        };
        window.addEventListener('resize', onResize);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', onResize);
            delete window.dottedMapHandlePin;
        };
    });

    // Re-render when partners change
    $effect(() => {
        if (partners && typeof window !== 'undefined') {
            renderMap();
        }
    });
</script>

<div class="aspect-[2/1] w-full {className}">
    <div class="h-full w-full [&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain">
        {@html svg}
    </div>
</div>

<Tooltip.Provider>
    <Tooltip.Root open={isTooltipOpen}>
        <Tooltip.Trigger asChild>
            <span class="sr-only">Tooltip trigger</span>
        </Tooltip.Trigger>
        <Tooltip.Content
            {customAnchor}
            side="top"
            class="z-10 max-w-sm rounded-lg border border-border bg-popover p-3 shadow-sm"
        >
            {#if hoveredPin}
                <p class="font-medium text-popover-foreground">{hoveredPin.name || 'Partner'}</p>
                {#if hoveredPin.city}
                    <p class="text-sm text-popover-foreground/80">{hoveredPin.city}</p>
                {/if}
            {:else}
                <p>Partner information</p>
            {/if}
        </Tooltip.Content>
    </Tooltip.Root>
</Tooltip.Provider>
