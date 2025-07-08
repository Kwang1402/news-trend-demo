
interface DataEntry {
  name: string;
  path: string;
  created_at: string;
}

interface EntityResponse {
  entity: {
    entries: string[]; // This is actually an array of file path strings
  };
}

interface NewsData {
  number_of_articles: number;
  "n-grams": Record<string, number>;
  keywords: string[];
}

interface SearchResult {
  url: string;
  title: string;
  time: string;
}

interface SearchResponse {
  search_results: SearchResult[];
}

export const searchArticles = async (keyword: string): Promise<SearchResult[]> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_DATASET_MANAGER_URL}/search?keyword=${encodeURIComponent(keyword)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to search articles: ${response.statusText}`);
    }

    const data: SearchResponse = await response.json();
    return data.search_results || [];
  } catch (error) {
    console.error('Error searching articles:', error);
    throw error;
  }
};

export const fetchLatestNewsData = async (): Promise<NewsData> => {
  try {
    // Step 1: Get all entries
    const entriesResponse = await fetch(`${import.meta.env.VITE_DATASET_MANAGER_URL}/entities/a4d6cf8c-0eaf-4010-a17a-d2d14e39b3d2`);
    
    if (!entriesResponse.ok) {
      throw new Error(`Failed to fetch entries: ${entriesResponse.statusText}`);
    }

    const entriesData: EntityResponse = await entriesResponse.json();
    const entries = entriesData.entity.entries;

    if (!entries || entries.length === 0) {
      throw new Error('No data entries found');
    }

    console.log('All entries:', entries);

    // Step 2: Find the latest entry based on filename format (yyyy-mm-dd-hh-mm-ss)
    // Extract the filename from the full path and sort by timestamp
    const latestEntry = entries
      .map(filePath => {
        const filename = filePath.split('/').pop()?.replace('.json', '') || '';
        return { path: filePath, filename };
      })
      .filter(entry => entry.filename.match(/^\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/))
      .sort((a, b) => b.filename.localeCompare(a.filename))[0];

    if (!latestEntry) {
      throw new Error('No valid data files found');
    }

    console.log('Latest data file:', latestEntry.filename, 'Path:', latestEntry.path);

    // Step 3: Fetch the actual data file content
    const dataResponse = await fetch(`${import.meta.env.VITE_DATASET_MANAGER_URL}/files?key=${latestEntry.path}`);
    
    if (!dataResponse.ok) {
      throw new Error(`Failed to fetch data file: ${dataResponse.statusText}`);
    }

    const newsData: NewsData = await dataResponse.json();
    console.log('Fetched news data:', newsData);

    return newsData;
  } catch (error) {
    console.error('Error fetching news data:', error);
    throw error;
  }
};
