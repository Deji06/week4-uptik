import  {Request, Response, NextFunction} from 'express'
import {CustomApiError} from '../errors/index'
import { StatusCodes } from 'http-status-codes'

const errorHandleMiddleWare = (err:Error, req: Request, res:Response, next:NextFunction) => {
    if(err instanceof CustomApiError) {
        // StatusCode: StatusCodes
        return res.status(err.statusCode).json({msg: err.message})
    }
    console.log(err);
   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('something went wrong, try again later')
}

export default errorHandleMiddleWare