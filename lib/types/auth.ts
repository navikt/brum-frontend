/**
 * Respons fra Texas token exchange service
 */
export interface TexasResult {
  access_token: string;
  expires_in: number;
  token_type: string;
}