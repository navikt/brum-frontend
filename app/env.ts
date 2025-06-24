import * as z from 'zod/v4';

type ServerEnv = z.infer<typeof ServerEnvSchema>;

const ServerEnvSchema = z.object({
    tokenExchangeEndpoint: z.string(),
})

export function getServerEnv(): ServerEnv {
    const env = ServerEnvSchema.parse({
        tokenExchangeEndpoint: process.env.TOKEN_EXCHANGE_ENDPOINT
    })

    return env;
}