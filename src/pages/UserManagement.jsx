import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import Profile from "../assets/image/dummy-profile.jpg";
import { isValidImageUrl } from "../constants";
import MyVerticallyCenteredModal from "../Component/modal/ModalPop";
import Notify from "../utils/notify";
import { getUser } from "../api/account.api";
import DataTable from "react-data-table-component";
import CustomTitle from "../Component/CustomTitle";
import TableLoader from "../Component/common-component/TableLoader";
import Userdata from "../Component/userManagement/Userdata";

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
  const [option, setOption] = useState("email");
  const [updatedRowData, setUpdatedRowData] = useState(false);

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

  const getUsers = async (searchText = "") => {
    let REQ_URL = `/consumers?page=${page}&size=${perPage}&${option}=${searchText}`;
    try {
      setLoading(true);
      const response = await getUser(REQ_URL);
      const userData = response.data.data.items;
      setUserData(userData);
      setTotalRows(response.data.data.total);
      setLoading(false);
      setUpdatedRowData(false);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, [perPage, page]);

  useEffect(() => {
    updatedRowData && getUsers();
  }, [updatedRowData]);

  const searchByText = (searchText) => {
    getUsers(searchText);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "260px",
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
        <div onClick={() => handleRowClick(row)}>
          <span
            className={`rounded-pill ${row.active ? "active-pill" : "blocked-pill"
              }`}
          >
            {row.active ? "Active" : "Blocked"}
          </span>
        </div>
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
    {
      name: "Joined On",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>
          {new Date(row.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
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
      {selectedRow ? (
        <Userdata
          rowData={selectedRow}
          setUpdatedRowData={setUpdatedRowData}
          handleBack={() => {
            setSelectedRow(null);
            navigate('/user-management');}}
        />
      ) : <div className="main-table rounded ">
        <DataTable
          title={
            <CustomTitle
              icon={icon}
              title={title}
              setOption={setOption}
              searchByText={searchByText}
              options={[
                { text: "Email", value: "email" },
                { text: "Mobile Number", value: "phoneNumber" },
              ]}
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
          onRowClicked={(row) => handleRowClick(row)}
          progressPending={loading}
          progressComponent={<TableLoader />}
          selectedRow={selectedRow}
          customStyles={customStyles}
        />
      </div>}

    </>
  );
};

export default UserManagement;