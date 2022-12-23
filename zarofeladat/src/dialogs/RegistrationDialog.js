import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography,
} from '@mui/material';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-mui';
import { doApiCall, AXIOS_METHOD } from '../hooks/useApi';
import { useAuth } from '../hooks/useAuth';
import { passwordAgainValidator, passwordValidator, usermameValidator } from '../utils/utils';

export default function RegistrationDialog({ open, onClose }) {
  const { handleLoginResult } = useAuth();
  const [password] = useState({
    password: '',
    showPassword: false,
  });
  const navigate = useNavigate();

  const onSubmit = (values, { setFieldError, setSubmitting }) => {
    setSubmitting(true);

    const onFailure = (apiError) => {
      setFieldError('name', apiError);
      setSubmitting(false);
    };

    doApiCall(AXIOS_METHOD.POST, '/reg', () => {
      doApiCall(AXIOS_METHOD.POST, '/login', (data) => {
        handleLoginResult(data);
        setSubmitting(false);
        onClose();
        navigate('/wallets');
      }, onFailure, values);
    }, onFailure, values);
  };

  if (!open) {
    return null;
  }

  return (
    <Dialog open onClose={onClose}>
      <Formik
        initialValues={{
          name: '',
          password1: '',
          password2: '',
          legal: false,
        }}
        onSubmit={onSubmit}
        validate={passwordAgainValidator}
      >
        <Form>
          <DialogTitle variant="h4" textAlign="center" fontWeight={500}>Sign Up</DialogTitle>
          <DialogContent>
            <Typography variant="h5" textAlign="center" />
            <Field name="name" validate={usermameValidator} type="textfield" component={TextField} label="Username" fullWidth sx={{ mt: 3 }} />
            <Field name="password1" validate={passwordValidator} type={password.showPassword ? 'text' : 'password'} component={TextField} label="Password" fullWidth sx={{ mt: 3 }} />
            <Field name="password2" validate={passwordAgainValidator} type={password.showPassword ? 'text' : 'password'} component={TextField} label="Password again" fullWidth sx={{ mt: 3 }} />
            <Field
              component={CheckboxWithLabel}
              type="checkbox"
              name="legal"
              Label={{ label: 'Legal stuff' }}
              validate={(value) => value === false && 'Legal stuff accept required!'}
            />
            <Typography variant="body2" color="error">
              <ErrorMessage name="legal" />
            </Typography>
          </DialogContent>
          <DialogActions sx={{ pl: 3, pr: 3, pb: 3 }}>
            <Button type="Submit" variant="contained" fullWidth>Register</Button>
            <Button variant="contained" color="secondary" fullWidth onClick={onClose}>Cancel</Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
}
