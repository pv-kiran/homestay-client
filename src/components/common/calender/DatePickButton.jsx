import React from 'react';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';

const DatePickButton = ({
  date, handleChosen, error, disabled
}) => (
  <button
    type="button"
    className={`flex items-center gap-3 px-3 py-2 w-full rounded-md bg-base-white border ${error?.message ? 'border-red-300' : 'border-gray-200'} ${disabled ? ' bg-gray-100' : ''}`}
    disabled={disabled}
    onClick={() => handleChosen()}
  >
    <CalendarDays size={20} strokeWidth={1} />
    <h3 className={`${date ? 'text-black' : 'text-neutralGray-grey_500'}`}>
      {
        date ? format(date, 'dd/MM/yyyy') : 'Select date'
      }
    </h3>
  </button>
  
);

export default DatePickButton;