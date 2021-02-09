import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../utils/hooks/useAuth";
import LoadingButton from "./loadingbutton";
import TextFormInfo from "./textforminfo";
import { updateEmployeInfo } from "../config/database";
import router from "next/router";

interface InfoFormProps {
  appt: string;
  adresse: string;
  ville: string;
  province: string;
  codepostal: string;
  telephone: string;
  cellulaire: string;
  courriel: string;
  noEmploye: string;
}

const InfoForm: React.FC<InfoFormProps> = ({
  appt,
  adresse,
  ville,
  province,
  codepostal,
  telephone,
  cellulaire,
  courriel,
  noEmploye,
}) => {
  const [error, setError] = useState("");
  const { register, errors, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  const onSubmit = (data: InfoFormProps) => {
    setIsLoading(true);
    setError(null);
    console.log(data);
    router.push(
      `/${data.Appt}/${data.Adresse}/${data.Ville}/${data.Province}/${data.CodePostal}/${data.Telephone}/${data.Cellulaire}/${data.Courriel}`
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextFormInfo
        type={"text"}
        name={"Appt"}
        isRequired={false}
        defaultValue={appt}
        errors={errors.Appt}
        register={register}
      />

      <TextFormInfo
        type={"text"}
        name={"Adresse"}
        isRequired={true}
        defaultValue={adresse}
        errors={errors.Adresse}
        register={register}
      />

      <TextFormInfo
        type={"text"}
        name={"Ville"}
        isRequired={true}
        defaultValue={ville}
        errors={errors.Ville}
        register={register}
      />

      <TextFormInfo
        type={"text"}
        name={"Province"}
        isRequired={true}
        defaultValue={province}
        errors={errors.Province}
        register={register}
      />

      <TextFormInfo
        type={"text"}
        name={"CodePostal"}
        isRequired={true}
        defaultValue={codepostal}
        errors={errors.CodePostal}
        register={register}
      />

      <TextFormInfo
        type={"text"}
        name={"Telephone"}
        isRequired={true}
        defaultValue={telephone}
        errors={errors.Telephone}
        register={register}
      />

      <TextFormInfo
        type={"text"}
        name={"Cellulaire"}
        isRequired={true}
        defaultValue={cellulaire}
        errors={errors.Cellulaire}
        register={register}
      />

      <TextFormInfo
        type={"text"}
        name={"Courriel"}
        isRequired={true}
        defaultValue={courriel}
        errors={errors.Courriel}
        register={register}
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
  );
};

export default InfoForm;
