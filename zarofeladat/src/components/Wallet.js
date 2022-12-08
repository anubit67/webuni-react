/* eslint-disable react/jsx-no-bind */
import { Grid, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';
import ModifyWalletDialog from '../Dialogs/ModifyWalletDialog';

export default function Wallet({
  name, balance, id, handleEvent, forceWalletRefresh, isOwner,
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

  function renderBalance(b) {
    if (b < 0) {
      return <Typography color="red">{b}</Typography>;
    }
    if (b > 0) {
      return <Typography color="green">{b}</Typography>;
    }
    return <Typography>{b}</Typography>;
  }

  return (
    <Grid item lg={3} md={4} xs={12}>
      <Card sx={{ minHeight: 175 }} elevation={2}>
        <CardContent onClick={() => navigate(`/wallet/${id}`)}>
          <Typography>
            {name}
          </Typography>
          <Typography>
            Balance:
            {' '}
            {renderBalance(balance)}
          </Typography>
        </CardContent>
        {isOwner() && (
          <CardActions>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton onClick={handleEditOpen}>
              <EditIcon />
            </IconButton>
            <ModifyWalletDialog
              id={id}
              open={openEdit}
              handleClose={handleEditClose}
              forceWalletRefresh={forceWalletRefresh}
            />
            <IconButton onClick={handleDeleteOpen}>
              <DeleteIcon />
            </IconButton>
            <ConfirmDialog title={`Are you sure you want to delete ${name}?`} open={openDelete} handleClose={handleDeleteClose} handleEvent={handleEvent} id={id} />
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}
