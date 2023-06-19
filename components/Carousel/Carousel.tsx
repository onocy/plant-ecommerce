import React from "react";
import Image from "next/image";

const Carousel = () => {
  return (
    <div className="text-center">
      Carousel
      <div className="flex gap-3">
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
    </div>
  );
};

export default Carousel;
