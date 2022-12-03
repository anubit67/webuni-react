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

export default function AddNewUserDialog({
  open, handleClose, id, forceUsersRefresh,
}) {
  // eslint-disable-next-line consistent-return
  function nameValidator(value) {
    if (!value && value.length === 0) {
      return 'User must not be empty';
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={(name, { setSubmitting, setFieldError }) => {
          setSubmitting(true);

          const onSuccess = () => {
            setSubmitting(false);
            forceUsersRefresh();
            handleClose();
          };

          const onFailure = (apiError) => {
            setSubmitting(false);
            setFieldError('name', apiError);
          };

          console.log(name);
          doApiCall(AXIOS_METHOD.POST, '/user/search', (userId) => {
            console.log(userId);
            doApiCall(AXIOS_METHOD.POST, `/wallet/${id}/grant_access`, onSuccess, onFailure, { user_id: userId });
          }, false, name);
        }}
        validate={console.log}
      >
        <Form>
          <DialogTitle>Add user</DialogTitle>
          <DialogContent>
            <Field name="name" validate={nameValidator} type="textfield" component={TextField} label="Wallet name" variant="outlined" fullWidth />
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
