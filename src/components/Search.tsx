import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const Search: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="search-box">
      <AiOutlineSearch />
      <input
        type="text"
        placeholder="Search for a country…"
        value={value}
        onChange={({ target }) => onChange(target.value)}
        className="outline-none"
      />
    </div>
  );
};

export default Search;
