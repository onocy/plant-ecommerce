import Image from "next/image";
import React from "react";
import Link from "next/link";
import { usePlants } from "contexts/plantContext";

const Gallery = () => {
  const { plants } = usePlants();

  return (
    <div className="my-10">
      <div className="text-gray-400 mb-3 tracking-widest text-center text-md">
        Gallery
      </div>
      <div className="flex flex-wrap gap-3 align-stretch grow">
        {plants?.length > 0 &&
          plants.map((plant, index) => {
            return (
              <Link key={index} href={`/plant/${plant.id}`}>
                <div className="relative group h-fit" key={index}>
                  <Image
                    src={`/images/${plant.main_image}`}
                    width={300}
                    height={300}
                    alt={`Plant ${index + 1}`}
                    className="rounded-lg group-hover:blur-sm transition-all duration-250"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 invisible group-hover:visible scale-110 transition-all duration-200">
                    <div>{plant.name}</div>
                    <div>{plant.description}</div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Gallery;
