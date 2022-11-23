/* eslint-disable */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Grid, Typography } from '@mui/material';
import {
  Formik, Form, Field,
} from 'formik';
import { TextField } from 'formik-mui';
import RegistrationDialog from '../Dialogs/RegistrationDialog';

export default function LoginScreen() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Formik  initialValues={{
      username: '', password: ''
    }}
    onSubmit={(values, formik) => {
      formik.setSubmitting(true);
      setTimeout(() => {
        formik.setSubmitting(false);
        navigate('/wallets');
      }, 1000);
    }}>
      <Form>
        <Container maxWidth="lg" >
          <Grid container spacing={2} paddingTop="25%">
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
                <Grid container spacing={2} direction="column" p={1}>
                  <Grid item lg={3} md={4} xs={12}>
                    <Field name="username" type="textfield" component={TextField} label="Username" variant="outlined" fullWidth/>
                  </Grid>
                  <Grid item lg={3} md={4} xs={12}>
                    <Field name="password" type="textfield" component={TextField} label="Password" variant="outlined" fullWidth/>
                  </Grid>
                  <Grid item lg={3} md={4} xs={12}>
                    <Button type="submit" variant="contained" fullWidth>Login</Button>
                  </Grid>
                  <Grid item lg={3} md={4} xs={12}>
                    <Button variant="contained" color="success" fullWidth onClick={handleClickOpen}>Register</Button>
                    <RegistrationDialog open={open} onClose={handleClose}></RegistrationDialog>
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