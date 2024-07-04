 
import express from "express";
import { Server } from 'socket.io';
const app = express();
const port = 55000;
const wifiIp = "192.168.1.4"
var server = app.listen(port, () => {
    console.log(`Server is running ${port}`);
});



app.get("/", (req, resp) => {
    resp.status(200).json("socket is running");
})

 


const io = new Server(server, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log("user is comming");
    socket.emit("userConnected", "Connected Successfully");

    //for chats
    socket.on("setup", (room_id) => {
        console.log("setup room_id", room_id);
        socket.join(room_id);
        socket.emit("connectedSocketId", room_id);
        console.log("connected User");
    })

    socket.on("sendmessage", async (btnKaMsg) => {
       const room_id = btnKaMsg.room_id;
       const user_id = btnKaMsg.user_id;
      // const admin_id = btnKaMsg.admin_id;
       const vendor_id = btnKaMsg?.vendor_id;
       const senderName = btnKaMsg.senderName;
       const message = btnKaMsg.message;
     
      socket.in(room_id).emit("getmessage", btnKaMsg);

    });
 

// Example query function with error handling
async function query(sql, params) {
    return new Promise((resolve, reject) => {
        dbConnection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}


    
    //end chats

    socket.on('disconnect', (socket) => {
        console.log('Disconnect');
    });
});
