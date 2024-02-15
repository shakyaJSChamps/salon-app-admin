// CmsSetting.js
import React, { useState } from "react";
import { Paper } from "@mui/material";
import { MdSettingsSuggest } from "react-icons/md";
import SettingDropDown from "../setting/SettingDropDown";
import { useNavigate } from "react-router-dom";

const CmsSetting = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");

  const options = [
    { label: "Terms & Condition", value: "" },
    { label: "CMS Setting", value: "option1", route: "/setting/cms-setting" },
    { label: "Setting", value: "option2", route: "/setting" },
    { label: "Option 3", value: "option3", route: "/option3" },
  ];

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);

    options.forEach((option) => {
      if (option.value === selectedOption) {
        navigate(option.route);
      }
    });
  };

  return (
    <Paper className="add-service-paper px-3 pb-3 mt-3 rounded" elevation={3}>
      <div className="d-flex align-items-center pt-2">
        <MdSettingsSuggest />
        <p className="ps-1 fw-bold mb-0">CMS Setting</p>
      </div>
      <hr />
      <form>
        <SettingDropDown
          options={options}
          selectedValue={selectedValue}
          handleChange={handleChange}
        />
        <textarea className="form-control input mt-3" rows="15" cols="40"></textarea>
        <div className="d-flex justify-content-center align-items-center mt-4 mb-3">

        <button type="submit" className="button ">
          Update
        </button>
        </div>
      </form>
    </Paper>
  );
};

export default CmsSetting;
