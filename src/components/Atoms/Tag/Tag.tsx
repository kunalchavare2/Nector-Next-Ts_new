import React from "react";
import { TagStyle } from "./Tag.styled";

type tagProps = {
  label: string;
  color: string;
};

const Tag = ({ label, color }: tagProps) => {
  return <TagStyle backColor={color}>{label}</TagStyle>;
};

export default Tag;
