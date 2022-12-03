/* eslint-disable react/jsx-no-bind */
import {
  CircularProgress, Fab, Grid, Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import MenuBar from '../components/MenuBar';
import Wallet from '../components/Wallet';
import AddWalletDialog from '../Dialogs/AddWalletDialog';
import { AXIOS_METHOD, doApiCall, useApi } from '../hooks/useApi';

export default function WalletsScreen() {
  const [open, setOpen] = React.useState(false);
  const [data, loading, error, forceWalletRefresh] = useApi(AXIOS_METHOD.GET, '/wallets', false);

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

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} xs={12}>
          <MenuBar />
        </Grid>
        { loading ? <CircularProgress /> : data.map((d) => (
          <Wallet
            key={d.id}
            name={d.name}
            description={d.description}
            balance={d.balance}
            id={d.id}
            handleEvent={() => handleDelete(d.id)}
            forceWalletRefresh={forceWalletRefresh}
          />
        ))}
        <Grid item>
          <Fab color="primary" aria-label="add">
            <AddIcon onClick={handleOpen} />
          </Fab>
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
