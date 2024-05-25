import React, { useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";

const SearchDropDown = ({
  disabled = false,
  initialOption = "email",
  setOption = () => {},
  searchByText = () => {},
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState(initialOption);
  const searchInputRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleOptionChange = (newOption) => {
    console.log("Previous value:", selectedOption);
    console.log("New value:", newOption);

    if (newOption !== selectedOption) {
      setSelectedOption(newOption);
      setOption(newOption);
      setSearchText(""); 
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
          value={selectedOption}
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
              cursor: disabled ? "not-allowed" : "pointer",
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
