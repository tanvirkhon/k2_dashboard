import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  info: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, info }) => {
  const isPositiveChange = change.startsWith('+');

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 transition duration-300 ease-in-out hover:bg-gray-750">
      <h3 className="text-xl font-semibold mb-3 text-blue-300">{title}</h3>
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className={`text-sm font-medium ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <p className="text-sm text-gray-400 mt-2">{info}</p>
    </div>
  );
};

export default StatCard;