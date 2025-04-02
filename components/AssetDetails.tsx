import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { AssetDetailProps } from "@/types/assetDetail";

interface AssetDetailsProps {
  asset: AssetDetailProps;
}

const AssetDetails: React.FC<AssetDetailsProps> = ({ asset }) => {
  const router = useRouter();
  const [priceHistory, setPriceHistory] = useState<{ date: string; price: number }[]>([]);
  const [timeframe, setTimeframe] = useState<"1" | "7" | "30" | "365">("7");

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${asset.id}/market_chart?vs_currency=usd&days=${timeframe}`
        );
        const data = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedData = data.prices.map((entry: any) => ({
          date: new Date(entry[0]).toLocaleDateString(),
          price: entry[1],
        }));

        setPriceHistory(formattedData);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchHistoricalData();
  }, [asset.id, timeframe]);

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-xl shadow-lg bg-white">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition duration-200"
      >
        ← Back
      </button>

      {/* Asset Image */}
      <div className="flex justify-center">
        <Image
          src={asset.image?.large || "/images/placeholder.png"}
          alt={asset.name}
          width={300}
          height={300}
          className="rounded-lg shadow-md"
          priority
        />
      </div>

      {/* Asset Info */}
      <h1 className="text-3xl font-bold text-gray-800 mt-4 text-center">{asset.name}</h1>
      <p className="text-gray-500 text-center mt-1">Token ID: {asset.id}</p>
      <p className="text-gray-500 text-center">Type: {asset.categories[0]}</p>
      <p className="text-2xl font-semibold text-green-600 text-center mt-2">
        ${asset.market_data.current_price.usd}
      </p>

      {/* Description */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
        <h2 className="text-lg font-semibold text-gray-700">Description</h2>
        <p className="text-gray-600 mt-2">
          {asset.description["en"] || "No description available."}
        </p>
      </div>

      {/* Price Trend Chart with Filter */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700">Price Trends</h2>

        {/* Timeframe Filter Buttons */}
        <div className="flex justify-center mt-2 space-x-3">
          {[
            { label: "1D", value: "1" },
            { label: "7D", value: "7" },
            { label: "1M", value: "30" },
            { label: "1Y", value: "365" },
          ].map((option) => (
            <button
              key={option.value}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition duration-200 shadow-md ${
                timeframe === option.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setTimeframe(option.value as "1" | "7" | "30" | "365")}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Chart */}
        {priceHistory.length > 0 ? (
          <ResponsiveContainer width="100%" height={300} className="mt-4">
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#8884d8" />
              <YAxis stroke="#8884d8" tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value) => `$${value}`} />
              <Line type="monotone" dataKey="price" stroke="#82ca9d" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center mt-4">
            <p className="text-gray-500">Loading chart...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetDetails;
