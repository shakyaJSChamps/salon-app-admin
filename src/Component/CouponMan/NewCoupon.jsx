import React from 'react';
import { Row } from "react-bootstrap";
import { Paper } from "@mui/material";
import { Form, Formik } from 'formik'
import { MdOutlineConfirmationNumber } from "react-icons/md";
import InputText from '../common-component/Inputtext/InputText';

const NewCoupon = () => {
  return (
    <Row className="coupon p-0">
      <Paper className="coupon-details px-3 pb-3">
        <div className="d-flex pt-2 align-items-center">
          <MdOutlineConfirmationNumber className="coupon-icon" />
          <p className=" fw-bold mb-0 ps-1"> Create New Coupon</p>
        </div>
        <hr />
        <div className='coupon-form'>
          <Formik>
            <Form >
              <InputText type="text" name="couponName" label="Coupon Name" />
              <InputText type="text" name="coupon sub name" label="Coupon sub Name" />
              <label>
                Coupon Description<br />
                <textarea type="text" name="description" className=" form-control input"
                  rows="1"
                  cols="50"
                />
              </label>
              <InputText type="text" name="couponDiscount" label="Coupon Discount" />
              <InputText type="text" name="startDate" label="Start Date" />
              <InputText type="text" name="endDate" label="End Date" />
              <div className=" justify-content-center coupon-btn">
                <button className="pt-1 pb-1">ADD COUPON</button>
              </div>
            </Form>
          </Formik>
        </div>
      </Paper>

    </Row>
  );
}

export default NewCoupon;
