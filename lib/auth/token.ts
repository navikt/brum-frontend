import { getServerEnv } from '@/lib/config/getServerEnv';
import { TexasResult } from '../types/auth';

/**
 * Henter OBO (On-Behalf-Of) token for backend-kall
 * 
 * @param user_token - Brukerens access token
 * @returns Access token for backend
 */
export const getOboToken = async (user_token: string | undefined) => {
  if (!user_token) {
    throw new Error('Brukertoken er påkrevd for OBO token-utveksling');
  }
  
  const tokenExchangeEndpoint = getServerEnv().tokenExchangeEndpoint;
  const target = getServerEnv().backendAudience;
  
  const response = await fetch(tokenExchangeEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identity_provider: 'azuread',
      user_token,
      target,
    }),
  });
  
  const data: TexasResult = await response.json();
  return data.access_token;
};