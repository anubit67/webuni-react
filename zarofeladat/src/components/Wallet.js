/* eslint-disable react/jsx-no-bind */
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import ConfirmDialog from './ConfirmDialog';

export default function Wallet({ name, balance }) {
  const [openDelete, setOpenDelete] = React.useState(false);

  function handleOpenDelete() {
    setOpenDelete(true);
  }

  function handleCloseDelete() {
    setOpenDelete(false);
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
          <Button onClick={console.log()}>Details</Button>
          <DeleteIcon onClick={handleOpenDelete} />
          <ConfirmDialog title={`Are you sure you want to delete ${name}?`} open={openDelete} handleClose={handleCloseDelete} />
        </CardActions>
      </Card>
    </Grid>
  );
}
