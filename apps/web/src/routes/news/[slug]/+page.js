import { error } from "@sveltejs/kit";

export async function load({ fetch, params }) {
    const { slug } = params;

    if (!slug) {
        throw error(400, "Slug is required");
    }

    // Using the internal API route instead of calling the external API directly
    const response = await fetch(`/news/${slug}/`);

    if (!response.ok) {
        // Check if the status is valid for the error helper (400-599)
        if (response.status >= 400 && response.status <= 599) {
            throw error(response.status, `Failed to fetch news data: ${response.statusText}`);
        } else {
            // Handle unexpected statuses like 308
            // Log the actual status and throw a generic server error,
            // or handle redirects specifically if needed.
            console.error(`Unexpected status code ${response.status} from internal API /news/${slug}: ${response.statusText}`);
            throw error(500, `Unexpected response status from server: ${response.status}`);
        }
    }

    const newsData = await response.json();

    if (!newsData?.docs?.length) {
        throw error(404, "News not found");
    }

    const [news] = newsData.docs;

    return {
        news
    };
}
