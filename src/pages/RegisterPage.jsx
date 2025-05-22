import { useState } from "react";
import { Input, Button, Alert, Progress } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    age: "",
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const checkStrength = (pass) => {
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[\W]/.test(pass)) score += 1;
    return score * 25;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setForm({ ...form, password: newPassword });
    setPasswordStrength(checkStrength(newPassword));
  };

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8081/api/register", form);
      setSuccessMsg("Registro exitoso. Redirigiendo...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setErrorMsg(
        error.response?.data?.error || "Error al registrar el usuario."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md shadow-xl text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>

        {errorMsg && <Alert message={errorMsg} type="error" showIcon className="mb-4" />}
        {successMsg && <Alert message={successMsg} type="success" showIcon className="mb-4" />}

        <Input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mb-3"
        />
        <Input
          placeholder="Apellido"
          value={form.lastname}
          onChange={(e) => setForm({ ...form, lastname: e.target.value })}
          className="mb-3"
        />
        <Input
          placeholder="Edad"
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          className="mb-3"
        />
        <Input
          placeholder="Correo electrónico"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mb-3"
        />
        <Input.Password
          placeholder="Contraseña"
          value={form.password}
          onChange={handlePasswordChange}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          className="mb-2"
        />
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
            className="mb-4"
          />
        )}

        <Button
          block
          type="primary"
          className="bg-green-600 hover:bg-green-500"
          onClick={handleRegister}
        >
          Registrarse
        </Button>

        <div className="mt-4 text-center text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
