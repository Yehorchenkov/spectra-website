import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';
import { photoswipe } from '$lib/actions.svelte';

export function convertContentToHTML(content) {
	const htmlConverters = ({ defaultConverters }) => ({
		...defaultConverters,
		blocks: {
			inlineImage: ({ node }) => {
				const imagePosition = node.fields.imagePosition || 'left';
				const floatClass = imagePosition === 'right' ? 'float-right' : 'float-left';
				const marginClass = imagePosition === 'right' ? 'ml-6' : 'mr-8';

				const imageWidth = node.fields.imageWidth || '1/3';

				// Map the fraction string to the actual Tailwind class
				const widthClasses = {
					'1/4': 'w-1/4',
					'1/3': 'w-1/3',
					'1/2': 'w-1/2',
					'2/3': 'w-2/3',
					full: 'w-full'
				};

				const widthClass = widthClasses[imageWidth] || 'w-1/3'; // Default to w-1/3 if mapping not found

				const imgClasses = `${floatClass} object-cover ${widthClass} ${marginClass}`;

				return `<img class="rounded shadow ${imgClasses}" src=${node.fields.image.url} alt=${node.fields.image.alt} />`;
			},
			imageGallery: ({ node }) => {
				const images = node.fields.images
					.map((image) => {
						return `<a
                        href="${image.url}"
                        data-pswp-width="${image.width}"
                        data-pswp-height="${image.height}"
                        target="_blank"
                        rel="noopener"
                        class="block flex-shrink-0"
                    >
                        <img
                            class="object-cover w-full rounded shadow"
                            src="${image.thumbnailURL}"
                            alt="${image.alt || ''}"
                            loading="lazy"
                        />
                    </a>`;
					})
					.join('');

				// Use a data attribute for Photoswipe initialization
				return `
                    <div class="w-full flex justify-center">
                        <div class="flex flex-nowrap overflow-x-auto gap-4 pswp-gallery" data-pswp-gallery style="scrollbar-width: thin;">
                            ${images}
                        </div>
                    </div>
                `;
			}
		}
	});

	return convertLexicalToHTML({ converters: htmlConverters, data: content });
}
