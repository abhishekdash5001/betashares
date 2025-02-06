import { useMyContext ,MainContextType} from '../contextProvider/MainContext';
import { OrdersType } from '../types/order';

const Orders = () => {
    const {data} = useMyContext() ?? {};
    const {pendingOrders,completedOrders}=data??{};
   
    return (
       <>
       <h2>
       Pending Orders
        </h2>
        { pendingOrders?.length  &&  <table>
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Current Price</th>
                    <th>Quantity</th>
                    <th>Time</th>
                    <th>Type</th>
                   
                </tr>
            </thead>
            <tbody>
            {
        pendingOrders?.map(({name,price,quantity,symbol,type,HHMM,currentPrice,createdAt}:OrdersType)=>
        <tr key={createdAt.toString()}>
            <td>
                {symbol}
            </td>
            <td>

            {name}
            </td>
            <td>
                {price}
            </td>
            <td>
                {currentPrice}
            </td>
            <td>
                {quantity}
            </td>
            <td>
                {HHMM}
            </td>
            <td>
                {type}
            </td>
           
        </tr>
        )
     }
            </tbody>
        


        </table>}

        <h2>
       Completed Orders
        </h2>
        { completedOrders?.length  &&  <table>
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Current Price</th>
                    <th>Quantity</th>
                    <th>Time</th>
                    <th>Type</th>
                   
                </tr>
            </thead>
            <tbody>
            {
        completedOrders?.map(({name,price,quantity,symbol,type,createdAt,HHMM,currentPrice}:OrdersType)=>
        <tr key={createdAt.toString()}>
            <td>
                {symbol}
            </td>
            <td>

            {name}
            </td>
            <td>
                {price}
            </td>
            <td>
                {currentPrice}
            </td>
            <td>
                {quantity}
            </td>
            <td>
                {HHMM}
            </td>
            <td>
                {type}
            </td>
           
        </tr>
        )
     }
            </tbody>
        


        </table>}
       </>
    
   );
}
 
export default Orders;