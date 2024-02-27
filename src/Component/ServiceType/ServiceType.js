// ServiceType.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineContentPaste } from "react-icons/md";
import { getServiceType } from "../../api/account.api";
import {
  setServiceType,
  selectServiceTypeData,
} from "../../features/serviceTypeSlice";
import Notify from "../../utils/notify";
import { Paper } from "@mui/material";
import DataTable from "react-data-table-component";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import MyVerticallyCenteredModal from "../modal/ModalPop";
import EditServiceForm from "./EditServiceForm";

const ServiceType = () => {
  const [modalShow, setModalShow] = useState(false);
  const [showForm, setShowForm] = useState(null); 
  const [selectedRow, setSelectedRow] = useState(null);
  const dispatch = useDispatch();
  const serviceTypes = useSelector(selectServiceTypeData);

  const handleDelete = (row) => {
    console.log("Delete clicked for:", row);
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setShowForm("service"); 
    setModalShow(true);
  };

  const getServiceTypes = async () => {
    try {
      const response = await getServiceType();
      const responseData = response.data.data;
      dispatch(setServiceType(responseData));
    } catch (error) {
      Notify.error(error.message);
    }
  };

  useEffect(() => {
    getServiceTypes();
  }, [dispatch]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      sortable: true,
      cell: (row) => (row.description ? "Description" : "Descrption Not Found"),
    },
    {
      name: "Created By",
      sortable: true,
      cell: (row) => (row.created ? "Created" : "Created Not Found"),
    },
    {
      name: "Created Date",
      sortable: true,
      cell: (row) => (row.createdDate ? "date" : "Date Not Found"),
    },
    {
      name: "",
      cell: (row) => (
        <>
          <MdEditSquare
            className="me-2 cursor-pointer"
            onClick={() => handleEdit(row)}
          />
          <RiDeleteBin6Fill
            className="cursor-pointer"
            onClick={() => handleDelete(row)}
          />
        </>
      ),
    },
  ];

  return (
    <Paper className="add-service-paper px-3 pb-3 rounded h-100" elevation={3}>
      <div className="d-flex align-items-center pt-2">
        <MdOutlineContentPaste />
        <p className="ps-1 fw-bold mb-0">Add Service Type</p>
      </div>
      <hr />
      {serviceTypes.length >= 0 ? (
        <DataTable data={[...serviceTypes]} columns={columns} />
      ) : (
        <span>No Data</span>
      )}

      {modalShow && selectedRow && (
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            setShowForm(null);
          }}
          rowData={selectedRow}
          showForm={showForm} 
        >
          {showForm === "service" && <EditServiceForm rowData={selectedRow} />}
        </MyVerticallyCenteredModal>
      )}
    </Paper>
  );
};

export default ServiceType;
