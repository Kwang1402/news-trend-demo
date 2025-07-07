
import React, { useState } from 'react';
import { Search, TrendingUp, Clock, FileText, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import KeywordCard from '@/components/KeywordCard';
import ArticlesList from '@/components/ArticlesList';
import NGramChart from '@/components/NGramChart';
import SearchResults from '@/components/SearchResults';

// Mock data - in a real app, this would come from an API
const mockData = {
  totalArticles: 1247,
  topNGrams: [
    { phrase: "artificial intelligence", score: 95 },
    { phrase: "climate change", score: 87 },
    { phrase: "economic growth", score: 82 },
    { phrase: "social media", score: 78 },
    { phrase: "renewable energy", score: 75 },
    { phrase: "healthcare system", score: 72 },
    { phrase: "data privacy", score: 68 },
    { phrase: "digital transformation", score: 65 }
  ],
  keywords: [
    { id: 1, word: "AI", count: 156, trend: "up" },
    { id: 2, word: "Climate", count: 134, trend: "up" },
    { id: 3, word: "Economy", count: 128, trend: "down" },
    { id: 4, word: "Technology", count: 112, trend: "up" },
    { id: 5, word: "Health", count: 98, trend: "stable" },
    { id: 6, word: "Energy", count: 89, trend: "up" },
    { id: 7, word: "Politics", count: 76, trend: "down" },
    { id: 8, word: "Education", count: 67, trend: "up" }
  ],
  articles: {
    "AI": [
      {
        id: 1,
        url: "https://example.com/ai-breakthrough",
        title: "Major AI Breakthrough in Medical Diagnosis",
        publishedTime: "2024-07-07T08:30:00Z"
      },
      {
        id: 2,
        url: "https://example.com/ai-ethics",
        title: "New AI Ethics Guidelines Released by Tech Giants",
        publishedTime: "2024-07-07T06:15:00Z"
      },
      {
        id: 3,
        url: "https://example.com/ai-jobs",
        title: "How AI is Transforming the Job Market",
        publishedTime: "2024-07-06T22:45:00Z"
      }
    ],
    "Climate": [
      {
        id: 4,
        url: "https://example.com/climate-summit",
        title: "Global Climate Summit Reaches Historic Agreement",
        publishedTime: "2024-07-07T10:20:00Z"
      },
      {
        id: 5,
        url: "https://example.com/climate-tech",
        title: "Revolutionary Climate Technology Shows Promise",
        publishedTime: "2024-07-07T07:30:00Z"
      }
    ]
  }
};

const Index = () => {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeyword(keyword);
  };

  const handleSearch = () => {
    // Mock search functionality
    if (searchQuery.trim()) {
      const mockResults = [
        {
          id: 1,
          url: "https://example.com/search-result-1",
          title: `Search result for "${searchQuery}" - Article 1`,
          publishedTime: "2024-07-07T09:15:00Z"
        },
        {
          id: 2,
          url: "https://example.com/search-result-2",
          title: `Latest developments in ${searchQuery}`,
          publishedTime: "2024-07-07T05:30:00Z"
        }
      ];
      setSearchResults(mockResults);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  TrendScope
                </h1>
                <p className="text-sm text-gray-600">News Keyword Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Last 24 hours</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="search" className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Articles</CardTitle>
                  <FileText className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-800">{mockData.totalArticles.toLocaleString()}</div>
                  <p className="text-xs text-gray-600 mt-1">Analyzed in last 24h</p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Top Keywords</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-800">{mockData.keywords.length}</div>
                  <p className="text-xs text-gray-600 mt-1">Trending topics</p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-indigo-200 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Peak Score</CardTitle>
                  <BarChart3 className="h-4 w-4 text-indigo-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-800">{mockData.topNGrams[0].score}</div>
                  <p className="text-xs text-gray-600 mt-1">Highest n-gram score</p>
                </CardContent>
              </Card>
            </div>

            {/* N-grams Chart */}
            <Card className="bg-white/70 backdrop-blur-sm border-purple-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Top N-grams</CardTitle>
                <CardDescription>Most frequently occurring phrase combinations</CardDescription>
              </CardHeader>
              <CardContent>
                <NGramChart data={mockData.topNGrams} />
              </CardContent>
            </Card>

            {/* Keywords Grid */}
            <Card className="bg-white/70 backdrop-blur-sm border-purple-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Trending Keywords</CardTitle>
                <CardDescription>Click on any keyword to view related articles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockData.keywords.map((keyword) => (
                    <KeywordCard
                      key={keyword.id}
                      keyword={keyword}
                      onClick={() => handleKeywordClick(keyword.word)}
                      isSelected={selectedKeyword === keyword.word}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Articles List */}
            {selectedKeyword && (
              <ArticlesList
                keyword={selectedKeyword}
                articles={mockData.articles[selectedKeyword as keyof typeof mockData.articles] || []}
                onClose={() => setSelectedKeyword(null)}
              />
            )}
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-purple-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Search Keywords</CardTitle>
                <CardDescription>Find articles containing specific keywords</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter keyword to search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1 bg-white/50 border-purple-200 focus:border-purple-400"
                  />
                  <Button 
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {searchResults.length > 0 && (
              <SearchResults query={searchQuery} results={searchResults} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
