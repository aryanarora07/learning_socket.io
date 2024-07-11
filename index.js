import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { Server } from 'socket.io';     // importing server from socket io



const app = express();
const server = createServer(app);
const io = new Server(server);          // creating new socket io instance with the http server 

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// there are some pre defined events such as connection , disconnect but you can also make custom events

io.on("connection", (socket)=>{         // when a client connects you get a socket object (as seen in the params) that represents a specific connection
    console.log("A user connected");
    socket.on("disconnect", ()=>{       //  when socket disconnects
        console.log("The user disconnected");
    })
})


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});