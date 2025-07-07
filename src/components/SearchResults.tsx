
import React from 'react';
import { ExternalLink, Clock, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SearchResult {
  id: number;
  url: string;
  title: string;
  publishedTime: string;
}

interface SearchResultsProps {
  query: string;
  results: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results }) => {
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
    <Card className="bg-white/70 backdrop-blur-sm border-blue-200 animate-in slide-in-from-bottom-4 duration-500">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-xl font-semibold text-gray-800">
            Search Results for "{query}"
          </CardTitle>
        </div>
        <Badge variant="outline" className="w-fit border-blue-300 text-blue-700">
          {results.length} results found
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {results.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No articles found for "{query}"</p>
            <p className="text-sm text-gray-500 mt-2">Try different keywords or check your spelling</p>
          </div>
        ) : (
          results.map((result) => (
            <div
              key={result.id}
              className="p-4 rounded-lg border border-gray-200 bg-white/50 hover:bg-white/80 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                    {result.title}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(result.publishedTime)}</span>
                    </div>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 hover:underline"
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

export default SearchResults;
