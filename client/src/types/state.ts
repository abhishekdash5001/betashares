import { IDialogOpenProps ,IDialogCloseProps} from './dialog';
import type { SecuritiesType } from './security';
import type {OrdersType} from "./order";
export type StateType={
    watchList:SecuritiesType[],
    pendingOrders:OrdersType[]
    completedOrders:OrdersType[]
    isModalOpen:boolean;
    modalData:IDialogOpenProps|IDialogCloseProps;
}