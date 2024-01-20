import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineUser } from "react-icons/ai";
import SearchDropDown from "../Component/SearchDropDown";

const UserManagement = () => {
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
      console.log("Response ::", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);
  // console.log("prop");
  const columns = [
    {
      name: "Country Name",
      selector: (row) => row.name,
      sortable: true,
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
      name: "Country Native Name",
      selector: (row) => row.nativeName,
    },
    {
      name: "Country Captial",
      selector: (row) => row.capital,
    },
    {
      name: "Appointment",
      cell: (row) => (
        <div>
          <span
            className={`appointment ${
              row.capital ? "appointment-completed" : "appointment-canceled"
            }`}
          >
            Completed
          </span>
          <br />
          <span
            className={`appointment ${
              !row.capital ? "appointment-canceled" : "appointment-canceled"
            }`}
          >
            Canceled
          </span>
        </div>
      ),
    },
    {
      name: "Country Flag",
      selector: (row) => (
        <img width={50} height={50} src={row.flag} alt="icon" />
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="btn btn-primary"
          onClick={() => alert(row.alpha2Code)}
        >
          Edit
        </button>
      ),
    },
  ];

  const CustomTitle = () => (
    <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <AiOutlineUser size={20} style={{ marginRight: 10 }} />
        User Management
      </div>
      <div className="d-flex align-items-center">
        <SearchDropDown />
      </div>
    </div>
  );

  return (
    <div className="mt-5">
      <DataTable
        title={<CustomTitle />}
        columns={columns}
        data={countries}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        highlightOnHover
      />
    </div>
  );
};

export default UserManagement;
