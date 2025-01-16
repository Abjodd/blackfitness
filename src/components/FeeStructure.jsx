import React from 'react';

const feeData = [
  { type: 'Normal', monthly: '$30', quarterly: '$80', yearly: '$300' },
  { type: 'Couple', monthly: '$50', quarterly: '$140', yearly: '$500' },
  { type: 'With Trainer', monthly: '$70', quarterly: '$200', yearly: '$700' },
];

function FeeStructure() {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-500 w-full text-sm md:text-base text-center bg-black bg-opacity-50 text-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Monthly</th>
            <th className="border border-gray-300 px-4 py-2">Quarterly</th>
            <th className="border border-gray-300 px-4 py-2">Yearly</th>
          </tr>
        </thead>
        <tbody>
          {feeData.map((fee, index) => (
            <tr
              key={fee.type}
              className={`${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}`}
            >
              <td className="border border-gray-300 px-4 py-2">{fee.type}</td>
              <td className="border border-gray-300 px-4 py-2">{fee.monthly}</td>
              <td className="border border-gray-300 px-4 py-2">{fee.quarterly}</td>
              <td className="border border-gray-300 px-4 py-2">{fee.yearly}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FeeStructure;
