import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

function InputList({ lists, setLists }) {
  // const [lists, setLists] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!lists.includes(inputValue.trim())) {
        setLists([...lists, inputValue.trim()]);
        setInputValue('');
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setLists(lists.filter(skill => skill !== skillToRemove));
  };

  const clearAll = () => {
    setLists([]);
  };

  return (

    <>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter guest policies here..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-turquoise-500 focus:border-transparent outline-none transition-all duration-200"
        />
        <Plus className="absolute right-3 top-1/2 transform -translate-y-1/2 text-turquoise-400" size={20} />
      </div>
      <div className="mt-6">
        {lists.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Hotel policies
            </h2>
            <button
              onClick={clearAll}
              className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              <Trash2 size={18} className="mr-1" />
              Clear All
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {lists.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-turquoise-200 text-turquoise-700 px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-turquoise-400"
            >
              <span className="text-sm font-medium">{skill}</span>
              <button
                onClick={() => removeSkill(skill)}
                className="transition-opacity duration-200"
              >
                <X size={16} className="text-red-500 " />
              </button>
            </div>
          ))}
        </div>

        {/* {lists.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                No lists added yet. Start typing to add some!
                </div>
            )} */}
      </div>
    </>
  );
}

export default InputList;