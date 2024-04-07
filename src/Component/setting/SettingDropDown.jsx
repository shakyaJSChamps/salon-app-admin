import React from "react";
import { useNavigate } from "react-router-dom";

const SettingDropDown = ({ options, selectedValue, handleChange }) => {
  const navigate = useNavigate();

  const handleRedirect = (selectedOption) => {
    const selectedRoute = options.find((option) => option.value === selectedOption)?.route;
    if (selectedRoute) {
      navigate(selectedRoute);
    }
  };

  return (
    <select
      value={selectedValue}
      onChange={(e) => {
        handleChange(e);
        handleRedirect(e.target.value);
      }}
      style={{ border: "none", outline: "none" }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SettingDropDown;
