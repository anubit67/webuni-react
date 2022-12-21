import {
  Fab, Grid, LinearProgress, Typography,
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
    <Box height="100%">
      <MenuBar />
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ pt: 4, pb: 23 }}>
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
          <Grid container>
            <Grid
              item
              xs={12}
              position="fixed"
              sx={{
                pb: 5,
                pr: 5,
                bottom: 0,
                right: 0,
              }}
            >
              <Fab color="primary" onClick={handleOpen} sx={{ height: 100, width: 100 }}>
                <AddIcon />
              </Fab>
              <AddWalletDialog
                open={open}
                handleClose={handleClose}
                forceWalletRefresh={forceWalletRefresh}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
