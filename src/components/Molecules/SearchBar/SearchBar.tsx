import React, { useEffect, useRef, useState } from "react";
import SearchBarStyle, { IconButton } from "./SearchBar.styled";
import Search from "../../Atoms/Search/Search";
import Sort from "../Sort/Sort";
import { CiFilter } from "react-icons/ci";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const queryRef = useRef<string>("");
  // const location = useLocation();
  // const navigate = useNavigate();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const searchBarHandler = (value: string) => {
    setSearchValue(value.toLowerCase());
    let searchQuery: string = searchParams ? searchParams.toString() : "";
    if (searchQuery.length > 0) {
      const queryObj = queryString.parse(searchQuery);
      const newQueryObj = {
        ...queryObj,
        search: value.toLowerCase(),
      };

      const newQueryString = queryString.stringify(newQueryObj, {
        arrayFormat: "bracket",
      });
      queryRef.current = newQueryString;
      console.log(newQueryString);
      
    }
  };

  const enterKeyEvent = (ev: React.KeyboardEvent) => {
    if (ev.key === "Enter") {
      router.push(`products?${queryRef.current}`);
    }
  };

  const clearSearch = () => {
    router.push(`products?${queryRef.current}`);
  };

  return (
    <SearchBarStyle>
      <Search
        searchHandler={searchBarHandler}
        searchEnterHandler={enterKeyEvent}
        clearInputEvent={clearSearch}
      />
      <Sort />
      <IconButton
        icon={<CiFilter />}
        transparent={true}
        onClick={() => {
          // dispatch(showFilter());
        }}
      />
    </SearchBarStyle>
  );
};

export default SearchBar;
