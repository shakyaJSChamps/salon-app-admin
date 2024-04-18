import React from "react";
import SearchDropDown from "./SearchDropDown";

const Sales = () => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex justify-content-start">
        <SearchDropDown />
      </div>
      <button type="submit" className="add-sales rounded-pill px-3">Add sales person</button>
    </div>
  );
};

export default Sales;
