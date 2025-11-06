export async function GET() {
	try {
		const response = await fetch("https://www.gamerpower.com/api/giveaways", {
			headers: {
				"User-Agent": "ClaimZone",
			},
		});

		if (!response.ok) {
			throw new Error(`GamerPower API error: ${response.status}`);
		}

		const data = await response.json();
		return Response.json(data);
	} catch (error) {
		console.error("Error fetching giveaways:", error);
		return Response.json({ error: "Failed to fetch giveaways" }, { status: 500 });
	}
}
