//express server
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import db from './config.js';
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRouter.js'
import { notFound,errorHandler } from './middlewares/errorMiddleware.js';


const app = express()
app.use(express.json())-
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use('/api/users',userRouter)

app.use(notFound)
app.use(errorHandler)

// eslint-disable-next-line no-undef
const port = process.env.PORT|| 4000

app.listen(port,(error)=>{
    if(error){
        console.log(error);
    }else{

        console.log(`server is running on port http://localhost:${port}`)
    }
})