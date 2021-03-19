import { useRequireAuth } from "../utils/hooks/useRequireAuth";
import Link from "next/link";
import DateFormat from "dateformat"

interface ShiftDetailProps{
    dateDispo: Date;
    heureDebut: String;
    heureFin: String;
}

const ShiftDetail: React.FC<ShiftDetailProps> = ({dateDispo,heureDebut,heureFin}) => {
  const auth = useRequireAuth();
  const formatedDate = DateFormat(dateDispo,"yyyy-mm-dd")

  return (
    <div className="flex flex-col justify-center mt-2  border-2 border-black mt-6 rounded-xl">
        <div className="font-bold">
            {formatedDate}
        </div>
        <div>
            Heure de debut : {heureDebut}
        </div>
        <div>
            Heure de fin : {heureFin}
        </div>
    </div>
  );
};

export default ShiftDetail;
