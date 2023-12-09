import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { usePlants } from "contexts/plantContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CropFreeIcon from "@mui/icons-material/CropFree";
import { useUser } from "contexts/userContext";
import { handleAddToCart } from "utils/cart";

const Gallery = () => {
  const { plants } = usePlants();
  const { user, cartId } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="my-10">
      <div className="text-gray-400 mb-3 tracking-widest text-center text-md">
        Gallery
      </div>
      <div className="flex flex-wrap gap-3 align-stretch justify-center">
        {plants?.length > 0 &&
          plants.map((plant, index) => {
            return (
              <div className="card glass p-4" key={index}>
                <div className="relative group h-fit" key={index}>
                  <Image
                    src={`/images/${plant.main_image}`}
                    width={300}
                    height={300}
                    alt={`Plant ${index + 1}`}
                    className="rounded-lg group-hover:blur-sm transition-all duration-250"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 invisible group-hover:visible scale-110 transition-all duration-200">
                    <Link key={index} href={`/plant/${plant.id}`}>
                      <CropFreeIcon />
                    </Link>
                    <button
                      onClick={() =>
                        handleAddToCart({
                          user,
                          cartId,
                          plantId: plant?.id,
                          setIsLoading,
                        })
                      }
                    >
                      {isLoading ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        <ShoppingCartIcon />
                      )}
                    </button>
                  </div>
                </div>
                <div>{plant.name}</div>
                <div>{plant.description}</div>
                <div>{plant.price}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Gallery;
