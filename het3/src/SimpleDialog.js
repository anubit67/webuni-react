import { Dialog, DialogTitle } from '@mui/material';

function SimpleDialog({ open, onClose }) {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Details</DialogTitle>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Etiam tempor orci eu lobortis elementum.
        Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in.
        Purus non enim praesent elementum facilisis.
        Adipiscing elit pellentesque habitant morbi tristique senectus et netus et.
      </Dialog>
    </div>
  );
}

export default SimpleDialog;
