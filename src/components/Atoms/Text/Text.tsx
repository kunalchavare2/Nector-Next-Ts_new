"use client"


import React from "react";
import TextTypes from "./Text.styled";

type Props = {
  type?: "small" | "large" | "medium";
  label: string;
  tcolor?: string;
  className?: string;
};
const Text = ({
  type = "small",
  label,
  tcolor = "#7C7C7C",
  ...props
}: Props): JSX.Element => {
  return (
    <TextTypes size={type} textcolor={tcolor} {...props}>
      {label}
    </TextTypes>
  );
};

export default Text;
