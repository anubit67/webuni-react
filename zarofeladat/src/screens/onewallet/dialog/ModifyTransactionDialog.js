import {
  Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography,
} from '@mui/material';
import {
  Formik, Form, Field,
} from 'formik';
import { TextField } from 'formik-mui';
import { AXIOS_METHOD, doApiCall, useApi } from '../../../hooks/useApi';
import { basicValidator } from '../../../utils/utils';

export default function modifyTransactionDialog({
  open, handleClose, id, resetTransactionTable,
}) {
  const [data, loading, error] = useApi(AXIOS_METHOD.GET, `/transaction/${id}`);

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

    doApiCall(AXIOS_METHOD.PATCH, `/transaction/${id}`, onSuccess, onFailure, { wallet_id: id, title, amount });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!open) {
    return null;
  }

  return (
    <Dialog open onClose={handleClose}>
      <Formik
        initialValues={{ title: data?.title, amount: data?.amount }}
        onSubmit={onSubmit}
      >
        <Form>
          <DialogTitle variant="h5" textAlign="center" fontWeight={500}>Modify transaction</DialogTitle>
          <DialogContent>
            <Field name="title" type="textfield" component={TextField} label="Description" variant="outlined" fullWidth validate={basicValidator} sx={{ pb: 3, mt: 3 }} />
            <Field name="amount" type="number" component={TextField} label="Amount" variant="outlined" fullWidth validate={basicValidator} />
          </DialogContent>
          <DialogActions sx={{ pl: 3, pr: 3, pb: 3 }}>
            <Button type="submit" variant="contained" fullWidth>Modify</Button>
            <Button variant="contained" color="error" fullWidth onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
}
