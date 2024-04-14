"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchProducts } from "@/store/Slice/ProductSlice/ProductSlice";
import { useEffect } from "react";
import HomeCarousel from "@/components/Organisams/HomeCarousel/HomeCarousel";
import HomeCategories from "@/components/Organisams/HomeCategories/HomeCategories";
import { Tags } from "@/lib/enum/enum";

const Home = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products,dispatch]);

  return   <div>
  <HomeCarousel />
  <HomeCategories
    text="New Products"
    linkTo={""}
    tag={Tags.New}
    isShowGroceries={false}
  />

  <HomeCategories
    text="Exclusive Offer"
    linkTo={""}
    tag={Tags.Exclusive}
    isShowGroceries={false}
  />

  {/* <HomeCategories text="Groceries" isShowGroceries={true} /> */}
  <HomeCategories
    text="Best Selling"
    linkTo={""}
    tag={Tags.Bestseller}
    isShowGroceries={false}
  />
</div>;
};

export default Home;
