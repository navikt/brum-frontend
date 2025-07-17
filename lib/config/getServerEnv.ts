import { ServerEnv, ServerEnvSchema } from '../types/config';

/**
 * Henter og validerer server-miljøvariabler
 * 
 * @returns Validerte miljøvariabler for server
 * @throws Error hvis påkrevde miljøvariabler mangler
 */
export function getServerEnv(): ServerEnv {
  try {
    const env = ServerEnvSchema.parse({
      tokenExchangeEndpoint: process.env.NAIS_TOKEN_EXCHANGE_ENDPOINT,
      backendAudience: process.env.BACKEND_AUDIENCE,
    });
    return env;
  } catch (error) {
    throw new Error('Kunne ikke hente server-miljøvariabler');
  }
}