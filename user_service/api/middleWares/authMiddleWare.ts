import express from "express";
import dotenv from 'dotenv'

dotenv.config()

/** Verification du token*/
const checkApiKey = async (request: express.Request,
                     response: express.Response,
                     next: express.NextFunction):Promise<void> => {
    const apiKey = request.headers.authorization
    console.log(apiKey)
    if (apiKey == null || apiKey != process.env.API_KEY) {
        response.status(401).json({message: 'api key non valide ou absente!'})
    } else {
        next();
    }
}
export {checkApiKey};