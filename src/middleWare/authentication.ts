// import { StatusCodes } from 'http-status-codes'
import {CustomApiError } from '../errors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import  {Request, Response, NextFunction} from 'express'
dotenv.config()
import {config} from '../config'

interface JwtPayload {
  userId: string;
}


 const auth =  async (req:Request, res:Response, next:NextFunction) => {
    console.log("🔍 Incoming Request Headers:", req.headers);
    const authHeader = req.headers.authorization
    console.log("auth Header:", authHeader);
    
    if(!authHeader || !authHeader.startsWith('Bearer ' )) {
        console.log("Missing or invalid Authorization header");
        throw new CustomApiError('authentication failed, try again')
    }
    const token = authHeader.split(' ')[1] 
    console.log("token", token);
    
    try {
        const tokenVerification = jwt.verify(token, config.JWT_SECRET) as JwtPayload
        req.userDetail = tokenVerification.userId 
        next()
    } catch (error) {
        throw new CustomApiError('invalid token')
    }
} 
export default auth