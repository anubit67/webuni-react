/* eslint-disable max-len */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import {
  Button,
  Chip, Grid, LinearProgress, Paper, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Container } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import TransactionsTable from '../components/TranscationsTable';
import { AXIOS_METHOD, doApiCall, useApi } from '../hooks/useApi';
import AddNewUserDialog from '../Dialogs/AddUserDialog';
import AddNewTransactionDialog from '../Dialogs/AddNewTransactionDialog';
import useTransactions from '../hooks/useTransactions';
import MenuBar from '../components/MenuBar';

export default function WalletScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, usersLoading, usersError, forceUsersRefresh] = useApi(AXIOS_METHOD.GET, `/wallet/${id}`, false, id);
  const [transactions, transactionsLoading, transactionsError, onLoadMore, hasMore, resetTransactionTable] = useTransactions(id);
  const [openNewUser, setOpenNewUser] = useState(false);
  const [openNewTranscation, setOpenNewTranscation] = useState(false);

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
    return <Typography>{usersError || transactionsError}</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Grid container component={Paper} spacing={2} elevation={2}>
        <Grid item lg={12} md={12} xs={12}>
          <MenuBar />
        </Grid>
        <Grid item>
          <Grid container spacing={2} sx={{ pb: 2, pr: 2 }}>
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
              <Grid container spacing={1}>
                {usersLoading ? <LinearProgress /> : users && users?.access?.map(((user) => <Grid item key={user.id}><Chip variant="outlined" label={user.name} onDelete={() => handleAccessRemove(user.name)} /></Grid>))}
                <Grid item>
                  <Chip icon={<AddIcon />} onClick={handleNewUserOpen} variant="outlined" sx={{ minWidth: 50 }} />
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
              {transactionsLoading ? <LinearProgress /> : transactions && (
                <TransactionsTable transactionData={transactions} onDelete={handleTransactionDelete} resetTransactionTable={resetTransactionTable} />
              )}
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
        </Grid>
      </Grid>
    </Container>
  );
}
