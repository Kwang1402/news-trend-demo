
import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Clock, FileText, BarChart3, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import KeywordCard from '@/components/KeywordCard';
import ArticlesList from '@/components/ArticlesList';
import NGramChart from '@/components/NGramChart';
import SearchResults from '@/components/SearchResults';
import { fetchLatestNewsData, searchArticles } from '@/services/dataService';

// Mock articles data for demonstration
const mockArticles: { [key: string]: any[] } = {
  "FIFA Club World Cup": [
    {
      id: 1,
      url: "https://example.com/fifa-club-world-cup",
      title: "FIFA Club World Cup 2024: Exciting matches ahead",
      publishedTime: "2024-07-07T08:30:00Z"
    }
  ],
  "Elon Musk": [
    {
      id: 2,
      url: "https://example.com/elon-musk-news",
      title: "Elon Musk announces new technology breakthrough",
      publishedTime: "2024-07-07T06:15:00Z"
    }
  ],
  "Giá vàng": [
    {
      id: 3,
      url: "https://example.com/gold-price",
      title: "Giá vàng tăng mạnh trong phiên giao dịch hôm nay",
      publishedTime: "2024-07-07T10:20:00Z"
    }
  ]
};

const Index = () => {
  const [newsData, setNewsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchLatestNewsData();
        setNewsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        console.error('Error loading news data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Transform data for display
  const topNGrams = newsData ? Object.entries(newsData["n-grams"])
    .map(([phrase, score]) => ({ phrase, score: Number((score as number).toFixed(2)) }))
    .sort((a, b) => b.score - a.score) : [];

  const keywordsWithMetadata = newsData ? newsData.keywords.map((keyword: string, index: number) => ({
    id: index + 1,
    word: keyword,
    count: Math.floor(Math.random() * 100) + 50,
    trend: (["up", "down", "stable"] as const)[Math.floor(Math.random() * 3)]
  })) : [];

  const handleKeywordClick = async (keyword: string) => {
    setSelectedKeyword(keyword);
    try {
      const articles = await searchArticles(keyword);
      // Update mockArticles with real data for the selected keyword
      setSearchResults(articles);
    } catch (error) {
      console.error('Failed to fetch articles for keyword:', error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const results = await searchArticles(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
      }
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="bg-white/70 backdrop-blur-sm border-purple-200 p-8">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <p className="text-gray-600">Loading latest news data...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="bg-white/70 backdrop-blur-sm border-red-200 max-w-md w-full">
          <CardContent className="p-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="mb-4">
                Failed to load news data: {error}
              </AlertDescription>
            </Alert>
            <Button onClick={handleRetry} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                  Metis Trending
                </h1>
                <p className="text-sm text-gray-600">News Keyword Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Live Data</span>
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
                  <div className="text-3xl font-bold text-purple-800">{newsData?.number_of_articles?.toLocaleString() || 0}</div>
                  <p className="text-xs text-gray-600 mt-1">Analyzed in dataset</p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Top Keywords</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-800">{keywordsWithMetadata.length}</div>
                  <p className="text-xs text-gray-600 mt-1">Trending topics</p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-indigo-200 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Peak Score</CardTitle>
                  <BarChart3 className="h-4 w-4 text-indigo-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-800">{topNGrams[0]?.score || 0}</div>
                  <p className="text-xs text-gray-600 mt-1">Highest n-gram score</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* N-grams Chart */}
              <Card className="bg-white/70 backdrop-blur-sm border-purple-200">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">Top N-grams</CardTitle>
                  <CardDescription>Most frequently occurring phrase combinations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <NGramChart data={topNGrams} />
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Keywords Grid */}
              <Card className="bg-white/70 backdrop-blur-sm border-purple-200">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    Trending Keywords ({keywordsWithMetadata.length})
                  </CardTitle>
                  <CardDescription>Click on any keyword to view related articles</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-4">
                      {keywordsWithMetadata.map((keyword) => (
                        <KeywordCard
                          key={keyword.id}
                          keyword={keyword}
                          onClick={() => handleKeywordClick(keyword.word)}
                          isSelected={selectedKeyword === keyword.word}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Articles List */}
            {selectedKeyword && (
              <ArticlesList
                keyword={selectedKeyword}
                articles={searchResults.map((article, index) => ({
                  id: index + 1,
                  url: article.url,
                  title: article.title,
                  publishedTime: article.time
                }))}
                onClose={() => {
                  setSelectedKeyword(null);
                  setSearchResults([]);
                }}
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
