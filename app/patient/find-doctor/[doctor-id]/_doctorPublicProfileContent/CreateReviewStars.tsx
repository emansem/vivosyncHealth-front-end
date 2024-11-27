import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export const CreatReviewStars = ({ rating }: { rating: number }) => {
  //create a full star if the rating is greater or equal to 5
  const handleCreatingStars = () => {
    const stars = Array.from({ length: Math.floor(rating) }, (__, i) => (
      <span className="text-lg text-yellow-400" key={i}>
        <FaStar />
      </span>
    ));

    return stars;
  };
  //Create a half star if the rating is above 4.5 or less than 5 and create an empty star if the rating is less than 4.5
  const createHalfStarOrEmpty = () => {
    if (rating > 4.5 && Math.floor(rating) < 5) {
      return (
        <span className="text-lg text-yellow-400">
          <FaStarHalfAlt />
        </span>
      );
    } else {
      const stars = Array.from({ length: 5 - Math.floor(rating) }, (__, i) => (
        <span className="text-lg text-stone-600" key={i}>
          <FaRegStar />
        </span>
      ));
      return stars;
    }
  };
  const fullStar = handleCreatingStars();
  const halfStarOrEmpty = createHalfStarOrEmpty();

  return (
    <p className="flex items-center gap-1">
      {fullStar}
      {halfStarOrEmpty}
      <span className="text-base text-stone-600 font-normal">{rating}</span>
    </p>
  );
};
