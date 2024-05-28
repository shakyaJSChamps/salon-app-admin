import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { RiShieldUserLine } from "react-icons/ri";
import AddButton from "../AddButton";
import MyVerticallyCenteredModal from "../modal/ModalPop";

const ManageSubAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const columns = [
    { name: "Name", selector: row => row.name, sortable: true },
    { name: "Mobile Num", selector: row => row.mobileNum, sortable: true },
    { name: "Last Login", selector: row => row.lastLogin, sortable: true },
    { name: "Modules", selector: row => row.modules, sortable: true },
    { name: "Status", selector: row => row.status, sortable: true },
    {
      name: "",
      cell: (row) => (
        <div>
          <MdEditSquare className="me-2" />
          <RiDeleteBin6Fill />
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
        fontFamily: "Poppins",
        cursor: "pointer",
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        const formattedData = response.data.map(user => ({
          name: user.name,
          mobileNum: user.phone,
          lastLogin: new Date().toLocaleString(),
          modules: "Example Module",
          status: "Active",
        }));
        setData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddSubAdminClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <DataTable
        title={<AddButton buttonText="Add sub admin" handleButtonClick={handleAddSubAdminClick}
        options={[
          { text: "Email", value: "email" },
          { text: "Mobile Number", value: "phoneNumber" },
        ]}
        />}
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        highlightOnHover
        customStyles={customStyles}
      />
      <MyVerticallyCenteredModal
        show={showModal}
        onHide={handleCloseModal}
        showForm="subAdmin"
      />
    </div>
  );
};

export default ManageSubAdmin;
