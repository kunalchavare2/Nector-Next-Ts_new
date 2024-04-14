import React from "react";
import SortStyle from "./Sort.styled";
import { sortTypes } from "../../../utils/constant/global-const";
import SelectMenu from "../../Atoms/SelectMenu/SelectMenu";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

type SortPorps = {
  getSort?: any;
};

const Sort = ({ getSort, ...props }: SortPorps) => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const setSortHandler = (ev: React.ChangeEvent) => {
    let searchQuery: string = searchParams ? searchParams.toString() : "";
    if (searchQuery.length > 0) {
      const queryObj = queryString.parse(searchQuery);
      const newQueryObj = {
        ...queryObj,
        sort: (ev.target as HTMLSelectElement).value,
      };

      const newQueryString = queryString.stringify(newQueryObj, {
        arrayFormat: "bracket",
      });
      router.push(`products?${newQueryString}`);
    }

  };

  return (
    <SortStyle {...props}>
      <SelectMenu
        list={Object.keys(sortTypes)}
        defaultValue={""}
        onChange={setSortHandler}
      />
    </SortStyle>
  );
};

export default Sort;
