import { z } from "zod";

const clientEnvSchema = z.object({
	NEXT_PUBLIC_SUPABASE_URL: z
		.string()
		.url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
	NEXT_PUBLIC_SUPABASE_ANON_KEY: z
		.string()
		.min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
});

const clientEnv = {
	NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
	NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

const validateClientEnv = () => {
	try {
		return clientEnvSchema.parse(clientEnv);
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error("Client environment validation error:", error.errors);
			throw new Error(
				`Invalid client environment variables: ${error.errors.map(e => e.message).join(", ")}`
			);
		}
		throw error;
	}
};

export const validatedClientEnv = validateClientEnv();
export type ClientEnv = z.infer<typeof clientEnvSchema>;
