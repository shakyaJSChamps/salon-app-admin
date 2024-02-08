import React from 'react';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Paper } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { MdOutlineConfirmationNumber } from 'react-icons/md';

const CouponDetails = (props) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 3;
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const paginatedData = props.data || [];
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
 const slicedData = paginatedData.slice(startIndex,endIndex);
 return (
    <Row className='mt-4 p-0'>
      <Col>
        <Paper className='coupon-paper'>
          <Row className='d-flex align-items-center pt-2 ps-5 rowOne'>
            <Col lg={4}>
              <div className='d-flex'>
                <MdOutlineConfirmationNumber className='coupon-icon' />
                <h5 className='pt-1 mb-0'>Coupon</h5>
              </div>
            </Col>
            <Col lg={8} className='coupon-input'>
              <div className='searching-field'>
              <input type='text' placeholder='Search' />
              <button className='coupon-category'>Category</button>
              </div>
            </Col>
          </Row>
        <Row className='coupon-highlight ps-5'>
            <Col lg={6}>
              <p>COUPONS</p>
            </Col>
            <Col lg={3}>
              <p>DISCOUNT</p>
            </Col>
            <Col lg={3} >
              <p className='duration '>DURATION</p>
            </Col>
          </Row>
          <hr />
          {slicedData.map((details, index) => (
            <React.Fragment key={index}>
              <Row className='ps-4 coupon-data'>
               
                <Col lg={6} className='coupon-card'>
                  <div className='border-text'><p className='vertical-text'>50% OFF</p></div>
                  <h4 className='coupon-title'>{details.title}</h4>
                  <p className='coupon-saving'>{details.saving}</p>
                  <p className='coupon-para'>{details.para}</p>
                </Col>

                <Col lg={2}>
                  <p className='coupon-discount d-flex'>{details.discount}</p>
                </Col>
                <Col lg={2} className='duration-details'>
                  <div className='both-duration'>
                  <p className='duration-start'>Starts<br />{details.start}</p>
                  <p className='duration-expired'>Expire<br />{details.end}</p>
                  </div>
                </Col>
                <Col lg={2} >
                  <div className='duration-icon'>
                  <SaveAsIcon className='update-icon'/>
                  <DeleteForeverIcon className='delete-icon'/>
                  </div>
                </Col>
              </Row>
             <hr/>
            </React.Fragment>
          ))}
        
           <Row>
          <Col className='coupons-button d-flex'>
            <div className='display-page d-flex'>
            <p className='left-button'>Showing {1+page} of 10 Pages</p>
            
            <div className='coupon-all-buttons'>
             <button
                className='pagination-button'
                disabled={page === 0}
                onClick={() => handleChangePage(page - 1)}
              >
                Previous
              </button>
              <button className={`page-no ${page === 1 ? 'active' : ''}`}>{page}</button>
              <button className={`page-no ${page === page ? 'active' : ''}`}>{page+1}</button>
              <button
                className='pagination-button'
                disabled={endIndex >= paginatedData.length}
                onClick={() => handleChangePage(page + 1)}
              >
                Next
              </button>
              </div>
              </div>
              </Col>
              </Row>
        </Paper>
      </Col>
    </Row>
  );
};

export default CouponDetails;











