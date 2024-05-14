import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Form, Formik } from 'formik';
import { Grid } from '@mui/material';
import InputText from '../../../common-component/Inputtext/InputText';

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

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    // Here you can perform any further actions with the form values, such as making an API call
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
                category: '',
                serviceName: '',
                durationInMinutes: '',
                price: '',
                serviceType: ''
              }}
              onSubmit={handleSubmit}
            >
              <Form id="bankDetailsForm">
                <Grid container spacing={2} className='mb-3'>
                  <Grid item xs={12}>
                    <InputText
                      label="Category"
                      as="select"
                      name="category"
                      type="text"
                    >
                      <option value="Hair">Hair</option>
                      <option value="Color">Color</option>
                      <option value="Both">Both</option>
                    </InputText>
                  </Grid>
                  <Grid item xs={12}>
                    <InputText
                      label="Service Name"
                      name="serviceName"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputText
                      label="Duration in Minutes"
                      name="durationInMinutes"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputText
                      label="Price"
                      name="price"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputText
                      label="Service Type"
                      as="select"
                      name="serviceType"
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
