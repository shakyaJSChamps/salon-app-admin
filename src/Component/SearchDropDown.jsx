import React, { useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";

const SearchDropDown = ({
  disabled = false,
  initialOption = "email",
  setOption = () => {},
  searchByText = () => {},
  options = [],
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState(initialOption);
  const searchInputRef = useRef(null);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    if (selectedOption === "phoneNumber") {
      if (value.length <= 10 && /^\d*$/.test(value)) {
        setSearchText(value);
      }
    } else {
      setSearchText(value);
    }
  };

  const handleOptionChange = (newOption) => {
    if (newOption !== selectedOption) {
      setSelectedOption(newOption);
      setOption(newOption);
      setSearchText("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    searchByText(searchText);
  };

  return (
    <div className="dropdown-container">
      <div className="search-container">
        <select
          value={selectedOption}
          onChange={(e) => handleOptionChange(e.target.value)}
          className="dropdown ps-2"
          disabled={disabled}
        >
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>

        <div className="vertical-line"></div>
        <form onSubmit={handleFormSubmit}>
          <input
            ref={searchInputRef}
            type={(selectedOption === "startDate" || selectedOption === "endDate") ? "date" : "text"}
            placeholder="Search"
            className="search-bar"
            value={searchText}
            onChange={handleSearchChange}
            disabled={disabled}
            style={{
              cursor: disabled ? "not-allowed" : "auto",
            }}
            maxLength={selectedOption === "phoneNumber" ? 10 : undefined}
          />

          <button
            type="submit"
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: disabled ? "not-allowed" : "pointer",
            }}
            disabled={disabled}
          >
            <IoSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchDropDown;
