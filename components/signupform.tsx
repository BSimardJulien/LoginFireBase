import { useForm } from 'react-hook-form'


interface SignUpdata {
    name: string
    email: string
    password : string
}

const SignUpForm: React.FC = () => {
    const { register, errors, handleSubmit } = useForm()
    const onSubmit = (data: SignUpdata) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm">
                <label
                    htmlFor="name"
                    className="lock text-sm font-medium leading-5 text-gray-700">
                    Name
                </label>
                <input
                    id="name"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    type="password"
                    name="password"
                    ref={register({
                        required: 'Please enter a password',
                        minLength: {
                            value: 6,
                            message: 'Should have at least 6 characters',
                        },
                    })}
                />
                {errors.password && (
                    <div className="mt-2 text-xs text-red-600">
                        {errors.password.message}
                    </div>
                )}
            </div>
            <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">  
                <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                    Créer un compte
                </button>
                </span>
            </div>
        </form>
    )
}

export default SignUpForm