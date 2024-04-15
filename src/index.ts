require('dotenv').config()
import app from "./frameworks/webserver/config/app";
import connectDb from "./frameworks/webserver/config/db";


const port  = process.env.PORT

const start = ()=>{
    app.listen(port,()=>{
        console.log(`server started on http://localhost:${port}`);
        connectDb()
    })
}

start()