import React from 'react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  height?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children, height = 'h-80' }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className={`${height} w-full`}>
        {children}
      </div>
    </div>
  );
};

export default ChartCard;