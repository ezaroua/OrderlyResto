import {verify} from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

/** Extraction du token*/
const extractToken = (authorization: string | undefined): string | false => {
    if (typeof authorization !== 'string') {
        return false;// Vide retourn false
    }
    /**On isole le token*/
    const matches = authorization.match(/(bearer)\s+(\S+)/i);
    if (matches && matches[2]) {
        return matches[2];
    } else {
        return false;
    }
}

/** Verification du token*/
const checkTokenValid = async (request: express.Request,
                         response: express.Response,
                         next: express.NextFunction): Promise<void> => {
    const token = request.headers.authorization && extractToken(request.headers.authorization)

    if (!token) {
        response.status(401).json({message: 'Token non valide ou absent !'})
    }else{
    /**On verifie le token*/
    verify(token, process.env.SECRET_KEY as string, (error, decoded) => {
        if (error) {
            response.status(401).json({message: 'Bad token !'})
        }else {
            next();
        }
    })
    }
}
export {checkTokenValid};