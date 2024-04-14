import Checkout from "@/lib/models/Checkout";

export const sortTypes:{[key:string]:{name:string,id:string}} = {
  price: {
    name: "Price",
    id: "Price",
  },
  name: {
    name: "Name",
    id: "Name",
  },
  date: {
    name: "Date",
    id: "Date",
  },
};

export const LocalStorageKeys = {
  userData: "UserData",
  orders: "Orders",
};


export const checkout: {label:string,key: keyof Checkout}[] = [
  {
    label: "Bag Total",
    key: "totalPrice",
  },
  {
    label: "Bag Discount",
    key: "bagDiscount",
  },
  {
    label: "Tax Amount",
    key: "taxAmount",
  },
  {
    label: "Delivery",
    key: "delivery",
  },
];
