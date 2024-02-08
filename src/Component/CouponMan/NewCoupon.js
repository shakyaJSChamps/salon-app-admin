import React from 'react';
import { Row } from "react-bootstrap";
import { Paper } from "@mui/material";
import { MdOutlineConfirmationNumber } from "react-icons/md";

const NewCoupon = () => {
  return (
    <Row className="coupon mt-4 p-0">
    <Paper className="coupon-details">
       <div className="d-flex pt-2 ps-1 newcoupon"> 
        <MdOutlineConfirmationNumber className="coupon-icon"/>
        <p className="coupon-headline  mb-0"> Create New Coupon</p>
         </div>
        
        <div className='coupon-form'>
        <form >
          <label className='pt-2'>
            Coupon Name<br/>
            <input type="text" name="coupon name" />
          </label>

          <label>
            Coupon Sub Name
            <input type="text" name="coupon sub name" />
          </label>

          <label>
            Coupon Description<br/>
            <textarea type="text" name="description" className="coupon-textarea"/>
          </label>

          <label>
            Coupon Discount
            <input type="text" name="coupon discount" />
          </label>

          <label>
            Start Date<br/>
            <input type="text" name="start" placeholder="07/07/43" />
          </label>

          <label>
            End Date <br/>
            <input type="text" name="end" />
          </label>
          <div className=" justify-content-center coupon-btn">
          <button className="pt-1 pb-1">ADD COUPON</button>
          </div>
        </form>
        </div>
      </Paper>
    
  </Row>
  );
}

export default NewCoupon;
