import { useRef } from "react";
import { useUserL } from "./zustantd";
import { account } from "../../appwrite/config";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const setUser = useUserL((s) => s.loginUser);

  const formRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const mail = formRef.current.email.value;
    const pass = formRef.current.password.value;

    try {
      await account.deleteSession("current");
    } catch (error) {
      console.log(error);
    }
    try {
      console.log({ mail, pass });
      setUser(mail, pass);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin} ref={formRef}>
        <div className="auth-field-wrapper">
          <label>Email:</label>
          <input type="email" name="email" />
        </div>

        <div className="auth-field-wrapper">
          <label>Password:</label>
          <input type="password" name="password" />
        </div>

        <div className="auth-field-wrapper">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
