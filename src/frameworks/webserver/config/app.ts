import express,{ Express,NextFunction,Request,Response } from "express";
import cors from 'cors'
import http from "http"
import cookieParser from "cookie-parser";
import { socketServer } from "../../services/socket.io";


import userRouter from '../routes/userRoutes'
import adminRouter from '../routes/adminRoutes'
import painterRouter from '../routes/painterRoutes'
import postRouter from '../routes/postRoutes'
import messageRouter from '../routes/messageRoutes'

const app : Express = express()
const server = http.createServer(app)

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

socketServer(server)

// Routes
app.use('/user',userRouter)
app.use('/admin',adminRouter)
app.use('/painter',painterRouter)
app.use('/post',postRouter)
app.use('/message',messageRouter)
export default app