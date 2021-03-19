import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  connectionDB,
  connectionDBLocal,
} from "../../../../../config/database";
import Navbar from "../../../../../components/navbar";
import dateformat from "dateformat";
import { useEffect } from "react";

const Disponibilites: React.FC = () => {
  const router = useRouter();
  router.push("/dashboard");

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="mt-6 font-bold flex justify-center">LOADING ...</div>
    </div>
  );
};

//LE FINALLY EST SUPER POURRI MAIS JAI PAS TROUVER DE FACON DE FAIRE AUTREMENT
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const noEmploye = context.params.noEmploye;
    const data = JSON.parse(context.params.data);

    await Promise.all([
      (async () => {
        await connectionDBLocal.query(
          `UPDATE preference SET commentaire='${data.commentaire}' WHERE noEmploye='${noEmploye}'`
        );
      })(),
      (async () => {
        await connectionDBLocal.query(
          `DELETE FROM disponibilite WHERE noEmploye='${noEmploye}'`
        );
      })(),
    ]);

    return {
      props: {},
    };
  } catch (error) {
    return {
      props: {},
    };
  } finally {
    try {
      const shifts = JSON.parse(context.params.shifts);
      const noEmploye = context.params.noEmploye;
      const data = JSON.parse(context.params.data);
      await Promise.all(
        shifts.map(async (shift) => {
          const shiftDate = dateformat(shift.dateDispo, "yyyy-mm-dd");
          const heureDebut = "heureDebut" + shiftDate;
          const heureFin = "heureFin" + shiftDate;
          const formatedDate = dateformat(shift.dateDispo, "m-dd-yyyy");
          console.log(
            `INSERT INTO disponibilite (noEmploye, dateDispo, heureDebut, heureFin) VALUES ('${noEmploye}', #${formatedDate}#, '${data[heureDebut]}',  '${data[heureFin]}')`
          );
  
          await connectionDBLocal.query(
            `INSERT INTO disponibilite (noEmploye, dateDispo, heureDebut, heureFin) VALUES ('${noEmploye}', #${formatedDate}#, '${data[heureDebut]}',  '${data[heureFin]}')`
          );
        })
      );
    } catch (error) {
      //console.log(error);
    }

  }
};

export default Disponibilites;
