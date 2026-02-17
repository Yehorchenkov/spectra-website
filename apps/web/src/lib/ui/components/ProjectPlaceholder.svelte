<script>
    import { PROJECTS_PLACEHOLDER } from '$lib/config/constants.js'; // Check this path matches your file structure

    let { class: className = '', acronym = 'ACRONYM' } = $props();
</script>

<div class="relative overflow-hidden {className}">
    <img 
        src={PROJECTS_PLACEHOLDER} 
        alt="{acronym} placeholder"
        class="w-full h-full rounded-lg object-cover" 
    />

    <div class="absolute inset-0 flex items-center justify-center p-4">
        <span class="text-white font-bold text-2xl select-none">
            {acronym}
        </span>
    </div>
</div>