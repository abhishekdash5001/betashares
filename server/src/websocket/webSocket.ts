import { Server as WebSocketServer } from 'ws';
import { server ,port} from '../server';
import { topASXSecurities,updateTopASXSecurities } from '../mockData/asxSecurities';
import { pathToFileCompleted } from '../routes/api/securities';
const fs = require("fs");
const wss = new WebSocketServer({ server });

wss.on("connection",(ws:WebSocket,request:Request)=>{
    console.log("cleaning completed ")
    fs.writeFile(pathToFileCompleted,JSON.stringify([],null,2),(error:Error)=>{
        if(error){
        
       }
     
       })
  setInterval(()=>{
  let updatedResponse =   updateTopASXSecurities(topASXSecurities.map((e)=>{
        return {
            ...e,
            previousPrice:e.price,
            price:getRandomPrice()

        }
    }))
    ws.send(JSON.stringify(updatedResponse))
  },1000)

    wss.on("message",(message:string)=>{
        ws.send("hello brother")
    })

})
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

function getRandomPrice(min: number = 10, max: number = 100): number {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  }