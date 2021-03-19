import { useRequireAuth } from "../utils/hooks/useRequireAuth";
import Link from "next/link";

const DropdownEmployes: React.FC = () => {
  const auth = useRequireAuth();
  return (
    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <Link href="/calendar">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Calendrier de disponibilités
          </a>
        </Link>
        <Link href="/info">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Informations personelles
          </a>
        </Link>
        <Link href="/permis">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Renouvellement du permis
          </a>
        </Link>
      </div>
    </div>
  );
};

export default DropdownEmployes;

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
