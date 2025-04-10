import { Card, Avatar, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";

const { Title } = Typography;

const API_URL_COMMENTS = "http://localhost:8081/comment/user/";
const API_URL_USERINFO = "http://localhost:8081/user/";

const ProfilePage = () => {
  const { user_id } = useParams();
  const [comments, setComments] = useState([]);
  const [userinfo, setUserinfo] = useState(null);

  useEffect(() => {
    fetch(API_URL_USERINFO + user_id)
      .then((result) => result.json())
      .then((data) => setUserinfo(data[0]))
      .catch((err) => console.log(err));
  }, [user_id]);

  useEffect(() => {
    fetch(API_URL_COMMENTS + user_id)
      .then((result) => result.json())
      .then((data) => setComments(data))
      .catch((err) => console.log(err));
  }, [user_id]);

  console.log(userinfo);

  return (
    <div className="mx-auto px-8 py-16">
      <Card className="bg-gray-900 px-6 rounded-lg shadow-md text-gray-200 border-gray-700">
        {userinfo ? (
          <div className="flex items-center gap-4 py-10">
            <Avatar size={100} src={userinfo.user_avatar} />
            <h1 className="text-2xl">
              {userinfo.user_name} {userinfo.user_lastname}
            </h1>
          </div>
        ) : (
          <div className="flex items-center gap-4 py-6">
            <Avatar size={100} src="NothingATAll" />
            <h1 className="text-3xl font-sans">Unknown</h1>
          </div>
        )}

        <div className="bg-gray-700 bg-opacity-20 rounded-2xl px-5 py-4">
          <h2 className="text-2xl font-bold text-white mb-4">
            💬 Mis Comentarios
          </h2>

          <div className="py-5">
            {comments.length != 0 ? (
              comments.map((comment) => (
                <div className="py-1.5 px-5">
                  <article className=" bg-gray-800 bg-opacity-50 shadow-lg rounded-3xl">
                    <div className="flex gap-3 px-5 bg-gray-800 bg-opacity-90 rounded-t-3xl h-8">
                      <div className="flex items-center text-yellow-400 mb-2 py-4">
                        <StarFilled className="text-lg mr-2" />
                        <span className="text-white">
                          {comment.comment_rating} / 10
                        </span>
                      </div>
                    </div>
                    <p className="px-5 py-2.5 h-full min-h-20">
                      {comment.comment_content}
                    </p>
                  </article>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center min-h-20">
                ❌ No hay comentarios disponible para esta película
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
