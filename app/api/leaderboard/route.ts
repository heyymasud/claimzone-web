import { supabaseAdmin } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"

export async function GET() {
    const { data, error } = await supabaseAdmin
        .from("user_stats")
        .select("username, total_worth, total_claimed, claimed_giveaways")
        .order("total_worth", { ascending: false })
        .limit(100)

    if (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}