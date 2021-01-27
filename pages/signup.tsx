import Link from "next/link";
import SignUpForm from "../components/signupform";
import Companylogo from "../components/companylogo";

const SignUpPage: React.FC = () => {
  return (

    <div className="min-h-screen flex flex-col bg-gray-200">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mt-24">
          <Companylogo></Companylogo>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créer un compte
          </h2>
          <p className="mt-2 text-center text-md text-gray-600">
            {"Vous avez déjà un compte ?"}
            <Link href="/login">
              <a href="#" className="text-blue-500">
                {" "}Se connecter
              </a>
            </Link>
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
