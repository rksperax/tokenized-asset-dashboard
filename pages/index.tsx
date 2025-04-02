import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import AssetCard from "@/components/AssetCard";
import WalletButton from "@/components/WalletButton";
import useAssetsStore from "@/store/useAssetsStore";
import { Asset } from "@/types";

const ITEMS_PER_PAGE = 12; // Adjust as needed

const Dashboard: React.FC = () => {
  const { assets, fetchAssets, error } = useAssetsStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    minPrice: 0,
    maxPrice: Number.MAX_VALUE, // Fixed Infinity issue
  });

  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (!assets.length) {
      fetchAssets();
    }
  }, [fetchAssets, assets]);

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
    setCurrentPage(1); // Reset to first page after filtering
  }, [searchQuery, filters, assets]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAssets.length / ITEMS_PER_PAGE);
  const displayedAssets = filteredAssets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!assets.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-500">
        <p>Loading assets...</p>
      </div>
    );
  }

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
        <Filters onFilterChange={setFilters} filtersValue={filters} />
      </div>

      {/* Asset List */}
      {displayedAssets.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedAssets.map((asset) => (
              <AssetCard key={asset.tokenId} asset={asset} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-md ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}>
              Previous
            </button>

            <span className="font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded-md ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}>
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center mt-6">No assets found.</p>
      )}
    </div>
  );
};

export default Dashboard;
