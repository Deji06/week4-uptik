//  @ts-ignore
import express, {Express} from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const app:Express = express()
import connectDb from './DB/connect'
import authRouter from './routes/user'
import taskRouter from './routes/task'
import NotFoundMiddleware from './middleWare/NotFoundMiddleware'
import errorHandlerMiddleWare from './middleWare/errorHandler'
import  userAuthentication from './middleWare/authentication'
import helmet from 'helmet'
import cors from 'cors'
import rateLimiter from 'express-rate-limit'
import {config} from './config'



// security 
app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
// app.use(xss())

// router
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/task', userAuthentication, taskRouter)


// middleWare
app.use(NotFoundMiddleware)
app.use(errorHandlerMiddleWare)

 const PORT = process.env.PORT || 3000

 const start = async()=> {
    try {
        await connectDb(config.MONGO_URI)
        app.listen(PORT, ()=> {
            console.log(`app is listening in port: ${PORT}.....`)
            console.log('MongoDB connected:', mongoose.connection.db?.databaseName);
        })  
    } catch (error) {
        console.log(error); 
        console.error('MongoDB connection error:', error);
    }
 }
start()