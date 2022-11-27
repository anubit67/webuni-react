/* eslint-disable react/jsx-no-bind */
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { Box } from '@mui/system';
import ConfirmDialog from './ConfirmDialog';
import WalletDialog from '../Dialogs/WalletDialog';
import ModifyWalletDialog from '../Dialogs/ModifyWalletDialog';

export default function Wallet({
  name, balance, id, handleEvent, somethingChanged, setSomethingChanged,
}) {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openDetails, setOpenDetails] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  function handleDeleteOpen() {
    setOpenDelete(true);
  }

  function handleDeleteClose() {
    setOpenDelete(false);
  }

  function handleDetailsOpen() {
    setOpenDetails(true);
  }

  function handleDetailsClose() {
    setOpenDetails(false);
  }

  function handleEditOpen() {
    setOpenEdit(true);
  }

  function handleEditClose() {
    setOpenEdit(false);
  }

  return (
    <Grid item lg={3} md={4} xs={12}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h4">
            {name}
          </Typography>
          <Typography>
            Balance:
            {' '}
            {balance}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleDetailsOpen}>Details</Button>
          <WalletDialog name={name} open={openDetails} handleClose={handleDetailsClose} />
          <Box sx={{ flexGrow: 1 }} />
          <EditIcon onClick={handleEditOpen} />
          <ModifyWalletDialog
            id={id}
            open={openEdit}
            handleClose={handleEditClose}
            somethingChanged={somethingChanged}
            setSomethingChanged={setSomethingChanged}
          />
          <DeleteIcon onClick={handleDeleteOpen} />
          <ConfirmDialog title={`Are you sure you want to delete ${name}?`} open={openDelete} handleClose={handleDeleteClose} handleEvent={handleEvent} id={id} />
        </CardActions>
      </Card>
    </Grid>
  );
}
