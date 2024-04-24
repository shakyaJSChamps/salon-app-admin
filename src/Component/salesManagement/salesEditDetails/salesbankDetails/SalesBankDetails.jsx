import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Grid } from '@mui/material';
import InputText from '../../../common-component/Inputtext/InputText';
import styles from './SalesBankdetails.module.css';


function BankDetails({ bankDetails }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h4 className={styles.color}>Bank Details</h4>
      </div>
      <Formik
        initialValues={{
          accountNumber: bankDetails.accountNumber || '',
          accountHolderName: bankDetails.accountHolderName || '',
          bankName: bankDetails.bankName || '',
          ifscCode: bankDetails.ifscCode || '',
          newField: bankDetails.newField || '',
        }}
        enableReinitialize
      >
        <Form>
          <Grid container spacing={2} className='mb-3'>
            <Grid item xs={4}>
              <InputText
                label="Account Number"
                name="accountNumber"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label="Account Holder Name"
                name="accountHolderName"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label="Bank Name"
                name="bankName"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label="IFSC Code"
                name="ifscCode"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label="New Field"
                name="newField"
                disabled={!isEditing}
              />
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  );
}

export default BankDetails;
