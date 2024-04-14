import React, { useEffect, useState } from "react";
import { Inputbar, SearchStyle, IconBtn } from "./Search.styled";
import SearchIcon from "@/assets/icons/search.svg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Image from "next/image";
import queryString from "query-string";
import FilterQuery from "@/lib/models/FilterQuery";
import { useSearchParams } from "next/navigation";

type SearchProps = {
  placeholderValue?: string;
  searchHandler: (val: string) => void;
  defaultValue?: string;
  searchRef?: string;
  searchEnterHandler: (ev: React.KeyboardEvent) => void;
  clearInputEvent: () => void;
};

const Search = ({
  placeholderValue,
  searchHandler,
  defaultValue,
  searchRef,
  searchEnterHandler,
  clearInputEvent,
  ...props
}: SearchProps) => {
  const [isValue, setisValue] = useState(false);
  const [searchInput, setSearchInput] = useState(defaultValue);
  const searchParams = useSearchParams();

  const onChangeHandler = (e: React.ChangeEvent) => {
    setSearchInput((e.target as HTMLInputElement).value);
    searchHandler((e.target as HTMLInputElement).value);
  };

  const handleClick = (e: React.MouseEvent) => {
    setSearchInput("");
    clearInputEvent();
    console.log("onClick");
  };

  useEffect(() => {
    if (searchParams) {
      const queryObj: FilterQuery = queryString.parse(searchParams.toString());

      if ("search" in queryObj) {
        setSearchInput(queryObj.search);
      }
    } else {
      searchEnterHandler("");
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchInput) {
      setisValue(true);
    } else {
      setisValue(false);
    }
  }, [searchInput]);

  return (
    <SearchStyle>
      <Image src={SearchIcon} alt={""} height={20} width={20} />
      <Inputbar
        className="input"
        placeholder={placeholderValue}
        onChange={onChangeHandler}
        value={searchInput}
        ref={searchRef}
        onKeyUp={searchEnterHandler}
        autoFocus
        {...props}
      />

      {isValue ? (
        <IconBtn icon={<IoIosCloseCircleOutline />} onClick={handleClick} />
      ) : null}
    </SearchStyle>
  );
};

export default Search;
