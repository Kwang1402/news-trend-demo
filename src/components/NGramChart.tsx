import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface NGramData {
  phrase: string;
  score: number;
}

interface NGramChartProps {
  data: NGramData[];
}

const NGramChart: React.FC<NGramChartProps> = ({ data }) => {
  // Display all items instead of limiting to 10
  const displayData = data;
  
  return (
    <div className="h-80 w-full overflow-auto">
      <ResponsiveContainer width="100%" height={Math.max(320, data.length * 32)}>
        <BarChart
          layout="vertical"
          data={displayData} 
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            type="number"
            fontSize={12}
            stroke="#64748b"
            domain={[0, 'dataMax']}
          />
          <YAxis
            type="category"
            dataKey="phrase"
            fontSize={10}
            stroke="#64748b"
            width={60}
            tick={{ fontSize: 10 }}
            interval={0}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value) => [value, 'Score']}
            labelFormatter={(label) => `Phrase: ${label}`}
          />
          <Bar
            dataKey="score"
            fill="#8b5cf6"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NGramChart;
