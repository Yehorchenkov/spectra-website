<script>
	import { Button } from 'bits-ui';

	import projectLogoPlaceholder from '$lib/images/logo-placeholder-image-1024x1024.png';

	const projectItems = [
		{
			title: 'Project 1',
			imageUrl: projectLogoPlaceholder,
			description:
				'Vivamus tempus, leo nec condimentum aliquam, orci elit tristique felis, nec congue sem nisl vitae augue. Nullam scelerisque ante congue leo maximus, nec elementum nunc porttitor. Suspendisse interdum vulputate elit vel rhoncus.',
			program: 'Horizon2020'
		},
		{
			title: 'Project 2',
			imageUrl: projectLogoPlaceholder,
			description:
				'Vivamus tempus, leo nec condimentum aliquam, orci elit tristique felis, nec congue sem nisl vitae augue. Nullam scelerisque ante congue leo maximus, nec elementum nunc porttitor. Suspendisse interdum vulputate elit vel rhoncus.',
			program: 'Intereg'
		},
		{
			title: 'Project 3',
			imageUrl: projectLogoPlaceholder,
			description:
				'Vivamus tempus, leo nec condimentum aliquam, orci elit tristique felis, nec congue sem nisl vitae augue. Nullam scelerisque ante congue leo maximus, nec elementum nunc porttitor. Suspendisse interdum vulputate elit vel rhoncus.',
			program: 'Erasmus+'
		},
		{
			title: 'Project 4',
			imageUrl: projectLogoPlaceholder,
			description:
				'Vivamus tempus, leo nec condimentum aliquam, orci elit tristique felis, nec congue sem nisl vitae augue. Nullam scelerisque ante congue leo maximus, nec elementum nunc porttitor. Suspendisse interdum vulputate elit vel rhoncus.',
			program: 'Erasmus Jean Monnet'
		},
		{
			title: 'Project 5',
			imageUrl: projectLogoPlaceholder,
			description:
				'Vivamus tempus, leo nec condimentum aliquam, orci elit tristique felis, nec congue sem nisl vitae augue. Nullam scelerisque ante congue leo maximus, nec elementum nunc porttitor. Suspendisse interdum vulputate elit vel rhoncus.',
			program: 'Horizon2020'
		}
	];
</script>

{#each projectItems as item}
	<div class="mt-8 flex flex-col items-center space-x-8 py-3 md:flex-row md:justify-center">
		<div class="mx-auto md:w-1/5">
			<img src={item.imageUrl} alt={item.title} class="mx-auto max-h-32 w-auto" />
		</div>
		<div class="flex flex-col justify-center p-4 md:w-4/5">
			<h2 class="text-xl font-bold">{item.title}</h2>
			<p class="mt-2">{item.description}</p>
			<p class="mt-2">Program: {item.program}</p>
		</div>
	</div>
{/each}
<Button.Root
	class="bg-primary text-primary-foreground mt-8 h-10 w-32 rounded-lg transition-all duration-200 ease-in-out hover:opacity-90"
>
	All Projects
</Button.Root>
