import {Request, Response, NextFunction}  from 'express'
import {StatusCodes} from 'http-status-codes'
import  {CustomApiError, BadRequestError, AuthenticationError, NotFoundError} from '../errors/index'
import User from '../models/user'
import dotenv from 'dotenv'
dotenv.config()



export const register = async(req:Request, res:Response, next:NextFunction)=> {
 try {
    const {username, email, password } = req.body 
    if(!username || !email || !password) {
        throw new AuthenticationError('provide valid credentials')
    }
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
            throw new AuthenticationError('please provide valid email or password')
            // return next(createCustomError('please provide email or password', StatusCodes.UNAUTHORIZED))
        }
        const user = await User.findOne({email})
        // authentication
        if(!user) {
            throw new CustomApiError('provide valid credentials')
        }
        // comparing password
        const isPasswordMatch = await user.confirmPassword(password)
        if(!isPasswordMatch) {
            throw new AuthenticationError('password does not match')
        }
        const token = user.createJwt()
        // const token = jwt.sign({email},process.env.JWT_SECRET, {expiresIn:'30d'} )
        res.status(StatusCodes.ACCEPTED).json({user:{username:user.username}, token})
        
    } catch (error) {
        console.log(error);  
        next(error)
    }
} 

