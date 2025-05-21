import { Card, Input, Button, Rate } from "antd";
import { useState } from "react";

const ReviewForm = ({ onSubmit }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (review.trim() && rating > 0) {
      onSubmit({ comment: review, rating });
      setReview("");
      setRating(0);
    }
  };

  return (
    <Card className="bg-gray-900 p-4 rounded-lg shadow-md text-white">
      <Input.TextArea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Escribe tu reseña..."
        className="mb-2 bg-gray-800 text-white"
      />
      <Rate onChange={setRating} value={rating} className="mb-2" />
      <Button type="primary" onClick={handleSubmit} disabled={!review.trim() || rating === 0}>
        Enviar Reseña
      </Button>
    </Card>
  );
};

export default ReviewForm;
