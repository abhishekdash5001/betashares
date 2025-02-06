import React, { useEffect, useState, useRef } from 'react';
import { useMyContext, MainContextType } from '../contextProvider/MainContext';
import axios ,{AxiosResponse}from 'axios';
import { OrdersType } from '../types/order';
interface IuserInput{
quantity:number,
price:number
}
const Dialog = () => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const [updatePrice,setUpdatePrice]= useState<number>(0);
    const userInputRef = useRef<IuserInput|null>({
        quantity:0,
        price:0
    });
    const mainContext: MainContextType | null = useMyContext();

    const {data,updatePlacedOrder} = mainContext ?? {};
    const { isModalOpen, modalData } = data ?? {}


    if (dialogRef?.current) {
        if (isModalOpen) {
            dialogRef?.current.showModal()
        } else {
            dialogRef?.current?.close()
        }
    }

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
        if (userInputRef.current) {
         
            if (name === "quantity" || name === "price") {
              userInputRef.current[name] = Number(value);
            }
          }
         if(userInputRef.current)
          setUpdatePrice(userInputRef.current?.price*userInputRef.current?.quantity)

    }



    const onCloseFn = () => {
        mainContext?.toggleModalState({})
    }

    const placeOrder=async(type:string)=>{
        const {symbol,name,index}= modalData??{};
        const obj ={...userInputRef.current,symbol,name,type,index};
        try{
           const response:AxiosResponse<OrdersType>= await axios.post("http://localhost:3001/api/buySecurity",obj)
           if(updatePlacedOrder && response.data){
            updatePlacedOrder(response.data)
            onCloseFn()
           }

  
        }
        catch(error:unknown){
            console.log(error)

        }
      

    }

    return (<>

        <dialog ref={dialogRef} >
            <div className='dialog'>
                <header>
                    <h2>{modalData?.symbol}  ({modalData?.name})</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" onClick={onCloseFn}>
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path fill="black" d="M18.3 5.71a1 1 0 0 0-1.42 0L12 9.59 7.12 4.71a1 1 0 0 0-1.42 1.42L10.59 12l-4.88 5.88a1 1 0 1 0 1.42 1.42L12 14.41l4.88 5.88a1 1 0 0 0 1.42-1.42L13.41 12l4.88-5.88a1 1 0 0 0 0-1.42z" />
                    </svg>

                </header>

               
                <div className='dialog_inputContainer'>
                <div className="form-group">
                    <div>
                    <label htmlFor="Quantity" >Quantity</label>
                    <input type="text" id="Quantity" name="quantity" placeholder="Quantity"  onChange={(e)=>handleChange(e)}/>
                    </div>
                   <div>
                   <label htmlFor="Price">Order Price</label>
                   <input type="text" id="Price" name="price" placeholder="Price"  onChange={(e)=>handleChange(e)}/>
                
                   </div>
                  
                    </div>

                   
                    <div className='dialog_inputContainer--price'>
                       <small>
                       <span>Current Price/Quantity</span>
                        </small> 
                       <small>
                       <b>{modalData?.price}</b>
                        </small>
                    </div>
                    
                </div>
                <div>
                <h5>Total Price</h5>
              INR  <b> {updatePrice}</b>

                </div>
                <button onClick={()=>placeOrder(modalData?.type)}>
                    {modalData?.type}
                </button>
              
            </div>
        </dialog>
    </>);
}

export default Dialog