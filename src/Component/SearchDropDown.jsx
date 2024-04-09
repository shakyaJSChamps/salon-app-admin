import React, { useEffect, useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";

const SearchDropDown = (props) => {
  const [search, setSearch] = useState("");
  const [categorySelected, setCategorySelected] = useState(false);
  const [searchIconClicked, setSearchIconClicked] = useState(false);
  const searchInputRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (searchIconClicked && search.trim() !== "") {
      props.getSearchText(search);
      setSearch(""); // Clear the search input
    }
  }, [searchIconClicked]);

  const handleOptionChange = (selectedOption) => {
    if (selectedOption !== props.value) {
      setSearch("");
      setCategorySelected(selectedOption !== "");
    }
  };

  const data = [
    { text: "Email", value: "email" },
    { text: "Mobile Number", value: "phone_number" },
  ];

  const handleSearchClick = (e) => {
    e.preventDefault();
    // Always set searchIconClicked to true when the search icon is clicked
    setSearchIconClicked(true);
    // If there is a search query and the selected option is "Mobile Number"
    if (props.value === "phone_number" && search.trim() !== "") {
      // Trigger the search with the current search query
      props.getSearchText(search);
      // Clear the search input
      setSearch("");
    }
    // Update the state to show the search results
    setShowResults(true);
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
        <form>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search"
            className="search-bar ps-3"
            value={search}
            onChange={handleSearchChange}
            style={{
              cursor:
                searchIconClicked || props.value === "phone_number"
                  ? "text"
                  : "pointer",
            }}
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
            onClick={(e) => handleSearchClick(e)}
          >
            <IoSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchDropDown;
