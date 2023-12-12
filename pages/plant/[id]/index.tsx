import React, { useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import { usePlants } from "contexts/plantContext";
import { handleAddToCart } from "utils/cart";
import { useUser } from "contexts/userContext";
import FlareIcon from "@mui/icons-material/Flare";
import GrassIcon from "@mui/icons-material/Grass";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import { supabase } from "utils/supabase";
import { useRouter } from "next/router";
import { useCart } from "contexts/cartContext";
import Link from "next/link";

const Plant = ({ id }) => {
  const [isCareOpen, setIsCareOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const { user, cartId } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { updateCart } = useCart();

  const [relatedPlants, setRelatedPlants] = useState([]);

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

  const getRelatedPlants = async (plantId) => {
    console.log(plantId, "plantId");
    try {
      const { data, error } = await supabase
        .from("related_plants")
        .select(
          `
        id,
        related_plant:related_plant_id (
          id,
          name,
          description,
          price,
          stock,
          category,
          care_level,
          light_requirement,
          water_requirement,
          temp_range_min,
          temp_range_max,
          main_image,
          pot_size
        )
      `
        )
        .eq("plant_id", plantId);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error fetching related plants:", error);
      return null;
    }
  };

  const { plants } = usePlants();

  const currentPlant = plants?.find((plant) => plant.id === parseInt(id));

  useEffect(() => {
    const fetchRelatedPlants = async () => {
      try {
        if (!currentPlant) return;
        const related = await getRelatedPlants(currentPlant?.id);
        setRelatedPlants(related);
      } catch (error) {
        console.error("Error fetching related plants:", error);
      }
    };

    fetchRelatedPlants();
  }, [currentPlant]);

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
            {relatedPlants?.map((plant) => (
              <Link href={`/plant/${plant?.related_plant?.id}`} key={plant.id}>
                <div className="card glass p-3 text-center w-[8rem]">
                  <Image
                    src={`/images/${plant.related_plant?.main_image}`}
                    width={100}
                    height={100}
                    alt={`Plant 1`}
                    className="rounded-lg group-hover:blur-sm transition-all duration-250"
                  />
                  <div className="pt-3 flex-wrap">
                    {plant.related_plant?.name}
                  </div>
                  <div>{plant.related_plant?.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col pr-10 card shadow-xl bg-white p-5 md:mr-10 mb-5 h-full">
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
          <div className="flex">
            <div className="mr-3">
              <div className="py-2 px-3 bg-[#EEF0F2] rounded-lg h-12 flex items-center">
                <div className="w-full flex justify-between items-center gap-x-5">
                  <div className="grow">
                    <input
                      className="w-4 p-0 bg-transparent border-0focus:ring-0 "
                      type="text"
                      value="1"
                    />
                  </div>
                  <div className="flex justify-end items-center gap-x-1.5">
                    <button
                      type="button"
                      className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      data-hs-input-number-decrement
                    >
                      <svg
                        className="flex-shrink-0 w-3.5 h-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      data-hs-input-number-increment
                    >
                      <svg
                        className="flex-shrink-0 w-3.5 h-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btn uppercase btn-action"
              onClick={() =>
                handleAddToCart({
                  user,
                  cartId,
                  plantId: id,
                  setIsLoading,
                  router,
                  updateCart,
                })
              }
            >
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
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean nec velit ac nibh sagittis tincidunt. In rutrum magna
                  sed luctus rhoncus. Morbi venenatis orci volutpat justo
                  facilisis molestie. Ut condimentum semper sagittis. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
                  justo eget quam bibendum imperdiet. Nulla turpis ex, faucibus
                  ut accumsan vitae, mollis a felis. Suspendisse vitae arcu
                  interdum neque convallis efficitur id non elit. In a ligula
                  dictum leo tristique dapibus id ut enim. Nunc sed commodo
                  libero, eget molestie turpis. Nam ornare libero in lobortis
                  efficitur. Proin id dui volutpat, hendrerit ante in, sagittis
                  leo. Fusce eu nisl sed augue rutrum euismod ac quis dolor. Nam
                  quis vestibulum arcu, eget accumsan sem.
                </p>
              </div>
            )}
          </div>
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
