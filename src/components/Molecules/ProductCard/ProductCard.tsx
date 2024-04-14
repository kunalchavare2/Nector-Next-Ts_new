"use client";


import Card, { TagWrapper } from "./ProductCard.styled";
import PropTypes from "prop-types";
import Button from "../../Atoms/Button/Button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { checkOlderDate, currencyConverter } from "../../../utils/utility";
import { StyledObject } from "styled-components";
import Tag from "../../Atoms/Tag/Tag";
import { tagsColor } from "../../../utils/constant/app-const";
import Text from "../../Atoms/Text/Text";
import Heading from "../../Atoms/Heading/Heading";
import { Product } from "@/lib/models/product";
import { useAppSelector } from "@/hooks/reduxHooks";
import { Tags } from "@/lib/enum/enum";
import React from "react";

type productCardProps = {
  layout: string;
  productItem: Product;
  openCardHandler?: (id: string) => void;
  removeHandler?: (ev: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  noOfItems?: number;
  quantityHandler?: (id: string, count: number) => void;
  addCartHandler?: (
    ev: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => void;
  style?: StyledObject;
};

const ProductCard = ({
  layout,
  productItem,
  openCardHandler,
  removeHandler,
  noOfItems = 0,
  quantityHandler,
  addCartHandler,

  style = { width: "100%" },
  ...props
}: productCardProps) => {
  const { id, title, price, quantity, image, tags, createdAt } = productItem;
  let newTags = [...tags];

  const appconfig = useAppSelector((state) => state.appconfig);

  const created = new Date(createdAt);
  if (checkOlderDate(created)) {
    newTags.push(Tags.New);
  }

  const changeQunatityHandler = (productId: string, action: string) => {
    if (quantityHandler) {
      if (action === "add") {
        const newValue = noOfItems + 1;
        quantityHandler(productId, newValue);
      } else {
        const newValue = noOfItems > 1 ? noOfItems - 1 : 1;
        quantityHandler(productId, newValue);
      }
    }
  };

  const handleClick = (ev: React.MouseEvent) => {
    if (!(ev.target as HTMLElement).closest(".card-btn") && openCardHandler) {
      openCardHandler(id);
    }
  };

  return (
    <Card $layout={layout} cardstyle={style} {...props} onClick={handleClick}>
      <TagWrapper>
        {layout === "card" &&
          newTags.reverse().map(
            (tag, index) => null
            // <Tag key={index} label={tag} color={tagsColor[tag]} />
          )}
      </TagWrapper>
      <div className={"card-img"}>
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <div className="card-titleWrapper">
          <Heading className="card-title" label={title} />
          <Text className="card-quantity" label={quantity} />
        </div>
        <div className="card-priceWrapper">
          {layout === "cart" && (
            <div className="card-quantity-btn">
              <Button
                icon={<FaMinus />}
                transparent={true}
                small={true}
                id="minus-quantity"
                disabled={noOfItems === 1}
                onClick={() => changeQunatityHandler(id, "minus")}
              />
              <div className="card-quantity-count">{noOfItems}</div>
              <Button
                icon={<FaPlus />}
                transparent={true}
                small={true}
                id="add-quantity"
                onClick={() => changeQunatityHandler(id, "add")}
              />
            </div>
          )}
          <div className="card-price">
            {currencyConverter(price, appconfig.currentCurrency)}
          </div>
          {layout === "card" && (
            <div className="card-btn">
              <Button
                label=""
                icon={<FaPlus />}
                transparent={false}
                onClick={(ev) => addCartHandler && addCartHandler(ev, id)}
              />
            </div>
          )}
        </div>
        {layout !== "card" && layout !== "search" && (
          <button
            className="card-close-btn"
            onClick={(ev) => removeHandler && removeHandler(ev, id)}
          >
            <IoClose />
          </button>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
