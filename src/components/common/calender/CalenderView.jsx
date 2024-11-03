import { React, useState, useEffect } from 'react';
import {
  format, startOfMonth, endOfMonth,
  addDays, addMonths, subMonths, isSameDay, startOfWeek, endOfWeek, isSameMonth
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
    {
      id: 'Sunday',
      label: 'S'
    },
    {
      id: 'Monday',
      label: 'M'
    },
    {
      id: 'Tuesday',
      label: 'T'
    },
    {
      id: 'Wednesday',
      label: 'W'
    },
    {
      id: 'Thursday',
      label: 'T'
    },
    {
      id: 'Friday',
      label: 'F'
    },
    {
      id: 'Saturday',
      label: 'S'
    }
  ];

  const [isSelecting, setIsSelecting] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(() => {
    if (selectedDate && selectedDate !== '') {
      return new Date(selectedDate);
    }
    return new Date();
  });

  const start = startOfMonth(currentMonth);

  const month = format(start, 'MMMM yyyy');

  const handlePreviousMonth = () => {
    const newMonth = subMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
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
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));
    const days = [];
    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  };

  const calendarDays = generateCalendar();

  useEffect(() => {
    if (selectedDate && selectedDate !== '') {
      setCurrentMonth(new Date(selectedDate));
    } else {
      setCurrentMonth(new Date());
    }
  }, [selectedDate]);

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
          <div className="absolute bg-base-white p-3 mt-1 rounded-md bg-white  border border-gray-200 w-full">
            <div className="flex justify-between items-center my-2">
              <button type="button" onClick={() => handlePreviousMonth()} className="border_1 px-2 py-2 rounded-sm" aria-label="arrow">
                <MoveRight size={16}  strokeWidth={1.5} className=" rotate-180" />
              </button>
              <h1 className="headline_H4">{ month}</h1>
              <button type="button" onClick={() => handleNextMonth()} className="border_1 px-2 py-2 rounded-sm" aria-label="arrow">
                <MoveRight size={16} strokeWidth={1.5} />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 p-4 h-[215px]">
              {dayNames?.map((day) => (
                <div key={day.id} className="text-center text-xs  text-gray-500">
                  {day.label}
                </div>
              ))}
              {calendarDays.map((day) => (
                <div key={day.toISOString()} className='text-center'>
                    <button
                      type="button"
                      className={`text-center text-sm w-8 h-8 rounded-lg
                      ${isSameMonth(day, currentMonth) ? '' : 'text-gray-400'}
                      ${isSameDay(day, selectedDate) ? 'text-primary-primary' : ''} 
                      ${selectedDate ? format(selectedDate, 'dd/MM/yyyy') === format(day, 'dd/MM/yyyy') ? " bg-turquoise-400" : "" : ""} `}
                      disabled={!isSameMonth(day, currentMonth)}
                      onClick={() => handleSelect(day)}
                    >
                      {format(day, 'd')}
                    </button>
                 </div>
               
              ))}
            </div>
            <div className="flex justify-between">
              <Button
                size='sm'
                onClick={() => {
                  onDateSelect('');
                  handleChosen();
                }}
              >
                Cancel
              </Button>
              <Button
                size='sm'
                onClick={() => handleChosen()}
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