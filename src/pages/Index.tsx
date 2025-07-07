import React, { useState } from 'react';
import { Search, TrendingUp, Clock, FileText, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import KeywordCard from '@/components/KeywordCard';
import ArticlesList from '@/components/ArticlesList';
import NGramChart from '@/components/NGramChart';
import SearchResults from '@/components/SearchResults';

// Mock data matching the provided JSON structure
const mockData = {
  number_of_articles: 274,
  "n-grams": {
    "tỷ đồng": 1.6051881864434925,
    "tp hcm": 1.411935905661814,
    "vụ cháy": 1.401159489281045,
    "ban chỉ_đạo": 1.1548017768799819,
    "triệu usd": 1.118497000154886,
    "trúc linh": 1.0673810834924031,
    "giá vàng": 1.0499132135403921,
    "bạch mai": 0.9546361355541184,
    "triệu đồng": 0.9274934757913568,
    "club world_cup": 0.9205346395073283,
    "elon musk": 0.9156956375138791,
    "bệnh_viện bạch mai": 0.9084440644789192,
    "fifa club": 0.8182530128954029,
    "hà trúc linh": 0.8055706290508702,
    "phạm minh": 0.7841591373580945,
    "fifa club world_cup": 0.7841591373580945
  },
  keywords: [
    "FIFA Club World Cup",
    "Thủ tướng Phạm Minh",
    "Bệnh viện Bạch Mai",
    "Phòng chống tham nhũng, lãng phí, tiêu cực",
    "Elon Musk",
    "Lũ quét Texas",
    "Prudential Việt Nam",
    "Đại học Bách Khoa",
    "Giá vàng",
    "Hà Trúc Linh",
    "Khoa học Công nghệ",
    "Đổi mới Sáng tạo",
    "Jurassic World",
    "Sông Guadalupe",
    "Phương Oanh",
    "Bệnh viện Việt Đức",
    "Mai Việt Đức",
    "Quang Liêm",
    "Võ Chí Công",
    "Hạt Kerr"
  ]
};

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
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Transform ALL n-grams data for the chart (top 15 for better visualization)
  const topNGrams = Object.entries(mockData["n-grams"])
    .map(([phrase, score]) => ({ phrase, score: Number(score.toFixed(2)) }))
    .slice(0, 15);

  // Transform ALL keywords data for the cards
  const keywordsWithMetadata = mockData.keywords.map((keyword, index) => ({
    id: index + 1,
    word: keyword,
    count: Math.floor(Math.random() * 100) + 50,
    trend: (["up", "down", "stable"] as const)[Math.floor(Math.random() * 3)]
  }));

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
                  <div className="text-3xl font-bold text-purple-800">{mockData.number_of_articles.toLocaleString()}</div>
                  <p className="text-xs text-gray-600 mt-1">Analyzed in last 24h</p>
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
                articles={mockArticles[selectedKeyword] || []}
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
