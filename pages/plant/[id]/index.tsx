import React, { useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import { usePlants } from "contexts/plantContext";
import { addItemToCart } from "utils/cart";
import { useUser } from "contexts/userContext";
import FlareIcon from "@mui/icons-material/Flare";
import GrassIcon from "@mui/icons-material/Grass";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import { supabase } from "utils/supabase";

const Plant = ({ id }) => {
  const [isCareOpen, setIsCareOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { user, cartId } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  // async function listImages() {
  //   const { data, error } = await supabase.storage
  //     .from("plant-images")
  //     .list("folder", {
  //       limit: 100,
  //       offset: 0,
  //       sortBy: { column: "name", order: "asc" },
  //     });

  //   const { data, error } = await supabase.storage.getBucket("test");

  //   const { data: data2, error: error2 } = await supabase.storage.getBucket(
  //     "plant-images"
  //   );

  //   console.log(data, "bucket data");
  //   console.log(data2, "bucket data 2");
  // }

  // useEffect(() => {
  //   listImages();
  // }, []);

  const handleAddToCart = async () => {
    if (user?.id) {
      setIsLoading(true);
      await addItemToCart(cartId, user.id, id, 1).then(() => {
        setIsLoading(false);
      });
    }
  };

  const { plants } = usePlants();

  const currentPlant = plants?.find((plant) => plant.id === parseInt(id));

  if (!currentPlant) return null;

  const {
    name,
    description,
    price,
    main_image,
    category,
    light_requirement,
    water_requirement,
    temp_range_min,
    temp_range_max,
    pot_size,
    care_level,
  } = currentPlant;

  const rating = 4;
  return (
    <div className="flex mt-10 flex-wrap gap-3">
      <div className="flex-1 flex items-center flex-col">
        <div className="card glass p-4 items-center">
          <Image
            src={`/images/${main_image}`}
            width={300}
            height={300}
            alt={`Plant 1`}
            className="rounded-lg group-hover:blur-sm transition-all duration-250"
          />
          <div className="pt-8 flex items-center w-80 pb-3">
            <div className="flex-grow h-px bg-gray-400"></div>
            <span className="px-4 text-gray-900 whitespace-nowrap">
              Related plants
            </span>
            <div className="flex-grow h-px bg-gray-400"></div>
          </div>
          <div className="flex gap-3">
            <div>
              <Image
                src={"/images/plant-3.jpeg"}
                width={100}
                height={100}
                alt={`Plant 1`}
                className="rounded-lg group-hover:blur-sm transition-all duration-250"
              />
            </div>
            <div>
              <Image
                src={"/images/plant-2.jpeg"}
                width={100}
                height={100}
                alt={`Plant 1`}
                className="rounded-lg group-hover:blur-sm transition-all duration-250"
              />
            </div>
            <div>
              <Image
                src={"/images/plant-4.jpeg"}
                width={100}
                height={100}
                alt={`Plant 1`}
                className="rounded-lg group-hover:blur-sm transition-all duration-250"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col pr-10 card shadow-xl bg-white p-5 md:mr-10">
        <div className="flex-col md:flex-row gap-3 md:gap-0 md:justify-between flex">
          <div>
            <div className="font-bold">
              {name} ({description})
            </div>
            <div className="">Pot Size: {pot_size}</div>
            <div className="">Standard Pot</div>
            <div className="">${price}</div>
            <div className="border-solid border-b border-b-gray-400 pt-2"></div>
            <div className="mt-3">
              <div className="flex gap-3">
                <GrassIcon />
                Plant Type:
                <div className="">{category}</div>
              </div>
              <div className="flex gap-3">
                <FlareIcon />
                Required Light:
                <div className="">{light_requirement}</div>
              </div>
              <div className="flex gap-3">
                <WaterDropIcon />
                Required Water:
                <div className="">{water_requirement}</div>
              </div>
              <div className="flex gap-3">
                <ThermostatIcon />
                Temperature Minimum:
                <div className="">{temp_range_min}</div>
              </div>
              <div className="flex gap-3">
                <ThermostatIcon />
                Temperature Maximum:
                <div className="">{temp_range_max}</div>
              </div>
              <div className="flex gap-3">
                <ChildFriendlyIcon />
                Care Level:
                <div className="">{care_level}</div>
              </div>
              <div className="mt-3">
                {[...Array(rating)].map((_, index) => (
                  <StarIcon key={index} />
                ))}
              </div>
            </div>
          </div>
          <div>
            <button className="btn uppercase" onClick={handleAddToCart}>
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <div>Add to cart</div>
              )}
            </button>
          </div>
        </div>
        <div className="border-solid border-b border-b-gray-400 p-3"></div>
        <div className="mt-3">
          <div className="mb-4 relative">
            <button
              onClick={() => setIsCareOpen(!isCareOpen)}
              className="pt-2 flex items-center"
            >
              <ChevronRightIcon
                className={`transition-transform duration-300 ease-in-out transform ${
                  isCareOpen ? "rotate-90" : ""
                }`}
              />
              Care
            </button>
            {isCareOpen && (
              <div className="p-4 border rounded mt-3">
                <p>Care information goes here.</p>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              className="pt-2 flex items-center"
            >
              <ChevronRightIcon
                className={`transition-transform duration-300 ease-in-out transform ${
                  isDetailsOpen ? "rotate-90" : ""
                }`}
              />
              Details
            </button>
            {isDetailsOpen && (
              <div className="p-4 border rounded mt-3">
                <p>Details information goes here.</p>
              </div>
            )}
          </div>
        </div>
        <div className="pt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec
          velit ac nibh sagittis tincidunt. In rutrum magna sed luctus rhoncus.
          Morbi venenatis orci volutpat justo facilisis molestie. Ut condimentum
          semper sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Integer nec justo eget quam bibendum imperdiet. Nulla turpis ex,
          faucibus ut accumsan vitae, mollis a felis. Suspendisse vitae arcu
          interdum neque convallis efficitur id non elit. In a ligula dictum leo
          tristique dapibus id ut enim. Nunc sed commodo libero, eget molestie
          turpis. Nam ornare libero in lobortis efficitur. Proin id dui
          volutpat, hendrerit ante in, sagittis leo. Fusce eu nisl sed augue
          rutrum euismod ac quis dolor. Nam quis vestibulum arcu, eget accumsan
          sem.
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  return {
    props: {
      id,
    },
  };
}

export default Plant;
