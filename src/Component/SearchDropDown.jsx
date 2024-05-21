import React, { useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";

const SearchDropDown = ({
  disabled = false,
  value = "email",
  setOption = () => {},
  searchByText = () => {},
}) => {
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleOptionChange = (prop) => {
    if (prop !== value) {
      setOption(prop);
    }
  };

  const data = [
    { text: "Email", value: "email" },
    { text: "Mobile Number", value: "phone_number" },
  ];

  return (
    <div className="dropdown-container">
      <div className="search-container">
        <select
          value={value}
          onChange={(e) => handleOptionChange(e.target.value)}
          className="dropdown ps-2"
          disabled={disabled}
        >
          {data.map((item) => (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>

        <div className="vertical-line"></div>
        <form>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search"
            className="search-bar"
            value={searchText}
            onChange={handleSearchChange}
            disabled={disabled}
            style={{
              cursor: disabled ? "not-allowed" : "auto",
            }}
          />

          <button
            type="button"
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: disabled ? "not-allowed" : "auto",
            }}
            onClick={() => searchByText(searchText)}
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
