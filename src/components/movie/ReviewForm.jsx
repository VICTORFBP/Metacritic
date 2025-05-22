import { Card, Input, Button, Rate, message } from "antd";
import { useState } from "react";
import axios from "axios";

const ReviewForm = ({ mediaId, mediaType, mediaName }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async () => {
    if (!user) return message.warning("Inicia sesión para dejar una reseña.");

    try {
      await axios.post("http://localhost:8081/api/review", {
        comment: review,
        rating,
        movieId: mediaId,
        movieName: mediaName,
        userId: user.user_id,
      });

      message.success("Reseña enviada correctamente");
      setReview("");
      setRating(0);
    } catch (error) {
      message.error("Error al enviar la reseña");
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
      <Button
        type="primary"
        onClick={handleSubmit}
        disabled={!review.trim() || rating === 0}
      >
        Enviar Reseña
      </Button>
    </Card>
  );
};

export default ReviewForm;
