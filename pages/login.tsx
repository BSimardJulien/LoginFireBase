import Link from "next/link";
import LoginForm from "../components/form/loginform";
import Companylogo from "../components/companylogo";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mt-2">
          <Companylogo />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in
          </h2>
          <p className="mt-2 text-center text-md text-gray-600">
            {"Vous n'avez pas de compte ?"}
            <Link href="/signup">
              <a href="#" className="text-blue-500">
                {" "}
                Creer un compte
              </a>
            </Link>
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
          <div className="mt-4 flex items-end">
            <div className="text-sm leading-5">
              <Link href="/resetpassword">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Forgot your password?
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
