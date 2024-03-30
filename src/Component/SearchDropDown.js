import { options } from "dropzone";
import React, { useEffect, useState } from "react";

const SearchDropDown = (props) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const delay = 500;

    const debounceTimer = setTimeout(() => {
      props.getSearchText(search);
    }, delay);

    
    return () => clearTimeout(debounceTimer);
  }, [search]);

  const handleOptionChange = (selectedOption) => {
    props.onOptionChange(selectedOption);
    setSearch(""); // Search bar ko khali kardo
  };

  const data = [
    { text: "Category", value: "" },
    { text: "email", value: "email" },
    { text: "mobile num", value: "phone_number" },
  ];

  return (
    <div className="dropdown-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          className="search-bar ps-3"
          value={search}
          onChange={handleSearchChange}
        />
        <div className="vertical-line"></div>
        <select
          value={props.value}
          onChange={(e) => handleOptionChange(e.target.value)} // Modified to call handleOptionChange
          className="dropdown ps-2"
        >
          {data.map((item) => (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchDropDown;
