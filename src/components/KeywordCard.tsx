import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface KeywordCardProps {
  keyword: {
    id: number;
    word: string;
    count: number;
    trend: 'up' | 'down' | 'stable';
  };
  onClick: () => void;
  isSelected: boolean;
}

const KeywordCard: React.FC<KeywordCardProps> = ({ keyword, onClick, isSelected }) => {
  return (
    <Card 
      className={`
        cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg
        bg-white/80 backdrop-blur-sm
        ${isSelected ? 'ring-2 ring-purple-500 shadow-lg scale-105' : ''}
      `}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-center">
          <h3 className="font-semibold text-gray-800 truncate text-center">{keyword.word}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeywordCard;
