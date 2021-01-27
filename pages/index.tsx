import Head from "next/head";
import Companylogo from "../components/companylogo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mt-24">
          <Companylogo />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Portail employé
          </h2>
          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <p className="mt-2 text-center text-md text-gray-600">
              <Link href="/login">
                <button className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                  Se connecter
                </button>
              </Link>
              <Link href="/signup">
                <button className="mt-8 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                  Créer un compte
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
