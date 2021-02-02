/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import React, { useState } from "react";
import { useRequireAuth } from "../utils/hooks/useRequireAuth";
import HamburgerMenu from "react-hamburger-menu";

const Navbar: React.FC = () => {
  const auth = useRequireAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const hamburgerOptions = <div>hello world! </div>;
  const handleClick = () => {
    setIsOpen(!isOpen);
    return hamburgerOptions;
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="true"
            >
              <HamburgerMenu
                isOpen={isOpen}
                menuClicked={handleClick.bind(this)}
              />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block  h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white" | Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <Link href="/dashboard">
                  <a
                    href="#"
                    // className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Accueil
                  </a>
                </Link>
                <Link href="/info">
                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Informations personnelles
                  </a>
                </Link>
  
                <Link href="/calendar">
                  <a
                    href="#"
                    // className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Calendrier
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white" | Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-red-600"
                >
                  <button onClick={() => auth.signOut()}>Déconnexion</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
