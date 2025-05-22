import { useState } from "react";
import { Input, Button, Alert } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });

      // Guardar usuario o token si es necesario
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/"); // Redirige al home
    } catch (error) {
      setErrorMsg("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Iniciar Sesión</h2>

        {errorMsg && (
          <Alert message={errorMsg} type="error" showIcon className="mb-4" />
        )}

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Correo electrónico</label>
          <Input
            placeholder="ejemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-1">Contraseña</label>
          <Input.Password
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            className="rounded"
          />
        </div>

        <Button
          type="primary"
          block
          className="bg-blue-600 hover:bg-blue-500 font-semibold"
          onClick={handleLogin}
        >
          Ingresar
        </Button>

        <div className="mt-6 text-center text-gray-400">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
