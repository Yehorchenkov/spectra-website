<script>
	import { Select } from 'bits-ui';
	import Check from 'phosphor-svelte/lib/Check';
	import CaretUpDown from 'phosphor-svelte/lib/CaretUpDown';
	import { twMerge } from 'tailwind-merge';

	let {
		value = $bindable(),
		items,
		contentProps,
		placeholder,
		classTrigger,
		classContent,
		...restProps
	} = $props();

	const selectedLabel = $derived(items.find((item) => String(item.value) === String(value))?.label);
</script>


<Select.Root bind:value {...restProps}>
	<Select.Trigger
		class={twMerge(
			'group h-input h-8 px-2 cursor-pointer text-muted-foreground border-border bg-background hover:bg-primary hover:text-primary-foreground inline-flex w-auto items-center rounded border transition-colors select-none',
			classTrigger
		)}
	>
		{selectedLabel ? selectedLabel : placeholder}
        <CaretUpDown class="text-muted-foreground group-hover:text-primary-foreground ml-auto size-5 transition-colors" />
	</Select.Trigger>
	<Select.Portal>
		<Select.Content
			class={twMerge("mt-2 border-border cursor-pointer bg-background py-2 z-50 w-[180px] rounded border shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", classContent)}
            {...restProps}
			{...contentProps}
		>
			<Select.ScrollUpButton>up</Select.ScrollUpButton>
			<Select.Viewport>
				{#each items as { value, label, disabled } (value)}
					<Select.Item 
                        class="h-8 flex justify-between items-center px-2 text-foreground outline-none hover:bg-primary hover:text-primary-foreground data-[disabled]:text-muted-foreground data-[disabled]:pointer-events-none"
                        {value} 
                        {label} 
                        {disabled}
                    >
						{#snippet children({ selected })}
							{label}
							{#if selected}
								<Check aria-label="check" class="text-foreground" />
							{/if}
						{/snippet}
					</Select.Item>
				{/each}
			</Select.Viewport>
			<Select.ScrollDownButton>down</Select.ScrollDownButton>
		</Select.Content>
	</Select.Portal>
</Select.Root>
