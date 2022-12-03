/* eslint-disable */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, 
} from '@mui/material';
import {
  Formik, Form, Field, ErrorMessage
} from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-mui';
import { doApiCall, AXIOS_METHOD } from '../hooks/useApi';
import { useAuth } from "../hooks/useAuth";

export default function RegistrationDialog({ open, onClose }) {
  const { handleLoginResult } = useAuth();
  const navigate = useNavigate();

  function usermameValidator(value) {
    const pattern = /^[a-zA-Z0-9]/;
    if (!value) {
      return 'Username must be given';
    }
    if (value.length < 3) {
      return 'Username must be atleast 3 characters';
    }
    if (value.length > 20) {
      return 'Username can be maximum 20 characters';
    }
    if (!pattern.test(value)) {
      return 'Username should have only lowercase, uppercase and numbers';
    }
  }

  function passwordValidator(value) {
    const pattern = /(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\d+).*/;
    if (!value) {
      return 'Password must be given';
    }
    if (value.length < 5) {
      return 'Password must be atleast 5 character';
    }
    if (!pattern.test(value)) {
      return 'Password must have atleast 1 lowercase 1 uppercase and one number';
    }
  }

  function passwordAgainValidator(values) {
    const { password, passwordAgain } = values
    if (password !== passwordAgain) {
      return { passwordAgain: 'The passwords do not match' };
    }
  }

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: "25%", height: "auto" } }}>
      <Formik
        initialValues={{
          name: '',
          password: '',
          passwordAgain: '',
          legal: false
        }}
        onSubmit={(values, {setFieldError, setSubmitting}) => {
          setSubmitting(true);
          
          const onFailure = (apiError) => {
            setFieldError('name', apiError);
            setSubmitting(false);
          };

          doApiCall(AXIOS_METHOD.POST, '/reg', (_unusedRegData) => {
              doApiCall(AXIOS_METHOD.POST, '/login', (data) => {
                handleLoginResult(data);
                setSubmitting(false);
                onClose();
                navigate('/wallets');
              }, onFailure, values);
          }, onFailure, values);
      }}
        validate={passwordAgainValidator}
      >
        <Form>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogContent>
            <Typography variant="h5" textAlign="center"></Typography>
            <Field name="name" validate={usermameValidator} type="textfield" component={TextField} label="Username" variant="outlined" fullWidth />
            <Field name="password" validate={passwordValidator} type="textfield" component={TextField} label="Password" variant="outlined" fullWidth />
            <Field name="passwordAgain" validate={passwordAgainValidator} type="textfield" component={TextField} label="Password again" variant="outlined" fullWidth />
            <Field
              component={CheckboxWithLabel}
              type="checkbox"
              name="legal"
              Label={{label: 'Legal stuff'}}
              validate={value => value === false && 'Legal stuff accept required!'}
              />
            <Typography variant={"body2"} color={"error"}>
              <ErrorMessage name={"legal"}/>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button type="Submit" variant="contained" fullWidth>Register</Button>
            <Button variant="contained" color="error" fullWidth onClick={onClose}>Cancel</Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
}
