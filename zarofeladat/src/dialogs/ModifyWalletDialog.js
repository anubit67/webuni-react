import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import {
  Formik, Form, Field,
} from 'formik';
import { TextField } from 'formik-mui';
import { AXIOS_METHOD, doApiCall } from '../hooks/useApi';
import { basicValidator } from '../utils/utils';

export default function ModifyWalletDialog({
  id, description, open, handleClose, forceWalletRefresh,
}) {
  const onSubmit = (values, { setSubmitting, setFieldError }) => {
    setSubmitting(true);

    const onSuccess = () => {
      setSubmitting(false);
      forceWalletRefresh();
      handleClose();
    };

    const onFailure = (apiError) => {
      setSubmitting(false);
      setFieldError('name', apiError);
    };

    doApiCall(AXIOS_METHOD.PATCH, `/wallet/${id}`, onSuccess, onFailure, values);
  };

  if (!open) {
    return null;
  }

  return (
    <Dialog open onClose={handleClose} sx={{ width: '100%' }}>
      <Formik
        initialValues={{
          description,
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <DialogTitle variant="h5" textAlign="center" fontWeight={500} fullWidth>Modify wallet description</DialogTitle>
          <DialogContent>
            <Field name="description" type="textfield" component={TextField} label="Description" variant="outlined" multiline rows={4} fullWidth validate={basicValidator} sx={{ mt: 3 }} />
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
