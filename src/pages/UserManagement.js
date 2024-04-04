import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { selectSearchTerm } from "../features/countriesInfo";
import Profile from "../assets/image/dummy-profile.jpg";
import { isValidImageUrl } from "../constants";
import MyVerticallyCenteredModal from "../Component/modal/ModalPop";
import Notify from "../utils/notify";
import { getUser } from "../api/account.api";
import DataTable from "react-data-table-component";
import CustomTitle from "../Component/CustomTitle";
import TableLoader from "../Component/common-component/TableLoader";

const UserManagement = () => {
  const title = "User Management";
  const icon = <AiOutlineUser />;
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState("");
  const [searchText, setSearchText] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);

  // const handleInputChange = (event) => {
  //   const { value } = event.target;
  //   setSearchText(value);
  // };

  const handleEdit = (rowData) => {
    // handle edit logic
  };

  const handleRowClick = (row) => {
    setModalShow(true);
    setSelectedRow(row);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerPageChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setPage(page);
  };
  const onOptionChange = (prop) => {
    setOption(prop);
  };

   const getSearchText = (prop) => {
    setSearchText(prop);
    setPage(1); 
  };

  const getUsers = async () => {
    let REQ_URL = `/consumers?page=${page}&size=${perPage}`;
    if (option === 'mobile number') {
      REQ_URL += `&phoneNumber=${searchText}`;
    } else if (option === 'email' || !option) { // Check if option is 'email' or not selected
      REQ_URL += `&email=${searchText}`; // Use 'email' as default option if not selected
    } else {
      REQ_URL += `&${option}=${searchText}`;
    }
    try {
      setLoading(true);
      const response = await getUser(REQ_URL);
      const userData = response.data.data.items;
      setUserData(userData);
      setTotalRows(response.data.data.total);
      setLoading(false);
    } catch (error) {
      Notify.error(error.message);
    }
  };
  
  

  useEffect(() => {
    getUsers();
  }, [perPage, page, searchText, option]);
  

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
      name: "Active",
      cell: (row) => (
        <span
          className={`rounded-pill ${
            row.active ? "active-pill" : "blocked-pill"
          }`}
        >
          {row.active ? "Active" : "Blocked"}
        </span>
      ),
    },

    {
      name: "Mobile Num",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>{row.phoneNumber}</div>
      ),
      sortable: true,
    },
    {
      name: "City",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>{row.address}</div>
      ),
      sortable: true,
    },
    // {
    //   name: "Appointment",
    //   cell: (row) => (
    //     <div>
    //       <span
    //         className={`appointment ${
    //           row.name ? "appointment-completed" : "appointment-canceled"
    //         }`}
    //       >
    //         Completed
    //       </span>
    //       <br />
    //       <span
    //         className={`appointment ${
    //           row.name ? "appointment-canceled" : "appointment-canceled"
    //         }`}
    //       >
    //         Canceled
    //       </span>
    //     </div>
    //   ),
    // },
    {
      name: "Joined On",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>
          {new Date(row.createdAt).toLocaleDateString()}
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
      },
    },
  };

  return (
    <>
      {modalShow && selectedRow && (
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          rowData={selectedRow}
          showForm={"user"}
        />
      )}
      <div className="main-table rounded ">
        <DataTable
          title={
            <CustomTitle
              icon={icon}
              title={title}
              onOptionChange={onOptionChange}
              getSearchText={getSearchText}
            />
          }
          columns={columns}
          data={userData}
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
          handleRowClick={handleRowClick}
          progressPending={loading}
          progressComponent={<TableLoader />}
          handleEdit={handleEdit}
          selectedRow={selectedRow}
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default UserManagement;
