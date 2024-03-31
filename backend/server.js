//express server
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import './config.js';
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRouter.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import cors from 'cors'
import adminRouter from './routes/adminRoutes.js';



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:3000", credentials: true }))

app.use('/',express.static('public'))

app.use('/api/users', userRouter)
app.use('/api/admin',adminRouter)

app.use(notFound)
app.use(errorHandler)

// Your router definition
// app.post('/api/users/upload', upload.single('file'), uploadFile);

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
