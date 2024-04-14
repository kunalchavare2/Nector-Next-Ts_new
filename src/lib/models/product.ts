import { Tags } from "../enum/enum";


export interface Product {
  readonly id: string;
  title: string;
  price: number;
  createdAt: Date;
  tags: Tags[];
  quantity: string;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: 3.6;
    count: 145;
  };
}
