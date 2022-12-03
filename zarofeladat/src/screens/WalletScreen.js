/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import {
  Chip, CircularProgress, Grid, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Container } from '@mui/system';
import { useParams } from 'react-router-dom';
import DataTable from '../components/DataTable';
import { AXIOS_METHOD, doApiCall, useApi } from '../hooks/useApi';
import AddNewUserDialog from '../Dialogs/AddUserDialog';

export default function WalletScreen() {
  const { id } = useParams();
  const [data, loading, error, forceUsersRefresh] = useApi(AXIOS_METHOD.GET, `/wallet/${id}`, false, id);
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  function handleDelete(name) {
    console.log(name);
    doApiCall(AXIOS_METHOD.POST, '/user/search', (userId) => {
      console.log(userId);
      doApiCall(AXIOS_METHOD.POST, `/wallet/${id}/remove_access`, () => forceUsersRefresh(), false, { user_id: userId });
    }, false, { name });
  }

  if (loading) {
    <CircularProgress />;
  }

  if (error) {
    <Typography>{error}</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h2">{data?.name}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">{data?.description}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">Users</Typography>
        </Grid>
        <Grid item>
          {data?.access?.map(((user) => <Chip variant="outlined" label={user.name} onDelete={() => handleDelete(user.name)} />))}
          <AddIcon onClick={handleOpen} />
          <AddNewUserDialog
            open={open}
            handleClose={handleClose}
            id={id}
            forceUsersRefresh={forceUsersRefresh}
          />
        </Grid>
        <Grid item>
          <DataTable />
        </Grid>
      </Grid>
    </Container>
  );
}
