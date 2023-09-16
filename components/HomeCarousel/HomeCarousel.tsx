import React from "react";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";
import { usePlants } from "../../contexts/plantContext";

const imageSequences = [
  ["/images/plant-i.jpeg", "/images/plant-ii.jpeg", "/images/plant-iii.jpeg"],
  ["/images/plant-iii.jpeg", "/images/plant-i.jpeg", "/images/plant-ii.jpeg"],
  ["/images/plant-ii.jpeg", "/images/plant-iii.jpeg", "/images/plant-i.jpeg"],
];

const CarouselContent = ({ images }) => (
  <div className="flex justify-center gap-5">
    {images.map((image, index) => (
      <div
        key={index}
        className={`${index === 1 && "scale-1 z-10"} drop-shadow-md`}
      >
        <Image
          key={index}
          src={image}
          width="300"
          height="300"
          className="rounded-3xl"
          alt=""
        />
      </div>
    ))}
  </div>
);

const HomeCarousel = () => {
  const { plants } = usePlants();

  return (
    <div className="text-center mb-4">
      <div className="text-gray-400 mb-3 tracking-widest">Top Sellers</div>
      <Carousel>
        {imageSequences.map((sequence, index) => (
          <CarouselContent key={index} images={sequence} />
        ))}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
