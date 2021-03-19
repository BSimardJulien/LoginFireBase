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
  const date2 = dateformat(date, "yyyy-mm-dd");
  const heureDebutName = "heureDebut" + date2;
  const heureFinName = "heureFin" + date2;
  return (
    <div>
      <div className="mt-2 flex">
        <input
          id={date2}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          type="text"
          name={date2}
          defaultValue={date2}
          ref={register({
            required: `date obligatoire`,
          })}
          readOnly
        />
        <input
          id={heureDebutName}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          type="text"
          name={heureDebutName}
          defaultValue={heureDebut}
          ref={register({
            required: "heure de debut obligatoire",
            pattern: {
              value: /^(2[0-4]|1[0-9]|[0-9])$/,
              message: "Chiffre entre 0 et 24 svp",
            },
          })}
        />

        <input
          id={heureFinName}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          type="number"
          name={heureFinName}
          defaultValue={heureFin}
          ref={register({
            required: "heure de fin obligatoire",
            pattern: {
              value: /^(2[0-4]|1[0-9]|[0-9])$/,
              message: "Chiffre entre 0 et 24 svp",
            },
          })}
        />
      </div>
      <div>
        {errors[heureDebutName] && (
          <div className="mt-2 text-xs text-red-600">
            {errors[heureDebutName].message}
          </div>
        )}
        {errors[heureFinName] && (
          <div className="mt-2 text-xs text-red-600">
            {errors[heureFinName].message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShiftInfo;
