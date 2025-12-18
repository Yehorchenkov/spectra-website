<script>
    import ListBullets from 'phosphor-svelte/lib/ListBullets';
    import { extractHeadings } from '$lib/convertHtml';
    import { twMerge } from "tailwind-merge";
    import { onMount, onDestroy, tick } from "svelte";

    /** @type {{ content: any, class?: string }} */
    let { content, class: className = '' } = $props();

    let activeId = $state('');
    let navElement = $state(null);
    let indicatorTop = $state(0);
    let indicatorHeight = $state(0);
    let indicatorVisible = $state(false);

    const headings = $derived(extractHeadings(content));

    let observer = null;

    // Update indicator position when activeId changes
    async function updateIndicator() {
        await tick();
        if (!activeId || !navElement) {
            indicatorVisible = false;
            return;
        }
        
        const activeButton = navElement.querySelector(`[data-heading-id="${activeId}"]`);
        if (activeButton) {
            const navRect = navElement.getBoundingClientRect();
            const buttonRect = activeButton.getBoundingClientRect();
            indicatorTop = buttonRect.top - navRect.top;
            indicatorHeight = buttonRect.height;
            indicatorVisible = true;
        }
    }

    // Watch for activeId changes
    $effect(() => {
        if (activeId) {
            updateIndicator();
        }
    });

    onMount(() => {
        observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter(entry => entry.isIntersecting);
                
                if (visibleEntries.length > 0) {
                    const topEntry = visibleEntries.reduce((prev, curr) => {
                        return prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr;
                    });
                    activeId = topEntry.target.id;
                } else {
                    const allHeadingElements = headings
                        .map(h => document.getElementById(h.id))
                        .filter(Boolean);
                    
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

        setTimeout(() => {
            headings.forEach(heading => {
                const element = document.getElementById(heading.id);
                if (element) {
                    observer.observe(element);
                }
            });
            // Set initial active heading
            if (headings.length > 0) {
                activeId = headings[0].id;
            }
        }, 100);
    });

    onDestroy(() => {
        if (observer) {
            observer.disconnect();
        }
    });

    const scrollToHeading = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const top = element.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };
</script>

{#if headings.length > 0}
    <div class={twMerge("w-full", className)}>
        <div class="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-foreground">
            <ListBullets class="text-lg" />
            Table of Contents
        </div>
        
        <nav bind:this={navElement} class="relative space-y-1 pl-4">
            <!-- Static border -->
            <div class="absolute left-0 top-0 bottom-0 w-[2px] bg-border"></div>
            
            <!-- Animated indicator -->
            <div 
                class="absolute left-0 w-[2px] bg-primary rounded-full transition-all duration-300 ease-out"
                style="top: {indicatorTop}px; height: {indicatorHeight}px; opacity: {indicatorVisible ? 1 : 0};"
            ></div>
            
            {#each headings as heading}
                <button
                    data-heading-id={heading.id}
                    onclick={() => scrollToHeading(heading.id)}
                    class={twMerge(
                        "block w-full text-left text-sm py-1 transition-all duration-300",
                        heading.level === 2 ? 'font-medium' : '',
                        heading.level === 3 ? 'pl-3 text-xs' : '',
                        heading.level === 4 ? 'pl-6 text-xs' : '',
                        activeId === heading.id 
                            ? 'text-primary font-semibold translate-x-1' 
                            : 'text-muted-foreground hover:text-primary hover:translate-x-0.5'
                    )}
                >
                    {heading.text}
                </button>
            {/each}
        </nav>
    </div>
{/if}