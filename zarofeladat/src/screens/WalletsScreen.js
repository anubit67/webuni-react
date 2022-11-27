/* eslint-disable react/jsx-no-bind */
import { CircularProgress, Fab, Grid } from '@mui/material';
import { Container } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import MenuBar from '../components/MenuBar';
import Wallet from '../components/Wallet';
import AddWalletDialog from '../Dialogs/AddWalletDialog';
import { AXIOS_METHOD, doApiCall, useApi } from '../hooks/useApi';

export default function WalletsScreen() {
  const [open, setOpen] = React.useState(false);
  const [somethingChanged, setSomethingChanged] = React.useState(false);
  const [data, loading] = useApi(AXIOS_METHOD.GET, '/wallets', false, [somethingChanged]);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDelete(id) {
    const onSuccess = () => {
      setSomethingChanged(!somethingChanged);
      handleClose();
    };

    doApiCall(AXIOS_METHOD.DELETE, `/wallet/${id}`, onSuccess, () => handleClose());
  }

  return (
    <Container>
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
            somethingChanged={somethingChanged}
            setSomethingChanged={setSomethingChanged}
          />
        ))}
        <Grid item>
          <Fab color="primary" aria-label="add">
            <AddIcon onClick={handleOpen} />
          </Fab>
          <AddWalletDialog
            open={open}
            handleClose={handleClose}
            somethingChanged={somethingChanged}
            setSomethingChanged={setSomethingChanged}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
