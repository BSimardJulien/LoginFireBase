import { TextFormInfoProps } from "../utils/types";

const TextFormInfo: React.FC<TextFormInfoProps> = ({
  type,
  name,
  defaultValue,
  isRequired,
  errors,
  register,
  readonly,
}) => {
  var input;
  if (isRequired) {
    input = (
      <input
        id={name}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        type={type}
        name={name}
        defaultValue={defaultValue}
        ref={register({
          required: `${name} obligatoire`,
        })}
        readOnly={readonly}
      />
    );
  } else {
    input = (
      <input
        id={name}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        type={type}
        name={name}
        defaultValue={defaultValue}
        ref={register()}
        readOnly={readonly}
      />
    );
  }

  return (
    <div className="mt-2">
      <div className="rounded-md shadow-sm flex ">
        <div className="flex flex-col justify-center mr-3 w-32">
          <label
            htmlFor={name}
            className="lock text-sm font-medium leading-5 text-gray-700 text-left"
          >
            {name}
          </label>
        </div>
        {input}
      </div>
      {errors && (
        <div className="mt-2 text-xs text-red-600">{errors.message}</div>
      )}
    </div>
  );
};

export default TextFormInfo;
