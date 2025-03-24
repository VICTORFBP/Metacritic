import { Card, Avatar, List, Typography } from "antd";

const { Title } = Typography;

const ProfilePage = () => {
  const user = {
    name: "Usuario Demo",
    avatar: "https://via.placeholder.com/100",
    moviesWatched: ["Interstellar", "Inception", "Avatar", "Titanic"],
  };

  return (
    <div className="container mx-auto px-8 py-12 text-white">
      <Card className="bg-gray-900 p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <Avatar size={100} src={user.avatar} />
          <Title level={3} className="text-white">{user.name}</Title>
        </div>
        <List
          header={<strong>🎬 Películas Vistas</strong>}
          bordered
          dataSource={user.moviesWatched}
          renderItem={(movie) => <List.Item className="text-gray-300">{movie}</List.Item>}
          className="mt-4 bg-gray-800 p-4 rounded-lg"
        />
      </Card>
    </div>
  );
};

export default ProfilePage;
