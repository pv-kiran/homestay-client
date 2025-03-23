import React, { useState } from 'react';
import { Calendar, Info, ChevronDown } from 'lucide-react';

const CancellationPolicy = ({ cancPolicy }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
            <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h3 className="text-md font-medium text-gray-800">Read Cancellation Policy</h3>
            </div>
            <ChevronDown 
            className={`w-5 h-5 text-gray-500 transition-transform ${
                isOpen ? 'transform rotate-180' : ''
            }`}
            />
        </button>

        <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
        <div className="p-4 pt-2 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-4">Flexible cancellation options to ensure a worry-free booking experience.</p>

          <div className="space-y-2">
            {cancPolicy?.map((policy, index) => (
              <div 
                key={index}
                className="flex items-center justify-between py-2 border-b last:border-0 border-gray-100"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{policy?.hoursBeforeCheckIn} hours before check-in</p>
                  <p className="text-xs text-gray-500">{policy?.policyName}</p>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  policy?.refundPercentage === 100 
                    ? 'bg-green-100 text-green-700'
                    : policy?.refundPercentage === 0
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {policy?.refundPercentage}% refund
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2 mt-3 bg-gray-50 p-2 rounded text-xs text-gray-600">
            <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <p>Refunds are automatically processed to your original payment method.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;