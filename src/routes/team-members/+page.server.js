export async function load({ fetch, url }) {
	const teamMemberParams = new URLSearchParams(url.searchParams); // Start with existing params

	const teamMemberSelectFields = ['name', 'title', 'slug', 'photo', 'order'];

	teamMemberSelectFields.forEach((field) => {
		teamMemberParams.set(`select[${field}]`, 'true');
	});

	const teamMemberQuery = teamMemberParams.toString();
	const teamMembersRes = await fetch(`/api/team-members?${teamMemberQuery}`);
	const teamMembers = await teamMembersRes.json();

	return { teamMembers };
}
