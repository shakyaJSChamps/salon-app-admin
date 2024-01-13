import React from "react";
// import "./DropDown.css"; // Import the CSS file for styling

const SearchDropDown = ({ value, onChange }) => {
  const data = [
    { text: "option1", value: "1" },
    { text: "option2", value: "2" },
    { text: "option3", value: "3" },
  ];

  return (
    <div className="dropdown-container">
      <div className="search-container">
        <input type="text" placeholder="Search" className="search-bar" 
        />
        <div className="vertical-line"></div>
        <select value={value} onChange={onChange} className="dropdown">
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
