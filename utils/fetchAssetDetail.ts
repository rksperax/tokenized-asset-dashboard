const API_URL = (id: string) => `https://api.coingecko.com/api/v3/coins/${id}`; // Example API

export const fetchAssetDetail = async (id: string) => {
  try {
    const response = await fetch(API_URL(id));

    // if (!response.ok) {
    //   throw new Error(`API Error: ${response.statusText}`);
    // }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("API error", error);
    throw new Error("429 (Too Many Requests)");
  }
};

export default fetchAssetDetail;
