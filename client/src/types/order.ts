  eport type Status= "pending"|"rejected"|"completed";
  type Type="buy"|"sell"
export type OrdersType={
price:number,
quantity:number,
createdAt:string,
name:string,
status:Status,
symbol:string,
type:Type
HHMM:string
currentPrice:number
}