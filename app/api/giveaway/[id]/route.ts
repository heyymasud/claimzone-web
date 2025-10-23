export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const res = await fetch(`https://www.gamerpower.com/api/giveaway?id=${id}`)

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch giveaway" }, { status: res.status })
    }

    const data = await res.json()
    return Response.json(data)
  } catch (error) {
    console.error("Error fetching giveaway:", error)
    return Response.json({ error: "Failed to fetch giveaway" }, { status: 500 })
  }
}
