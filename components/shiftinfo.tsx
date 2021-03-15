import { DeepMap, FieldError } from "react-hook-form";
import dateformat from "dateformat";

interface ShiftInfoProps {
  date: Date;
  heureDebut: number;
  heureFin: number;
  errors: any;
  register: any;
}

const ShiftInfo: React.FC<ShiftInfoProps> = ({
  date,
  heureDebut,
  heureFin,
  errors,
  register,
}) => {
  return (
    <div className="mt-2 flex">
      <input
        id="date"
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        type="text"
        name="date"
        defaultValue={dateformat(date.toString(),"yyyy-mm-dd")}
        ref={register({
          required: `heure de debut obligatoire`,
        })}
        readOnly
      />
      <input
        id="heureDebut"
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        type="text"
        name="heureDebut"
        defaultValue={heureDebut}
        ref={register({
          required: `heure de debut obligatoire`,
        })}
      />
      <input
        id="heureFin"
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        type="number"
        name="text"
        defaultValue={heureFin}
        ref={register({
          required: `heure de fin obligatoire`,
        })}
      />
    </div>
  );
};

export default ShiftInfo;
