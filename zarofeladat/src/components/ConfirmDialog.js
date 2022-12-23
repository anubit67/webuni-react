import {
  Button, Dialog, DialogActions, DialogTitle,
} from '@mui/material';

export default function ConfirmDialog({
  title, open, handleClose, handleEvent,
}) {
  if (!open) {
    return null;
  }

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle variant="h5" textAlign="center" fontWeight={500}>{title}</DialogTitle>
      <DialogActions sx={{ pl: 3, pr: 3, pb: 3 }}>
        <Button variant="contained" fullWidth onClick={handleEvent}>Yes</Button>
        <Button variant="contained" color="secondary" fullWidth onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
