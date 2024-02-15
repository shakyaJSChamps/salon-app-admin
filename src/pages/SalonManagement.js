import React, { useEffect, useState } from "react";
import Table from "../Component/Table";
import { useSelector, useDispatch } from "react-redux"; 
import { fetchSaloonTypes } from "../features/saloonTypeSlice"; 
import Notify from "../utils/notify";
import { MdOutlineContentCut } from "react-icons/md";
import { useNavigate} from "react-router";
import  {personalDetails,dataEntries} from "../Component/Saloon/Data";
import SaloonDetails from "../Component/Saloon/SaloonDetails";

const SalonManagement = () => {
  const dispatch = useDispatch(); // Initializing useDispatch hook

  useEffect(() => {
    // dispatch(fetchSaloonTypes()); // Dispatching the fetchSaloonTypes async thunk to fetch the saloon types data
  }, [dispatch]); // Ensuring the useEffect hook runs only once when the component mounts

  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);

  // Accessing the saloon types data from the Redux store using the useSelector hook
  const countries = useSelector((state) => state.saloonTypes.data);
  
  console.log("Countries:", countries);
  const handleEdit = (rowData) => {
    console.log("Editing row:", rowData);
    setSelectedRow(null);
  };

  const handleRowClick = (row) => {
    navigate("/salon-management/details");
    setSelectedRow(row);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
  };

  const columns = [
    {
      name: "Country Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>
          <div>{row.name}</div>
          <div>{row.name ? "s@gmail.com" : "" }</div> 
        </div>
      ),
    },
    {
      name: "Active",
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
      cell: (row) => <div onClick={() => handleRowClick(row)}>{row.name ? "9826559328" : ""}</div>,
      sortable: true,
    },
    {
      name: "Location",
      cell: (row) => <div onClick={() => handleRowClick(row)}>{row.name ? "Kushinagar" : ""}</div>,
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
      cell: (row) => <div onClick={() => handleRowClick(row)}>{row.name ? "12/02/2024" : ""}</div>,
      sortable: true,
    },
  ];

  return (
    <>
      {selectedRow ? (
        <SaloonDetails personalDetails={personalDetails} dataEntries={dataEntries} />
      ) : (
        <Table
          icon={<MdOutlineContentCut />}
          title={"Salon Management"}
          countries={countries}
          columns={columns}
          handleRowClick={handleRowClick}
          handleEdit={handleEdit}
          selectedRow={selectedRow}
          handleLinkClick={handleLinkClick}
          handleButtonClick={handleButtonClick}
        /> 
      )}
    </>
  );
};

export default SalonManagement;
