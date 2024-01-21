import StarIcon from "@mui/icons-material/Star";

export const Reviews = () => {
  return (
    <div className="mt-10 card bg-white glass max-w-[53rem] p-5">
      <div className="text-xl font-bold uppercase tracking-widest text-center">
        Reviews (#)
      </div>
      <div className="flex flex-col gap-4">
        {[...Array(5)].map((_, index) => (
          <div
            className="last:border-none border-b-[1px] border-gray-300 pb-4 last:pb-0 first:pt-4"
            key={index}
          >
            <div>
              {[...Array(4)].map((_, index) => (
                <StarIcon key={index} />
              ))}
            </div>
            <div className="flex justify-between mb-3">
              <div>
                <div className="font-bold">Review Title</div>
                <div className="text-sm">Reviewer name</div>
              </div>
              <div>Date</div>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              fugiat ea reiciendis eaque officia, ex neque iusto ipsa quae
              deserunt aperiam aliquam, at quos possimus, quam laborum nam.
              Iusto, consequatur!
            </div>
            {/* <div className="text-sm">Was this review helpful?</div> */}
          </div>
        ))}
      </div>
    </div>
  );
};
