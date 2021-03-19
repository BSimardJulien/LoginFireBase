import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { connectionDB } from "../../../../config/database";
import Navbar from "../../../../components/navbar";

const NoEmploye: React.FC = (props) => {
  const router = useRouter();
  router.push("/dashboard");
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className ="mt-6 font-bold flex justify-center">LOADING ...</div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const courriel = context.params.courriel;
    const noEmploye = context.params.noEmploye;

    const users = await connectionDB.query(
      `UPDATE employe SET courriel='${courriel}' WHERE noEmploye='${noEmploye}'`
    );

    return {
      props: { users },
    };
  } catch (error) {
    
    return {
      props: {},
    };
  }
};

export default NoEmploye;
