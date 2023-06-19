import React from "react";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";
import { Button } from "@mui/material";

const HomeCarousel = () => {
  return (
    <div className="text-center">
      <div className="text-gray-400 italic mb-3">Top Sellers</div>
      <Carousel>
        <div className="flex justify-center gap-5">
          <Image
            src="/images/plant-i.jpeg"
            width="300"
            height="300"
            className=""
            alt=""
          />
          <Image
            src="/images/plant-ii.jpeg"
            width="300"
            height="300"
            className=""
            alt=""
          />
          <Image
            src="/images/plant-iii.jpeg"
            width="300"
            height="300"
            className=""
            alt=""
          />
        </div>
        <div className="flex justify-center gap-5">
          <Image
            src="/images/plant-iii.jpeg"
            width="300"
            height="300"
            className=""
            alt=""
          />
          <Image
            src="/images/plant-i.jpeg"
            width="300"
            height="300"
            className=""
            alt=""
          />
          <Image
            src="/images/plant-ii.jpeg"
            width="300"
            height="300"
            className=""
            alt=""
          />
        </div>
        <div className="flex justify-center gap-5">
          <Image
            src="/images/plant-ii.jpeg"
            width="300"
            height="300"
            className=""
            alt=""
          />
          <Image
            src="/images/plant-iii.jpeg"
            width="300"
            height="300"
            className=""
            alt=""
          />
          <Image
            src="/images/plant-i.jpeg"
            width="300"
            height="300"
            className=""
            alt=""
          />
        </div>
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
