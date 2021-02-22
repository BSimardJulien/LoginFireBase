/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import React, { useState } from "react";
import { useRequireAuth } from "../utils/hooks/useRequireAuth";
import Dropdown from "./dropdown";
import SettingsIcon from "@material-ui/icons/Settings";
import { slide as Menu } from "react-burger-menu";
import "react-burger-menu/"

const Navbar: React.FC = () => {
  const auth = useRequireAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdown, setDropDown] = useState<boolean>(false);
  var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '8vw',
      height: '2rem',
      left: '4vw',
      top: '1rem'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '50%'
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em',
      width: '60vw'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'flex'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
              <Menu  styles={ styles }>
                <a id="home" className="menu-item">
                  Home
                </a>
                <a id="about" className="menu-item">
                  About
                </a>
                <a id="contact" className="menu-item">
                  Contact
                </a>
              </Menu>
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
                {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="inline-flex justify-center w-13 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                      id="options-menu"
                      aria-haspopup="true"
                      aria-expanded="true"
                      onClick={() => {
                        setDropDown(!isDropdown);
                      }}
                    >
                      <SettingsIcon />

                      {/* <!-- Heroicon name: solid/chevron-down --> */}
                      <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  {isDropdown ? <Dropdown /> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
