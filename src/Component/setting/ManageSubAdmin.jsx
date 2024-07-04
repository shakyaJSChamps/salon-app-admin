import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import AddButton from "../AddButton";
import MyVerticallyCenteredModal from "../modal/ModalPop";
import { deleteSubAdmin, getSubAdmin } from "../../api/account.api";
import { isValidImageUrl } from "../../constants";
import Profile from "../../assets/image/dummy-profile.jpg";
import Notify from "../../utils/notify";
import { formatDate } from "../common-component/Formatdate/Formatdate";

const ManageSubAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [option, setOption] = useState("email");
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const handleRowClick = (row) => {
    console.log("Edit icon clicked ::", row);
    setRowData(row);
    setShowModal(true);
  };

  const handleDeleteClick = async (id) => {
    console.log("Delete clicked for ID:", id);
    try {
      const response = await deleteSubAdmin(id);
      console.log("Delete API Response:", response);
      Notify.success("Sub-admin deleted successfully.");
      fetchData(page, perPage, searchText);
    } catch (error) {
      console.error("Delete API Error:", error);
      Notify.error(error.message);
    }
  };

  const handleDeleteConfirmation = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this sub-admin",
      icon: "warning",
      width: "30%",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: "custom-swal",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteClick(row.id);
      }
    });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.firstname,
      sortable: true,
      width: "300px",
      cell: (row) => (
        <div className="d-flex ">
          <div className="d-flex justify-content-center align-items-center">
            {isValidImageUrl(row.profileImageUrl) ? (
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
            <div className="ps-2" style={{ fontWeight: "500" }}>
              {row.firstName}
            </div>
            <div className="ps-2" style={{ fontSize: "15px" }}>
              {row.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Role Name",
      width: "150px",
      selector: (row) => row.roleName,
      sortable: true,
    },
    {
      name: "Mobile Num",
      width: "150px",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: "Create Date",
      width: "200px",
      cell: (row) => <div>{formatDate(row.createdAt)}</div>,
      sortable: true,
    },
    {
      name: "Update Date",
      cell: (row) => <div>{formatDate(row.updatedAt)}</div>,
    },
    {
      name: "",
      cell: (row) => (
        <div>
          <MdEditSquare className="me-2"
            onClick={() => handleRowClick(row)}
          />
          <RiDeleteBin6Fill
            className="cursor-pointer"
            onClick={() => handleDeleteConfirmation(row)}
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
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
        minHeight: "60px",
        fontFamily: "Poppins",
        cursor: "pointer",
      },
    },
  };

  const fetchData = async (page, perPage, searchText = "") => {
    let REQ_URL = `?page=${page}&size=${perPage}&${option}=${searchText}`;
    console.log("REQURL  ::", REQ_URL);
    try {
      const response = await getSubAdmin(REQ_URL);
      console.log("All SubAdmin :: ", response);
      const subAdminData = response.data.data.items;
      console.log("Sub Admin Data ::", subAdminData);
      setData(subAdminData);
      setTotalRows(response.data.data.total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, perPage, searchText);
  }, [page, perPage, searchText]);

  const searchByText = (searchText) => {
    console.log("Search text Called ::", searchText);
    setSearchText(searchText);
    setPage(1);  // Reset to first page on search
    fetchData(1, perPage, searchText);
  };

  const handlePageChange = (page) => {
    setPage(page);
    fetchData(page, perPage, searchText);
  };

  const handlePerPageChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    fetchData(page, newPerPage, searchText);
  };

  const handleAddSubAdminClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <DataTable
        title={
          <AddButton
            buttonText="Add sub admin"
            handleButtonClick={handleAddSubAdminClick}
            setOption={setOption}
            searchByText={searchByText}
            options={[
              { text: "Email", value: "email" },
              { text: "Name", value: "name" },
              { text: "Mobile Number", value: "phoneNumber" },
            ]}
          />
        }
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerPageChange}
        highlightOnHover
        selectedRow={selectedRow}
        customStyles={customStyles}
      />
      <MyVerticallyCenteredModal
        show={showModal}
        onHide={handleCloseModal}
        rowData={rowData}
        fetchData={() => fetchData(page, perPage, searchText)}
        page={page}
        perPage={perPage}
        searchText={searchText}
        showForm="subAdmin"
      />
    </div>
  );
};

export default ManageSubAdmin;
