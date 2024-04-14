import React, { useEffect, useState } from "react";
import SelectMenuStyle from "./SelectMenu.styled";
import { sortTypes } from "../../../utils/constant/global-const";
import { queryStringToObject } from "../../../utils/utility";
import FilterQuery from "@/lib/models/FilterQuery";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";

type SelectMenuProps = {
  list: string[];
  onChange: (event: React.ChangeEvent) => void;
  defaultValue?: string;
  isObj?: boolean;
};

const SelectMenu = ({
  list,
  onChange,
  defaultValue,
  isObj = true,
  ...props
}: SelectMenuProps) => {
  const [sort, setSort] = useState<string>();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const queryObj: FilterQuery = queryString.parse(searchParams.toString());

      if ("sort" in queryObj) {
        setSort(queryObj.sort);
      }
    } else {
      setSort("Name");
    }
  }, [searchParams]);

  const onChangeHandler = (ev: React.ChangeEvent) => {
    setSort((ev.target as HTMLSelectElement).value);
    onChange(ev);
  };

  return (
    <SelectMenuStyle
      value={sort}
      onChange={onChangeHandler}
      defaultValue={defaultValue}
    >
      {list.map((sortVal) => {
        if (isObj) {
          return (
            <option
              key={sortTypes[sortVal].name}
              value={sortTypes[sortVal].name}
            >
              {sortTypes[sortVal].name}
            </option>
          );
        } else {
          return (
            <option key={sortTypes[sortVal].name} value={sort}>
              {sort}
            </option>
          );
        }
      })}
    </SelectMenuStyle>
  );
};

export default SelectMenu;
