/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {
  Avatar, Chip, Dialog, DialogContent, DialogTitle, Typography,
} from '@mui/material';
import DataTable from '../components/DataTable';

export default function WalletDialog({ name, open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { width: '100%', height: 'auto' } }}>
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        <Typography>Users</Typography>
        <Chip variant="outlined" avatar={<Avatar>F</Avatar>} />
        <DataTable />
      </DialogContent>
    </Dialog>
  );
}
