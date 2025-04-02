const API_URL = (id: string) => `https://api.coingecko.com/api/v3/coins/${id}`; // Example API

export const fetchAssetDetail = async (id: string) => {
  try {
    const response = await fetch(API_URL(id));

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();

    // Transform API response to match our Asset type

    return data;
  } catch (error) {
    console.error("Error fetching assets:", error);
    return null; // Return null in case of error
  }
};

export default fetchAssetDetail;
