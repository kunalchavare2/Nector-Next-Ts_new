"use client"
import React, { useEffect, useState } from "react";
import { CountStyle, IconContainer } from "@/components/Atoms/NavIcon/NavIcon.styled";
import Link from "next/link";

type Props = {
  icon: any;
  text?: string;
  link: string;
  hideIcon?: boolean;
  count?: number;
};

const NavIcon: React.FC<Props> = ({
  icon,
  text,
  link,
  hideIcon = false,
  count,
}) => {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    if (count !== undefined ) {
      setIsClient(true)
    }
  
  }, [])

  return (
    <IconContainer>
      <Link href={link} className="link">
        {!hideIcon && <span className="icon">{icon}</span>}
        {text && <p className="icon-text">{text}</p>}
        {isClient  && <CountStyle>{count}</CountStyle>}
      </Link>
    </IconContainer>
  );
};
export default NavIcon;
