/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import {
  Formik, Form, Field
} from 'formik';
import { TextField } from 'formik-mui';

export default function WalletDialog({ open, handleClose, handleEvent }) {
  const navigate = useNavigate();

  function nameValidator(value) {
    if(!value && value.length === 0) {
      return 'Name must be filled';
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Formik
        initialValues={{
          walletName: ''
        }}
        onSubmit={(values, formik) => {
          formik.setSubmitting(true);
          setTimeout(() => {
            formik.setSubmitting(false);
            navigate('/wallets');
          }, 1000);
        }}
        validate={console.log}
      >
        <Form>
          <Dialog open={open} onClose={handleClose} maxWidth="lg">
            <DialogTitle>Add new wallet</DialogTitle>
            <DialogContent>
              <Field name="walletName" validate={nameValidator} type="textfield" component={TextField} label="Wallet name" variant="filled" fullWidth />
            </DialogContent>
            <DialogActions>
              <Button variant="contained" fullWidth onClick={handleEvent}>Add</Button>
              <Button variant="contained" color="error" fullWidth onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </Form>
      </Formik>
    </Dialog>
  );
}
