import { NextApiRequest, NextApiResponse } from "next";
import { getOboToken } from "../test";





export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ message: 'Method Not Allowed' });
    }


    try{
        // step 1: Extract the user´s token frmo the incomming request


        const userTOken = req.headers.authorization?.replace('Bearer ', '');
        if (!userTOken) {
            console.error("No user token provided in the request headers");
            return res.status(401).json({ message: 'Unauthorized: User session required.' });
        }

        const oboAccessToken = await getOboToken(userTOken);
        if (!oboAccessToken) {
            console.error("Failed to obtain OBO access token");
            return res.status(500).json({ message: 'Internal Server Error: Unable to obtain OBO token.' });
        }else {
            console.log("OBO access token obtained successfully");
        }

        const {BRUM_API_URL} = process.env;
        if (!BRUM_API_URL) {
            throw new Error("BRUM_API_URL is not defined in environment variables");
        }

        const ktorResponse = await fetch(`${BRUM_API_URL}/api/data`, {
            method: 'GET',
            headers: {
                'contentType': 'application/json',
                'Authorization': `Bearer ${oboAccessToken}`,
            },
        });

        if(!ktorResponse.ok) {
            const ktorErrorBody = await ktorResponse.text();
            console.error("Ktor API request failed:", ktorErrorBody);
            return res.status(ktorResponse.status).json({ message: 'Ktor API request failed', error: ktorErrorBody });
        }

        const dataFromKtor = await ktorResponse.json();
        res.status(200).json(dataFromKtor);

}catch (error) {
        console.error("An error occurred while processing the request:", error);
        return res.status(500).json({ message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' });
    }

}