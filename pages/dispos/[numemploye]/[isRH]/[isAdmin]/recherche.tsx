import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  connectionDB,
  connectionDBLocal,
} from "../../../../../config/database";
import Navbar from "../../../../../components/navbar";
import dateformat from "dateformat";
import ShiftList from "../../../../../components/form/calendar/shiftlist";
import ShiftDetail from "../../../../../components/shiftdetail"

const Disponibilites: React.FC = (props) => {

  var isRH = ( props.isRH == 'true');
  var isAdmin = ( props.isAdmin == 'true');
  var shifts = []
  shifts = props.shifts;
  
  console.log(props);
  
  return (
      <div>
        <Navbar isAdmin={isAdmin} isRH={isRH} />
        <div className="min-h-screen flex flex-col bg-gray-200">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mt-6">
            <div className="text-center">
              {
                shifts.map((shift)=>{
                  return <ShiftDetail dateDispo={shift.dateDispo} heureDebut={shift.heureDebut} heureFin={shift.heureFin}/>
                })
              }
            </div>
          </div>
        </div>
      </div>
  );
};

//LE FINALLY EST SUPER POURRI MAIS JAI PAS TROUVER DE FACON DE FAIRE AUTREMENT
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const noEmploye=context.params.numemploye;
    const isRH = context.params.isRH;
    const isAdmin = context.params.isAdmin;

    const shifts = await connectionDBLocal.query(
      `SELECT * FROM disponibilite WHERE noEmploye='${noEmploye}'`
    );

    


    return {
      props: {shifts,isRH,isAdmin},
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default Disponibilites;
