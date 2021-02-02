import { useRequireAuth } from "../utils/hooks/useRequireAuth";
import Navbar from "../components/navbar";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";

const CalendarPage: React.FC = () => {
  const auth = useRequireAuth();
  const [value, onChange] = useState(new Date());

  if (!auth.user) return null;
  return (
    <div>
      <Navbar />
      <div className="flex flex-col">
        <div className="min-h-screen flex bg-gray-200 ">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
            <div className=" flex justify-center">
              <Calendar onChange={onChange} value={value} />
            </div>
            <div className="px-4 py-3 bg-gray-50 text-center sm:px-6 mt-6">
              <div >
                <label className="block text-sm font-medium text-gray-700">
                  Commentaire
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Votre commentaire"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
