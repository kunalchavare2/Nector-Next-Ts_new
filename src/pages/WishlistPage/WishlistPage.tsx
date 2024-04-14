"use client";

import React, { useEffect } from "react";
import WishlistPageStyle from "./WishlistPage.styled";
import ProductCard from "../../components/Molecules/ProductCard/ProductCard";
import InfoTypes from "../../components/Organisams/InfoTypes/InfoTypes";
import { removeFromWishList } from "../../store/Slice/UserSlice/UserSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchProducts } from "@/store/Slice/ProductSlice/ProductSlice";

const WishlistPage = () => {
  const { loading, products } = useAppSelector((state) => state.product);
  const wishlist = useAppSelector((state) => state.user.wishlist.wishlistItems);
  const wishlistCount = wishlist.length;
  const dispatch = useAppDispatch();

  const removeFromWishlistHandler = (ev: React.MouseEvent, id: string) => {
    dispatch(removeFromWishList(id));
  };

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length > 0) {
    return (
      <WishlistPageStyle>
        {!wishlistCount && <InfoTypes type="emptyWishlist" />}

        {products &&
          wishlist.map((id) => {
            const wishlistItem = products.find(
              (productItem) => productItem.id === id
            )!;

            return (
              <ProductCard
                layout="wishlist"
                key={wishlistItem.id}
                style={{ width: "auto" }}
                productItem={wishlistItem}
                removeHandler={removeFromWishlistHandler}
              />
            );
          })}
      </WishlistPageStyle>
    );
  }
};

export default WishlistPage;
