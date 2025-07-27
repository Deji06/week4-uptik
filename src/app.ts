//  @ts-ignore
import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app:Express = express()
import connectDb from './DB/connect'
import authRouter from '../src/routes/user'
import taskRouter from '../src/routes/task'
import notFound from '../src/errors/notFound'
import errorHandlerMiddleWare from '../src/middleWare/errorHandler'
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
app.use(notFound)
app.use(errorHandlerMiddleWare)

 const PORT = process.env.PORT || 3000

 const start = async()=> {
    try {
        await connectDb(config.MONGO_URI)
        app.listen(PORT, ()=> {
            console.log(`app is listening in port: ${PORT}.....`)
        })  
    } catch (error) {
        console.log(error); 
    }
 }
start()