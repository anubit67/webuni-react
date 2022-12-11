import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import {
  Formik, Form, Field,
} from 'formik';
import { TextField } from 'formik-mui';
import { AXIOS_METHOD, doApiCall } from '../../../hooks/useApi';
import { validator } from '../../../utils/utils';

export default function AddNewTransactionDialog({
  open, handleClose, id, resetTransactionTable,
}) {
  function onSubmit({ title, amount }, { setSubmitting, setFieldError }) {
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
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Formik
        initialValues={{
          title: '',
          amount: 0,
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <DialogTitle variant="h5" textAlign="center" fontWeight={500}>Add transaction</DialogTitle>
          <DialogContent>
            <Field name="title" type="textfield" component={TextField} label="Description" variant="outlined" fullWidth validate={validator} sx={{ pb: 3, mt: 3 }} />
            <Field name="amount" type="textfield" component={TextField} label="Amount" variant="outlined" fullWidth validate={validator} />
          </DialogContent>
          <DialogActions sx={{ pl: 3, pr: 3, pb: 3 }}>
            <Button type="submit" variant="contained" fullWidth>Add</Button>
            <Button variant="contained" color="error" fullWidth onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
}
