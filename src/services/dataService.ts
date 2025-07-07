
interface DataEntry {
  name: string;
  path: string;
  created_at: string;
}

interface EntityResponse {
  entity: {
    entries: DataEntry[];
  };
}

interface NewsData {
  number_of_articles: number;
  "n-grams": Record<string, number>;
  keywords: string[];
}

export const fetchLatestNewsData = async (): Promise<NewsData> => {
  try {
    // Step 1: Get all entries
    const entriesResponse = await fetch('https://metis.texcorver.com/dataset-manager/entities/a4d6cf8c-0eaf-4010-a17a-d2d14e39b3d2');
    
    if (!entriesResponse.ok) {
      throw new Error(`Failed to fetch entries: ${entriesResponse.statusText}`);
    }

    const entriesData: EntityResponse = await entriesResponse.json();
    const entries = entriesData.entity.entries;

    if (!entries || entries.length === 0) {
      throw new Error('No data entries found');
    }

    // Step 2: Find the latest entry based on name format (yyyy-mm-dd-hh-mm-ss)
    const latestEntry = entries
      .filter(entry => entry.name.match(/^\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/))
      .sort((a, b) => b.name.localeCompare(a.name))[0];

    if (!latestEntry) {
      throw new Error('No valid data files found');
    }

    console.log('Latest data file:', latestEntry.name);

    // Step 3: Fetch the actual data file content
    const dataResponse = await fetch(`https://metis.texcorver.com/dataset-manager/file?key=${latestEntry.path}`);
    
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
