// socket.io.ts
import { Server } from "socket.io";

let io: Server;

export const socketServer = (server: any) => {

    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000", // replace with your frontend URL
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });

        socket.on("slotBooked", (data:any) => {
            //  console.log(" ------------------->sldd",data)
            io.emit("slotBooked", data);
        });
        socket.on("joinNewUser",(data:{_id:string}[])=>{
            console.log(data,"0000000");

            data.forEach(i=>{
                console.log(i?._id);
                
                 socket.join(i?._id);
            })
        })    
        socket.on("sendData",data=>{
            console.log(data);
            console.log(data.conversationId);
            
            io.to(data.conversationId).emit("sendToUser",data)
            
        })
    });
};

export const getIO = () => io;
