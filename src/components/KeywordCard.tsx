
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
  const getTrendIcon = () => {
    switch (keyword.trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (keyword.trend) {
      case 'up':
        return 'border-green-200 hover:border-green-300';
      case 'down':
        return 'border-red-200 hover:border-red-300';
      case 'stable':
        return 'border-gray-200 hover:border-gray-300';
      default:
        return 'border-purple-200 hover:border-purple-300';
    }
  };

  return (
    <Card 
      className={`
        cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg
        bg-white/80 backdrop-blur-sm ${getTrendColor()}
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
