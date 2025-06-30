import * as z from 'zod/v4'; // runtime validation library

// zod utility that takes "ServerEnvSchema" and creates a type
type ServerEnv = z.infer<typeof ServerEnvSchema>;

//define the zod schema
const ServerEnvSchema = z.object({
  tokenExchangeEndpoint: z.string(),
  backendAudience: z.string(),
});

export function getServerEnv(): ServerEnv {
  const env = ServerEnvSchema.parse({
    tokenExchangeEndpoint: process.env.NAIS_TOKEN_EXCHANGE_ENDPOINT,
    backendAudience: process.env.BACKEND_AUDIENCE,
  });

  return env;
}
