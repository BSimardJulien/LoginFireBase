import { useRequireAuth } from "../utils/hooks/useRequireAuth";
import Navbar from "../components/navbar";
import { connectionDB } from "../config/database";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import SettingsForm from "../components/settingsform"

const Setting: React.FC = (props) => {
  const auth = useRequireAuth();
  const userInfo = props.users;
  console.log(userInfo);
  var content;
  if (userInfo[0] !== undefined) {
    content = (
        <SettingsForm
        nom={userInfo[0].nom}
        prenom={userInfo[0].prenom}
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
      <Navbar />
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

    const users = await connectionDB.query(
      `SELECT * FROM employe WHERE courriel='${userData.email}'`
    );

    return {
      props: { users },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};

export default Setting;
