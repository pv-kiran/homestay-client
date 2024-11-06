import React, { useMemo } from 'react';

const DateOfBirth = ({dob, handleDob}) => {
  
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
    w-full px-3 py-2.5 text-gray-700 bg-white border border-gray-300 
    rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200 
    appearance-none cursor-pointer transition-colors duration-200
    hover:border-gray-400
  `;

  const wrapperClass = `
    relative after:content-[''] after:pointer-events-none
    after:absolute after:right-3 after:top-1/2 after:-translate-y-1/4
    after:border-6 after:border-transparent after:border-t-gray-400
    after:transition-colors hover:after:border-t-gray-600
  `;
    
    const handleDateOfBirth = (e) => {
        const { name, value } = e.target;
        handleDob(name, value)
    }

  return (
    <div className="grid grid-cols-4 gap-3">
      <div className=' col-span-2'>
        <label className="block text-sm font-medium text-gray-600 mb-1">Month</label>
        <div className={wrapperClass}>
                  <select 
                      name='month'
            value={dob?.month} 
            onChange={(e) => handleDateOfBirth(e)}
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
                      name='date'
            value={dob?.date} 
            onChange={(e) => handleDateOfBirth(e)}
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
            name='year'
            value={dob?.year} 
            onChange={(e) => handleDateOfBirth(e)}
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
    
  );
};

export default DateOfBirth;
