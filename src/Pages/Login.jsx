import { useSelector } from "react-redux";
import loginImg from "../assets/Images/login.webp";
import Template from "../Components/core/Auth/Template";

function Login() {
  const { loading } = useSelector((state) => state.auth);
  return (
    <>
      {loading ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="custom-loader"></div>
        </div>
      ) : (
        <Template
          title="Welcome Back"
          description1="Build skills for today, tomorrow, and beyond."
          description2="Education to future-proof your career."
          image={loginImg}
          formType="login"
        />
      )}
    </>
  );
}

export default Login;
