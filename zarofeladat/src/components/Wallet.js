/* eslint-disable react/jsx-no-bind */
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';
import ModifyWalletDialog from '../Dialogs/ModifyWalletDialog';

export default function Wallet({
  name, description, balance, id, handleEvent, forceWalletRefresh,
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();

  function handleDeleteOpen() {
    setOpenDelete(true);
  }

  function handleDeleteClose() {
    setOpenDelete(false);
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
            {description}
          </Typography>
          <Typography>
            Balance:
            {' '}
            {balance}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => navigate(`/wallet/${id}`)}>Details</Button>
          <Box sx={{ flexGrow: 1 }} />
          <EditIcon onClick={handleEditOpen} />
          <ModifyWalletDialog
            id={id}
            open={openEdit}
            handleClose={handleEditClose}
            forceWalletRefresh={forceWalletRefresh}
          />
          <DeleteIcon onClick={handleDeleteOpen} />
          <ConfirmDialog title={`Are you sure you want to delete ${name}?`} open={openDelete} handleClose={handleDeleteClose} handleEvent={handleEvent} id={id} />
        </CardActions>
      </Card>
    </Grid>
  );
}
