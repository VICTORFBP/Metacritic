import { useState, useEffect } from "react";
import { Input, Button, Rate, message } from "antd";

const ReviewForm = ({ movieId, movieName, onReviewSubmitted, existingReview }) => {
  // Si hay reseña existente, inicializamos los estados con sus valores
  const [comment, setComment] = useState(existingReview ? existingReview.comment_content : "");
  const [rating, setRating] = useState(existingReview ? existingReview.comment_rating : 0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (existingReview) {
      setComment(existingReview.comment_content);
      setRating(existingReview.comment_rating);
    }
  }, [existingReview]);

  const handleSubmit = async () => {
    if (!user) {
      return message.warning("Debes iniciar sesión para comentar.");
    }

    try {
      let res;
      if (existingReview) {
        // Editar reseña (PUT)
        res = await fetch(`http://localhost:8081/api/review/${existingReview.comment_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            comment,
            rating,
            userId: user.user_id,
          }),
        });
      } else {
        // Crear reseña (POST)
        res = await fetch("http://localhost:8081/api/review", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            comment,
            rating,
            movieId,
            movieName,
            userId: user.user_id,
          }),
        });
      }

      if (!res.ok) throw new Error("Error al enviar la reseña");

      message.success(existingReview ? "Reseña editada correctamente" : "Reseña enviada correctamente");
      setComment("");
      setRating(0);
      onReviewSubmitted(); // Refresca comentarios
    } catch (err) {
      console.error(err);
      message.error(existingReview ? "No se pudo editar la reseña" : "No se pudo enviar la reseña");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white mt-6">
      <h3 className="text-xl font-bold mb-2">📝 {existingReview ? "Edita tu reseña" : "Escribe tu reseña"}</h3>
      <Input.TextArea
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="¿Qué te pareció esta película?"
        className="mb-3 bg-gray-700 text-white"
      />
      <Rate
        value={rating}
        onChange={(value) => setRating(value)}
        className="mb-3"
      />
      <Button
        type="primary"
        className="bg-blue-500"
        disabled={!comment.trim() || rating === 0}
        onClick={handleSubmit}
      >
        {existingReview ? "Guardar Cambios" : "Enviar Reseña"}
      </Button>
    </div>
  );
};

export default ReviewForm;
