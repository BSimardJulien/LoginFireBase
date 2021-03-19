import { useRequireAuth } from "../utils/hooks/useRequireAuth";
import Navbar from "../components/navbar";
import Link from "next/link";
import nookies from "nookies";
import { GetServerSideProps } from "next";
import { db } from "../config/firebase";
import DispoEmployeForm from "../components/form/dispoemployeForm";

interface DashBoardPageProps{
  userAccess:any;
}
const DashBoardPage: React.FC<DashBoardPageProps> = (props) => {
  const auth = useRequireAuth();
  const userAccess = props.userAccess;
  console.log(userAccess);
  var content;

  if (userAccess.RH || userAccess.admin) {
    content = <DispoEmployeForm isRH={userAccess.RH} isAdmin={userAccess.admin} />;
  } else {
    content = (
      <div>
        Vous n'avez pas les droits necessaires pour etre sur cette pages.
      </div>
    )
  }

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
            {content}
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

    console.log(userAccess);

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
