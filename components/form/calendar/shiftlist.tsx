import ShiftInfo from "./shiftinfo";

import Calendar from "react-calendar";

interface ShiftListProps {
  Shifts: any[];
  errors: any;
  register: any;
}

const ShiftList: React.FC<ShiftListProps> = ({ Shifts, errors, register }) => {
  return (
    <div className="flex flex-col">
      {Shifts.map((shift) => {
        return (
          //TODO delete a shift
          <ShiftInfo
            key={shift.dateDispo}
            date={shift.dateDispo}
            heureDebut={shift.heureDebut}
            heureFin={shift.heureFin}
            errors={errors}
            register={register}
          />
        );
      })}
    </div>
  );
};

export default ShiftList;
