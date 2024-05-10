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
            <Formik>
              <Form id="bankDetailsForm">
                <Grid container spacing={2} className='mb-3'>

                  <Grid item xs={12}>

                    <InputText
                      label="Category"
                      as="select"
                      name="category"
                      type="text"
                      className="Form-control input"
                    >
                      <option value="Male">Hair</option>
                      <option value="Female">Color</option>
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
                      name="Service Type"
                      type="text"
                      className="Form-control input"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Both">Both</option>
                    </InputText>
                  </Grid>
                </Grid>
                <div className='d-flex justify-content-center align-items-center'>
                  <Button variant="contained" >Submit</Button>
                </div>
              </Form>

            </Formik>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
