import Image from "next/image";
import React from "react";

const Gallery = () => {
  const numOfImages = 10; // replace this with the actual number of images you have
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
        {imagePaths.map((imagePath, index) => (
          <Image
            key={index}
            src={imagePath}
            width={300}
            height={300}
            alt={`Plant ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
