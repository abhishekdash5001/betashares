import  { Router,Request, Response } from 'express';
const router = Router();
import { topASXSecurities,updateTopASXSecurities } from '../../mockData/asxSecurities';
const fs = require("fs");
import  type {OrdersType} from "../../types/order"
const path = require("path");
const pathToFile = path.resolve("../server/src/mockData/data.json");
export const pathToFileCompleted = path.resolve("../server/src/mockData/completed.json");
const getOrders =()=> JSON.parse(fs.readFileSync(pathToFile));
const getCompletedOrders =()=> JSON.parse(fs.readFileSync(pathToFileCompleted));
router.get('/securities',(req:Request,res:Response)=>{
   
   res.send(topASXSecurities)
})

router.post('/buySecurity',(req:Request,res:Response)=>{
   let orders:OrdersType[]= getOrders();
console.log("buying" ,req.body)
   let currentOrder:OrdersType = req.body;
   let date = new Date()
   currentOrder.createdAt= date;
   const hours = date.getHours().toString().padStart(2, '0'); 
   const minutes = date.getMinutes().toString().padStart(2, '0'); 
   currentOrder.HHMM = `${hours}:${minutes}`
   currentOrder.status="pending"
   let index :number = isOrderExist(currentOrder.name,orders);
   if(index>-1){
      orders[index]= currentOrder
   }else{
      orders.push(currentOrder)
   }
  
   fs.writeFile(pathToFile,JSON.stringify(orders,null,2),(error:Error)=>{
      if(error){
         return res.status(422).send(error)
     }
   res.send(orders)
})


});
router.get('/getOrders',(req:Request,res:Response)=>{
   let orders:OrdersType[]= getOrders(); 
   res.send(orders)
});


router.post('/postOrders',(req:Request,res:Response)=>{
   let orders:OrdersType[]= getOrders(); 
   let completedOrder:OrdersType[] = getCompletedOrders();
   let {order}:{order:OrdersType}= req.body;
if(order.status === "pending"){
   order.status ="completed";
  let pendingOrders:OrdersType[]= orders.filter((orderE:OrdersType,index:number)=>{
     if(orderE.symbol !== order.symbol){
       return orderE
     }
   })
      completedOrder.push(order)
      fs.writeFile(pathToFile,JSON.stringify(pendingOrders,null,2),(error:Error)=>{
         if(error){
            return res.status(422).send(error)
        }
        fs.writeFile(pathToFileCompleted,JSON.stringify(completedOrder,null,2),(error:Error)=>{
         if(error){
            return res.status(422).send(error)
        }
        console.log(completedOrder)
        res.send({pendingOrders,completedOrder})
        })
        
     
   })

   }
else{
   res.status(422).send("Order not present")
}
  
  

 
});

function isOrderExist(OrderName:string,orders:OrdersType[]):number{
  
 return  orders.findIndex(({name},index)=>OrderName==name)

}

export default router



