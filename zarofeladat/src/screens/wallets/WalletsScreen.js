import {
  Button, Grid, LinearProgress, Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import MenuBar from '../../components/MenuBar';
import Wallet from './component/Wallet';
import AddWalletDialog from './dialog/AddWalletDialog';
import { AXIOS_METHOD, doApiCall, useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';

export default function WalletsScreen({ filterBy }) {
  const [open, setOpen] = useState(false);
  const [data, loading, error, forceWalletRefresh] = useApi(AXIOS_METHOD.GET, '/wallets', false);

  const { sessionUser } = useAuth();

  function isOwner(name) {
    return sessionUser.name === name;
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDelete(id) {
    const onSuccess = () => {
      forceWalletRefresh();
      handleClose();
    };

    doApiCall(AXIOS_METHOD.DELETE, `/wallet/${id}`, onSuccess, () => handleClose());
  }

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <MenuBar />
        </Grid>
        {filterBy ? (data && data.filter(filterBy).map((d) => (
          <Wallet
            key={d.id}
            name={d.name}
            balance={d.balance}
            id={d.id}
            handleEvent={() => handleDelete(d.id)}
            forceWalletRefresh={forceWalletRefresh}
            isOwner={() => isOwner(d.created_by.name)}
          />
        ))) : (data && data.map((d) => (
          <Wallet
            key={d.id}
            name={d.name}
            balance={d.balance}
            id={d.id}
            handleEvent={() => handleDelete(d.id)}
            forceWalletRefresh={forceWalletRefresh}
            isOwner={() => isOwner(d.created_by.name)}
          />
        )))}
        <Grid item lg={3} md={4} xs={12}>
          <Button
            onClick={handleOpen}
            variant="contained"
            color="success"
            fullWidth
            sx={{
              height: '200px',
              transition: 'transform .5s, box-shadow 1s',
              '&:hover': {
                transform: 'scale(1.02) perspective(0px)',
              },
            }}
            elevation={2}
          >
            <Typography variant="h5">Add new wallet</Typography>
          </Button>
          <AddWalletDialog
            open={open}
            handleClose={handleClose}
            forceWalletRefresh={forceWalletRefresh}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
