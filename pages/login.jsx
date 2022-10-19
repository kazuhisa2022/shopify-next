import LoginComponent from "../components/auth/LoginComponent";

const Login = () => {
  return (
    <>
      <div className="flex justify-center px-4">
        <div className="flex" style={{ width: "480px" }}>
          <div className="w-full">
            <LoginComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
