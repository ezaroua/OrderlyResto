import express from "express";
import dotenv from 'dotenv'

dotenv.config()

/** Verification api key*/
const checkApiKey = async (request: express.Request,
                           response: express.Response,
                           next: express.NextFunction): Promise<void> => {
    const apiKey = request.headers['api-key'];
    if (apiKey == process.env.API_KEY) {
        next()
    } else {
        response.status(401).json({message: 'api key non valide ou absente!'})
    }
}
export {checkApiKey};