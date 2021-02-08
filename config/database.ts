import { GetServerSideProps } from "next";
import ADODB from "node-adodb";

export const connectionDB = ADODB.open(
  "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=data/SecuriteCLB.mdb"
);

export const UpdateEmployeInfo: GetServerSideProps = async () => {
  
  try {
    await connectionDB.query(`UPDATE employe noEmploye=69420 WHERE noEmploye=1168`);
    return {
      props: {},
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
