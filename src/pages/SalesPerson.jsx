import React, { useEffect, useState } from "react";
import Profile from "../assets/image/coupon-dummy.webp";
import { isValidImageUrl } from "../constants";
import Notify from "../utils/notify";
import { getSales } from "../api/account.api";
import DataTable from "react-data-table-component";
import TableLoader from "../Component/common-component/TableLoader";
import UpdateSalesDetails from "../Component/salesManagement/updateSalesDetails/UpdateSalesDetails";
import CommonImage from "../Component/common-component/CommonImage";
import AddButton from "../Component/AddButton";

const SalesPerson = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState("email");
  const [searchText, setSearchText] = useState("");

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handlePageChange = (page) => {
    setPage(page);
    getSale(page, perPage, searchText);
  };

  const handlePerPageChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    getSale(page, newPerPage, searchText);
  };

  const getSale = async (page, perPage, searchText = "") => {
    let payload = {
      page,
      size: perPage,
    };

    if (option && searchText) {
      payload[option] = searchText;
    }

    try {
      setLoading(true);
      const response = await getSales(payload);
      console.log("Sales data -->", response);
      const salesData = response.data.data.items;
      setSalesData(salesData);
      setTotalRows(response.data.data.total);
      setLoading(false);
    } catch (error) {
      Notify.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSale(page, perPage, searchText);
  }, [page, perPage, searchText]);

  const searchByText = (searchText) => {
    setSearchText(searchText);
    setPage(1);
    getSale(1, perPage, searchText);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "300px",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)} className="d-flex">
          <div className="d-flex justify-content-center align-items-center">
            {isValidImageUrl(row.profileImageUrl) ? (
              <CommonImage
                imageUrl={row.profileImageUrl}
                alt="Sales Image"
                classes="sales-image"
              />
            ) : (
              <img
                src={Profile}
                alt="Profile"
                style={{ width: 35, height: 35, borderRadius: "50%" }}
              />
            )}
          </div>
          <div>
            <div className="ps-2" style={{ fontWeight: "500" }}>
              {`${row.firstName} ${row.lastName}`}
            </div>
            <div className="ps-2" style={{ fontSize: "13px" }}>
              {row.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Mobile Number",
      cell: (row) => <div onClick={() => handleRowClick(row)}>{row.phoneNumber}</div>,
      sortable: true,
    },
    {
      name: "City",
      cell: (row) => <div onClick={() => handleRowClick(row)}>{row.address}</div>,
      sortable: true,
    },
    {
      name: "UPI Id",
      cell: (row) => <div onClick={() => handleRowClick(row)}>{row.upiID}</div>,
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
    <div className=" font-weight ps-2">
      Sales Person
    </div>
      {selectedRow ? (
        <UpdateSalesDetails 
        id={selectedRow.userId}
        allowEdit={true} />
      ) : (
        <div className="main-table rounded">
          <DataTable
            title={
              <AddButton
                buttonText="Add Sales Person"
                setOption={setOption}
                searchByText={searchByText}
                allowEdit={true}
                options={[
                  { text: "Email", value: "email" },
                  { text: "Mobile Number", value: "phoneNumber" },
                ]} 
              />
            }
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
            customStyles={customStyles}
          />
        </div>
      )}
    </>
  );
};

export default SalesPerson;
