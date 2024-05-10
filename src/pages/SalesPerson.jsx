import React, { useEffect, useState } from "react";
import Profile from "../assets/image/dummy-profile.jpg";
import { isValidImageUrl } from "../constants";
import Notify from "../utils/notify";
import { getSales } from "../api/account.api";
import DataTable from "react-data-table-component";
import TableLoader from "../Component/common-component/TableLoader";
import Sales from "../Component/Sales";
import UpdateSalesDetails from "../Component/salesManagement/updateSalesDetails/UpdateSalesDetails";


const SalesPerson = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // const [option, setOption] = useState("email");
  const [updatedRowData, setUpdatedRowData] = useState(false);

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerPageChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setPage(page);
  };

  const getSale = async (searchText = "") => {
    let payload = {
      page: page,
      size: perPage,
      email: searchText,
    }
    try {
      setLoading(true);
      const response = await getSales(payload);
      console.log("Sales data -->", response);
      const salesData = response.data.data.items;
      setSalesData(salesData);
      setTotalRows(response.data.data.total);
      setLoading(false);
      setUpdatedRowData(false);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  useEffect(() => {
    getSale();
  }, [perPage, page]);

  useEffect(() => {
    updatedRowData && getSale();
  }, [updatedRowData]);

  const searchByText = (searchText) => {
    getSale(searchText);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "300px",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)} className="d-flex ">
          <div className="d-flex justify-content-center align-items-center">
            {isValidImageUrl(row.profileImageUrl) &&
              isValidImageUrl(row.profileImageUrl) ? (
              <img
                src={row.profileImageUrl}
                alt="Profile"
                style={{ width: 35, height: 35, borderRadius: "50%" }}
              />
            ) : (
              <img
                src={Profile}
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
            <div
              className="ps-2"
              style={{ fontWeight: "500" }}
            >{`${row.firstName} ${row.lastName}`}</div>
            <div className="ps-2" style={{ fontSize: "13px" }}>
              {row.email}
            </div>
          </div>
        </div>
      ),
    },

    {
      name: "Mobile Number",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>{row.phoneNumber}</div>
      ),
      sortable: true,
    },
 

    {
      name: "City",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>
          {row.address}
        </div>
      ),
      sortable: true,
    },

    {
      name: "UPI Id",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>
          {row.upiId}
        </div>
      ),
      sortable: true,
    },


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
        cursor: "pointer",
      },
    },
  };

  return (
    <>
      {
        selectedRow ?
          <UpdateSalesDetails 
          id = {selectedRow.userId}
          />
          :
          <div className="main-table rounded ">
            <DataTable
              // title={
              //   <CustomTitle
              //     icon={icon}
              //     title={title}
              //     setOption={setOption}
              //     searchByText={searchByText}
              //   />
              // }

              title={<Sales />}
              columns={columns}
              data={salesData}
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
              onRowClicked={(row) => handleRowClick(row)}
              progressPending={loading}
              progressComponent={<TableLoader />}
              selectedRow={selectedRow}
              customStyles={customStyles}
            />
          </div>
      }

    </>
  );
};

export default SalesPerson;

