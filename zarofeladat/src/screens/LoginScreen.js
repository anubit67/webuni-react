import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Card, Container, Grid, Typography,
} from '@mui/material';
import {
  Formik, Form, Field,
} from 'formik';
import { TextField } from 'formik-mui';
import RegistrationDialog from '../Dialogs/RegistrationDialog';
import { doApiCall, AXIOS_METHOD } from '../hooks/useApi';
import { useAuth } from '../hooks/useAuth';

export default function LoginScreen() {
  const { handleLoginResult } = useAuth();
  const [open, setOpen] = useState(false);
  const [password] = useState({
    showPassword: false,
  });
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Formik
      initialValues={{
        name: '', password: '',
      }}
      onSubmit={(values, { setFieldError, setSubmitting }) => {
        setSubmitting(true);

        const onFailure = (apiError) => {
          setFieldError('name', apiError);
          setSubmitting(false);
        };

        const onSuccess = (data) => {
          handleLoginResult(data);
          setSubmitting(false);
          navigate('/wallets');
        };

        doApiCall(AXIOS_METHOD.POST, '/login', onSuccess, onFailure, values);
      }}
    >
      <Form>
        <Container maxWidth="lg">
          <Grid container spacing={1} paddingTop="25%">
            <Grid item lg={8} md={6} xs={12}>
              <Grid container spacing={2} direction="column">
                <Grid item lg={3} md={4} xs={12}>
                  <Typography variant="h2" fontFamily="fantasy" color="purple">Wallet App</Typography>
                </Grid>
                <Grid item lg={3} md={4} xs={12}>
                  <Typography variant="h5">Create and share your wallets with your friends to track your financials</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <Card elevation={3}>
                <Grid container spacing={1} direction="column" p={1}>
                  <Grid item lg={3} md={4} xs={12}>
                    <Field name="name" type="textfield" component={TextField} label="Username" fullWidth />
                  </Grid>
                  <Grid item lg={3} md={4} xs={12}>
                    <Field name="password" type={password.showPassword ? 'text' : 'password'} component={TextField} label="Password" fullWidth />
                  </Grid>
                  <Grid item lg={3} md={4} xs={12}>
                    <Button type="submit" variant="contained" fullWidth>Login</Button>
                  </Grid>
                  <Grid item lg={3} md={4} xs={12}>
                    <Button variant="contained" color="success" fullWidth onClick={handleClickOpen}>Register</Button>
                    <RegistrationDialog open={open} onClose={handleClose} />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Form>
    </Formik>
  );
}
