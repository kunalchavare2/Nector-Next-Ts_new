"use client"

import React from "react";
import PropTypes from "prop-types";
import HeadingTypes from "./Heading.styled";

type Props = {
  type?: "small" | "large" | "medium" | string;
  label: string;
  tcolor?: string;
  className?: string;
};

const Heading = ({
  type,
  label,
  tcolor,
  className,
  ...props
}: Props): JSX.Element => {
  return (
    <HeadingTypes size={type} {...props}>
      {label}
    </HeadingTypes>
  );
};

export default Heading;
