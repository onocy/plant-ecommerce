import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { usePlants } from "contexts/plantContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CropFreeIcon from "@mui/icons-material/CropFree";
import { useUser } from "contexts/userContext";
import { handleAddToCart } from "utils/cart";
import { useRouter } from "next/router";
import { useCart } from "contexts/cartContext";

const SortOptions = {
  PRICE_HIGH_TO_LOW: "Price - High to Low",
  PRICE_LOW_TO_HIGH: "Price - Low to High",
  NAME: "Name",
  NEW: "New",
};

const Gallery = () => {
  const { plants } = usePlants();
  const { user, cartId } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { updateCart } = useCart();

  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortPlants = (plants: any[], sortOption: string) => {
    switch (sortOption) {
      case SortOptions.PRICE_HIGH_TO_LOW:
        return plants.slice().sort((a, b) => b.price - a.price);
      case SortOptions.PRICE_LOW_TO_HIGH:
        return plants.slice().sort((a, b) => a.price - b.price);
      case SortOptions.NEW:
        return plants.slice().sort((a, b) => b.is_new_item - a.is_new_item);
      case SortOptions.NAME:
        return plants.slice().sort((a, b) => a.name.localeCompare(b.name));
      default:
        return plants;
    }
  };

  const sortedPlants = sortPlants(plants, sortOption);

  return (
    <div className="my-10">
      <div className="text-gray-400 mb-3 tracking-widest text-center text-md">
        Gallery
        <div className="mt-5">
          <select
            className="select select-sm select-bordered w-full max-w-xs"
            onChange={handleSortChange}
            value={sortOption}
          >
            <option disabled value="">
              Sort by
            </option>
            <option value={SortOptions.PRICE_HIGH_TO_LOW}>
              {SortOptions.PRICE_HIGH_TO_LOW}
            </option>
            <option value={SortOptions.PRICE_LOW_TO_HIGH}>
              {SortOptions.PRICE_LOW_TO_HIGH}
            </option>
            <option value={SortOptions.NAME}>{SortOptions.NAME}</option>
            <option value={SortOptions.NEW}>{SortOptions.NEW}</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {sortedPlants?.length > 0 &&
          sortedPlants.map((plant, index) => {
            return (
              <div
                className="card glass p-4 items-center text-center flex flex-col justify-around"
                key={index}
              >
                <div className="relative group" key={plant.id}>
                  {plant?.is_new_item && (
                    <div className="ribbon">
                      <span>New</span>
                    </div>
                  )}
                  <Image
                    src={`/images/${plant.main_image}`}
                    width={300}
                    height={300}
                    alt={`Plant ${index + 1}`}
                    className="rounded-lg group-hover:blur-sm transition-all duration-250"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 invisible group-hover:visible scale-110 transition-all duration-200">
                    <Link key={plant.id} href={`/plant/${plant.id}`}>
                      <CropFreeIcon fontSize="large" className="text-white" />
                    </Link>
                    <button
                      onClick={() =>
                        handleAddToCart({
                          user,
                          cartId,
                          plantId: plant?.id,
                          setIsLoading,
                          router,
                          updateCart,
                        })
                      }
                    >
                      {isLoading ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        <ShoppingCartIcon
                          fontSize="large"
                          className="ml-4 text-white"
                        />
                      )}
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex flex-col justify-between gap-3">
                  <div className="">
                    <div className="font-bold text-lg">{plant.name}</div>
                    <div className="text-sm italic tracking-wider">
                      {plant.description}
                    </div>
                  </div>
                  <div className="text-md font-semibold">${plant.price}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Gallery;
