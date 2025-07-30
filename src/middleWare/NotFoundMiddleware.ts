import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

const NotFoundMiddleware = (req:Request, res:Response) => {
 res.status(StatusCodes.NOT_FOUND).send('page does not exist')
}

export default NotFoundMiddleware
