export  type OrdersType = {
    symbol: string;
    name: string;
    price: number;
    createdAt:Date,
    status:Status,
    HHMM:string,
    index:number,
  };

  type Status= "pending"|"rejected"|"completed"