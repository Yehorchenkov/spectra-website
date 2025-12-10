import { error } from "@sveltejs/kit";

export async function load({ fetch, params }) {
    const { slug } = params;

    if (!slug) {
        throw error(400, "Slug is required");
    }

    // Using the internal API route instead of calling the external API directly
    const response = await fetch(`/team-members/${slug}/`);

    if (!response.ok) {
        // Check if the status is valid for the error helper (400-599)
        if (response.status >= 400 && response.status <= 599) {
            throw error(response.status, `Failed to fetch team member data: ${response.statusText}`);
        } else {
            // Handle unexpected statuses like 308
            // Log the actual status and throw a generic server error,
            // or handle redirects specifically if needed.
            console.error(`Unexpected status code ${response.status} from internal API /team-members/${slug}: ${response.statusText}`);
            throw error(500, `Unexpected response status from server: ${response.status}`);
        }
    }

    const teamMemberData = await response.json();

    if (!teamMemberData?.docs?.length) {
        throw error(404, "Team member not found");
    }

    const [teamMember] = teamMemberData.docs;
    
    return {
        teamMember
    };
}