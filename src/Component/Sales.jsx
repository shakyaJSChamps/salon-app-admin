import React, { useState } from "react";
import SearchDropDown from "./SearchDropDown";
import MyVerticallyCenteredModal from "./modal/ModalPop";
import { useNavigate } from "react-router-dom";
import CustomTitle from "./CustomTitle";

const Sales = ({  setOption, searchByText, options }) => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const handleAddSalesClick = () => {
    setShowForm(true);
    navigate("creates");
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-start">
          {/* <SearchDropDown disabled={true}  /> */}
          <CustomTitle
            options={options}
            setOption={setOption}
            searchByText={searchByText}
          />
        </div>
        <button
          type="button"
          className="add-sales rounded-pill px-3 p-2"
          onClick={handleAddSalesClick}
        >
          Add sales person
        </button>
      </div>
      <MyVerticallyCenteredModal
        show={showForm}
        onHide={handleCloseForm}
        showForm="sales"
      />
    </div>
  );
};

export default Sales;
