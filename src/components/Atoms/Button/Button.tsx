"use client";

import React from "react";
import { StyledButton, CheckoutContainer, PriceSpan } from "./button.styled";
import { IconType } from "react-icons";
import { useAppSelector } from "@/hooks/reduxHooks";
import { currencyConverter } from "@/utils/utility";
/**
 * All Buttons for user interaction
 */
type buttonProps = {
  icon?: React.ReactNode;
  label?: string;
  disabled?: boolean;
  onClick: (a: React.MouseEvent<HTMLButtonElement>) => void;
  price?: number;
  transparent?: boolean;
  backgroundColor?: string;
  small?: boolean;
  id?: string;
};

const Button: React.FC<buttonProps> = ({
  icon,
  label,
  disabled = false,
  onClick,
  price,
  transparent,
  backgroundColor,
  small = false,
  id,
  ...props
}) => {
  const isIconButton = Boolean(icon);
  const appConfig = useAppSelector((state) => state.appconfig);
  
  /*based on value of disable is true or false the onclick happens*/
  const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(ev);
    }
  };
  return (
    <StyledButton
      type="button"
      className={[
        "storybook-button",
        `${isIconButton && "storybook-button--icon"}`,
      ].join(" ")}
      $transparent={transparent}
      $backgroundColor={backgroundColor}
      $disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {/* prints the  + button and - button i.e icon buttons  */}
      {isIconButton ? icon : null}
      {/* prints the button with label and price */}
      {label && price && (
        <CheckoutContainer>
          <span>{label}</span>
          <PriceSpan>
            {currencyConverter(
              price,
              appConfig.currentCurrency
            )}
          </PriceSpan>
        </CheckoutContainer>
      )}
      {/* prints the label button only */}
      {label && !price && !isIconButton && label}
    </StyledButton>
  );
};

export default Button;
