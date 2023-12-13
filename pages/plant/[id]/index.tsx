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
  const [isCareOpen, setIsCareOpen] = useState(true);
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
    details,
  } = currentPlant;

  const rating = 4;
  return (
    <>
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
            <div className="my-4 flex items-center w-80">
              <div className="flex-grow h-px bg-gray-400"></div>
              <span className="px-4 text-gray-900 whitespace-nowrap uppercase tracking-widest">
                Related
              </span>
              <div className="flex-grow h-px bg-gray-400"></div>
            </div>
            <div className="flex gap-3">
              {relatedPlants?.map((plant) => (
                <Link
                  href={`/plant/${plant?.related_plant?.id}`}
                  key={plant.id}
                >
                  <div className="card glass p-3 text-center w-[8rem] bg-white">
                    <Image
                      src={`/images/${plant.related_plant?.main_image}`}
                      width={100}
                      height={100}
                      alt={`Plant 1`}
                      className="rounded-lg group-hover:blur-sm transition-all duration-250"
                    />
                    <div className="pt-3 flex-wrap font-semibold">
                      {plant.related_plant?.name}
                    </div>
                    <div className="text-sm">${plant.related_plant?.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col pr-10 card shadow-xl bg-white p-5 md:mr-10 mb-5 h-full">
          <div className="flex-col md:flex-row gap-3 md:gap-0 md:justify-between flex">
            <div>
              <div className="font-bold text-2xl">{name}</div>
              <div className="text-xl">({description})</div>
              <div className="badge badge-ghost p-4 text-lg my-3 mr-3">
                Standard Pot
              </div>
              <div className="badge badge-info p-4 text-lg my-3">
                Pot Size: {pot_size}
              </div>
              <div className="text-2xl">${price}</div>
              <div className="mt-3 flex-col flex gap-2">
                <div className="">
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
            <div>{details}</div>

            <div className="mb-4 relative mt-3">
              <button
                onClick={() => setIsCareOpen(!isCareOpen)}
                className="pt-2 flex items-center"
              >
                <ChevronRightIcon
                  className={`transition-transform duration-300 ease-in-out transform ${
                    isCareOpen ? "rotate-90" : ""
                  }`}
                />
                <div className="text-lg font-bold ">Care</div>
              </button>
              {isCareOpen && (
                <div className="p-4 border rounded mt-3 flex flex-col gap-2">
                  <div className="flex gap-4 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <ThermostatIcon className="text-3xl" />
                      <div className="">Temperature Minimum:</div>
                    </div>
                    <div className="flex gap-3 items-center">
                      {temp_range_min}°F
                      <progress
                        className="progress progress-info w-56"
                        value={60}
                        max="100"
                      ></progress>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <ThermostatIcon className="text-3xl" />
                      <div className="">Temperature Maximum:</div>
                    </div>
                    <div className="flex gap-3 items-center">
                      {temp_range_max}°F
                      <progress
                        className="progress progress-error w-56"
                        value={80}
                        max="100"
                      ></progress>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <FlareIcon className="text-3xl" />
                      <div className="">Required Light:</div>
                    </div>
                    <div className="badge badge-neutral badge-outline p-4 tracking-wider uppercase ">
                      {light_requirement}
                    </div>
                  </div>
                  <div className="flex gap-3 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <WaterDropIcon className="text-3xl" />
                      <div className="">Required Water:</div>
                    </div>
                    <div className="badge badge-neutral badge-outline p-4 tracking-wider uppercase ">
                      {water_requirement}
                    </div>
                  </div>
                  <div className="flex gap-3 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <ChildFriendlyIcon className="text-3xl" />{" "}
                      <div className=""> Care Level:</div>
                    </div>
                    <div className="badge badge-neutral badge-outline p-4 tracking-wider uppercase ">
                      {care_level}
                    </div>
                  </div>
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
                <div className="text-lg font-bold">Details</div>
              </button>
              {isDetailsOpen && (
                <div className="p-4 border rounded mt-3">
                  <div className="flex gap-3 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <GrassIcon className="text-3xl" />
                      <div className="">Plant Type:</div>
                    </div>
                    <div className="badge badge-neutral badge-outline p-4 tracking-wider uppercase ">
                      {category}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-center mt-10 card bg-white glass mx-0 md:mx-20 p-5">
          <div className="text-xl font-bold uppercase tracking-widest">
            Reviews
          </div>
        </div>
      </div>
    </>
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
