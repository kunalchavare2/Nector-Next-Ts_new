"use client";

import React, { useContext, useState } from "react";

import {
  IoCartOutline,
  IoHeartOutline,
  IoSearchOutline,
} from "react-icons/io5";

import {
  CART_ROUTE,
  DEFAULT_SEARCH_PARAMS,
  HOME_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,

  WISHLIST_ROUTE,
} from "../../../utils/constant/routes-cont.js";
import Logo from "@/components/Atoms/Logo/Logo";
import NavIcon from "@/components/Atoms/NavIcon/NavIcon";
import HeaderStyle, {
  HeaderNavBtnStyle,
  HeaderNavStyle,
  HeaderWrapper,
  SearchBtnStyle,
} from "./Header.styled";
import { useAppSelector } from "@/hooks/reduxHooks";

// const Header = ({ searchToggle }) => {
const Header = () => {
  const user: any = useAppSelector((state: any) => state.user);
  const cartCount: number = user.cart.cartCount;
  const wishlistCount: number = user.wishlist.wishlistItems.length;
  // const chnageTheme = useContext(ThemeDispatcher);

  return (
    <HeaderStyle>
      <HeaderWrapper>
        <Logo showText={true} />
        <HeaderNavStyle>
          <NavIcon icon={""} text="Home" link={HOME_ROUTE} hideIcon={true} />
          <NavIcon
            icon={""}
            text="Orders"
            link={ORDERS_ROUTE}
            hideIcon={true}
          />
          <NavIcon
            icon={""}
            text="Products"
            link={PRODUCTS_ROUTE + DEFAULT_SEARCH_PARAMS}
            hideIcon={true}
          />
          <NavIcon
            icon={""}
            text="About Us"
            link="/about"
            hideIcon={true}
          />
        </HeaderNavStyle>

        <HeaderNavBtnStyle>
          {/* <input
            type="checkbox"
            onChange={(ev) => {
              if (ev.target.checked) {
                chnageTheme(ThemeData.dark);
              } else {
                chnageTheme(ThemeData.light);
              }
            }}
          /> */}
          <SearchBtnStyle onClick={() => {}}>
            <IoSearchOutline />
          </SearchBtnStyle>
          <NavIcon
            icon={<IoCartOutline />}
            link={CART_ROUTE}
            count={cartCount}
          />
          <NavIcon
            icon={<IoHeartOutline />}
            link={WISHLIST_ROUTE}
            count={wishlistCount}
          />
          {/* <NavIcon icon={ProfileIcons} link={PROFILE_ROUTE} /> */}
        </HeaderNavBtnStyle>
      </HeaderWrapper>
    </HeaderStyle>
  );
};

export default Header;
