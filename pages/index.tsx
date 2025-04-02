import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import AssetCard from "@/components/AssetCard";
import WalletButton from "@/components/WalletButton";
import useAssetsStore from "@/store/useAssetsStore";
import { Asset } from "@/types";

const Dashboard: React.FC = () => {
  const { assets, fetchAssets } = useAssetsStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    minPrice: 0,
    maxPrice: Infinity,
  });
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  console.log({ filters });
  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);
  console.log({ assets });
  useEffect(() => {
    let updatedAssets = assets;

    // Search filter
    if (searchQuery) {
      updatedAssets = updatedAssets.filter(
        (asset) =>
          asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.tokenId.toString().includes(searchQuery)
      );
    }

    // Type filter
    if (filters.type) {
      updatedAssets = updatedAssets.filter(
        (asset) => asset.type === filters.type
      );
    }

    // Price range filter
    updatedAssets = updatedAssets.filter(
      (asset) =>
        asset.value >= filters.minPrice && asset.value <= filters.maxPrice
    );

    setFilteredAssets(updatedAssets);
  }, [searchQuery, filters, assets]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tokenized Asset Explorer</h1>
        <WalletButton />
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar onSearch={setSearchQuery} />
        <Filters onFilterChange={setFilters} filtersValue={filters}/>
      </div>

      {/* Asset List */}
      {filteredAssets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <AssetCard key={asset.tokenId} asset={asset} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-6">No assets found.</p>
      )}
    </div>
  );
};

export default Dashboard;
