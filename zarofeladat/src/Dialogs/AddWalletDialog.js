/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
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
      >
        <Form>
          <Grid container justifyContent="center">
            <DialogTitle variant="h5">Add new wallet</DialogTitle>
          </Grid>
          <DialogContent>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Field name="name" validate={nameValidator} type="textfield" component={TextField} label="Wallet name" variant="outlined" fullWidth />
              </Grid>
              <Grid item>
                <Field name="description" type="textfield" component={TextField} label="Description" variant="outlined" fullWidth />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button type="submit" variant="contained" fullWidth>Add</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="error" fullWidth onClick={handleClose}>Cancel</Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
}
