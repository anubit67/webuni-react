import {
  Button, Dialog, DialogActions, DialogTitle,
} from '@mui/material';

export default function ConfirmDialog({
  title, open, handleClose, handleEvent,
}) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle variant="h5" textAlign="center" fontWeight={500}>{title}</DialogTitle>
      <DialogActions sx={{ pl: 3, pr: 3, pb: 3 }}>
        <Button variant="contained" fullWidth onClick={handleEvent}>Yes</Button>
        <Button variant="contained" color="error" fullWidth onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
