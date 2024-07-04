 
import express from "express";
import db, { query } from "./db.js";
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
       const admin_id = btnKaMsg.admin_id;
       const vendor_id = btnKaMsg?.vendor_id;
       const senderName = btnKaMsg.senderName;
       const message = btnKaMsg.message;

      socket.in(room_id).emit("getmessage", btnKaMsg);

    });

    // socket.on("sendmessage", async (btnKaMsg) => {
    //     const room_id = btnKaMsg.room_id;
    //     const user_id = btnKaMsg.user_id;
    //     const admin_id = btnKaMsg.admin_id;
    //     const vendor_id = btnKaMsg?.vendor_id;
    //    // const time = btnKaMsg.time;
    //     const sendername = btnKaMsg.sendername;
    //     const message = btnKaMsg.message;
    //     console.log("vendorId", vendor_id);
    //     socket.join(room_id);
    //     try {
    //         if (user_id) {
    //             const values = [user_id,message,+admin_id,sendername];
    //             const insertQuery = 'INSERT INTO chats (room_id user_id, message, admin_id,sendername ) VALUES (?, ?, ?,?,?)';
    //             const result = await query(insertQuery,values);
    //             console.log("result message add successfully");  
    //         }else{
    //             const values = [vendor_id,message,+admin_id,sendername];
    //             const insertQuery = 'INSERT INTO chats (room_id vendor_id, message, admin_id,sendername ) VALUES (?,?, ?, ?,?)';
    //             const result = await query(insertQuery,values);
    //             console.log("result message add successfully");
    //         }
          
    //     } catch (e) {
    //         console.log("error", e);
    //     }

    //     console.log("location", btnKaMsg);
    //     console.log(btnKaMsg.senderName === "USER");
    //     if (btnKaMsg.senderName === "ADMIN") {
    //         if (btnKaMsg?.vendor_id) {
    //             socket.in(vendor_id).emit("message received", btnKaMsg);
    //             socket.in(vendor_id).emit("getmessage", btnKaMsg);
    //         } else {
    //             socket.in(user_id).emit("message received", btnKaMsg);
    //             socket.in(user_id).emit("getmessage", btnKaMsg);
    //         }
    //     }
    //     if (btnKaMsg.senderName === "USER" || btnKaMsg.senderName === "VENDOR") {
    //         console.log("adminId", admin_id);
    //         socket.in(admin_id).emit("message received", btnKaMsg);
    //         socket.in(admin_id).emit("getmessage", btnKaMsg);
    //     }

    // });


  

        // socket.join(room_id, () => {
        //     console.log("Joined room", room_id);
        //     console.log("location", btnKaMsg);
            
        //     // Emit the message to the room after joining
        //     socket.in(room_id).emit("getmessage", btnKaMsg);
        // });
    
    // console.log("vendorId", vendor_id);
    //  socket.join(room_id);

    // try {
    //     // Ensure your query function is defined and properly handles the database connection
    //     if (user_id) {
    //         const values = [room_id, user_id, message, admin_id, sendername];
    //         const insertQuery = 'INSERT INTO chats (room_id, user_id, message, admin_id, sendername) VALUES (?, ?, ?, ?, ?)';
    //         const result = await query(insertQuery, values);
    //         console.log("result message add successfully");  
    //     } else {
    //         const values = [room_id, vendor_id, message, admin_id, sendername];
    //         const insertQuery = 'INSERT INTO chats (room_id, vendor_id, message, admin_id, sendername) VALUES (?, ?, ?, ?, ?)';
    //         const result = await query(insertQuery, values);
    //         console.log("result message add successfully");
    //     }
    // } catch (e) {
    //     console.log("error", e);
    //     return;
    // }

//  console.log("location", btnKaMsg);
   // console.log(btnKaMsg.senderName === "USER");

    // if (btnKaMsg.senderName === "ADMIN") {
  //  socket.in(room_id).emit("message received", btnKaMsg);
  
         
        
        // if (btnKaMsg?.vendor_id) {
        //     socket.in(vendor_id).emit("message received", btnKaMsg);
        //     socket.in(vendor_id).emit("getmessage", btnKaMsg);
        // } else {
        //     socket.in(user_id).emit("message received", btnKaMsg);
        //     socket.in(user_id).emit("getmessage", btnKaMsg);
        // }
    // } else{
    //     socket.in(room_id).emit("message received", btnKaMsg);
    // }

    // if (btnKaMsg.senderName === "USER" || btnKaMsg.senderName === "VENDOR") {
    //     console.log("adminId", admin_id);
    //     socket.in(admin_id).emit("message received", btnKaMsg);
    //     socket.in(admin_id).emit("getmessage", btnKaMsg);
    // }


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
