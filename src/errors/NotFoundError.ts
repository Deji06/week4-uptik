// import {Response} from 'express'
import { CustomApiError } from './CustomApiError' 
import { StatusCodes } from 'http-status-codes'

export class NotFoundError extends CustomApiError {
    statusCode: StatusCodes 
    constructor(message:string) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}
