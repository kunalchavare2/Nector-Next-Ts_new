"use client";

import React from "react";
import { useState, useEffect } from "react";
import Heading from "../../Atoms/Heading/Heading";
import Text from "../../Atoms/Text/Text";
import Image from 'next/image'
import {
  CarouselContianer,
  CarouselImage,
  CarouselContent,
  CarouselButtons,
} from "./HomeCarousel.styled";
import Button from "../../Atoms/Button/Button";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
const HomeCarousel = () => {
  const [currrentImg, setCurrentImg] = useState(0);
  const carouselData = [
    {
      imgUrl: require("@/assets/images/carouselimages/roots.jpg"),
      heading: (
        <Heading type={"large"} tcolor={"#fff"} label={"Sale is LIVE"} />
      ),
      subheading: (
        <Text type={"large"} label={"Get Up to 50% OFFF"} tcolor="#53B175" />
      ),
    },
    {
      imgUrl: require("@/assets/images/carouselimages/veggies.jpg"),
      heading: (
        <Heading type={"large"} tcolor={"#fff"} label={"Fresh Vegetables"} />
      ),
      subheading: (
        <Text type={"large"} label={"Get Up to 50% OFFF"} tcolor="#53B175" />
      ),
    },
    {
      imgUrl: require("@/assets/images/carouselimages/bread-slice.jpg"),
      heading: <Heading type={"large"} tcolor={"#fff"} label={"Fresh Bread"} />,
      subheading: (
        <Text type={"large"} label={"Get Up to 50% OFFF"} tcolor="#53B175" />
      ),
    },
    {
      imgUrl: require("@/assets/images/carouselimages/freshmeat.jpg"),
      heading: <Heading type={"large"} tcolor={"#fff"} label={"Fresh Meat"} />,
      subheading: (
        <Text type={"large"} label={"Get Up to 50% OFFF"} tcolor="#53B175" />
      ),
    },
    {
      imgUrl: require("@/assets/images/carouselimages/oils.jpg"),
      heading: (
        <Heading type={"large"} tcolor={"#fff"} label={"Cooking Oils"} />
      ),
      subheading: (
        <Text type={"large"} label={"Get Up to 50% OFF"} tcolor="#53B175" />
      ),
    },
  ];
  const prev = () => {
    setCurrentImg(
      (prevImg) => (prevImg - 1 + carouselData.length) % carouselData.length
    );
  };
  const next = () => {
    setCurrentImg((prevImg) => (prevImg + 1) % carouselData.length);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      next();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currrentImg]);
  return (
    <>
      <CarouselContianer>
        <CarouselImage>
          <Image src={carouselData[currrentImg].imgUrl} alt="" />
        </CarouselImage>
        <CarouselContent>
          {carouselData[currrentImg].heading}
          {carouselData[currrentImg].subheading}
        </CarouselContent>

        <CarouselButtons>
          <Button icon={<FaChevronLeft />} onClick={prev}/> 
          <Button icon={<FaChevronRight />} onClick={next}/> 
        </CarouselButtons>
      </CarouselContianer>
    </>
  );
};
export default HomeCarousel;
