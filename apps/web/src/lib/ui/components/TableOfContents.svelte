<script>
    import ListBullets from 'phosphor-svelte/lib/ListBullets';
    import { extractHeadings } from '$lib/convertHtml';
    import { twMerge } from "tailwind-merge";
    import { tick } from "svelte";

    /** @type {{ content: any, class?: string }} */
    let { content, class: className = '' } = $props();

    let activeId = $state('');
    /** @type {HTMLElement | null} */
    let navElement = $state(null);
    let indicatorTop = $state(0);
    let indicatorHeight = $state(0);
    let indicatorVisible = $state(false);

    /** When true, the IntersectionObserver won't update activeId */
    let isScrolling = false;
    /** @type {ReturnType<typeof setTimeout> | null} */
    let scrollTimeout = null;

    const headings = $derived(extractHeadings(content));

    /**
     * Update the sliding indicator position based on the active heading.
     */
    async function updateIndicator() {
        await tick();
        if (!activeId || !navElement) {
            indicatorVisible = false;
            return;
        }

        const activeLink = navElement.querySelector(`[data-heading-id="${CSS.escape(activeId)}"]`);
        if (activeLink) {
            const navRect = navElement.getBoundingClientRect();
            const linkRect = activeLink.getBoundingClientRect();
            indicatorTop = linkRect.top - navRect.top;
            indicatorHeight = linkRect.height;
            indicatorVisible = true;
        } else {
            indicatorVisible = false;
        }
    }

    // Update indicator whenever activeId changes
    $effect(() => {
        const _ = activeId;
        updateIndicator();
    });

    // Set up IntersectionObserver reactively — re-runs when headings change
    $effect(() => {
        const currentHeadings = headings;
        if (currentHeadings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Skip observer updates while a programmatic scroll is in progress
                if (isScrolling) return;

                const visibleEntries = entries.filter(entry => entry.isIntersecting);

                if (visibleEntries.length > 0) {
                    const topEntry = visibleEntries.reduce((prev, curr) =>
                        prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
                    );
                    activeId = topEntry.target.id;
                } else {
                    const allHeadingElements = currentHeadings
                        .map(h => document.getElementById(h.id))
                        .filter(/** @param {any} el */ (el) => Boolean(el));

                    const aboveViewport = allHeadingElements.filter(el => {
                        const rect = el.getBoundingClientRect();
                        return rect.top < 150;
                    });

                    if (aboveViewport.length > 0) {
                        activeId = aboveViewport[aboveViewport.length - 1].id;
                    }
                }
            },
            {
                rootMargin: '-100px 0px -66% 0px',
                threshold: [0, 1]
            }
        );

        tick().then(() => {
            currentHeadings.forEach(heading => {
                const element = document.getElementById(heading.id);
                if (element) {
                    observer.observe(element);
                }
            });

            // Restore from URL hash, or default to first heading
            const hash = window.location.hash.slice(1);
            if (hash && currentHeadings.some(h => h.id === hash)) {
                activeId = hash;
            } else if (!activeId && currentHeadings.length > 0) {
                activeId = currentHeadings[0].id;
            }
        });

        return () => {
            observer.disconnect();
        };
    });

    /**
     * Smoothly scroll to a heading element by ID.
     * @param {MouseEvent} event
     * @param {string} id
     */
    function scrollToHeading(event, id) {
        event.preventDefault();

        const element = document.getElementById(id);
        if (!element) return;

        // Lock the observer so intermediate headings don't hijack activeId
        isScrolling = true;
        if (scrollTimeout) clearTimeout(scrollTimeout);

        // Set the active heading immediately for instant indicator feedback
        activeId = id;
        history.pushState(null, '', `#${id}`);

        const offset = 100;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });

        // Re-enable the observer after scrolling settles.
        // We listen for scroll-end since there's no native "scrollend" event
        // in all browsers yet; a debounced timeout is the safest approach.
        const unlockObserver = () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
                window.removeEventListener('scroll', unlockObserver);
            }, 150);
        };

        window.addEventListener('scroll', unlockObserver, { passive: true });

        // Safety net: unlock after max 1.5s even if scroll events stop early
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            window.removeEventListener('scroll', unlockObserver);
        }, 1500);
    }
</script>

{#if headings.length > 0}
    <div class={twMerge("w-full", className)}>
        <div class="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-foreground">
            <ListBullets class="text-lg" />
            Table of Contents
        </div>

        <nav bind:this={navElement} class="relative space-y-1 pl-4" aria-label="Table of contents">
            <!-- Static border -->
            <div class="absolute left-0 top-0 bottom-0 w-[2px] bg-border"></div>

            <!-- Animated indicator -->
            <div
                class="absolute left-0 w-[2px] bg-primary rounded-full transition-all duration-300 ease-out"
                style="top: {indicatorTop}px; height: {indicatorHeight}px; opacity: {indicatorVisible ? 1 : 0};"
            ></div>

            {#each headings as heading (heading.id)}
                <a
                    href="#{heading.id}"
                    data-heading-id={heading.id}
                    onclick={(e) => scrollToHeading(e, heading.id)}
                    class={twMerge(
                        "block w-full text-left py-1 transition-all duration-300 no-underline",
                        heading.level === 2 ? 'font-medium' : '',
                        heading.level === 3 ? 'pl-3 text-sm' : '',
                        heading.level === 4 ? 'pl-6 text-sm' : '',
                        activeId === heading.id
                            ? 'text-primary font-semibold translate-x-1'
                            : 'text-muted-foreground hover:text-primary hover:translate-x-0.5'
                    )}
                >
                    {heading.text}
                </a>
            {/each}
        </nav>
    </div>
{/if}