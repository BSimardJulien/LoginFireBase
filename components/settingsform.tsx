import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../utils/hooks/useAuth";
import LoadingButton from "./loadingbutton";
import TextFormInfo from "./textforminfo";
import router from "next/router";

interface SettingsFormProps {
  nom: string;
  prenom: string;
  courriel: string;
  noEmploye: string;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  nom,
  prenom,
  noEmploye,
  courriel,
}) => {
  const [error, setError] = useState("");
  const { register, errors, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  const onSubmit = (data) => {
    setIsLoading(true);
    setError(null);
    console.log(courriel);
    console.log(data.Courriel);
    console.log(data.Password);

    auth.changeEmailAddress(courriel,data.Courriel, data.Password).then((response) => {
      setIsLoading(false);
    });
    router.push(
      `changementcourriel/${data.noEmploye}/${data.Courriel}/changementcourriel`
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6 font-bold">
          <h2>Renseignements inchangeables</h2>
        </div>
        <TextFormInfo
          type={"text"}
          name={"noEmploye"}
          isRequired={false}
          defaultValue={noEmploye}
          errors={errors.noEmploye}
          register={register}
          readonly={true}
        />
        <TextFormInfo
          type={"text"}
          name={"Prenom"}
          isRequired={false}
          defaultValue={prenom}
          errors={errors.Prenom}
          register={register}
          readonly={true}
        />
        <TextFormInfo
          type={"text"}
          name={"Nom"}
          isRequired={false}
          defaultValue={nom}
          errors={errors.Nom}
          register={register}
          readonly={true}
        />

        <div className="mt-6 font-bold">
          <h2>Renseignements changeables</h2>
        </div>

        <TextFormInfo
          type={"text"}
          name={"Courriel"}
          isRequired={true}
          defaultValue={courriel}
          errors={errors.Courriel}
          register={register}
          readonly={false}
        />

        <div className="mt-14 font-bold text-red-600">
          <h3>Entrer votre mot de passe avant de sauvegarder</h3>
        </div>

        <TextFormInfo
          type={"password"}
          name={"Password"}
          isRequired={true}
          defaultValue={""}
          errors={errors.Password}
          register={register}
          readonly={false}
        />

        <div className="mt-6">
          <span className="block w-full rounded-md shadow-sm">
            <LoadingButton
              title="Sauvegarder"
              type="submit"
              isLoading={isLoading}
            />
          </span>
        </div>
      </form>
      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <button
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            onClick={() => {
              auth.sendPasswordResetEmail(courriel);
              router.push("/dashboard");
            }}
          >
            Envoyer courriel de réinitialisation du mot de passe
          </button>
        </span>
      </div>
    </div>
  );
};

export default SettingsForm;
