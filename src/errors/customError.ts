import { StatusCodes } from 'http-status-codes'

declare module 'express-serve-static-core' {
  interface Request {
    userDetail?: string; // Matches tokenVerification.userId
  }
}
export class customApiError extends Error {
    statusCode:StatusCodes
    constructor(message:string, statusCode:StatusCodes){
        super(message)
        this.statusCode = statusCode
    }
}
