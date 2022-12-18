import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography,
} from '@mui/material';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-mui';
import { doApiCall, AXIOS_METHOD } from '../../../hooks/useApi';
import { useAuth } from '../../../hooks/useAuth';

export default function RegistrationDialog({ open, onClose }) {
  const { handleLoginResult } = useAuth();
  const [password] = useState({
    password: '',
    showPassword: false,
  });
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
    return '';
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
    return '';
  }

  function passwordAgainValidator(values) {
    const { password1, password2 } = values;
    if (password1 !== password2) {
      return { password2: 'The passwords do not match' };
    }
    return '';
  }

  function onSubmit(values, { setFieldError, setSubmitting }) {
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
  }

  return (
    <Dialog open={open} onClose={onClose}>
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
            <Button variant="contained" color="error" fullWidth onClick={onClose}>Cancel</Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
}
