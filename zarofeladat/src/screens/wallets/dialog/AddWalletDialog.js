import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import {
  Formik, Form, Field,
} from 'formik';
import { TextField } from 'formik-mui';
import { AXIOS_METHOD, doApiCall } from '../../../hooks/useApi';
import { basicValidator } from '../../../utils/utils';

export default function AddWalletDialog({
  open, handleClose, forceWalletRefresh: refreshWalletData,
}) {
  function onSubmit(values, { setSubmitting, setFieldError }) {
    setSubmitting(true);

    const onSuccess = () => {
      setSubmitting(false);
      refreshWalletData();
      handleClose();
    };

    const onFailure = (apiError) => {
      setSubmitting(false);
      setFieldError('name', apiError);
    };

    doApiCall(AXIOS_METHOD.PUT, '/wallet', onSuccess, onFailure, values);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Formik
        initialValues={{
          name: '',
          description: '',
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <DialogTitle variant="h5" textAlign="center" fontWeight={500}>Add new wallet</DialogTitle>
          <DialogContent>
            <Field name="name" validate={basicValidator} type="textfield" component={TextField} label="Wallet name" variant="outlined" fullWidth sx={{ pb: 3, mt: 3 }} />
            <Field name="description" type="textfield" component={TextField} label="Description" variant="outlined" multiline rows={4} fullWidth />
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
