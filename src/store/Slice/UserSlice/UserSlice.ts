"use client"

import { createSlice, current } from "@reduxjs/toolkit";
import { LocalStorageKeys } from "@/utils/constant/global-const";
import { Bounce, toast } from "react-toastify";
import {getFromLocalStorage, saveToLocalStorage} from "@/utils/utility";
import UserData from "@/lib/models/UserData";

const savedLocalData:UserData = getFromLocalStorage(LocalStorageKeys.userData);
const initialState:UserData = savedLocalData
  ? savedLocalData
  : {
      wishlist: {
        wishlistItems: [],
      },
      cart: {
        cartItems: [],
        cartCount: 0,
      },
    };

const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    // To add new cart item into existing cart items
    addToCart: (state, action) => {
      // Getting current state cart items
      const cartItems = [...current(state.cart.cartItems)];

      const item = cartItems.find((item) => item.id === action.payload.id);

      if (!item) {
        state.cart.cartItems.push(action.payload);
        state.cart.cartCount = state.cart.cartItems.length;
        toast.success("Item Added to cart.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    },
    // To remove the element from cart items
    removeFromCart: (state, action) => {
      // Getting current state cart items
      const cartItems = [...current(state.cart.cartItems)];

      // removing the element from cart items
      const filterCartItems = cartItems.filter(
        (item) => item.id !== action.payload
      );

      // assigning new list of cart items
      state.cart.cartItems = [...filterCartItems];

      // Updating the cart items count
      state.cart.cartCount = state.cart.cartItems.length;
    },
    // To update the quantity of an item in cart
    updateCartItemQuantity: (state, action) => {
      // Getting current state cart items
      const cartItems = [...current(state.cart.cartItems)];

      // Getting position of item to updated
      const position = cartItems.findIndex((item) => {
        return item.id === action.payload.id;
      });

      // Updating item quantity using position
      state.cart.cartItems[position].quantity = action.payload.quantity;
    },

    clearCart: (state) => {
      state.cart.cartItems = [];
      state.cart.cartCount = 0;
    },
    addToWishList: (state, action) => {
      // Getting current state wishlist items
      const wishListItems = [...current(state.wishlist.wishlistItems)];

      // check if item is already in wishlist
      const item = wishListItems.find((item) => item === action.payload);

      if (!item) {
        // If item is not in wishlist then add it
        state.wishlist.wishlistItems.push(action.payload);
      } else {
        // if item is in wishlist list then remove it
        state.wishlist.wishlistItems = wishListItems.filter(
          (item) => item === action.payload
        );
      }
    },
    removeFromWishList: (state, action) => {
      // Getting current state wishlist items
      const wishListItems = [...current(state.wishlist.wishlistItems)];

      // removing the element from wishlist items
      const filterWishlistItems = wishListItems.filter(
        (item) => item !== action.payload
      );

      // Assigning filter list to wishlist items
      state.wishlist.wishlistItems = [...filterWishlistItems];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => {
        // console.log(action);
        return action.type.startsWith("user/");
      },
      (state) => {
        saveToLocalStorage(current(state), LocalStorageKeys.userData);
      }
    );
  },
});

export default UserSlice.reducer;
export const {
  addToCart,
  clearCart,
  removeFromCart,
  updateCartItemQuantity,
  addToWishList,
  removeFromWishList,
} = UserSlice.actions;
