import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value); // Pass the search query to the parent component
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by name or token ID..."
        className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search assets"
      />
      {query && (
        <button
          onClick={() => {
            setQuery('');
            onSearch('');
          }}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
