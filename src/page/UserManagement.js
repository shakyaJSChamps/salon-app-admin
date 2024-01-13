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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);
  console.log("prop");
  const columns = [
    {
      name: "Country Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Country Native Name",
      selector: (row) => row.nativeName,
    },
    {
      name: "Country Captial",
      selector: (row) => row.captial,
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

// ...


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

// import React, { useEffect, useState } from "react";
// import Table from "../Component/Table";
// import axios from "axios";

// const UserManagement = () => {
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001"
//       );
//       setData(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const columns = [
//     {
//       name: "ID",
//       selector: "id",
//       sortable: true,
//     },
//     {
//       name: "Name",
//       selector: "employee_name",
//       sortable: true,
//     },
//     {
//       name: "Image",
//       cell: (row) => (
//         <img
//           src={row.imageUrl}
//           alt="Employee"
//           style={{ width: "50px", height: "50px" }}
//         />
//       ),
//     },
//     {
//       name: "Salary",
//       selector: "employee_salary",
//       sortable: true,
//     },
//     {
//       name: "Age",
//       selector: "employee_age",
//       sortable: true,
//     },
//   ];

//   return <Table title="User Management" columns={columns} data={data} />;
// };

// export default UserManagement;
