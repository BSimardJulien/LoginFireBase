import { GetServerSideProps } from "next";
import { connectionDB } from "../../../../../../../../config/database";

const courriel: React.FC = (props) => {
  return <> hello world</>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const appt = context.params.appt;
    const adresse = context.params.adresse;
    const ville = context.params.ville;
    const province = context.params.province;
    const codepostal = context.params.codepostal;
    const telephone = context.params.telephone;
    const cellulaire = context.params.cellulaire;
    const courriel = context.params.courriel;

    console.log(ville);

    const users = await connectionDB.query(
      // `UPDATE employe SET adresse='${adresse}' ville='${ville}' province='${province}' codePostal='${codepostal}' telephone='${telephone}' cellulaire='${cellulaire}'  WHERE courriel='${courriel}'`
      `UPDATE employe 
       SET adresse='${adresse}', ville='${ville}', province='${province}', codePostal='${codepostal}', telephone='${telephone}',  WHERE courriel='${courriel}'`
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

export default courriel;
