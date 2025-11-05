import { z } from 'zod';

const serverEnvSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),
});

const serverEnv = {
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
}

const validateEnv = () => {
  try {
    return serverEnvSchema.parse(serverEnv);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Environment validation error:', error.errors);
      throw new Error(`Invalid environment variables: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw error;
  }
};

export const validatedServerEnv = validateEnv();

export type ValidatedEnv = z.infer<typeof serverEnvSchema>;