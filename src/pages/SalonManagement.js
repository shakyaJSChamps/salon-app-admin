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
      saloon.email.toLowerCase().includes(searchText.toLowerCase())
    // Add more filters as per your saloon data structure
  );

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div onClick={() => handleRowClick(row)} className="d-flex ">
          <div className="d-flex justify-content-center align-items-center">
            {isValidImageUrl(row.mainGateImageUrl) ? (
              <img
                src={row.mainGateImageUrl}
                alt="Profile"
                style={{ width: 35, height: 35, borderRadius: "50%" }}
              />
            ) : (
              <img
                src={SaloonProfile}
                alt="Profile"
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <div>
            <div className="ps-2" style={{ fontWeight: "500" }}>
              {row.name}
            </div>
            <div className="ps-2" style={{ fontSize: "13px" }}>
              {row.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      
      name: "City",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>{row.city}</div>
      ),
      sortable: true,
    },
    // Add more columns as per your requirement
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
