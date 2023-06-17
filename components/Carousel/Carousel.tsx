import React from "react";
import Image from "next/image";

const Carousel = () => {
  return (
    <div className="text-center">
      Carousel
      <div>
        <Image
          src="/../../public/images/plant-i.avif"
          width="30"
          height="30"
          className=""
          alt=""
        />
      </div>
    </div>
  );
};

export default Carousel;
