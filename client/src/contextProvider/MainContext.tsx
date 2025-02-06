import { useContext, createContext, useState,ReactNode, useEffect } from 'react';
import type {StateType} from "../types/state";

import type {SecuritiesType} from "../types/security";
import type {OrdersType,Status} from ".,/types/order";
import { IDialogCloseProps, IDialogOpenProps } from '../types/dialog';
import axios, { AxiosResponse } from 'axios';





export type MainContextType ={
    data: StateType;
    updateWatchList: (watchList: SecuritiesType[]) => void;
    toggleModalState:({symbol,name,price,type,index}:DialogProps)=>void
    updatePlacedOrder:(pendingOrders:OrdersType)=>void;

}



   type DialogProps = IDialogOpenProps | IDialogCloseProps;
interface MainContextProviderProp{
    children:ReactNode
}

const MainContext = createContext<MainContextType|null>(null);

const MainContextProvider = ({ children }:MainContextProviderProp) => {

    useEffect(()=>{
        getPlaceOrders();
    },[])

    const getPlaceOrders=async()=>{
        try{
            const response:AxiosResponse<OrdersType>= await axios.get("http://localhost:3001/api/getOrders")
            if(updatePlacedOrder && response.data){
             updatePlacedOrder(response.data)
            }
            const webSocket = new WebSocket('ws://localhost:3001');

            webSocket.onmessage = (event: MessageEvent) => {

                updateWatchList(JSON.parse(event.data))
            }
 
   
         }
         catch(error:unknown){
             console.log(error)
 
         }
    }

  
    const [data,setData] = useState<StateType>({
        watchList:[],
        isModalOpen:false,
        pendingOrders:[],
        completedOrders:[],
        modalData:{
            name:'',
            price:0,
            symbol:'',
            type:'',
            index:0,
        }
    });

//     useEffect(()=>{


    const updateWatchList=(watchList:SecuritiesType[])=>{
        setData((data:StateType)=>{
       
           return {
                ...data,
                watchList:watchList,
                modalData:data.modalData.name !== '' ?setModalData(watchList,data):data.modalData,
                pendingOrders:updateOrdersP(watchList,data.pendingOrders)
           }
            
        }); 
    }

    const setModalData=(watchList:SecuritiesType[],data:StateType):IDialogOpenProps|IDialogCloseProps=>{
      const obj :SecuritiesType|undefined = watchList.find((list:SecuritiesType)=>list.symbol=== data.modalData.symbol);
      if(obj){
       return {
        ...data.modalData,
        price:obj.price
       }
      }
       return data.modalData;

    }

    const updateOrdersP=(watchList:SecuritiesType[],pendingOrders:OrdersType[]):OrdersType[]=>{
   
       const updatedOrder: OrdersType[]=   pendingOrders.map((order:OrdersType)=>{
     return{
        ...order,
        currentPrice:watchList[order.index]?.price,
        status: fetchStatusOfOrder(order,watchList[order.index]?.price)
     }
           })
           
           return updatedOrder;
        

    }


    const fetchStatusOfOrder=(order:OrdersType,price:number):Status=>{
   
        if(order.status === "completed"){
            return "completed"
        }else if(order.status ==="pending"){
          
            if(order.type === "buy" && price > order.price){
             return "pending"
            }else if(order.type === "sell" && price <   order.price){
        return "pending"
            }
            
             updateOrderStatusInServer(order)
                    return "completed"
            }
        }
      
       
     
    

    const updateOrderStatusInServer=async(order:OrdersType)=>{
        try{
            const response:AxiosResponse<any>    =    await axios.post("http://localhost:3001/api/postOrders",{order})
            setData((data:StateType)=>{
              
                return{
                    ...data,
                    pendingOrders:response.data.pendingOrders,
                completedOrders:response.data.completedOrder,
                }
                
            })
      
          
        }
         catch(err:unknown){
         console.log(err);
         return "rejected"
}
    }
   

    const  toggleModalState=(props:DialogProps)=>{  
  
       setData((data:StateType)=>{
        return {
            ...data,
            isModalOpen:data.isModalOpen?false:true,
            modalData:{...props,index:props.index}
        }
       })
       
    }

    const updatePlacedOrder=(pendingOrders:OrdersType)=>{
        setData((data:StateType)=>{
            return {
                 ...data,
                 pendingOrders
            }
             
         });
    }


    return (
        <MainContext.Provider value={{ data, updateWatchList,toggleModalState,updatePlacedOrder}}>
            {children}
        </MainContext.Provider>
    )

}

const  useMyContext = ():MainContextType|null=>useContext(MainContext);


export {useMyContext,MainContextProvider}
