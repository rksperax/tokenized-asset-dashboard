const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"; // Example API

export const fetchAssets = async () => {
  try {
    const response = await fetch(API_URL);

    const data = await response.json();

    // Transform API response to match our Asset type

    return data.map((item: any) => ({
      tokenId: item.id,
      name: item.name,
      type: "Cryptocurrency", // Example asset type
      value: item.current_price,
      image: item.image,
    }));
  } catch (error) {
    console.log("API error", error);
    throw new Error("429 (Too Many Requests)");
  }
};

export default fetchAssets;
