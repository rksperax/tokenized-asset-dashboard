interface FiltersProps {
  onFilterChange: (filters: {
    type: string;
    minPrice: number;
    maxPrice: number;
  }) => void;
  filtersValue: {
    type: string;
    minPrice: number;
    maxPrice: number;
  };
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, filtersValue }) => {
  const handleFilterChange = (
    type: string,
    minPrice: number | "",
    maxPrice: number | ""
  ) => {
    onFilterChange({
      type,
      minPrice: minPrice === "" ? 0 : minPrice,
      maxPrice: maxPrice === "" ? Infinity : maxPrice,
    });
  };
  const { type, minPrice, maxPrice } = filtersValue;

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg shadow-sm">
      {/* Asset Type Filter */}
      <select
        value={type}
        onChange={(e) => {
          handleFilterChange(e.target.value, minPrice, maxPrice);
        }}
        className="border p-2 rounded-md">
        <option value="">All Types</option>
        <option value="Cryptocurrency">Cryptocurrency</option>
        <option value="Smart Contract Platform">Smart Contract Platform</option>
      </select>

      {/* Min Price Filter */}
      <input
        type="number"
        value={minPrice || ""}
        onChange={(e) => {
          const value = e.target.value === "" ? "" : Number(e.target.value);
          handleFilterChange(type, value, maxPrice);
        }}
        placeholder="Min Price"
        className="border p-2 rounded-md w-32"
      />

      {/* Max Price Filter */}
      <input
        type="number"
        value={maxPrice === Number.MAX_VALUE ? "" : maxPrice}
        onChange={(e) => {
          const value = e.target.value === "" ? "" : Number(e.target.value);
          handleFilterChange(type, minPrice, value);
        }}
        placeholder="Max Price"
        className="border p-2 rounded-md w-32"
      />

      {/* Clear Filters Button */}
      <button
        onClick={() => {
          onFilterChange({ type: "", minPrice: 0, maxPrice: Infinity });
        }}
        className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 text-black">
        Reset
      </button>
    </div>
  );
};

export default Filters;
