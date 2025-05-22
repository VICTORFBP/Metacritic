import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Alert } from "antd";
import UserProfile from "../components/movie/UserProfile";

const ProfilePage = () => {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:8081/user/${user_id}`).then(res => res.json()),
      fetch(`http://localhost:8081/comment/user/${user_id}`).then(res => res.json()),
    ])
    .then(([userData, commentsData]) => {
      setUser({
        name: `${userData[0].user_name} ${userData[0].user_lastname}`,
        avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${userData[0].user_name}`,
        moviesWatched: [...new Set(commentsData.map(c => c.comment_moviename))],
      });
      setComments(commentsData);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, [user_id]);

  if (loading) return <Spin className="mt-40 block mx-auto" />;

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-white">
      {user && <UserProfile user={user} />}

      <h2 className="text-2xl font-bold mt-10 mb-4">📝 Mis Reseñas</h2>
      {comments.length === 0 ? (
        <p className="text-gray-400">No has hecho reseñas todavía.</p>
      ) : (
        <ul className="space-y-3">
          {comments.map((c, i) => (
            <li key={i}>
              <strong>{c.comment_moviename}</strong>: {c.comment_content} ({c.comment_rating}/5)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfilePage;
