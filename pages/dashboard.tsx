import { useRequireAuth } from "../utils/hooks/useRequireAuth";
import Navbar from "../components/navbar";
import Link from "next/link";
import nookies from "nookies";
import { GetServerSideProps } from "next";
import { db } from "../config/firebase";

const DashBoardPage: React.FC = (props) => {
  const auth = useRequireAuth();
  const userAccess = props.userAccess;

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
      <Navbar isAdmin={userAccess.admin} isRH={userAccess.RH} />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);

    const userData = JSON.parse(cookies.userData);
    const userUID = userData.uid;

    const userAccess = await db
      .collection("users")
      .doc(userUID)
      .get()
      .then((userData) => {
        const data = userData.data();
        if (data) {
          return data;
        }
      });
      

    return {
      props: { userAccess },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};

export default DashBoardPage;
