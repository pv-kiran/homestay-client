import React from 'react';
import { format, isValid, parse } from 'date-fns';
import { CalendarDays } from 'lucide-react';

const DatePickButton = ({
  date,
  handleChosen,
  error,
  disabled
}) => {
  // Function to safely format the date
  const getFormattedDate = () => {
    try {
      // If date is already a Date object
      if (date instanceof Date) {
        return isValid(date) ? format(date, 'dd/MM/yyyy') : 'Select date';
      }

      // If date is a string in dd/MM/yyyy format
      if (typeof date === 'string' && date.includes('/')) {
        const parsedDate = parse(date, 'dd/MM/yyyy', new Date());
        return isValid(parsedDate) ? format(parsedDate, 'dd/MM/yyyy') : date;
      }

      // If date is a string in dd-MM-yyyy format
      if (typeof date === 'string' && date.includes('-')) {
        const [day, month, year] = date.split('-').map(Number);
        const parsedDate = new Date(year, month - 1, day);
        return isValid(parsedDate) ? format(parsedDate, 'dd/MM/yyyy') : date;
      }

      // If date is a non-empty string, just display it
      if (typeof date === 'string' && date.trim() !== '') {
        return date;
      }

      return 'Select date';
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Select date';
    }
  };

  return (
    <button
      type="button"
      className={`flex items-center gap-3 px-3 py-2 w-full rounded-md bg-base-white border ${error?.message ? 'border-red-300' : 'border-gray-200'
        } ${disabled ? ' bg-gray-100' : ''}`}
      disabled={disabled}
      onClick={() => handleChosen()}
    >
      <CalendarDays size={20} strokeWidth={1} />
      <h3 className={`${date ? 'text-black' : 'text-neutralGray-grey_500'}`}>
        {getFormattedDate()}
      </h3>
    </button>
  );
};

export default DatePickButton;