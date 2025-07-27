import {Request, Response, NextFunction}  from 'express'
import {StatusCodes} from 'http-status-codes'
import  {customApiError} from '../errors/customError'
import User from '../models/user'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
// const async_error = require('express-async-errors')
// import errorHandler from '../middleWare/errorHandler'


export const register = async(req:Request, res:Response, next:NextFunction)=> {
 try {
     const user = await User.create({...req.body})
     const token = user.createJwt()
    //  jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:"1d"})
    res.status(StatusCodes.CREATED).json({user:{name: user.username}, token})    
 } catch (error) {
    console.log(error);
    next(error)
 }
}

export const login = async(req:Request, res:Response, next:NextFunction)=> {
    try {
        const {email, password} = req.body
        if(!email || !password){
            throw new customApiError('please provide email or password', StatusCodes.UNAUTHORIZED)
            // return next(createCustomError('please provide email or password', StatusCodes.UNAUTHORIZED))
        }
        const user = await User.findOne({email})
        // authentication
        if(!user) {
            throw new customApiError('provide valid credentials', StatusCodes.UNAUTHORIZED)
        }
        // comparing password
        const isPasswordMatch = await user.confirmPassword(password)
        if(!isPasswordMatch) {
            throw new customApiError('password does not match', StatusCodes.BAD_REQUEST)
        }
        const token = user.createJwt()
        // const token = jwt.sign({email},process.env.JWT_SECRET, {expiresIn:'30d'} )
        res.status(StatusCodes.ACCEPTED).json({user:{username:user.username}, token})
        
    } catch (error) {
        console.log(error);  
        next(error)
    }
} 

// module.exports = {
//     login, register
// }
