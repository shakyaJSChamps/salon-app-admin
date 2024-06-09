import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { RxCross2 } from "react-icons/rx";
import hair from "../../../assets/image/hair.png";
import { Link } from "@mui/material";

const Invoice = ({ invoiceData, buttonName }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setIsOpen(open);
    };

    const invoiceDetails = (
        <Box
            sx={{ width: 450 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List className="d-flex justify-content-start align-items-center ps-5 pe-5 pt-4 fw-bold gap-1">
                <RxCross2 className="fs-5 fw-bold cursor-pointer" />
                <div>Invoice Details</div>
            </List>
            <hr style={{ borderTop: "2px solid black" }} />
            <List className="ps-5 pt-2 pe-5">
                <div>
                    <img src={invoiceData.image || hair} className="rounded-circle" style={{ height: "100px", width: "100px" }} alt="Profile" />
                    <p className="pt-3 fw-bold">{invoiceData.name}</p>
                </div>

                <div className="lh-1">
                    <p className="fw-bold" style={{ fontSize: "14px" }}>Address</p>
                    <p className="text-muted" style={{ fontSize: "13px", lineHeight: "1px" }}>{invoiceData.address}</p>
                </div>

                <div className="d-flex justify-content-between align-items-center pt-3">
                    <div className="lh-1">
                        <p className="fw-bold" style={{ fontSize: "14px" }}>Phone</p>
                        <p className="text-muted" style={{ fontSize: "13px", lineHeight: "1px" }}>{invoiceData.phone}</p>
                    </div>

                    <div className="lh-1">
                        <p className="fw-bold" style={{ fontSize: "14px" }}>Email</p>
                        <p className="text-muted" style={{ fontSize: "13px", lineHeight: "1px" }}>{invoiceData.email}</p>
                    </div>
                </div>

                <div className="pt-4 lh-1">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="fw-bold" style={{ fontSize: "14px" }}>Payment Method</p>
                        <p className="text-muted" style={{ fontSize: "13px", lineHeight: "1px" }}>{invoiceData.paymentMethod}</p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <p className="fw-bold" style={{ fontSize: "14px" }}>Bill name</p>
                        <p className="text-muted" style={{ fontSize: "13px", lineHeight: "1px" }}>{invoiceData.billName}</p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <p className="fw-bold" style={{ fontSize: "14px" }}>Type</p>
                        <p className="text-muted" style={{ fontSize: "13px", lineHeight: "1px" }}>{invoiceData.type}</p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <p className="fw-bold" style={{ fontSize: "14px" }}>Tax</p>
                        <p className="text-muted" style={{ fontSize: "13px", lineHeight: "1px" }}>{invoiceData.tax}</p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <p className="fw-bold" style={{ fontSize: "14px" }}>Amount</p>
                        <p className="text-muted" style={{ fontSize: "13px", lineHeight: "1px" }}>{invoiceData.amount}</p>
                    </div>

                    <hr style={{ borderTop: "3px dotted black" }} />

                    <div className="d-flex justify-content-between align-items-center">
                        <p className="fw-bold" style={{ fontSize: "14px" }}>Total</p>
                        <p className="text-muted" style={{ fontSize: "13px", lineHeight: "1px" }}>{invoiceData.total}</p>
                    </div>
                </div>
            </List>
            <hr style={{ borderTop: "2px solid black" }} />
            <List>
                <div className="d-flex justify-content-center align-items-center">
                    <button type="button" className="btn btn-dark">Download Invoice</button>
                </div>
            </List>
        </Box>
    );

    return (
        <div>
            <Link onClick={toggleDrawer(true)} className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover cursor-pointer">{buttonName}</Link>
            <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
                {invoiceDetails}
            </Drawer>
        </div>
    );
};

export default Invoice;