import React from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import { usePlants } from "../../contexts/plantContext";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
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
        additionalTransfrom={0}
        responsive={responsive}
        draggable
        showDots
        infinite
        keyBoardControl
        sliderClass=""
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="mx-2 mb-10"
      >
        {plants.map((plant, index) => (
          <Link key={plant.id} href={`/plant/${plant.id}`}>
            <Image
              key={index}
              src={`/images/${plant.main_image}`}
              width="300"
              height="300"
              className={`drop-shadow-md rounded-3xl`}
              alt=""
            />
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
