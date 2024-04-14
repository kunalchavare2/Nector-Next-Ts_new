"use client";

import React from "react";
import LogoStyle, { BrandName } from "./Logo.styled";
import LogoSvg from "@/assets/icons/logo.svg";
import Image from "next/image";

const Logo = ({ showText = true, ...props }) => {
  return (
    <LogoStyle href="/" {...props}>
      <Image src={LogoSvg} alt="Logo" height={35} />
      {showText && <BrandName>Nectar</BrandName>}
    </LogoStyle>
  );
};

export default Logo;
