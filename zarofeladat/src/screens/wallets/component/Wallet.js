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
import { DISPLAY_INLINE_FLEX, DISPLAY_NONE, renderAmount } from '../../../utils/utils';
import { useAuth } from '../../../hooks/useAuth';

export default function Wallet({
  name, description, balance, id, handleEvent, forceWalletRefresh, owner,
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [style, setStyle] = useState(DISPLAY_NONE);
  const { sessionUser } = useAuth();
  const navigate = useNavigate();

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  return (
    <Grid item lg={3} md={4} xs={12}>
      <Card
        sx={{
          minHeight: 225,
          transition: 'transform .5s, box-shadow 1s',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
        elevation={2}
        onMouseEnter={() => setStyle(DISPLAY_INLINE_FLEX)}
        onMouseLeave={() => setStyle(DISPLAY_NONE)}
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
          <Grid container>
            <Grid item>
              <Typography sx={{
                textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
              }}
              >
                {description}
              </Typography>
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
        {(sessionUser.name === owner)
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
