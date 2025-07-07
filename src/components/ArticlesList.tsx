
import React from 'react';
import { ExternalLink, Clock, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Article {
  id: number;
  url: string;
  title: string;
  publishedTime: string;
}

interface ArticlesListProps {
  keyword: string;
  articles: Article[];
  onClose: () => void;
}

const ArticlesList: React.FC<ArticlesListProps> = ({ keyword, articles, onClose }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-purple-200 animate-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Articles containing "{keyword}"
          </CardTitle>
          <Badge variant="outline" className="mt-2 border-purple-300 text-purple-700">
            {articles.length} articles found
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="hover:bg-red-100 hover:text-red-600"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {articles.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No articles found for this keyword.</p>
        ) : (
          articles.map((article) => (
            <div
              key={article.id}
              className="p-4 rounded-lg border border-gray-200 bg-white/50 hover:bg-white/80 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(article.publishedTime)}</span>
                    </div>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Read article</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ArticlesList;
