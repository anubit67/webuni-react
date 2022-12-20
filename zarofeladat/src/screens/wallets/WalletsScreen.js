import {
  Fab, Grid, IconButton, LinearProgress, Typography,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import MenuBar from '../../components/MenuBar';
import Wallet from './component/Wallet';
import AddWalletDialog from '../../dialogs/AddWalletDialog';
import { AXIOS_METHOD, doApiCall, useApi } from '../../hooks/useApi';

export default function WalletsScreen({ filterBy }) {
  const [open, setOpen] = useState(false);
  const [data, loading, error, forceWalletRefresh] = useApi(AXIOS_METHOD.GET, '/wallets', false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <Box>
      <MenuBar />
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ pt: 3, pb: 3 }}>
          {filterBy ? (data && data.filter(filterBy).map((d) => (
            <Wallet
              key={d.id}
              name={d.name}
              description={d.description}
              balance={d.balance}
              id={d.id}
              handleEvent={() => handleDelete(d.id)}
              forceWalletRefresh={forceWalletRefresh}
              owner={d.created_by.name}
            />
          ))) : (data && data.map((d) => (
            <Wallet
              key={d.id}
              name={d.name}
              description={d.description}
              balance={d.balance}
              id={d.id}
              handleEvent={() => handleDelete(d.id)}
              forceWalletRefresh={forceWalletRefresh}
              owner={d.created_by.name}
            />
          )))}
          <Grid item lg={3} md={4} xs={12} textAlign="center" sx={{ height: 225 }}>
            <Fab color="secondary">
              <IconButton onClick={handleOpen}>
                <AddIcon />
              </IconButton>
            </Fab>
            <AddWalletDialog
              open={open}
              handleClose={handleClose}
              forceWalletRefresh={forceWalletRefresh}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
