import express,{ Express,NextFunction,Request,Response } from "express";
import cors from 'cors'


import userRouter from '../routes/userRoutes'
import adminRouter from '../routes/adminRoutes'
import cookieParser from "cookie-parser";

const app : Express = express()

app.use(express.json()),
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

//cors setup
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    methods:['GET','POST','PUT','PATCH','DELETE'],
    optionsSuccessStatus:204    
}))

// Routes
app.use('/user',userRouter)
app.use('/admin',adminRouter)
export default app