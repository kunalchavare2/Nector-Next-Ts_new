"use client";

import React, { useEffect, useRef, useState } from "react";
import Heading from "../../Atoms/Heading/Heading";
import { Filter, FilterCategories, IconButton } from "./FilterComp.styled";
import CategoryFilter from "../../Molecules/CategoryFilter/CategoryFilter";
import PriceFilter from "../../Molecules/PriceFilter/PriceFilter";
import { createQueryString, queryStringToObject } from "../../../utils/utility";
import { useLocation, useNavigate } from "react-router";
import TagsFilter from "../../Molecules/TagsFilter/TagsFilter";
import { PRODUCTS_ROUTE } from "../../../utils/constant/routes-cont";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { showFilter } from "../../../store/Slice/CommonStateSlice/CommonStateSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";
import FilterQuery from "@/lib/models/FilterQuery";
import queryString from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

const FilterComp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams ? searchParams.toString() : "";
  const dispatch = useAppDispatch();
  const [filterState, setFilterState] = useState<FilterQuery>({
    maxPrice: 16,
    minPrice: 0,
    category: [],
    search: "",
    sort: "Name",
    tags: [],
    modified: false,
  });

  useEffect(() => {
    if (location.search.length) {
      const queryObj = queryStringToObject(location.search, {
        maxPrice: 1,
        minPrice: 16,
        category: [],
        search: "",
        sort: "",
        tags: [],
      });

      if ("maxPrice" in queryObj && "category" in queryObj) {
        setFilterState((prev) => {
          return { ...prev, ...queryObj, modified: true };
        });
      }
    }
  }, []);

  const getPriceHandler = (priceObj: {
    minPrice: number;
    maxPrice: number;
  }) => {
    setFilterState((prev) => {
      return { ...prev, ...priceObj, modified: true };
    });
  };
  const getTagsHandler = (tagArr: string[]) => {
    setFilterState((prev) => {
      return { ...prev, tags: tagArr, modified: true };
    });
  };

  const getCategoriesHandler = (categoryArr: string[]) => {
    setFilterState((prev) => {
      return { ...prev, category: categoryArr, modified: true };
    });
  };

  useEffect(() => {
    // let queryString = createQueryString({ ...filterState });

    let newQueryString = queryString.stringify(filterState, {
      arrayFormat: "bracket",
    });

    if (searchQuery.length > 1 && !filterState.modified) {
      newQueryString = searchQuery;
      console.log("running");
    }
    router.push("/products?" + newQueryString);
  }, [filterState]);

  return (
    <Filter>
      <FilterCategories>
        <Heading type="large" label="Price" />
        <PriceFilter getPrice={getPriceHandler} />
      </FilterCategories>
      <FilterCategories>
        <Heading type="large" label="Categories" />
        <CategoryFilter getCategories={getCategoriesHandler} />
      </FilterCategories>
      <FilterCategories>
        <Heading type="large" label="Tags" />
        <TagsFilter getTags={getTagsHandler} />
      </FilterCategories>
      <IconButton
        icon={<IoClose />}
        transparent={true}
        onClick={() => {
          dispatch(showFilter());
        }}
      />
    </Filter>
  );
};
export default FilterComp;
