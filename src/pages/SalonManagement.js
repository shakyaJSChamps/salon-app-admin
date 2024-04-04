import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectSearchTerm } from "../features/countriesInfo";
import SaloonProfile from "../assets/image/salons.png"; 
import { isValidImageUrl } from "../constants";
import Notify from "../utils/notify";
import { getSalon } from "../api/account.api"; 
import DataTable from "react-data-table-component";
import CustomTitle from "../Component/CustomTitle";
import TableLoader from "../Component/common-component/TableLoader";

const SaloonManagement = () => {
  const title = "Saloon Management";
  const icon = <AiOutlineUser />;
  const searchText = useSelector(selectSearchTerm);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [saloonsData, setSaloonsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRowClick = (row) => {
    // Handle row click logic here
  };

  const handlePageChange = (page) => {
    getSaloonsData(page, perPage);
  };

  const handlePerPageChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    getSaloonsData(page, newPerPage);
  };

  const getSaloonsData = async (page, perPage) => {
    try {
      setLoading(true);
      const response = await getSalon(`?page=${page}&size=${perPage}&delay=1`);
      setSaloonsData(response.data.data.items);
      setTotalRows(response.data.data.total);
      setLoading(false);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  useEffect(() => {
    getSaloonsData(1, perPage);
  }, [perPage]);

  const filteredSaloonsData = saloonsData.filter(
    (saloon) =>
      saloon.name.toLowerCase().includes(searchText.toLowerCase()) ||
      saloon.city.toLowerCase().includes(searchText.toLowerCase()) ||
      saloon.email.toLowerCase().includes(searchText.toLowerCase()) ||
      saloon.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
      saloon.serviceType.toLowerCase().includes(searchText.toLowerCase())
    // Add more filters as per your saloon data structure
  );

  const columns = [
    {
      name: "Main Gate Image",
      selector: (row) => row.mainGateImageUrl,
      sortable: false,
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>
          {isValidImageUrl(row.mainGateImageUrl) ? (
            <img
              src={row.mainGateImageUrl}
              alt="Main Gate"
              style={{ width: 50, height: 50 }}
            />
          ) : (
            <img
              src={SaloonProfile}
              alt="Default"
              style={{ width: 50, height: 50 }}
            />
          )}
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Company Name",
      selector: (row) => row.companyName,
      sortable: true,
    },
    {
      name: "Service Type",
      selector: (row) => row.serviceType,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>{row.city}</div>
      ),
    },
    
    // Add more data field according to your requirement
  ];
   
  const customStyles = {
    headCells: {
      style: {
        fontSize: "16px",
        textTransform: "uppercase",
      },
    },
    rows: {
      style: {
        fontSize: "16px",
        color: "#6F6B7D",
        fontFamily: "Poppins",
      },
    },
  };

  return (
    <div className="main-table rounded ">
      <DataTable
        title={<CustomTitle icon={icon} title={title} />}
        columns={columns}
        data={filteredSaloonsData}
        pagination
        paginationPerPage={perPage}
        paginationRowsPerPageOptions={[10, 25, 50]}
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerPageChange}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        highlightOnHover
        progressPending={loading}
        progressComponent={<TableLoader />}
        customStyles={customStyles}
      />
    </div>
  );
};

export default SaloonManagement;

