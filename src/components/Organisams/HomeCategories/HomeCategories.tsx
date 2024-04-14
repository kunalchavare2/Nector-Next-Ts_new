"use client";


import React from "react";
import { useEffect } from "react";
import {
  CategoryHeaders,
  CategoryProductList,
  CategoryGroceryList,
  Wrapper,
} from "./HomeCategories.styled";
import NavIcon from "../../Atoms/NavIcon/NavIcon";
import { fetchProducts } from "../../../store/Slice/ProductSlice/ProductSlice";
import ProductCard from "../../Molecules/ProductCard/ProductCard";
import { addToCart } from "../../../store/Slice/UserSlice/UserSlice";
import Category from "../../Molecules/Category/Category";
import { checkOlderDate, createQueryString } from "../../../utils/utility";
import Heading from "../../Atoms/Heading/Heading";
import { fontSize } from "../../../utils/constant/style-const";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Tags } from "@/lib/enum/enum";
import { useRouter } from "next/navigation";

type propsTypes = {
  isShowGroceries: boolean;
  linkTo: string;
  text: string;
  tag: Tags;
};

const HomeCategories = ({ isShowGroceries, linkTo, text, tag }: propsTypes) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const { categories } = useAppSelector((state) => state.category);
  // const { isShowGroceries, linkTo, text, tag } = props;

  const router = useRouter();
  
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products]);

  const addToCartHandler = (
    ev: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    dispatch(addToCart({ id: id, quantity: 1 }));
  };
  const categoryClickHandler = (id: string) => {
    let queryString = createQueryString({ category: id });
    //router(`${PRODUCTS_ROUTE + queryString}`, { replace: true });
  };

  return (
    <>
      {console.log(products)}
      {products.length > 0 && (
        <>
          <CategoryHeaders>
            <Heading type={fontSize.titleLarge} label={text} tcolor="#000" />
            <NavIcon
              icon={""}
              text="See all"
              link={`${linkTo}?tags=${tag}`}
              hideIcon={true}
            />
          </CategoryHeaders>
          <Wrapper>
            {isShowGroceries ? (
              <CategoryGroceryList>
                {Object.keys(categories).map((key) => {
                  return (
                    <Category
                      key={categories[key].label}
                      isCard={false}
                      className="categoryItem"
                      imgSrc={categories[key].image}
                      text={categories[key].label}
                      backgroundColor={categories[key].color}
                      HandleClick={categoryClickHandler}
                    />
                  );
                })}
              </CategoryGroceryList>
            ) : (
              <CategoryProductList>
                {products.map((prod) => {
                  let newTags = [...prod.tags];
                  const created = new Date(prod.createdAt);
                  if (checkOlderDate(created, 9)) {
                    const tagStr = Tags[Tags.New];
                    newTags.push(Tags[tagStr]);
                  }

                  if (newTags.includes(Tags[tag])) {
                    return (
                      <div key={prod.id}>
                        <ProductCard
                          layout="card"
                          style={{ width: "200px" }}
                          productItem={prod}
                          addCartHandler={addToCartHandler}
                           openCardHandler={(id) => router.push(`../product/${id}`)}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </CategoryProductList>
            )}
          </Wrapper>
        </>
      )}
      {/* {products.length === 0 && <div>Hello</div>} */}
    </>
  );
};
export default HomeCategories;
