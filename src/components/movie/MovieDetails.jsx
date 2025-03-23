import { Card, Typography, Rate } from "antd";

const { Title, Paragraph } = Typography;

const MovieDetails = ({ movie }) => {
  return (
    <Card className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <Title level={2} className="text-white">{movie.title}</Title>
      <Paragraph className="text-gray-300">{movie.synopsis}</Paragraph>
      <Rate disabled defaultValue={movie.rating} className="mb-2" />
      <Paragraph><strong>Director:</strong> {movie.director}</Paragraph>
      <Paragraph><strong>Género:</strong> {movie.genre}</Paragraph>
    </Card>
  );
};

export default MovieDetails;
