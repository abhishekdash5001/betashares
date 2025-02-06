
import { useMyContext ,MainContextType} from '../contextProvider/MainContext';

const WatchList = () => {
    const mainContext:MainContextType|null = useMyContext();


    const openModal=(symbol:string,name:string,price:number,type:string,index:number):void=>{
   
       
        mainContext?.toggleModalState({symbol,name,price,type,index});
    }
   
    const calculateChange=(previousValue:number,currentValue:number):string=>{
       const change:number =    currentValue-  previousValue;
       const percentChange:number = change/previousValue*100
      return percentChange.toFixed(2)
    }
    return ( 
       <div className=''>
        <h2 className='watchlistRouter'>Watch List</h2>
        <div className="watchListContainer">
           
            {mainContext?.data.watchList.map(({symbol,name,price,previousPrice},index:number)=>
       <div  key={symbol} className="border p-4 rounded-lg shadow-lg bg-white watchListContainer_securities">
         <span className={`watchListContainer_securities--symbol ${previousPrice>price ?'down':'up'}` }>
            {symbol}
         </span>
         <span className={`watchListContainer_securities--name ${previousPrice>price ?'down':'up'}`}>
            {name}
         </span>
         <span className={`watchListContainer_securities--changePercent `}>
            {calculateChange(previousPrice,price)} %
          
         </span>
         <span className={`watchListContainer_securities--price ${previousPrice>price ?'down':'up'}`}>
            {price}
         </span>
         <button className='buyButton' onClick={()=>openModal(symbol,name,price,"buy",index)}>
            B
         </button>
         <button className='sellButton' onClick={()=>openModal(symbol,name,price,"sell",index)}>
            S
         </button>

       </div>
    
    )}
           
      
        </div>
        </div>
     );
}
 
export default WatchList;