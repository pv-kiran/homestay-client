import React, { useState, useMemo } from 'react';

const DateOfBirth = () => {
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);
  const months = useMemo(() => [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ], []);
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => currentYear - i);
  }, []);

  const selectClass = `
    w-full px-3 py-2.5 text-gray-700 bg-white border border-turquoise-300 
    rounded-lg focus:border-turquoise-500 focus:ring-2 focus:ring-turquoise-200 
    appearance-none cursor-pointer transition-colors duration-200
    hover:border-turquoise-400
  `;

  const wrapperClass = `
    relative after:content-[''] after:pointer-events-none
    after:absolute after:right-3 after:top-1/2 after:-translate-y-1/4
    after:border-6 after:border-transparent after:border-t-gray-400
    after:transition-colors hover:after:border-t-gray-600
  `;

    return (
      <>
    <div className="grid grid-cols-3 gap-3">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Month</label>
        <div className={wrapperClass}>
          <select 
            value={month} 
            onChange={(e) => setMonth(e.target.value)}
            className={selectClass}
          >
            <option value="" disabled>Month</option>
            {months.map((month, index) => (
              <option key={month} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Day</label>
        <div className={wrapperClass}>
          <select 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            className={selectClass}
          >
            <option value="" disabled>Day</option>
            {days.map(day => (
              <option key={day} value={day}>
                {String(day).padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Year</label>
        <div className={wrapperClass}>
          <select 
            value={year} 
            onChange={(e) => setYear(e.target.value)}
            className={selectClass}
          >
            <option value="" disabled>Year</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      </div>
      <p className="mt-4 text-sm text-gray-500">
          Selected: {month && date && year ? `${months[parseInt(month) - 1]} ${date}, ${year}` : ''}
            </p>
            </>
  );
};

export default DateOfBirth;
