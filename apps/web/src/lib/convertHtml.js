import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';

const generateId = (text) => {
	return text
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]/g, '');
};

const extractTextFromChildren = (children) => {
	if (!children) return '';
	return children
		.map((child) => {
			if (child.text) return child.text;
			if (child.children) return extractTextFromChildren(child.children);
			return '';
		})
		.join('');
};

function mapCollectionToPath(collection, slug) {
	if (!slug) return '#';

	switch (collection) {
		case 'pages':
			return slug === 'home' ? '/' : `/${slug}`;
		case 'team-members':
			return `/team-members/${slug}`;
		case 'projects':
			return `/projects/${slug}`;
		case 'news':
			return `/news/${slug}`;
		case 'events':
			return `/events/${slug}`;
		default:
			return `/${slug}`;
	}
}

function resolveInternalDocHref({ linkNode }) {
	const doc = linkNode?.fields?.doc;
	if (!doc) return '#';

	const collection = doc.relationTo;
	const value = doc.value;

	// Internal link doc.value can be either an ID or a populated object.
	// We need a populated object with slug to build a frontend URL.
	if (!value || typeof value !== 'object') return '#';

	const slug = value.slug;
	if (typeof slug !== 'string' || !slug.trim()) return '#';

	return mapCollectionToPath(collection, slug.trim());
}

export function extractHeadings(content) {
	if (!content?.root?.children) return [];

	const headings = [];

	const traverse = (nodes) => {
		for (const node of nodes) {
			if (node.type === 'heading') {
				const text = extractTextFromChildren(node.children);
				if (text) {
					headings.push({
						id: generateId(text),
						text,
						level: parseInt(node.tag?.replace('h', '') || '2')
					});
				}
			}
			if (node.children) {
				traverse(node.children);
			}
		}
	};

	traverse(content.root.children);
	return headings;
}

export function convertContentToHTML(content) {
	const htmlConverters = ({ defaultConverters }) => ({
		...defaultConverters,
		link: ({ node, nodesToHTML, providedStyleTag }) => {
			const children = nodesToHTML({ nodes: node.children }).join('');
			const href =
				node?.fields?.linkType === 'internal'
					? resolveInternalDocHref({ linkNode: node })
					: node?.fields?.url || '#';

			return `<a${providedStyleTag} href="${href}"${
				node?.fields?.newTab ? ' rel="noopener noreferrer" target="_blank"' : ''
			}>${children}</a>`;
		},
		heading: ({ node }) => {
			const text = extractTextFromChildren(node.children);
			const id = generateId(text);
			const tag = node.tag || 'h2';
			const childrenHTML = node.children
				?.map((child) => {
					if (child.text) {
						let txt = child.text;
						if (child.format & 1) txt = `<strong>${txt}</strong>`;
						if (child.format & 2) txt = `<em>${txt}</em>`;
						return txt;
					}
					return '';
				})
				.join('');
			return `<${tag} id="${id}">${childrenHTML}</${tag}>`;
		},
		blocks: {
			inlineImage: ({ node }) => {
				const imagePosition = node.fields.imagePosition || 'left';
				const floatClass = imagePosition === 'right' ? 'float-right' : 'float-left';
				const marginClass = imagePosition === 'right' ? 'ml-6' : 'mr-8';
				const imageWidth = node.fields.imageWidth || '1/3';

				const widthClasses = {
					'1/4': 'w-1/4',
					'1/3': 'w-1/3',
					'1/2': 'w-1/2',
					'2/3': 'w-2/3',
					full: 'w-full'
				};

				const widthClass = widthClasses[imageWidth] || 'w-1/3';
				const imgClasses = `${floatClass} object-cover ${widthClass} ${marginClass}`;

				const src = node.fields.image.sizes?.large?.url || node.fields.image.url;
				const alt = node.fields.image.alt || '';

				return `<img class="rounded shadow ${imgClasses}" src="${src}" alt="${alt}" loading="lazy" />`;
			},
			imageGallery: ({ node }) => {
				const images = node.fields.images
					.map((image) => {
						const lightboxSrc = image.sizes?.large?.url || image.url;
						const lightboxWidth = image.sizes?.large?.width || image.width;
						const lightboxHeight = image.sizes?.large?.height || image.height;
						const thumbSrc = image.sizes?.thumbnail?.url || image.url;

						return `<a
                            href="${lightboxSrc}"
                            data-pswp-width="${lightboxWidth}"
                            data-pswp-height="${lightboxHeight}"
                            target="_blank"
                            rel="noopener"
                            class="block shrink-0"
                        >
                        <img
                            class="object-cover w-full rounded shadow"
                            src="${thumbSrc}"
                            alt="${image.alt || ''}"
                            loading="lazy"
                        />
                    </a>`;
					})
					.join('');

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

	return convertLexicalToHTML({
		converters: htmlConverters,
		data: content
	});
}
