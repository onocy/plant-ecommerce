import Image from "next/image";
import React from "react";
import Link from "next/link";

const Gallery = () => {
  const numOfImages = 30; // replace this with the actual number of images you have
  const imagePaths = Array.from(
    { length: numOfImages },
    (_, i) => `/images/plant-${i + 1}.jpeg`
  );

  return (
    <div className="my-10">
      <div className="text-gray-400 mb-3 tracking-widest text-center text-md">
        Gallery
      </div>
      <div className="flex flex-wrap gap-3 align-stretch grow">
        {imagePaths.map((imagePath, index) => {
          return (
            <Link key={index} href={`/plant/${index}`}>
              <div className="relative group h-fit" key={index}>
                <Image
                  src={imagePath}
                  width={300}
                  height={300}
                  alt={`Plant ${index + 1}`}
                  className="rounded-lg group-hover:blur-sm transition-all duration-250"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 invisible group-hover:visible scale-110 transition-all duration-200">
                  <div>Ficus Elastica</div>
                  <div>Standard Pot</div>
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
