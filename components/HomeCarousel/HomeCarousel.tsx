import React from "react";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";
import { usePlants } from "../../contexts/plantContext";

// Modified CarouselContent to accept an array of plants
const CarouselContent = ({ plants }) => (
  <div className="flex justify-center gap-5">
    {plants.map((plant, index) => (
      <Image
        key={index}
        src={`/images/${plant.main_image}`}
        width="300"
        height="300"
        className={`${
          index === 1 && "scale-1 z-10"
        } drop-shadow-md rounded-3xl`}
        alt=""
      />
    ))}
  </div>
);

const HomeCarousel = () => {
  const { plants } = usePlants();
  const carouselPlants = plants.slice(0, 9);

  // Group plants in sets of 3
  const groupedPlants = [];
  for (let i = 0; i < carouselPlants.length; i += 3) {
    groupedPlants.push(carouselPlants.slice(i, i + 3));
  }

  return (
    <div className="text-center mb-4">
      <div className="text-gray-400 mb-3 tracking-widest">Top Sellers</div>
      <Carousel>
        {groupedPlants.map((plantGroup, index) => (
          <CarouselContent key={index} plants={plantGroup} />
        ))}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
