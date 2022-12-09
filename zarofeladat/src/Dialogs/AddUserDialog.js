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
  function nameValidator(value) {
    if (!value && value.length === 0) {
      return 'Username must not be empty';
    }
    return '';
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

          const onFailure = (apiError, err) => {
            if (err?.response?.status === 404) {
              setFieldError('name', 'User not found');
            } else {
              setFieldError('name', apiError);
            }
            setSubmitting(false);
          };

          doApiCall(AXIOS_METHOD.POST, '/user/search', (userId) => {
            doApiCall(AXIOS_METHOD.POST, `/wallet/${id}/grant_access`, onSuccess, onFailure, { user_id: userId });
          }, onFailure, name);
        }}
      >
        <Form>
          <DialogTitle variant="h5" textAlign="center" fontWeight={500}>Add user</DialogTitle>
          <DialogContent>
            <Field name="name" validate={nameValidator} type="textfield" component={TextField} label="Username" variant="outlined" fullWidth sx={{ mt: 3 }} />
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
