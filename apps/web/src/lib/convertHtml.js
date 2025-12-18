import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';
import { photoswipe } from '$lib/actions.svelte';

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
        heading: ({ node, childrenConverters }) => {
            const text = extractTextFromChildren(node.children);
            const id = generateId(text);
            const tag = node.tag || 'h2';
            const childrenHTML = node.children
                ?.map((child) => {
                    if (child.text) {
                        let text = child.text;
                        if (child.format & 1) text = `<strong>${text}</strong>`;
                        if (child.format & 2) text = `<em>${text}</em>`;
                        return text;
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
