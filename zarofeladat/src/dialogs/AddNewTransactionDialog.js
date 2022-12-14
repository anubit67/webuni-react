import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import {
  Formik, Form, Field,
} from 'formik';
import { TextField } from 'formik-mui';
import { AXIOS_METHOD, doApiCall } from '../hooks/useApi';
import { basicValidator } from '../utils/utils';

export default function AddNewTransactionDialog({
  open, handleClose, id, resetTransactionTable,
}) {
  const onSubmit = ({ title, amount }, { setSubmitting, setFieldError }) => {
    setSubmitting(true);

    const onSuccess = () => {
      setSubmitting(false);
      resetTransactionTable();
      handleClose();
    };

    const onFailure = (apiError) => {
      setSubmitting(false);
      setFieldError('title', apiError);
    };

    doApiCall(AXIOS_METHOD.PUT, '/transactions', onSuccess, onFailure, { wallet_id: id, title, amount });
  };

  if (!open) {
    return null;
  }

  return (
    <Dialog open onClose={handleClose}>
      <Formik
        initialValues={{
          title: '',
          amount: 0,
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <DialogTitle variant="h5" textAlign="center" fontWeight={500}>Add transaction</DialogTitle>
          <DialogContent>
            <Field name="title" type="textfield" component={TextField} label="Description" variant="outlined" fullWidth validate={basicValidator} sx={{ pb: 3, mt: 3 }} />
            <Field name="amount" type="number" component={TextField} label="Amount" variant="outlined" fullWidth validate={basicValidator} />
          </DialogContent>
          <DialogActions sx={{ pl: 3, pr: 3, pb: 3 }}>
            <Button type="submit" variant="contained" fullWidth>Add</Button>
            <Button variant="contained" color="secondary" fullWidth onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
}
