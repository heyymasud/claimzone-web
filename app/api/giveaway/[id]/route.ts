import { z } from 'zod'
import { validateInput, createValidationError, HTTPInputError } from '@/lib/validation'
import { NextResponse } from 'next/server'

type Params = Promise<{ id: string }>

const paramSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a numeric string')
})

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const { id } = validateInput(await params, paramSchema)
    
    // Validate that the ID is a positive number
    const numericId = parseInt(id, 10)
    if (isNaN(numericId) || numericId <= 0) {
      return NextResponse.json({ error: "Invalid giveaway ID" }, { status: 400 })
    }

    const res = await fetch(`https://www.gamerpower.com/api/giveaway?id=${id}`)

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch giveaway" }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof HTTPInputError) {
      return createValidationError(error)
    }
    
    console.error("Error fetching giveaway:", error)
    return NextResponse.json({ error: "Failed to fetch giveaway" }, { status: 500 })
  }
}
