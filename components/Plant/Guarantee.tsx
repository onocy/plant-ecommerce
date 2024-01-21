import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";

export const Guarantee = () => {
  return (
    <div className="flex w-full md:w-[55rem] justify-center self-center mx-0 md:mx-20 gap-4 my-4 text-center">
      <div className="p-4 card bg-white shadow-xl ml-3 ">
        <div className="flex justify-center mb-1">
          <LocalShippingOutlinedIcon className="text-4xl" />
        </div>
        <div className="font-bold mb-3">Free Shipping</div>
        <div>Get free standard shipping when you spend $150 or more</div>
      </div>
      <div className="p-4 card bg-white shadow-xl mr-3">
        <div className="flex justify-center mb-1">
          <DoneOutlineOutlinedIcon />
        </div>
        <div className="font-bold mb-3">Guarantee</div>
        <div>
          If your plant dies within 30 days, we will replace it for free
        </div>
      </div>
    </div>
  );
};
