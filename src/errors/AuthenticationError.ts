import { CustomApiError } from "./CustomApiError"
import { StatusCodes } from "http-status-codes"


export class  AuthenticationError extends CustomApiError {
    statusCode: StatusCodes
    constructor(message:string) {
        super(message),
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}