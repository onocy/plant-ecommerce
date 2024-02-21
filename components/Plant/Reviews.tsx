import StarIcon from "@mui/icons-material/Star";

export const Reviews = ({ reviews }) => {
  return (
    <div className="mt-10 card bg-white glass max-w-[53rem] p-5">
      <div className="text-xl font-bold uppercase tracking-widest text-center">
        Reviews ({reviews?.length || 0})
      </div>
      <div className="flex flex-col gap-4">
        {reviews?.map((review, index) => (
          <div
            className="last:border-none border-b-[1px] border-gray-300 pb-4 last:pb-0 first:pt-4"
            key={index}
          >
            <div>
              {[...Array(review?.rating)].map((_, index) => (
                <StarIcon key={index} />
              ))}
            </div>
            <div className="flex justify-between mb-3">
              <div>
                <div className="font-bold">{review.review_title}</div>
                <div className="text-sm">{review.username}</div>
              </div>
              <div>{review.date}</div>
            </div>
            <div>{review.text}</div>
            {/* <div className="text-sm">Was this review helpful?</div> */}
          </div>
        ))}
      </div>
    </div>
  );
};
