import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Form, Formik } from 'formik';
import { Grid } from '@mui/material';
import InputText from '../../../common-component/Inputtext/InputText';
import { addService } from '../../../../api/account.api';
import Notify from "../../../../utils/notify";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddService(props) {

  const addservice = async (values, { resetForm }) => {
    try {

      const transformedValues = {
        ...values,
        categoryId: Number(values.categoryId),
        servicePrice: Number(values.servicePrice),
        serviceDuration: Number(values.serviceDuration),
      };
      const res = await addService(transformedValues, props.salonDetail.id);
      console.log("response:::>", res.data);
      Notify.success(res.data.message);
      props.addNewService(res.data); // Update the parent component's state
      resetForm();
      props.handleClose();
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Services
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Formik
              initialValues={{
                categoryId: "",
                serviceName: "",
                servicePrice: "",
                serviceDuration: "",
                type: ""
              }}
              onSubmit={addservice}
            >
              <Form id="bankDetailsForm">
                <Grid container spacing={2} className='mb-3'>
                  <Grid item xs={12}>
                    <InputText
                      label="Category"
                      as="select"
                      name="categoryId"
                      type="number"
                    >
                      {/* Mapping props.services to populate options */}
                      {props.services.map((service, index) => (
                        <option key={index} value={service.id}>{service.name}</option>
                      ))}
                    </InputText>
                  </Grid>
                  <Grid item xs={12}>
                    <InputText
                      label="Service Name"
                      name="serviceName"
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputText
                      label="Duration in Minutes"
                      name="serviceDuration"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputText
                      label="Price"
                      name="servicePrice"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputText
                      label="Service Type"
                      as="select"
                      name="type"
                      type="text"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Both">Both</option>
                    </InputText>
                  </Grid>
                </Grid>
                <div className='d-flex justify-content-center align-items-center'>
                  <Button variant="contained" type="submit">Submit</Button>
                </div>
              </Form>
            </Formik>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
