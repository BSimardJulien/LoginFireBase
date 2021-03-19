import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "../loadingbutton";

interface PermisFormProp{
  firstname: String;
  lastname: String;
  numAgent: Number;
}


const PermisForm: React.FC<PermisFormProp> = ({firstname,lastname,numAgent}) => {
  console.log(firstname);
  
  const { register, errors, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onSubmit = (data) => {
    setIsLoading(true);
    router.push(`/permis/[${JSON.stringify(data)}]/${firstname}/${lastname}/${numAgent}/permisemail`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Nouveau numéro de permis d'agent
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="numpermis"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm"
            type="text"
            name="numpermis"
            ref={register({
              required: "SVP entrer un numéro de permis d'agent",
            })}
          />
          {errors.numpermis && (
            <div className="mt-2 text-xs text-red-600">
              {errors.numpermis.message}
            </div>
          )}
        </div>
      </div>
      <div className="rounded-md mt-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Nouvelle date d'expiration
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="dateexpiration"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm"
            type="text"
            name="dateexpiration"
            ref={register({
              required: "SVP entrer une date d'expiration",
            })}
          />
          {errors.dateexpiration && (
            <div className="mt-2 text-xs text-red-600">
              {errors.dateexpiration.message}
            </div>
          )}
        </div>
      </div>
      <div className="rounded-md mt-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Nouveau numéro date d'entrée en vigueur
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="numentre"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm"
            type="text"
            name="numentre"
            ref={register({
              required: "SVP entrer un numéro d'entrée en vigueur",
            })}
          />
          {errors.numentre && (
            <div className="mt-2 text-xs text-red-600">
              {errors.numentre.message}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <LoadingButton title="Envoyer" type="submit" isLoading={isLoading} />
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

export default PermisForm;
