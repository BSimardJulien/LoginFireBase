import Link from 'next/link'
import SignUpForm from "../components/signupform"

const SignUpPage: React.FC = () => {
    return (
        <div className="min-h-screen flex bg-gray-200">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3x1 leading-9 font- extrabold text-gray-900">Sign up</h2>
                <p className="mt-2 text-center text-md text-gray-600">
                    Vous avez déjà un compte ?
                    <Link href="/login">
                        <a href="#" className="text-blue-500">Log in</a>
                    </Link>
                </p>
                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <SignUpForm/>
            </div>
            </div>
        </div>
    )
}

export default SignUpPage