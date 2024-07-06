import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTitle from "./CustomTitle";
import MyVerticallyCenteredModal from "./modal/ModalPop";

const AddButton = ({ setOption, searchByText, options, buttonText,allowEdit }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState("");
  console.log("Modal popup", allowEdit)

  const handleButtonClick = () => {
    if (buttonText === "Add sub admin") {
      setShowForm("subAdmin");
      setShowModal(true);
    } else {
      navigate("addSalesPerson");
    }
  };


  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <CustomTitle
              options={options}
              setOption={setOption}
              searchByText={searchByText}
            />
          </div>
          <button
            type="button"
            className="add-sales rounded-pill px-3"
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>
        </div>

        <MyVerticallyCenteredModal
          show={showModal}
          onHide={handleCloseModal}
          showForm={showForm}
          allowEdit={allowEdit}
        />
      </div>
    </>
  );
};

export default AddButton;
