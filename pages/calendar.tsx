import { useRequireAuth } from "../utils/hooks/useRequireAuth";
import Navbar from "../components/navbar";
import CalendarForm from "../components/form/calendar/calendarform";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { GetServerSideProps } from "next";
import { connectionDBLocal, connectionDB } from "../config/database";
import nookies from "nookies";
import { db } from "../config/firebase";

interface CalendarPageProps{
  userAccess:any;
  users:any;
  commentaire:any;
  noEmploye:any;
}
const CalendarPage: React.FC<CalendarPageProps> = (props) => {
  const auth = useRequireAuth();
  console.log(props);
  
  const userAccess = props.userAccess;

  const userInfo = props.users;
  var content;
  var userComment;
  

  if (props.commentaire[0] === undefined) {
    userComment = "";
  } else {
    userComment = props.commentaire[0].commentaire;
  }
  

  content = <CalendarForm commentaire={userComment} shift={userInfo} numEmploye={props.noEmploye} />;

  if (!auth.user) return null;
  return (
    <div>
      <Navbar isAdmin={userAccess.admin} isRH={userAccess.RH} />
      <div className="min-h-screen flex flex-col bg-gray-200">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">{content}</div>
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
    

    const noEmployeArr = await connectionDB.query(
      `SELECT noEmploye FROM employe WHERE courriel='${userData.email}'`
    );

    const noEmploye = noEmployeArr[0].noEmploye;


    const users = await connectionDBLocal.query(
      `SELECT * FROM disponibilite WHERE noEmploye='${noEmploye}'`
      //`SELECT * FROM disponibilite WHERE noEmploye='6996'`
    );


    const commentaire = await connectionDBLocal.query(
      `SELECT commentaire FROM preference WHERE noEmploye='${noEmploye}'`
      //`SELECT commentaire FROM preference WHERE noEmploye='6996'`
    );



    return {
      props: { users, commentaire, noEmploye,userAccess },
    };
  } catch (error) {
    
    return {
      props: {},
    };
  }
};

export default CalendarPage;
