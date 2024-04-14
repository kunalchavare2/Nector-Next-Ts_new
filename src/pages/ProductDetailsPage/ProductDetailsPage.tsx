"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Atoms/Button/Button";
import Heading from "../../components/Atoms/Heading/Heading";
import Text from "../../components/Atoms/Text/Text";
import { FaMinus, FaPlus } from "react-icons/fa6";
import {
  Quantity,
  Price,
  ProductImage,
  ProductHeadingfav,
  ProductCountPrice,
  ProductDetailPage,
  ProductCount,
  ProductDescription,
  RegHeart,
  Heart,
  ProductHeading,
  Category,
  ProductContentStyle,
  ButtonWrapperStyle,
} from "./ProductDetailspage.styled";
import { fetchProducts } from "../../store/Slice/ProductSlice/ProductSlice";
import {
  addToCart,
  addToWishList,
  removeFromWishList,
  updateCartItemQuantity,
} from "../../store/Slice/UserSlice/UserSlice";
import { currencyConverter } from "../../utils/utility";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useParams } from "next/navigation";
import Image from "next/image";

const ProductDetailsPage = () => {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const UserData = useAppSelector((state) => state.user);
  const productId = params ? (params.id as string) : "";
  const { loading, products, error } = useAppSelector((state) => state.product);
  const { categories } = useAppSelector((state) => state.category);
  const isWishlisted = UserData.wishlist.wishlistItems.includes(productId);
  const isAddedToCart = UserData.cart.cartItems.find(
    (item) => item.id === productId
  );

  const appconfig = useAppSelector((state) => state.appconfig);
  const dispatch = useAppDispatch();

  const ProductDetails = products.find((prod) => prod.id === productId);

  const quantityHandler = (action: string) => {
    let newValue = quantity;
    if (action === "plus") {
      newValue = quantity + 1;
    } else if (action === "minus" && quantity > 1) {
      newValue = quantity - 1;
    }
    if (isAddedToCart) {
      dispatch(updateCartItemQuantity({ id: productId, quantity: newValue }));
    }
    setQuantity(newValue);
  };

  const addToWishlistHandler = () => {
    if (!isWishlisted) {
      dispatch(addToWishList(productId));
    } else {
      dispatch(removeFromWishList(productId));
    }
  };

  const cartHandler = () => {
    if (!isAddedToCart) {
      dispatch(addToCart({ id: productId, quantity: quantity }));
    } else {
      //navigate(CART_ROUTE);
    }
  };
  const getCategoryColor = (category: string) => {
    const foundCategoryKey = Object.keys(categories).find(
      (key) => categories[key].label === category
    );

    return foundCategoryKey && categories[foundCategoryKey].color;
  };

  useEffect(() => {
    if (isAddedToCart) {
      setQuantity(isAddedToCart.quantity);
    }

    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, []);

  return (
    <>
      {loading && <div>loading</div>}
      {!loading && error && <div>error</div>}
      {!loading && products.length && ProductDetails && (
        <ProductDetailPage>
          <ProductImage>
            <Image
              width={0}
              height={0}
              objectFit="cover"
              className="w-full h-full top-0 left-0 object-cover rounded-2xl"
              sizes="100vw"
              src={ProductDetails.image}
              alt={ProductDetails.title}
            />
          </ProductImage>
          <ProductContentStyle>
            <ProductHeadingfav>
              <ProductHeading>
                <Heading type="large" label={ProductDetails.title} />
                <Text type="medium" label={ProductDetails.quantity} />
              </ProductHeading>
              {isWishlisted ? (
                <Heart onClick={addToWishlistHandler} />
              ) : (
                <RegHeart onClick={addToWishlistHandler} colorValue="#7a7a7a" />
              )}
            </ProductHeadingfav>
            <Category colorValue={getCategoryColor(ProductDetails.category)}>
              {ProductDetails.category}
            </Category>
            <ProductCountPrice>
              <ProductCount>
                <Button
                  icon={<FaMinus />}
                  disabled={quantity === 1}
                  transparent={true}
                  onClick={() => quantityHandler("minus")}
                />
                <Quantity>{quantity}</Quantity>
                <Button
                  icon={<FaPlus />}
                  transparent={false}
                  onClick={() => quantityHandler("plus")}
                />
              </ProductCount>
              <Price>
                {currencyConverter(
                  ProductDetails.price,
                  appconfig.currentCurrency
                )}
              </Price>
            </ProductCountPrice>
            <ProductDescription>
              <Heading type="small" label="Product Details" />
              <Text type="small" label={ProductDetails.description} />
            </ProductDescription>
            <ButtonWrapperStyle>
              <Button
                label={isAddedToCart ? "Open Cart" : "Add to Cart"}
                onClick={cartHandler}
              />
            </ButtonWrapperStyle>
          </ProductContentStyle>
        </ProductDetailPage>
      )}
    </>
  );
};
export default ProductDetailsPage;
