import { getServerEnv } from '../../utils/env';
import { NextApiRequest, NextApiResponse } from 'next'


interface TexasResult {
    access_token: string;
    expires_in: number;
    token_type: string;
}

export const getOboToken = async (user_token: string | undefined) => {
    if (!user_token) {
        throw new Error("User token is required for OBO token exchange");
    }
    const tokenExchangeEndpoint = getServerEnv().tokenExchangeEndpoint
    const target = getServerEnv().backendAudience
    const response = await fetch(tokenExchangeEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            identity_provider: "azuread",
            user_token,
            target
        })
    })
    const data: TexasResult = await response.json()

    console.log("OBO token exchange response:", data)

    return data.access_token
}
//     const obsResult = await requestOboToken({accessToekm, "api://dev-gcp.brum.brum-api/.default"})
//    if (!oboResult.ok) {
//         logger.error(new Error(`Unable to exchange token: ${oboResult.error.message}`, { cause: oboResult.error }))
//         res.status(500)
//         res.send(null)
//         return
//     }