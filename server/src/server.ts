import express, { Request, Response } from 'express'; 
import AsxSecurityRouter from "./routes/api/securities"
import { Server as WebSocketServer } from 'ws';
import http from 'http';
// import { MockWebSocket } from './webSocket';
const cors = require('cors');
const app = express();



export const port: number = 3001; 


app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from the frontend
  }));
app.use(express.json());
app.use('/api',AsxSecurityRouter);


app.get("/", (req: Request, res: Response): void => { 
   
    res.send("hello ddddworld");
});

export  const server = http.createServer(app);
 //const wss = new WebSocketServer({ server });


// wss.on("connection",(ws:WebSocket,request:Request)=>{
//     console.log('A new client connected.');
//     ws.send('Welcome to the WebSocket server!');
// //   setInterval(()=>{
// //  ws.send(`${Math.random()}`)
// //   },1000)

//     wss.on("message",(message:string)=>{
//         ws.send("hello brother")
//     })

// })


// server.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
