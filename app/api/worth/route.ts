export async function GET() {
  try {
    const response = await fetch("https://www.gamerpower.com/api/worth", {
      headers: {
        "User-Agent": "ClaimZone",
      },
    })

    if (!response.ok) {
      throw new Error(`GamerPower API error: ${response.status}`)
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error("Error fetching worth:", error)
    return Response.json({ error: "Failed to fetch worth data" }, { status: 500 })
  }
}
