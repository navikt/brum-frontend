import * as z from 'zod/v4';

type ServerEnv = z.infer<typeof ServerEnvSchema>;

const ServerEnvSchema = z.object({
    tokenExchangeEndpoint: z.string(),
    backendAudience: z.string(),
})

export function getServerEnv(): ServerEnv {
    const env = ServerEnvSchema.parse({
        tokenExchangeEndpoint: process.env.NAIS_TOKEN_EXCHANGE_ENDPOINT,
        backendAudience: process.env.BACKEND_AUDIENCE,
    })

    return env;
}