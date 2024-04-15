import express,{ Express,NextFunction,Request,Response } from "express";
import cors from 'cors'


import userRouter from '../routes/userRoutes'

const app : Express = express()

app.use(express.json()),
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
export default app