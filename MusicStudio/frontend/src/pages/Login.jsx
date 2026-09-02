import { useState } from "react";
import { Form } from "../components/Form";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      await authService.login(formData.email, formData.password);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div class="flex-auto justify-items-center content-center">
      <Form
        login="login"
        onSubmit={handleSubmit}
        onChange={handleChange}
        formData={formData}
      />
    </div>
  );
};
