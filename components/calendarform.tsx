import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../utils/hooks/useAuth";
import LoadingButton from "./loadingbutton";
import router from "next/router";
import Calendar from "react-calendar";
import dateformat from "dateformat";
import ShiftList from "./shiftlist";

interface CalendarFormProps {
  commentaire: string;
  shift: any;
}

const CalendarForm: React.FC<CalendarFormProps> = ({ commentaire, shift }) => {
  const [error, setError] = useState("");
  const { register, errors, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const [value, onChange] = useState(new Date());

  const minDate = new Date();
  const maxDate = new Date();
  minDate.setMonth(minDate.getMonth() - 1);
  minDate.setDate(1);
  maxDate.setMonth(maxDate.getMonth() + 1);
  maxDate.setDate(31);

  const currentDate = new Date();
  const currentMonth = dateformat(currentDate, "m");
  const currentYear = dateformat(currentDate, "yy");

  const onSubmit = (data) => {
    setIsLoading(true);
    setError(null);
  };

  var initialShift = [];
  shift.map((shift) => {
    const dateDispo = shift.dateDispo;
    var currentShiftMonth, currentShiftYear;
    var formatedShiftDate = new Date(dateDispo);
    currentShiftMonth = dateformat(formatedShiftDate, "m");
    currentShiftYear = dateformat(formatedShiftDate, "yy");
    if (
      (currentMonth >= minDate.getMonth() ||
        currentMonth <= maxDate.getMonth()) &&
      currentShiftYear === currentYear
    ) {
      initialShift.push(shift);
    }
  });
  console.log(initialShift);

  const [shifts, setShifts] = useState(shift);

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="min-h-screen flex bg-gray-200 ">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
            <div className=" flex justify-center">
              <Calendar
                onChange={onChange}
                value={value}
                //TODO this should be changeable by an admin
                minDate={minDate}
                maxDate={maxDate}
                onClickDay={(date) => {
                  var currentMonth, currentYear;
                  var dateClicked = new Date(date);
                  currentMonth = dateformat(dateClicked, "m");
                  currentYear = dateformat(dateClicked, "yy");
                  //TODO CHECK IF SHIFT DATE ALREADY EXIST
                  shifts.push({
                    dateDispo: dateClicked,
                    heureDebut: "",
                    heureFin: "",
                    noEmploye: 5926,
                  });
                }}
              />
            </div>
            <div className="border-4 border-black mt-6 rounded-xl">
              <div className="m-6 overscroll-y-auto">
                <div className="grid grid-cols-3 text-center  font-bold mt-3 ">
                  <div>Date</div>
                  <div>Heure de début</div>
                  <div>Heure de fin</div>
                </div>
                <ShiftList
                  Shifts={shifts}
                  errors={errors}
                  register={register}
                />
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-center sm:px-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Commentaire
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Votre commentaire"
                    defaultValue={commentaire}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6 ">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CalendarForm;
