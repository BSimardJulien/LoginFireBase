import { useRequireAuth } from "../utils/hooks/useRequireAuth";
import Link from "next/link";

const Dropdown: React.FC = () => {
  const auth = useRequireAuth();
  return (
    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <Link href="/setting">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Account settings
          </a>
        </Link>
        <a href="#">
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 text-red-600"
            role="menuitem"
            onClick={() => auth.signOut()}
          >
            Déconnexion
          </button>
        </a>
      </div>
    </div>
  );
};

export default Dropdown;

//Dropdown panel, show/hide based on dropdown state.
//Entering: "transition ease-out duration-100"
//From: "transform opacity-0 scale-95"
//To: "transform opacity-100 scale-100"
//Leaving: "transition ease-in duration-75"
//From: "transform opacity-100 scale-100"
//To: "transform opacity-0 scale-95"
// {/* Current: "bg-gray-900 text-white" | Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
// <a
//   href="#"
//   className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-red-600"
// >
//   <button onClick={() => auth.signOut()}>Déconnexion</button>
// </a>
