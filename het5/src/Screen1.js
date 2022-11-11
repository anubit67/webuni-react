/* eslint-disable consistent-return */
import {
  Button, Container, Grid, Typography,
} from '@mui/material';
import {
  Formik, Form, Field, useFormikContext,
} from 'formik';
import { TextField } from 'formik-mui';
import { useState } from 'react';

function usermameValidator(value) {
  const pattern = /^[a-zA-Z0-9]{3,20}$/;
  if (!pattern.test(value)) {
    return 'A felhasznalonev csak betubol es szambol allhat, minimum 3 es maximum 20 karakter hosszu lehet';
  }
}

function emailValidator(value) {
  const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!pattern.test(value)) {
    return 'Az email cim nem megfelelo.';
  }
}

function passwordValidator(value) {
  const pattern = /(?=^.{5,})(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\d+).*/;
  if (!pattern.test(value)) {
    return `
      A jelszo nem megfelelo.
      A jelszonak meg kell felelnie az alabbi kriteriumoknak:
      Legalabb 5 karakter
      Legalabb 1 kis es nagybetu valamint szam legyen benne
      `;
  }
}

function passwordAgainValidator(values) {
  const { password, passwordAgain } = values;
  if (password !== passwordAgain) {
    return { passwordAgain: 'A jelszo nem egyezik meg' };
  }
}

function ShowData() {
  const { values } = useFormikContext();
  return <Typography variant="body1">{JSON.stringify(values)}</Typography>;
}

function Screen1() {
  const [data, setData] = useState();
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Formik
            initialValues={{
              username: 'ASd123', emailAddress: 'asdfda@asdasd.com', password: 'ASd123', passwordAgain: 'ASd123',
            }}
            onSubmit={(values, formik) => {
              formik.setSubmitting(true);
              setTimeout(() => {
                formik.setSubmitting(false);
                setData(values);
              }, 1000);
            }}
            validate={passwordAgainValidator}
          >
            <Form>
              {data ? <ShowData /> : <Typography variant="h3">No data yet</Typography>}
              <Field name="username" type="textfield" validate={usermameValidator} component={TextField} label="Username" variant="filled" />
              <br />
              <Field name="emailAddress" validate={emailValidator} type="textfield" component={TextField} label="Email address" variant="filled" />
              <br />
              <Field name="password" validate={passwordValidator} type="textfield" component={TextField} label="Password" variant="filled" />
              <br />
              <Field name="passwordAgain" validate={passwordAgainValidator} type="textfield" component={TextField} label="Password again" variant="filled" />
              <br />
              <Button type="Submit" color="primary" variant="contained">Submit</Button>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Screen1;
