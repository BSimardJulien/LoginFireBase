import { useRequireAuth } from "../utils/hooks/useRequireAuth";
import Navbar from "../components/navbar";
import Link from "next/link";

const DashBoardPage: React.FC = () => {
  const auth = useRequireAuth();

  if (!auth.user)
    return (
      <Link href="/login">
        <a href="#" className="text-blue-500">
          {" "}
          Retourner à la page d'accueil
        </a>
      </Link>
    );
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex bg-gray-200">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mt-24">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {`Welcome ${auth.user.name}!`}
            </h2>
            <p className="mt-2 text-center text-md text-gray-600">
              {`You are logged in with ${auth.user.email}`}
            </p>
            <p>
              Bienvenue sur le site web des employés de Groupe Sécurité C.L.B
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
