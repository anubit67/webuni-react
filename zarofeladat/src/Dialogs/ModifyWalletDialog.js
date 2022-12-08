/* eslint-disable react/jsx-no-bind */
/* eslint-disable consistent-return */
import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
} from '@mui/material';
import {
  Formik, Form, Field,
} from 'formik';
import { TextField } from 'formik-mui';
import { AXIOS_METHOD, doApiCall } from '../hooks/useApi';

export default function ModifyWalletDialog({
  id, open, handleClose, forceWalletRefresh,
}) {
  function validator(value) {
    if (!value && value.length === 0) {
      return 'Field must not be empty';
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

          doApiCall(AXIOS_METHOD.PATCH, `/wallet/${id}`, onSuccess, onFailure, values);
        }}
      >
        <Form>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <DialogTitle>Modify wallet</DialogTitle>
            </Grid>
            <Grid item>
              <DialogContent>
                <Field name="description" type="textfield" component={TextField} label="Description" variant="outlined" fullWidth validate={validator} />
              </DialogContent>
            </Grid>
            <Grid item>
              <DialogActions>
                <Button type="submit" variant="contained" fullWidth>Modify</Button>
                <Button variant="contained" color="error" fullWidth onClick={handleClose}>Cancel</Button>
              </DialogActions>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Dialog>
  );
}
