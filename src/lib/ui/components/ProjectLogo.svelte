<script>
    import ProjectPlaceholder from '$lib/ui/components/ProjectPlaceholder.svelte';
    import { AlertDialog } from 'bits-ui';

    let { project } = $props();
    let open = $state(false);
</script>

{#if project.projectLogo}
    <AlertDialog.Root bind:open>
        <AlertDialog.Trigger
            class="w-72 shadow-sm rounded-lg bg-white p-4 cursor-zoom-in hover:scale-[1.02] transition-transform"
            aria-label="View full size logo"
        >
            <img
                class="w-full h-auto"
                src={project.projectLogo.url}
                alt={project.projectLogo.alt}
            />
        </AlertDialog.Trigger>

        <AlertDialog.Portal>
            <AlertDialog.Overlay
                class="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            />
            <AlertDialog.Content
                class="fixed left-[50%] top-[50%] z-50 w-full max-w-5xl translate-x-[-50%] translate-y-[-50%] outline-none p-4 flex justify-center items-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
            >
                <!-- Hidden title for accessibility requirements -->
                <AlertDialog.Title class="sr-only">Project Logo Full View</AlertDialog.Title>
                
                <div class="relative">
                    <img
                        src={project.projectLogo.url}
                        alt={project.projectLogo.alt}
                        class="w-full max-h-[90vh] object-contain rounded-lg bg-white p-8"
                    />
                    <AlertDialog.Cancel
                        class="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
                        aria-label="Close modal"
                    >
                        <span class="text-4xl font-light">&times;</span>
                    </AlertDialog.Cancel>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
{:else}
    <ProjectPlaceholder class="rounded-lg shadow-sm overflow-hidden" acronym={project.acronym} />
{/if}