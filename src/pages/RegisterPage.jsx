import { useState } from "react";
import { Input, Button, Alert, Progress } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // Verifica la fuerza de la contraseña
  const checkStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[\W]/.test(password)) score += 1;
    return score * 25;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setForm({ ...form, password: newPassword });
    setPasswordStrength(checkStrength(newPassword));
  };

  const handleRegister = async () => {
    setErrorMsg("");
    try {
      const res = await axios.post("http://localhost:3001/api/register", form);

      setSuccessMsg("Registro exitoso. Redirigiendo...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMsg("El correo ya está registrado.");
      } else {
        setErrorMsg("Ocurrió un error al registrarse.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Registro</h2>

        {errorMsg && <Alert message={errorMsg} type="error" showIcon className="mb-4" />}
        {successMsg && <Alert message={successMsg} type="success" showIcon className="mb-4" />}

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Nombre de usuario</label>
          <Input
            placeholder="Usuario"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Correo electrónico</label>
          <Input
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            className="rounded"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-300 mb-1">Contraseña</label>
          <Input.Password
            placeholder="********"
            value={form.password}
            onChange={handlePasswordChange}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            className="rounded"
          />
        </div>

        {/* Indicador de fuerza */}
        {form.password && (
          <Progress
            percent={passwordStrength}
            showInfo={false}
            status={
              passwordStrength < 50
                ? "exception"
                : passwordStrength < 75
                ? "normal"
                : "success"
            }
            strokeColor={{
              "0%": "#ff4d4f",
              "50%": "#faad14",
              "100%": "#52c41a",
            }}
            className="mb-6"
          />
        )}

        <Button
          type="primary"
          block
          className="bg-green-600 hover:bg-green-500 font-semibold"
          onClick={handleRegister}
        >
          Registrarse
        </Button>

        <div className="mt-6 text-center text-gray-400">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
