"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import {
  Specifiedproductlist,
  ProductListPageStyle,
} from "./ProductListPage.styled";
import { fetchProducts } from "../../store/Slice/ProductSlice/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/Molecules/ProductCard/ProductCard";
import { addToCart } from "../../store/Slice/UserSlice/UserSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { checkOlderDate, queryStringToObject } from "../../utils/utility";
import SearchBar from "../../components/Molecules/SearchBar/SearchBar";
import { sortList } from "../../utils/sort";
import Loading from "../../components/Molecules/Loading/Loading";
import { PRODUCT_DETAIL_ROUTE } from "../../utils/constant/routes-cont";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Product } from "@/lib/models/product";
import FilterQuery from "@/lib/models/FilterQuery";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { tags } from "@/utils/constant/app-const";

type ProductListPageProps = {
  showFilter: boolean;
  setShowFilter?: (show: boolean) => void;
};

const ProductListPage = ({
  showFilter,
  setShowFilter,
}: ProductListPageProps) => {
  const dispatch = useAppDispatch();
  const [loadingProducts, setLoadingProducts] = useState(false);
  const { products, loading, error } = useAppSelector((state) => state.product);
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  // const navigate = useNavigate();
  const searchParams = useSearchParams();

  useEffect(() => {
    let queryString = searchParams?.toString();

    if (products.length > 0) {
      setLoadingProducts(true);
      if (queryString && queryString.length > 1) {
        setTimeout(() => {
          filterProductsHandler(queryString);
        }, 100);
      } else {
        setFilterProducts(products);
        setLoadingProducts(false);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    let queryString = searchParams?.toString();
    if (products.length > 0) {
      if (!loading && !queryString) {
        setFilterProducts(products);
      } else if (!loading && queryString) {
        filterProductsHandler(queryString);
      }
    }
  }, [loading]);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
      setLoadingProducts(false);
    }
  }, [loadingProducts]);

  const filterProductsHandler = (queryStr: string) => {
    // const queryObj: FilterQuery = queryStringToObject(queryStr, {
    //   search: null,
    //   category: [],
    //   minPrice: null,
    //   maxPrice: null,
    //   sort: "",
    //   tags: [],
    // });

    const queryObj: FilterQuery = queryString.parse(queryStr);

    let filterProductsTemp = products;

    if ("minPrice" in queryObj && "maxPrice" in queryObj) {
      filterProductsTemp = filterProductsTemp.filter((product) => {
        return (
          product.price >= Number(queryObj.minPrice) &&
          product.price <= Number(queryObj.maxPrice)
        );
      });
    }

    if ("category" in queryObj) {
      filterProductsTemp = filterProductsTemp.filter((product) => {
        return queryObj.category?.includes(product.category);
      });
    }

    if ("tags" in queryObj) {
      filterProductsTemp = filterProductsTemp.filter((product) => {
        console.log(queryObj);

        const filterTags = queryObj.tags?.filter((tag) => {
          let newTags: string[] = [...(product.tags as string[])];
          const created = new Date(product.createdAt);
          if (checkOlderDate(created)) {
            newTags.push("new");
          }
          return newTags.includes(tag);
        });

        return filterTags && filterTags.length > 0;
      });
    }

    if ("search" in queryObj && typeof queryObj.search !== undefined) {
      let searchStr = queryObj.search ? queryObj.search : "";
      if (searchStr.length > 0) {
        let searchProductsTemp = filterProductsTemp.filter((product) => {
          const isMatch = product.title
            .toLowerCase()
            .match(searchStr.toLowerCase());
          return isMatch ? true : false;
        });
        filterProductsTemp = [...searchProductsTemp];
      }
    }

    if ("sort" in queryObj) {
      if (filterProductsTemp.length > 0) {
        const sortedProducts = sortList(queryObj.sort, filterProductsTemp);
        filterProductsTemp = [...sortedProducts];
      }
    }

    setFilterProducts(filterProductsTemp);
    setLoadingProducts(false);
  };

  const addToCartHandler = (ev: React.MouseEvent, id: string) => {
    dispatch(addToCart({ id: id, quantity: 1 }));
  };

  const openCardHandler = (id: string) => {
    // navigate(PRODUCT_DETAIL_ROUTE + id);
  };

  if (loadingProducts) {
    return <Loading showLoading={loadingProducts} />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <ProductListPageStyle>
      <SearchBar />
      <Specifiedproductlist>
        {filterProducts.map((prod) => {
          return (
            <ProductCard
              layout="card"
              key={prod.id}
              style={{ width: "auto" }}
              productItem={prod}
              addCartHandler={addToCartHandler}
              openCardHandler={openCardHandler}
            />
          );
        })}
      </Specifiedproductlist>
    </ProductListPageStyle>
  );
};
export default ProductListPage;
