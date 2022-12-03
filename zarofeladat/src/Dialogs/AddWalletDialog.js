/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import {
  Formik, Form, Field,
} from 'formik';
import { TextField } from 'formik-mui';
import { AXIOS_METHOD, doApiCall } from '../hooks/useApi';

export default function AddWalletDialog({
  open, handleClose, forceWalletRefresh,
}) {
  // eslint-disable-next-line consistent-return
  function nameValidator(value) {
    if (!value && value.length === 0) {
      return 'Wallet must have a name';
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Formik
        initialValues={{
          name: '',
          description: '',
        }}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          setSubmitting(true);

          const onSuccess = () => {
            setSubmitting(false);
            forceWalletRefresh();
            handleClose();
          };

          const onFailure = (apiError) => {
            setSubmitting(false);
            setFieldError('name', apiError);
          };

          doApiCall(AXIOS_METHOD.PUT, '/wallet', onSuccess, onFailure, values);
        }}
        validate={console.log}
      >
        <Form>
          <DialogTitle>Add new wallet</DialogTitle>
          <DialogContent>
            <Field name="name" validate={nameValidator} type="textfield" component={TextField} label="Wallet name" variant="outlined" fullWidth />
            <Field name="description" type="textfield" component={TextField} label="Description" variant="outlined" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" fullWidth>Add</Button>
            <Button variant="contained" color="error" fullWidth onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
}
