import { Button, Grid, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../../components/ConfirmDialog';
import ModifyWalletDialog from '../dialog/ModifyWalletDialog';
import { renderAmount } from '../../../utils/utils';

export default function Wallet({
  name, balance, id, handleEvent, forceWalletRefresh, isOwner,
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [style, setStyle] = useState({ display: 'none' });
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
      <Card
        sx={{
          minHeight: 200,
          transition: 'transform .5s, box-shadow 1s',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
        elevation={2}
        onMouseEnter={() => setStyle({ display: 'inline-flex' })}
        onMouseLeave={() => setStyle({ display: 'none' })}
      >
        <CardContent>
          <Grid container justifyContent="center">
            <Grid item>
              <Button color="inherit" onClick={() => navigate(`/wallet/${id}`)}>
                <Typography fontWeight="400" fontSize="1.5rem">
                  {name}
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="column" justifyContent="flex-end">
            <Grid item>
              <Typography sx={{ pt: 2 }}>
                Balance
              </Typography>
            </Grid>
            <Grid item>
              {renderAmount(balance)}
            </Grid>
          </Grid>
        </CardContent>
        {isOwner()
          ? (
            <CardActions>
              <Grid container>
                <Grid item>
                  <IconButton onClick={() => navigate(`/wallet/${id}`)} sx={style}>
                    <InfoIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <IconButton onClick={handleEditOpen} sx={style}>
                    <EditIcon />
                  </IconButton>
                  <ModifyWalletDialog
                    id={id}
                    open={openEdit}
                    handleClose={handleEditClose}
                    forceWalletRefresh={forceWalletRefresh}
                  />
                </Grid>
                <Grid item>
                  <IconButton onClick={handleDeleteOpen} sx={style}>
                    <DeleteIcon />
                  </IconButton>
                  <ConfirmDialog title={`Are you sure you want to delete ${name}?`} open={openDelete} handleClose={handleDeleteClose} handleEvent={handleEvent} id={id} />
                </Grid>
              </Grid>
            </CardActions>
          )
          : (
            <CardActions>
              <Grid container>
                <Grid item>
                  <IconButton onClick={() => navigate(`/wallet/${id}`)} sx={style}>
                    <InfoIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </CardActions>
          )}
      </Card>
    </Grid>
  );
}
