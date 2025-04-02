const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'; // Example API

export const fetchAssets = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform API response to match our Asset type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.slice(0, 10).map((item: any) => ({
      tokenId: item.id,
      name: item.name,
      type: 'Cryptocurrency', // Example asset type
      value: item.current_price,
      image: item.image,
    }));
  } catch (error) {
    console.error('Error fetching assets:', error);
    return []; // Return an empty array in case of error
  }
};

export default fetchAssets;
