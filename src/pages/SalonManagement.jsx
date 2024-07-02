import React, { useEffect, useState } from "react";
import SaloonProfile from "../assets/image/salons.png";
import { isValidImageUrl } from "../constants";
import Notify from "../utils/notify";
import { getSalon } from "../api/account.api";
import DataTable from "react-data-table-component";
import CustomTitle from "../Component/CustomTitle";
import TableLoader from "../Component/common-component/TableLoader";
import EditsalonManagement from "../Component/salonManagement/EditDetails/EditsalonManagement";
import { useNavigate } from "react-router-dom";
import { MdOutlineContentCut } from "react-icons/md";

const SaloonManagement = () => {
  const title = "Saloon Management";
  const icon = <MdOutlineContentCut />;
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [saloonsData, setSaloonsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [option, setOption] = useState("name");
  const navigate = useNavigate()


  const handleRowClick = (row) => {
    setSelectedRow(row);
    navigate(`/salon-management/${row.id}`);
  };

  const handlePageChange = (page) => {
    setPage(page);
    getSaloonsData(page, perPage, searchText);
  };

  const handlePerPageChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    getSaloonsData(page, newPerPage, searchText);
  };

  const getSaloonsData = async (page, perPage, searchText = "") => {
    let REQ_URL = `/salons?page=${page}&size=${perPage}`;
    if (searchText) {
      REQ_URL += `&${option}=${searchText}`;
    }
    try {
      setLoading(true);
      const response = await getSalon(REQ_URL);
      setSaloonsData(response.data.data.items);
      setTotalRows(response.data.data.total);
      setLoading(false);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  useEffect(() => {
    getSaloonsData(page, perPage, searchText);
  }, [page, perPage, searchText]);

  const searchByText = (searchText) => {
    setSearchText(searchText);
    setPage(1);
    getSaloonsData(1, perPage, searchText);
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
          <div className="cursor-pointer">
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
      name: "Active",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)} className="cursor-pointer">
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

      name: "Company Name",
      selector: (row) => <p onClick={() => handleRowClick(row)} className="cursor-pointer">{row.companyName}</p>,
      sortable: true,
    },
    // {
    //   name: "Service Type",
    //   selector: (row) => <p onClick={() => handleRowClick(row)} className="cursor-pointer">{row.serviceType}</p>,
    //   sortable: true,
    // },

    {
      name: "City",
      cell: (row) => <p onClick={() => handleRowClick(row)} className="cursor-pointer">{row.city}</p>,
      sortable: true,
    },

    {
      name: "Joined On",
      cell: (row) => <p onClick={() => handleRowClick(row)} className="cursor-pointer">{new Date(row.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}</p>,
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
      {selectedRow ?
        <EditsalonManagement
          id={selectedRow.id}
          allowEdit={true}
          handleBack={() => {
            setSelectedRow(null);
            navigate('/salon-management');}}
        />
        :
        <div className="main-table rounded ">
          <DataTable
            title=
            {<CustomTitle
              icon={icon}
              title={title}
              setOption={setOption}
              searchByText={searchByText}
              options={[
                { text: "Name", value: "name" },
                { text: "City", value: "city" },
                { text: "Company Name", value: "companyName" },
              ]}
            />
            }
            columns={columns}
            data={saloonsData}
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
      }
    </>
  );
};

export default SaloonManagement;