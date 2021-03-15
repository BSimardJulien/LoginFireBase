import { useRequireAuth } from "../utils/hooks/useRequireAuth";
import Navbar from "../components/navbar";
import CalendarForm from "../components/CalendarForm"
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { GetServerSideProps } from "next";
import {connectionDBLocal, connectionDB } from "../config/database";
import nookies from "nookies";

const CalendarPage: React.FC = (props) => {
  const auth = useRequireAuth();

  const userComment = props.commentaire[0].commentaire;
  const userInfo = props.users;
  

  if (!auth.user) return null;
  return (
    <div>
      <Navbar />
      <CalendarForm commentaire={userComment} shift={userInfo}/>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);

    const userData = JSON.parse(cookies.userData);

    const noEmployeArr = await connectionDB.query(
      `SELECT noEmploye FROM employe WHERE courriel='${userData.email}'`
    );

    const noEmploye = noEmployeArr[0];
    

    const users = await connectionDBLocal.query(
      //`SELECT * FROM disponibilite WHERE noEmploye='${noEmploye}'`
      `SELECT * FROM disponibilite WHERE noEmploye='6996'`
    );

    const commentaire = await connectionDBLocal.query(
      //`SELECT commentaire FROM preference WHERE noEmploye='${noEmploye}'`
      `SELECT commentaire FROM preference WHERE noEmploye='6996'`
    );

    
    

    return {
      props: { users,commentaire },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};

export default CalendarPage;
