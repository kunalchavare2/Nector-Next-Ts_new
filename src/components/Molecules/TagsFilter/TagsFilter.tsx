import React, { useEffect, useState } from "react";
import TagsFilterStyle from "./TagsFilter.styled";
import { tags } from "../../../utils/constant/app-const";
import Checkbox from "../../Atoms/Checkbox/Checkbox";
import { queryStringToObject } from "../../../utils/utility";
import { useLocation } from "react-router";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import FilterQuery from "@/lib/models/FilterQuery";

type TagsFilterProps = {
  getTags: (val: string[]) => void;
};

const TagsFilter = ({ getTags }: TagsFilterProps) => {
  const searchParams = useSearchParams()
  const [appliedTags, setAppliedTags] = useState<string[]>([]);

  useEffect(() => {
    if (searchParams) {
      // const queryObj = queryStringToObject(location.search, {
      //   tags: [],
      // });

      const queryObj:FilterQuery = queryString.parse(searchParams.toString());

      if ("tags" in queryObj) {
        setAppliedTags(queryObj.tags);
      }
    } else {
      setAppliedTags([]);
    }
  }, [searchParams]);

  const checkValue = (ele: string) => {
    const value = appliedTags.includes(ele);
    return value;
  };

  const onChangeFilter = (ev: React.ChangeEvent) => {
    const id = ev.target.id;
    const value = (ev.target as HTMLInputElement).checked;
    let revisedArr: string[] = [];

    if (value) {
      const index = appliedTags.indexOf(id);

      if (index === -1) {
        revisedArr = [...appliedTags, id];
      }
    } else {
      revisedArr = appliedTags.filter((tag) => {
        return tag !== id;
      });
    }

    setAppliedTags(revisedArr);

    if (getTags) {
      getTags(revisedArr);
    }
  };

  return (
    <TagsFilterStyle>
      {tags.map((tag) => {
        const isChecked = checkValue(tag);
        return (
          <Checkbox
            key={tag}
            label={tag}
            id={tag}
            defaultChecked={isChecked}
            onChange={onChangeFilter}
          />
        );
      })}
    </TagsFilterStyle>
  );
};

export default TagsFilter;
