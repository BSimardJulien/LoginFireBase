import { useRequireAuth } from "../utils/hooks/useRequireAuth";
import Navbar from "../components/navbar";
import Link from "next/link";
import nookies from "nookies";
import { GetServerSideProps } from "next";
import { db } from "../config/firebase";
import PermisForm from "../components/form/permisform";
import { connectionDB } from "../config/database";

const DashBoardPage: React.FC = (props) => {
  const auth = useRequireAuth();
  const userAccess = props.userAccess;
  const userInfo = props.users[0];
  
  

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
      <div className="min-h-screen flex flex-col bg-gray-200">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mt-24">
            <PermisForm firstname={userInfo.prenom} lastname={userInfo.nom} numAgent={userInfo.noPermis}/>
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

    let userAccess;

    let users;

    await Promise.all([
      (async () => {
        userAccess = await db
          .collection("users")
          .doc(userUID)
          .get()
          .then((userData) => {
            const data = userData.data();
            if (data) {
              return data;
            }
          });
      })(),
      (async () => {
        users = await connectionDB.query(
          `SELECT * FROM employe WHERE courriel='${userData.email}'`
        );
      })(),
    ]);

    return {
      props: { users, userAccess },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};

export default DashBoardPage;
