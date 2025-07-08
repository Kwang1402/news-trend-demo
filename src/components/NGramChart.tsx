
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
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="horizontal"
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 120,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            type="number"
            fontSize={12}
            stroke="#64748b"
          />
          <YAxis 
            type="category"
            dataKey="phrase"
            fontSize={10}
            stroke="#64748b"
            width={110}
            tick={{ fontSize: 10 }}
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
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NGramChart;
