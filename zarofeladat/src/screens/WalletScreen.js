/* eslint-disable max-len */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import {
  Button,
  Chip, Grid, LinearProgress, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Container } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import BasicTable from '../components/BasicTable';
import { AXIOS_METHOD, doApiCall, useApi } from '../hooks/useApi';
import AddNewUserDialog from '../Dialogs/AddUserDialog';
import AddNewTransactionDialog from '../Dialogs/AddNewTransactionDialog';
import useTransactions from './useTransactions';

export default function WalletScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, usersLoading, usersError, forceUsersRefresh] = useApi(AXIOS_METHOD.GET, `/wallet/${id}`, false, id);
  const [transactions, transactionsLoading, transactionsError, onLoadMore, hasMore, resetTransactionTable] = useTransactions(id);
  const [openNewUser, setOpenNewUser] = useState(false);
  const [openNewTranscation, setOpenNewTranscation] = useState(false);

  console.log(transactions);

  function handleNewUserOpen() {
    setOpenNewUser(true);
  }

  function handleNewUserClose() {
    setOpenNewUser(false);
  }

  function handleNewTranscationOpen() {
    setOpenNewTranscation(true);
  }

  function handleNewTranscationClose() {
    setOpenNewTranscation(false);
  }

  function handleAccessRemove(name) {
    doApiCall(AXIOS_METHOD.POST, '/user/search', (userId) => {
      doApiCall(AXIOS_METHOD.POST, `/wallet/${id}/remove_access`, () => forceUsersRefresh(), false, { user_id: userId });
    }, false, { name });
  }

  function handleTransactionDelete(transactionId) {
    doApiCall(AXIOS_METHOD.DELETE, `/transaction/${transactionId}`, () => resetTransactionTable());
  }

  if (usersError || transactionsError) {
    <Typography>{usersError || transactionsError}</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">{users?.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{users?.description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Users</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            {usersLoading ? <LinearProgress /> : users && users?.access?.map(((user) => <Grid item><Chip variant="outlined" label={user.name} onDelete={() => handleAccessRemove(user.name)} /></Grid>))}
            <Grid item>
              <Chip component={AddIcon} onClick={handleNewUserOpen} variant="outlined" />
            </Grid>
          </Grid>
          <AddNewUserDialog
            open={openNewUser}
            handleClose={handleNewUserClose}
            id={id}
            forceUsersRefresh={forceUsersRefresh}
          />
        </Grid>
        <Grid item xs={12}>
          {transactionsLoading ? <LinearProgress /> : transactions && <BasicTable transactionData={transactions} onDelete={handleTransactionDelete} />}
        </Grid>
        <Grid item xs={12}>
          {hasMore && <Button variant="contained" onClick={onLoadMore} fullWidth>Load more</Button>}
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button variant="contained" onClick={handleNewTranscationOpen} color="success" fullWidth>Add new transaction</Button>
              <AddNewTransactionDialog
                open={openNewTranscation}
                handleClose={handleNewTranscationClose}
                id={id}
                resetTransactionTable={resetTransactionTable}
              />
            </Grid>
            <Grid item xs={6}>
              <Button onClick={() => navigate('/wallets')} variant="contained" color="error" fullWidth>Back</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
