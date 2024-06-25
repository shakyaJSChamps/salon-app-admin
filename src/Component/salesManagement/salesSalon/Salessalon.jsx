import React, { useEffect, useState } from "react";
import SaloonProfile from "../../../assets/image/salons.png";
import { isValidImageUrl } from "../../../constants";
import Notify from "../../../utils/notify";
import DataTable from "react-data-table-component";
import TableLoader from "../../../Component/common-component/TableLoader";
import { salesSalon } from "../../../api/account.api";
import EditsalonManagement from "../../salonManagement/EditDetails/EditsalonManagement";

const Salessalon = ({ id }) => {
    const [perPage, setPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [saloonsData, setSaloonsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedRow, setSelectedRow] = useState(null);


    const handleRowClick = (row) => {
        setSelectedRow(row);
    };

    const handlePageChange = (page) => {
        setPage(page);
        getSaloonsData(page, perPage);
    };

    const handlePerPageChange = (newPerPage, page) => {
        setPerPage(newPerPage);
        getSaloonsData(page, newPerPage);
    };

    const getSaloonsData = async (page, perPage) => {
        let REQ_URL = `?page=${page}&size=${perPage}`;
        try {
            setLoading(true);
            const response = await salesSalon(REQ_URL, id);
            console.log("data", response);
            setSaloonsData(response.data.data);
            setTotalRows(response.data.data.total);
            setLoading(false);
        } catch (error) {
            Notify.error(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getSaloonsData(page, perPage);
    }, [page, perPage]);

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            width: "260px",
            cell: (row) => (
                <div onClick={() => handleRowClick(row)} className="d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                        {isValidImageUrl(row.mainGateImage?.mediaUrl) ? (
                            <img
                                src={row.mainGateImage.mediaUrl}
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
            selector: (row) => (
                <p onClick={() => handleRowClick(row)} className="cursor-pointer">
                    {row.companyName}
                </p>
            ),
            sortable: true,
        },
        {
            name: "Service Type",
            selector: (row) => (
                <p onClick={() => handleRowClick(row)} className="cursor-pointer">
                    {row.serviceType}
                </p>
            ),
            sortable: true,
        },

        {
            name: "Joined On",
            cell: (row) => <p onClick={() => handleRowClick(row)} className="cursor-pointer">{new Date(row.createdAt).toLocaleDateString("en-US", {
                day:"numeric",
                month: "long",
                year: "numeric",
            })}</p>,
            sortable: true,
        },


        {
            name: "City",
            cell: (row) => (
                <p onClick={() => handleRowClick(row)} className="cursor-pointer">
                    {row.city}
                </p>
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
            {selectedRow ? (
                <EditsalonManagement
                    id={selectedRow.id}
                    className="mt-2"
                    allowEdit={false}
                />
            ) : (

                <div>
                    <div className="fw-bold fs-6 my-2 px-2">Sales Person Salons</div>
                    <div className="main-table rounded">
                        <DataTable
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
                </div>

            )}
        </>
    );
};

export default Salessalon;
