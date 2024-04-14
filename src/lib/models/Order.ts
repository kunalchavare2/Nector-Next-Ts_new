import Checkout from "./Checkout";

export default interface Order extends Checkout {
id: string; 
createdOn: string;
}