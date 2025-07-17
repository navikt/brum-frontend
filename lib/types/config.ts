import * as z from 'zod/v4';

/**
 * Zod-schema for validering av server-miljøvariabler
 */
export const ServerEnvSchema = z.object({
  tokenExchangeEndpoint: z.string(),
  backendAudience: z.string(),
});

/**
 * Type-definisjon for server-miljøvariabler
 */
export type ServerEnv = z.infer<typeof ServerEnvSchema>;