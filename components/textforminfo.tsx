import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextFormInfoProps } from "../utils/types";

const TextFormInfo: React.FC<TextFormInfoProps> = ({
  id,
  type,
  name,
  isRequired,
  register,
}) => {
  const [value, setvalue] = useState("");
  var input;
  console.log(name);

  if (isRequired) {
    input = (
      <input
        id={name}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        type={type}
        name={name}
        value={value}
        onChange={(e) => setvalue(e.target.value)}
        ref={register({
          required: true,
        })}
      />
    );
  } else {
    input = (
      <input
        id={name}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        type={type}
        name={name}
        value={value}
        onChange={(e) => setvalue(e.target.value)}
        ref={register()}
      />
    );
  }
  console.log(input);
  
  return (
    <div className="mt-6">
      <div className="rounded-md shadow-sm flex ">
        <div className="flex flex-col justify-center mr-3 w-32">
          <label
            htmlFor={name}
            className="lock text-sm font-medium leading-5 text-gray-700 text-left"
          >
            {name}
          </label>
        </div>
        <input
          id={name}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          type={type}
          name={name}
          value={value}
          onChange={(e) => setvalue(e.target.value)}
          ref={register({
            required: true,
          })}
        />
        {errors.name && (
          <div className="mt-2 text-xs text-red-600">{errors.name.message}</div>
        )}
      </div>
    </div>
  );
};

export default TextFormInfo;
