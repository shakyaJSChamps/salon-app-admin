import React, { useEffect, useState } from "react";
import Table from "../Component/Table";
import { getCountries } from "../api/account.api";
import Notify from "../utils/notify";
import { MdOutlineAccessibility } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSearchTerm,
  setCountries,
  selectCountriesData,
} from "../features/countriesInfo";
import freeEllips from ".././assets/image/free-ellipse.webp";

const FreelanceManagement = () => {
  const searchText = useSelector(selectSearchTerm);
  // console.log('Search text:', searchText);

  const dispatch = useDispatch();
  const countries = useSelector(selectCountriesData);

  // const [countries, setCountries] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEdit = (rowData) => {
    // console.log("Editing row:", rowData);

    // Close the edit popup
    setShowEditPopup(false);
    setSelectedRow(null);
  };

  const handleRowClick = (row) => {
    setShowEditPopup(true);
    setSelectedRow(row);
  };

  const getCountrie = async () => {
    try {
      const response = await getCountries();
      const filteredCountries = response.data.filter((country) =>
        country.name.toLowerCase().includes(searchText.toLowerCase())
      );

      // Dispatch the setCountries action to update the countries state
      dispatch(setCountries(filteredCountries));

      // console.log("Response ::", response.data);

      // console.log("Response ::", response.data);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  useEffect(() => {
    getCountrie();
  }, [searchText]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      minWidth: "250px",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)} className="d-flex ">
          <div>
            {row.name ? <img src={freeEllips} alt="free-ellips" /> : ""}
          </div>
          <div>
            <div>{row.name}</div>
            <div>{row.name ? "s@gmail.com" : ""}</div>
          </div>
        </div>
      ),
    },
    {
      name: "",
      cell: (row, index) => (
        <span
          className={`rounded-pill ${
            index % 2 === 0 ? "blocked-pill" : "active-pill"
          }`}
        >
          {index % 2 === 0 ? "Blocked" : "Active"}
        </span>
      ),
      //  row.capital ? (
      //     <span className="rounded-pill active-pill"> Active</span>
      //   ) : (
      //     <span className="rounded-pill blocked-pill"> Blocked</span>
      //   ),
    },
    {
      name: "Mobile Num",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>
          {row.name ? "9826559328" : ""}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Location",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>
          {row.name ? "Kushinagar" : ""}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Appointment",
      cell: (row) => (
        <div>
          <span
            className={`appointment ${
              row.name ? "appointment-completed" : "appointment-canceled"
            }`}
          >
            Completed
          </span>
          <br />
          <span
            className={`appointment ${
              !row.name ? "appointment-canceled" : "appointment-canceled"
            }`}
          >
            Canceled
          </span>
        </div>
      ),
    },
    {
      name: "Joined On",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>
          {row.name ? "12/02/2024" : ""}
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <Table
      icon={<MdOutlineAccessibility />}
      title={"Freelance Management"}
      countries={countries}
      columns={columns}
      handleRowClick={handleRowClick}
      showEditPopup={showEditPopup}
      setShowEditPopup={setShowEditPopup}
      handleEdit={handleEdit}
      selectedRow={selectedRow}
    />
  );
};

export default FreelanceManagement;
