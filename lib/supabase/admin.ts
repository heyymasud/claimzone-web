import { createClient } from "@supabase/supabase-js"
import { validatedServerEnv } from "../env/server"
import { validatedClientEnv } from "../env/client"

const supabaseUrl = validatedClientEnv.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = validatedServerEnv.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
})
