import { StatusCodes } from 'http-status-codes'

declare module 'express-serve-static-core' {
  interface Request {
    userDetail?: string; // Matches tokenVerification.userId
  }
}
export class CustomApiError extends Error {
    statusCode:StatusCodes
    constructor(message:string){
        super(message)
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    }
}
