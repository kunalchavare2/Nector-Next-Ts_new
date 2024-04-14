import React from "react";
import InfoTypesStyle from "./InfoTypes.styled";
import Info from "../../Molecules/Info/Info";
import EmptyCart from "@/assets/images/empty-cart.svg";
import PageNotFound from "@/assets/images/page-not-found.svg";

type InfoType = {
  isSvg: boolean;
  img: any | string;
  message: string;
};
type InfoTypeVariant = {
  [key: string]: InfoType;
};

type InfoTypesProps = {
  type: keyof InfoTypeVariant;
};
const InfoTypes = ({ type }: InfoTypesProps) => {
  const infoTypes: InfoTypeVariant = {
    emptyCart: {
      isSvg: true,
      img: EmptyCart ,
      message: "Your Cart is empty!",
    },
    emptyWishlist: {
      isSvg: true,
      img: EmptyCart ,
      message: "Your Wishlist is empty!",
    },
    pageNotFound: {
      isSvg: true,
      img: PageNotFound,
      message: "Look like you're lost!",
    },
  };

  return (
    <InfoTypesStyle>
      <Info img={infoTypes[type].img} message={infoTypes[type].message} />
    </InfoTypesStyle>
  );
};

export default InfoTypes;
