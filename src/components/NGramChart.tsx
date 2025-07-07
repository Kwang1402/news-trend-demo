
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
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="phrase" 
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={12}
            stroke="#64748b"
          />
          <YAxis 
            fontSize={12}
            stroke="#64748b"
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
            fill="url(#gradient)"
            radius={[4, 4, 0, 0]}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.9}/>
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NGramChart;
