import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../utils/hooks/useAuth";
import LoadingButton from "../loadingbutton";

interface DispoEmployeFormProps{
    isRH:Boolean;
    isAdmin:Boolean;
}
const DispoEmployeForm: React.FC<DispoEmployeFormProps> = ({isRH,isAdmin}) => {
  const { register, errors, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const auth = useAuth();
  const router = useRouter();
  
  const onSubmit = (data) => {
    setIsLoading(true);
    router.push(`/dispos/${data.numemploye}/${isRH}/${isAdmin}/recherche`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Numéro de l'employé
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="numemploye"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm"
            type="text"
            name="numemploye"
            ref={register({
              required: "SVP entrer un numéro d'employé",
            })}
          />
          {errors.numemploye && (
            <div className="mt-2 text-xs text-red-600">
              {errors.numemploye.message}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <LoadingButton
            title="Rechercher"
            type="submit"
            isLoading={isLoading}
          />
        </span>
      </div>
      {/* {error?.message && (
        <div className="mb-4 text-red-500 text-center border-dashed border border-red-600 p-2 rounded">
          <span>{error.message}</span>
        </div>
      )} */}
    </form>
  );
};

export default DispoEmployeForm;
