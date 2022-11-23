import {
  Button, Dialog, DialogActions, DialogTitle,
} from '@mui/material';

export default function ConfirmDialog({
  title, open, handleClose, handleEvent,
}) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button variant="contained" fullWidth onClick={handleEvent}>Yes</Button>
        <Button variant="contained" color="error" fullWidth onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
