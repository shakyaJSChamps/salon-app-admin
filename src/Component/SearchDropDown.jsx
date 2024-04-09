import React, { useEffect, useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";

const SearchDropDown = (props) => {
  const [searchText, setSearchText] = useState("");
  const [categorySelected, setCategorySelected] = useState(false);
  const [searchIconClicked, setSearchIconClicked] = useState(false);
  const searchInputRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleOptionChange = (prop) => {
    if (prop !== props.value) {
      setCategorySelected(prop);
      props.setOption(prop);
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
          value={props.value}
          onChange={(e) => handleOptionChange(e.target.value)}
          className="dropdown ps-2"
          defaultValue="email"
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
            className="search-bar ps-3"
            value={searchText}
            onChange={handleSearchChange}
          />

          <button
            className="pe-3"
            type="button"
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#a59c9c",
            }}
            onClick={() => props.searchByText(searchText)}
          >
            <IoSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchDropDown;
