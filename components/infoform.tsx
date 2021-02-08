import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../utils/hooks/useAuth";
import LoadingButton from "./loadingbutton";
import { TextFormInfoProps } from "../utils/types";
import TextFormInfo from "./textforminfo";

interface InfoFormProps {
  app: TextFormInfoProps;
  addresse: TextFormInfoProps;
  Province: TextFormInfoProps;
}

const InfoForm: React.FC = () => {
  const [error, setError] = useState("");
  const { register, errors, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  const onSubmit = (data: InfoFormProps) => {
    setIsLoading(true);
    setError(null);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextFormInfo
        id={"app"}
        type={"text"}
        name={"app"}
        value={""}
        isRequired={false}
        register={register}
        errorMessage={errors}
      />

      <TextFormInfo
        id={"addresse"}
        type={"text"}
        name={"addresse"}
        value={""}
        isRequired={true}
        register={register}
      />

      <TextFormInfo
        id={"province"}
        type={"text"}
        name={"province"}
        value={""}
        isRequired={true}
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
