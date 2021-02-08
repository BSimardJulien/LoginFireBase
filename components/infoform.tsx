import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../utils/hooks/useAuth";
import LoadingButton from "./loadingbutton";
import TextFormInfo from "./textforminfo";
import { connectionDB } from "../config/database";

interface InfoFormProps {
  user: string;
}

const InfoForm: React.FC<InfoFormProps> = ({ user }) => {
  const [error, setError] = useState("");
  const { register, errors, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  console.log(user);

  const onSubmit = (data: InfoFormProps) => {
    setIsLoading(true);
    setError(null);
    // connectionDB.query(`UPDATE employe noEmploye=69420 WHERE noEmploye=1168`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextFormInfo
        type={"text"}
        name={"Appt"}
        isRequired={false}
        defaultValue={user.appt}
        errors={errors.Appt}
        register={register}
      />

      <TextFormInfo
        type={"text"}
        name={"Adresse"}
        isRequired={true}
        defaultValue={user.adresse}
        errors={errors.Adresse}
        register={register}
      />

      <TextFormInfo
        type={"text"}
        name={"Province"}
        isRequired={true}
        defaultValue={user.province}
        errors={errors.Province}
        register={register}
      />

      <TextFormInfo
        type={"text"}
        name={"CodePostal"}
        isRequired={true}
        defaultValue={user.codePostal}
        errors={errors.CodePostal}
        register={register}
      />

      <TextFormInfo
        type={"text"}
        name={"Telephone"}
        isRequired={true}
        defaultValue={user.telephone}
        errors={errors.Telephone}
        register={register}
      />

      <TextFormInfo
        type={"text"}
        name={"Cellulaire"}
        isRequired={true}
        defaultValue={user.cellulaire}
        errors={errors.Cellulaire}
        register={register}
      />

      <TextFormInfo
        type={"text"}
        name={"Courriel"}
        isRequired={true}
        defaultValue={user.courriel}
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
