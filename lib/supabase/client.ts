import { createBrowserClient } from "@supabase/ssr";
import { validatedClientEnv } from "../env/client";

export const createClient = () =>
	createBrowserClient(
		validatedClientEnv.NEXT_PUBLIC_SUPABASE_URL,
		validatedClientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
	);
