import { useRequireAuth } from "../utils/hooks/useRequireAuth";
import Navbar from "../components/navbar";
import { connectionDB } from "../config/database";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import InfoForm from "../components/infoform";

const CalendarPage: React.FC = (props) => {
  const auth = useRequireAuth();
  const userInfo = props.users;
  // console.log(userInfo);
  

  if (!auth.user) return null;
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gray-200">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mt-24">
              <InfoForm user={userInfo[0]}  />
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <Navbar />
    //   {userInfo.map((user) => {
    //     return (
    //       <div>
    //         <div> {user.nom}</div>
    //         <div> {user.courriel}</div>
    //         <div> {user.ville}</div>
    //         <div> {user.province}</div>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    
    const userData = JSON.parse(cookies.userData);
    // console.log(cookies.userData);
    
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

export default CalendarPage;
