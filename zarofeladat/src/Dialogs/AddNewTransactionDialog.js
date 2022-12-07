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

export default function AddNewTransactionDialog({
  open, handleClose, id, resetTransactionTable,
}) {
  function validator(value) {
    if (!value && value.length === 0) {
      return 'Field must not be empty';
    }
    return '';
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Formik
        initialValues={{
          title: '',
          amount: 0,
        }}
        onSubmit={({ title, amount }, { setSubmitting, setFieldError }) => {
          setSubmitting(true);

          const onSuccess = () => {
            setSubmitting(false);
            resetTransactionTable();
            handleClose();
          };

          const onFailure = (apiError) => {
            setSubmitting(false);
            setFieldError('title', apiError);
          };

          doApiCall(AXIOS_METHOD.PUT, '/transactions', onSuccess, onFailure, { wallet_id: id, title, amount });
        }}
      >
        <Form>
          <DialogTitle>Add transaction</DialogTitle>
          <DialogContent>
            <Field name="title" type="textfield" component={TextField} label="Description" variant="outlined" fullWidth validate={validator} />
            <Field name="amount" type="textfield" component={TextField} label="Amount" variant="outlined" fullWidth validate={validator} />
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