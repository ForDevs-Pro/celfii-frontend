import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "./validations";

import GenericForm from "./GenericForm";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const fields = [
    {
      name: "email",
      label: "Email:",
      type: "text",
      placeholder: "usuario123@ejemplo.com",
    },
    {
      name: "password",
      label: "Contraseña:",
      type: "password",
      placeholder: "Tu contraseña",
    },
  ];

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <GenericForm
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        fields={fields}
        onSubmit={(formData) => {
          dispatch(loginUser(formData));
          navigate("/");
        }}
        buttonLabel="Iniciar Sesión"
      />
    </div>
  );
};
export default LoginForm;
