import { React, useState, useEffect } from 'react';
import {
  format, startOfMonth, endOfMonth,
  addDays, addMonths, subMonths, isSameDay, startOfWeek, endOfWeek, isSameMonth, isValid
} from 'date-fns';
import { MoveRight } from 'lucide-react';
import DatePickButton from './DatePickButton';
import { Button } from '../Button';

const CalenderView = ({
  selectedDate,
  onDateSelect,
  error,
  disabled
}) => {
  const dayNames = [
    { id: 'Sunday', label: 'S' },
    { id: 'Monday', label: 'M' },
    { id: 'Tuesday', label: 'T' },
    { id: 'Wednesday', label: 'W' },
    { id: 'Thursday', label: 'T' },
    { id: 'Friday', label: 'F' },
    { id: 'Saturday', label: 'S' }
  ];

  const [isSelecting, setIsSelecting] = useState(false);

  // Parse the selectedDate properly based on its format
  const parseSelectedDate = () => {
    try {
      // If it's already a Date object
      if (selectedDate instanceof Date) {
        return isValid(selectedDate) ? selectedDate : new Date();
      }

      // If it's not a string or is empty
      if (typeof selectedDate !== 'string' || !selectedDate) {
        return new Date();
      }

      // Now we know it's a string and can safely call trim()
      if (selectedDate.trim() === "") return new Date();

      // Check if date is in dd-MM-yyyy format
      if (selectedDate.includes("-")) {
        const [day, month, year] = selectedDate.split("-").map(Number);
        const parsedDate = new Date(year, month - 1, day);
        return !isNaN(parsedDate.getTime()) ? parsedDate : new Date();
      }
      // Check if date is in dd/MM/yyyy format
      else if (selectedDate.includes("/")) {
        const [day, month, year] = selectedDate.split("/").map(Number);
        const parsedDate = new Date(year, month - 1, day);
        return !isNaN(parsedDate.getTime()) ? parsedDate : new Date();
      }

      return new Date();
    } catch (error) {
      return new Date();
    }
  };

  const [currentMonth, setCurrentMonth] = useState(parseSelectedDate);

  // Ensure we have a valid date
  const validatedCurrentMonth = isValid(currentMonth) ? currentMonth : new Date();

  const start = startOfMonth(validatedCurrentMonth);
  const month = format(start, "MMMM yyyy");

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(validatedCurrentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(validatedCurrentMonth, 1));
  };

  const showCalender = () => {
    setIsSelecting(true);
  };

  const handleChosen = () => {
    setIsSelecting((prev) => !prev);
  };

  const handleSelect = (day) => {
    onDateSelect(day);
  };

  const generateCalendar = () => {
    const startDate = startOfWeek(startOfMonth(validatedCurrentMonth));
    const endDate = endOfWeek(endOfMonth(validatedCurrentMonth));
    const days = [];
    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  };

  const calendarDays = generateCalendar();

  // Update currentMonth when selectedDate changes
  useEffect(() => {
    setCurrentMonth(parseSelectedDate());
  }, [selectedDate]);

  // Function to check if a day is selected
  const isDaySelected = (day) => {
    if (!selectedDate) return false;

    if (selectedDate instanceof Date) {
      return isSameDay(day, selectedDate);
    }

    // For string format
    try {
      return format(day, 'dd/MM/yyyy') === selectedDate;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="relative">
      <DatePickButton
        date={selectedDate}
        handleChosen={showCalender}
        error={error}
        disabled={disabled}
      />
      {
        isSelecting ? (
          <div className="absolute bg-base-white p-3 mt-1 rounded-md bg-white border border-gray-200 w-full">
            <div className="flex justify-between items-center my-2">
              <button type="button" onClick={handlePreviousMonth} className="border_1 px-2 py-2 rounded-sm" aria-label="arrow">
                <MoveRight size={16} strokeWidth={1.5} className="rotate-180" />
              </button>
              <h1 className="headline_H4">{month}</h1>
              <button type="button" onClick={handleNextMonth} className="border_1 px-2 py-2 rounded-sm" aria-label="arrow">
                <MoveRight size={16} strokeWidth={1.5} />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 p-4 h-[215px]">
              {dayNames.map((day) => (
                <div key={day.id} className="text-center text-xs text-gray-500">
                  {day.label}
                </div>
              ))}
              {calendarDays.map((day) => (
                <div key={day.toISOString()} className="text-center">
                  <button
                    type="button"
                    className={`text-center text-sm w-8 h-8 rounded-lg
                      ${isSameMonth(day, validatedCurrentMonth) ? '' : 'text-gray-400'}
                      ${isDaySelected(day) ? 'bg-turquoise-400 text-primary-primary' : ''}`}
                    disabled={!isSameMonth(day, validatedCurrentMonth)}
                    onClick={() => handleSelect(day)}
                  >
                    {format(day, 'd')}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <Button
                size="sm"
                onClick={() => {
                  onDateSelect('');
                  handleChosen();
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleChosen}
              >
                Apply
              </Button>
            </div>
          </div>
        ) : null
      }
    </div>
  );
};

export default CalenderView;