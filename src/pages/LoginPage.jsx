import { useState } from "react";
import { Input, Button, Alert } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8081/api/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      setErrorMsg("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md shadow-xl text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        {errorMsg && <Alert message={errorMsg} type="error" showIcon className="mb-4" />}

        <Input
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <Input.Password
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          className="mb-6"
        />

        <Button block type="primary" className="bg-blue-600" onClick={handleLogin}>
          Ingresar
        </Button>

        <div className="mt-4 text-center text-gray-400">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
