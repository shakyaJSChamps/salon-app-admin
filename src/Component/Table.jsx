import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import SearchDropDown from "../Component/SearchDropDown";
import PopUp from "./PopUp";
import DataTable from "react-data-table-component";

const Table = (props) => {
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

  return (
    <div className="mt-5 main-table ">
      <DataTable
        title={<CustomTitle />}
        columns={props.columns}
        data={props.countries}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        highlightOnHover
        onRowClicked={props.handleRowClick}
      />
      {props.showEditPopup && (
        <PopUp
          show={true}
          handleClose={() => props.setShowEditPopup(false)}
          handleEdit={props.handleEdit}
          rowData={props.selectedRow}
        />
      )}
    </div>
  );
};

export default Table;
