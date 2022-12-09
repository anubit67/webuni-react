/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import {
  Formik, Form, Field,
} from 'formik';
import { TextField } from 'formik-mui';
import { AXIOS_METHOD, doApiCall } from '../hooks/useApi';

export default function modifyTransactionDialog({
  open, handleClose, id, resetTransactionTable,
}) {
  const [initialValues] = useState({ title: '', description: '' });

  function validator(value) {
    if (!value && value.length === 0) {
      return 'Field must not be empty';
    }
    return '';
  }

  /*
  const handleInitialValues = useCallback(() => {
    doApiCall(AXIOS_METHOD.GET, `/transaction/${id}`, (res) => (setInitialValues({
      title: res.title,
      amount: res.amount,
    })), () => (setInitialValues({ title: '', amount: 0 })));
  });
  */

  // handleInitialValues();

  /*
  {doApiCall(AXIOS_METHOD.GET, `/transaction/${id}`, (res) => ({
          title: res.title,
          amount: res.amount,
        }), () => ({ title: '', amount: 0 }))}
  */
  return (
    <Dialog open={open} onClose={handleClose}>
      <Formik
        initialValues={initialValues}
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

          doApiCall(AXIOS_METHOD.PATCH, `/transaction/${id}`, onSuccess, onFailure, { wallet_id: id, title, amount });
        }}
      >
        <Form>
          <DialogTitle variant="h5" textAlign="center" fontWeight={500}>Modify transaction</DialogTitle>
          <DialogContent>
            <Field name="title" type="textfield" component={TextField} label="Description" variant="outlined" fullWidth validate={validator} sx={{ pb: 3, mt: 3 }} />
            <Field name="amount" type="textfield" component={TextField} label="Amount" variant="outlined" fullWidth validate={validator} />
          </DialogContent>
          <DialogActions sx={{ pl: 3, pr: 3, pb: 3 }}>
            <Button type="submit" variant="contained" fullWidth>Modify</Button>
            <Button variant="contained" color="error" fullWidth onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
}
