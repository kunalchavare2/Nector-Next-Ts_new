import React, { useEffect, useState } from "react";
import CheckoutPriceStyle, {
  Accordian,
  FreeDeliveryStyle,
  IconButton,
} from "./CheckoutPrice.styled";
import CheckoutRow from "../../Molecules/CheckoutRow/CheckoutRow";
import Heading from "../../Atoms/Heading/Heading";
import Button from "../../Atoms/Button/Button";
import { checkout } from "../../../utils/constant/global-const";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../store/Slice/UserSlice/UserSlice";
import { addToOrders } from "../../../store/Slice/OrdersSlice/OrdersSlice";
import { currencyConverter } from "../../../utils/utility";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import useWindowDimensions from "../../../hooks/useWindowDimension";
import Checkout from "@/lib/models/Checkout";
import { useAppSelector } from "@/hooks/reduxHooks";
import { v4 as UUIDv4 } from "uuid";
import Order from "@/lib/models/Order";

type CheckoutPriceProps = {
  checkoutData: Checkout;
  showOrderModal: boolean;
  setShowOrderModal: (value: boolean) => void;
};

const CheckoutPrice = ({
  checkoutData,
  showOrderModal,
  setShowOrderModal,
}: CheckoutPriceProps) => {
  const appConfig = useAppSelector((state) => state.appconfig);
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const { width } = useWindowDimensions();

  const onPlaceOrderHandler = () => {
    setShowOrderModal(true);
    const date = new Date();

    let order: Order = {
      id: UUIDv4(),
      createdOn: date.toDateString(),
      ...checkoutData,
    };

    dispatch(addToOrders(order));
    dispatch(clearCart());
  };

  useEffect(() => {
    if (width) {
      if (width > 768 && !isActive) {
        setIsActive(true);
      } else if (width < 768 && isActive) {
        setIsActive(false);
      }
    }
  }, [width]);

  return (
    <>
      <CheckoutPriceStyle>
        <Accordian>
          <div className="accordian__btn">
            <Heading label="Price Details" type="large" />
            <IconButton
              icon={!isActive ? <IoIosArrowUp /> : <IoIosArrowDown />}
              onClick={() => setIsActive(!isActive)}
            />
          </div>
          {isActive && (
            <div className="content">
              {checkout.map((check) => (
                <CheckoutRow
                  key={check.key}
                  label={check.label}
                  priceLabel={currencyConverter(
                    checkoutData[check.key],
                    appConfig.currentCurrency
                  )}
                />
              ))}
              <FreeDeliveryStyle>
                <span className="title">Free Delivery</span>
                <span className="description">
                  For Orders above
                  {currencyConverter(5, appConfig.currentCurrency)}
                </span>
              </FreeDeliveryStyle>
            </div>
          )}
        </Accordian>

        <CheckoutRow
          label="Final Amount:"
          priceLabel={currencyConverter(
            checkoutData.finalAmount,
            appConfig.currentCurrency
          )}
        />
        <Button
          label={"Place Order"}
          onClick={onPlaceOrderHandler}
          price={checkoutData.finalAmount}
        />
      </CheckoutPriceStyle>
    </>
  );
};

export default CheckoutPrice;
