import React from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import { usePlants } from "../../contexts/plantContext";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const HomeCarousel = () => {
  const { plants } = usePlants();

  if (!plants) return null;

  const groupedPlants = [];
  for (let i = 0; i < plants.length; i += 3) {
    groupedPlants.push(plants.slice(i, i + 3));
  }

  return (
    <div className="text-center mb-4">
      <div className="text-gray-400 mb-3 tracking-widest">Top Sellers</div>
      <Carousel
        responsive={responsive}
        showDots
        draggable
        infinite
        keyBoardControl
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="flex justify-center"
      >
        {plants.map((plant, index) => (
          <Image
            key={index}
            src={`/images/${plant.main_image}`}
            width="300"
            height="300"
            className={`drop-shadow-md rounded-3xl`}
            alt=""
          />
        ))}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
