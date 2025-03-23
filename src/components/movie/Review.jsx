import { Card, Rate } from "antd";

const Review = ({ review }) => {
  return (
    <Card className="bg-gray-800 text-white p-4 rounded-lg mt-2 shadow-md">
      <h4 className="font-bold text-lg">{review.user}</h4>
      <p className="text-gray-300">{review.comment}</p>
      <Rate disabled defaultValue={review.rating} className="text-yellow-400" />
    </Card>
  );
};

export default Review;
