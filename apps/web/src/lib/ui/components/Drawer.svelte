<script>
    import { Dialog } from 'bits-ui';
    import { cubicOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';
    import { twMerge } from 'tailwind-merge';

    let {
        open = $bindable(false),
        side = 'right',
        title,
        description,
        trigger,
        footer,
        children,
        closeOnOutsideClick = true,
        closeOnEscape = true,
        preventScroll = true,
        scrollBody = true,
        showCloseButton = true,
        swipeEnabled = false,
        swipeOpenFromEdge = false,
        swipeThreshold = 64,
        swipeEdgeZone = 28,
        swipeAxisRatio = 1.25,
        overlayClass = '',
        contentClass = '',
        bodyClass = '',
        headerClass = '',
        footerClass = '',
        showIndicator = false,
        indicatorClass = '',
        indicatorLengthClass = 'h-20',
        indicatorWidthClass = 'w-1.5',
        indicatorColorClass = 'bg-zinc-300',
        indicatorOffsetClass = 'right-3'
    } = $props();

    const SNAP_BACK_TRANSITION = 'transform 0.25s cubic-bezier(0.32, 0.72, 0, 1)';
    const SNAP_BACK_DURATION = 250;
    const TOUCH_OPTIONS_PASSIVE = { passive: true };
    const TOUCH_OPTIONS_ACTIVE = { passive: false };

    const SIDE_CONFIG = {
		left: {
			panelClass: 'inset-y-0 left-0 h-dvh min-h-dvh w-3/4 max-w-md border-r',
			transition: { axis: 'x', sign: -1, duration: 220 },
			swipe: {
				edge: (touch, edgeZone) => touch.clientX <= edgeZone,
				open: (deltaX) => deltaX > 0,
				close: (deltaX) => deltaX < 0,
				clamp: (deltaX) => Math.min(0, deltaX)
			}
		},
		right: {
			panelClass: 'inset-y-0 right-0 h-dvh min-h-dvh w-3/4 max-w-md border-l',
			transition: { axis: 'x', sign: 1, duration: 220 },
			swipe: {
				edge: (touch, edgeZone) => touch.clientX >= window.innerWidth - edgeZone,
				open: (deltaX) => deltaX < 0,
				close: (deltaX) => deltaX > 0,
				clamp: (deltaX) => Math.max(0, deltaX)
			}
		},
		top: {
			panelClass: 'inset-x-0 top-0 w-full max-h-[85vh] border-b',
			transition: { axis: 'y', sign: -1, duration: 220 }
		},
		bottom: {
			panelClass: 'inset-x-0 bottom-0 w-full max-h-[85vh] border-t',
			transition: { axis: 'y', sign: 1, duration: 220 }
		}
	};

    let edgeSwipeStart = $state(null);
    let overlayOpacity = $state(1);

    // Synchronously resets the opacity right before mounting when opening
    let wasOpen = false;
    $effect.pre(() => {
        if (open && !wasOpen) {
            overlayOpacity = 1;
        }
        wasOpen = open;
    });

    const sideConfig = $derived(SIDE_CONFIG[side] ?? SIDE_CONFIG.right);
    const swipeConfig = $derived(sideConfig.swipe ?? null);
    const canSwipe = $derived(Boolean(swipeEnabled && swipeConfig));
    const hasHeader = $derived(Boolean(title || description || showCloseButton));

    const overlayClasses = $derived(
        twMerge('fixed inset-0 z-40 bg-black/50 backdrop-blur-[1px]', overlayClass)
    );

    const overlayStyle = $derived(`opacity: ${Math.max(0, Math.min(1, overlayOpacity))};`);

    const contentClasses = $derived(
        twMerge(
            'fixed z-50 flex flex-col bg-background text-foreground shadow-2xl outline-none border-border',
            sideConfig.panelClass,
            canSwipe ? 'touch-pan-y' : '',
            contentClass
        )
    );

    const headerClasses = $derived(
        twMerge(
            'flex items-start justify-between gap-4 border-b border-border px-5 py-4',
            headerClass
        )
    );

    const bodyClasses = $derived(
        twMerge('flex-1 px-5 py-4', scrollBody ? 'overflow-y-auto' : '', bodyClass)
    );

    const footerClasses = $derived(
        twMerge('border-t border-border px-5 py-4', footerClass)
    );

    function isHorizontalSwipe(deltaX, deltaY) {
        return (
            Math.abs(deltaX) >= swipeThreshold &&
            Math.abs(deltaX) > Math.abs(deltaY) * swipeAxisRatio
        );
    }

    function isSingleTouch(event) {
        return event.touches.length === 1;
    }

    function clearEdgeSwipe() {
        edgeSwipeStart = null;
    }

    function handleEdgeTouchStart(event) {
        if (!canSwipe || !swipeOpenFromEdge || open || !isSingleTouch(event)) return;

        const touch = event.touches[0];
        if (!swipeConfig?.edge(touch, swipeEdgeZone)) return;

        edgeSwipeStart = { x: touch.clientX, y: touch.clientY };
    }

    function handleEdgeTouchEnd(event) {
        if (!edgeSwipeStart || !swipeConfig) return;

        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - edgeSwipeStart.x;
        const deltaY = touch.clientY - edgeSwipeStart.y;
        clearEdgeSwipe();

        if (isHorizontalSwipe(deltaX, deltaY) && swipeConfig.open(deltaX)) {
            open = true;
        }
    }

    function drawerIn(node, config) {
        const { axis, sign, duration = 220 } = config;
        const rect = node.getBoundingClientRect();
        const distance = (axis === 'x' ? rect.width : rect.height) || 1;

        return {
            duration,
            easing: cubicOut,
            css: (t) => {
                const offset = (1 - t) * distance * sign;
                const x = axis === 'x' ? offset : 0;
                const y = axis === 'y' ? offset : 0;
                return `transform: translate3d(${x}px, ${y}px, 0);`;
            }
        };
    }

    function drawerOut(node, config) {
        const { axis, sign, duration = 220 } = config;
        const rect = node.getBoundingClientRect();
        const distance = (axis === 'x' ? rect.width : rect.height) || 1;

        // Automatically determine start position so standard clicking AND manual swiping work cohesively
        let startOffset = 0;
        const transformStr = node.style.transform;
        
        if (transformStr) {
            const match = transformStr.match(/translate3d\(([-\d.]+)px,\s*([-\d.]+)px/);
            if (match) {
                startOffset = parseFloat(match[axis === 'x' ? 1 : 2]);
            }
        } 
        
        if (startOffset === 0) {
            const computed = window.getComputedStyle(node).transform;
            if (computed !== 'none') {
                const match2 = computed.match(/^matrix(?:3d)?\((.+)\)$/);
                if (match2) {
                    const values = match2[1].split(', ');
                    startOffset = parseFloat(values[axis === 'x' ? (values.length === 16 ? 12 : 4) : (values.length === 16 ? 13 : 5)]);
                }
            }
        }

        return {
            duration,
            easing: cubicOut,
            css: (t) => {
                const offset = (distance * sign) + t * (startOffset - distance * sign);
                const x = axis === 'x' ? offset : 0;
                const y = axis === 'y' ? offset : 0;
                return `transform: translate3d(${x}px, ${y}px, 0);`;
            }
        };
    }

    function swipeableDrawer(node) {
        let startX = 0;
        let startY = 0;
        let dragging = false;
        let scrolling = null;
        let resetTimer = null;

        function clearResetTimer() {
            if (!resetTimer) return;
            clearTimeout(resetTimer);
            resetTimer = null;
        }

        function resetTransition() {
            clearResetTimer();
            node.style.transition = '';
        }

        function snapBack() {
            node.style.transform = '';
            node.style.transition = SNAP_BACK_TRANSITION;
            overlayOpacity = 1;
            clearResetTimer();

            resetTimer = window.setTimeout(() => {
                resetTransition();
            }, SNAP_BACK_DURATION);
        }

        function onTouchStart(event) {
            if (!canSwipe || !open || !swipeConfig || !isSingleTouch(event)) return;

            const touch = event.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            dragging = true;
            scrolling = null;
            overlayOpacity = 1;

            clearResetTimer();
            node.style.transition = 'none';
        }

        function onTouchMove(event) {
            if (!dragging || !swipeConfig) return;

            const touch = event.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;

            if (scrolling === null) {
                scrolling = Math.abs(deltaY) > Math.abs(deltaX);
            }

            if (scrolling) return;

            if (event.cancelable) {
                event.preventDefault();
            }

            const clampedX = swipeConfig.clamp(deltaX);
            const panelWidth = node.getBoundingClientRect().width || 1;
            const closeProgress = Math.min(Math.abs(clampedX) / panelWidth, 1);

            node.style.transform = `translate3d(${clampedX}px, 0, 0)`;
            overlayOpacity = 1 - closeProgress;
        }

        function onTouchEnd(event) {
            if (!dragging || !swipeConfig) return;
            dragging = false;

            if (scrolling) {
                scrolling = null;
                overlayOpacity = 1;
                resetTransition();
                return;
            }

            const touch = event.changedTouches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;

            if (isHorizontalSwipe(deltaX, deltaY) && swipeConfig.close(deltaX)) {
                open = false;
    			return;
            }

            snapBack();
        }

        function onTouchCancel() {
            if (!dragging) return;
            dragging = false;
            snapBack();
        }

        node.addEventListener('touchstart', onTouchStart, TOUCH_OPTIONS_PASSIVE);
        node.addEventListener('touchmove', onTouchMove, TOUCH_OPTIONS_ACTIVE);
        window.addEventListener('touchend', onTouchEnd);
        window.addEventListener('touchcancel', onTouchCancel);

        return {
            destroy() {
                clearResetTimer();
                node.removeEventListener('touchstart', onTouchStart);
                node.removeEventListener('touchmove', onTouchMove);
                window.removeEventListener('touchend', onTouchEnd);
                window.removeEventListener('touchcancel', onTouchCancel);
            }
        };
    }
</script>

<svelte:window
    ontouchstart={handleEdgeTouchStart}
    ontouchend={handleEdgeTouchEnd}
    ontouchcancel={clearEdgeSwipe}
/>

<Dialog.Root bind:open>
    {#if trigger}
        <Dialog.Trigger>
            {@render trigger()}
        </Dialog.Trigger>
    {/if}

    <Dialog.Portal>
        <Dialog.Overlay forceMount>
            {#snippet child({ props })}
                {#if open}
                    <div
                        {...props}
                        class={overlayClasses}
                        style={overlayStyle}
                        in:fade={{ duration: sideConfig.transition.duration, easing: cubicOut }}
                        out:fade={{ duration: sideConfig.transition.duration, easing: cubicOut }}
                    ></div>
                {/if}
            {/snippet}
        </Dialog.Overlay>

        <Dialog.Content
            forceMount
            preventScroll={preventScroll}
            escapeKeydownBehavior={closeOnEscape ? 'close' : 'ignore'}
            interactOutsideBehavior={closeOnOutsideClick ? 'close' : 'ignore'}
        >
            {#snippet child({ props })}
                {#if open}
                    <div
                        {...props}
                        use:swipeableDrawer
                        class={contentClasses}
                        in:drawerIn={sideConfig.transition}
                        out:drawerOut={sideConfig.transition}
                    >
                        {#if hasHeader}
                            <header class={headerClasses}>
                                <div class="min-w-0 flex-1">
                                    {#if title}
                                        <Dialog.Title class="text-base font-semibold leading-6 sm:text-lg">
                                            {@render title()}
                                        </Dialog.Title>
                                    {/if}

                                    {#if description}
                                        <Dialog.Description class="mt-1 text-sm text-muted-foreground">
                                            {@render description()}
                                        </Dialog.Description>
                                    {/if}
                                </div>

                                {#if showCloseButton}
                                    <Dialog.Close
                                        class="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        aria-label="Close drawer"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="h-6 w-6"
                                            aria-hidden="true"
                                        >
                                            <path d="M18 6 6 18" />
                                            <path d="m6 6 12 12" />
                                        </svg>
                                    </Dialog.Close>
                                {/if}
                            </header>
                        {/if}

                        {#if showIndicator && (side === 'left' || side === 'right')}
                            <div
                                aria-hidden="true"
                                class={twMerge(
                                    'pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full',
                                    indicatorLengthClass,
                                    indicatorWidthClass,
                                    indicatorColorClass,
                                    indicatorOffsetClass,
                                    indicatorClass
                                )}
                            ></div>
                        {/if}

                        <div class={bodyClasses}>
                            {@render children?.()}
                        </div>

                        {#if footer}
                            <footer class={footerClasses}>
                                {@render footer()}
                            </footer>
                        {/if}
                    </div>
                {/if}
            {/snippet}
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>