import React, { useEffect, useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";

const SearchDropDown = (props) => {
  const [search, setSearch] = useState("");
  const [categorySelected, setCategorySelected] = useState(false);
  const searchInputRef = useRef(null);

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
    setSearch("");
    setCategorySelected(selectedOption !== "");
    if (selectedOption !== "") {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
  };

  const data = [
    { text: "Email", value: "email" },
    { text: "Mobile Number", value: "phone_number" },
  ];

  const handleSearchClick = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (
      !categorySelected &&
      props.value === "email" &&
      search.trim().toLowerCase() === "email"
    ) {
      return;
    }

    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

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
        <form onSubmit={(e) => handleSearchClick(e)}>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search"
            className="search-bar ps-3"
            value={search}
            onChange={handleSearchChange}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          />

          <button
            className="pe-3"
            type="submit"
            style={{ color: "#a59c9c", cursor: "pointer", border: "none" }}
          >
            <IoSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchDropDown;
