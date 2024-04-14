import  Cart  from '@/lib/models/Cart';

export  default interface UserData{

    wishlist : {wishlistItems: string[]},
    cart:{
        cartItems: Cart[],
        cartCount: number,
      },
}