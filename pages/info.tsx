import { useRequireAuth } from "../utils/hooks/useRequireAuth";
import Navbar from "../components/navbar";
import { connectionDB } from "../config/database";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import InfoForm from "../components/form/infoform";
import { db } from "../config/firebase";

const Info: React.FC = (props) => {
  const auth = useRequireAuth();
  const userAccess = props.userAccess;
  const userInfo = props.users;

  var content;
  if (userInfo[0] !== undefined) {
    content = (
      <InfoForm
        appt={userInfo[0].appt}
        adresse={userInfo[0].adresse}
        ville={userInfo[0].ville}
        province={userInfo[0].province}
        codepostal={userInfo[0].codePostal}
        telephone={userInfo[0].telephone}
        cellulaire={userInfo[0].cellulaire}
        courriel={userInfo[0].courriel}
        noEmploye={userInfo[0].noEmploye}
      />
    );
  } else {
    content = <div className="font-bold">Aucune info disponible...</div>;
  }

  if (!auth.user) return null;
  return (
    <div>
      <Navbar isAdmin={userAccess.admin} isRH={userAccess.RH} />
      <div className="min-h-screen flex flex-col bg-gray-200">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mt-24">{content}</div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);

    const userData = JSON.parse(cookies.userData);
    const userUID = userData.uid

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

export default Info;
