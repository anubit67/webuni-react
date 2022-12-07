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
      <Card sx={{ minWidth: 275, minHeight: 175 }} elevation={2}>
        <CardContent>
          <Typography variant="h5">
            {name}
          </Typography>
          <Typography>
            Balance:
            {renderBalance(balance)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => navigate(`/wallet/${id}`)}>Details</Button>
          <Box sx={{ flexGrow: 1 }} />
          {isOwner() && (
            <>
              <Button onClick={handleEditOpen}>
                <EditIcon />
              </Button>
              <ModifyWalletDialog
                id={id}
                open={openEdit}
                handleClose={handleEditClose}
                forceWalletRefresh={forceWalletRefresh}
              />
              <Button onClick={handleDeleteOpen}>
                <DeleteIcon />
              </Button>
              <ConfirmDialog title={`Are you sure you want to delete ${name}?`} open={openDelete} handleClose={handleDeleteClose} handleEvent={handleEvent} id={id} />
            </>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
