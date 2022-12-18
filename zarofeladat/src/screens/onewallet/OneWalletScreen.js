import { useState } from 'react';
import {
  Button,
  Chip, Grid, LinearProgress, Paper, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Container } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import TransactionsTable from './component/TranscationsTable';
import { AXIOS_METHOD, doApiCall, useApi } from '../../hooks/useApi';
import AddNewTransactionDialog from '../../dialogs/AddNewTransactionDialog';
import useTransactions from '../../hooks/useTransactions';
import MenuBar from '../../components/MenuBar';
import AddNewUserDialog from '../../dialogs/AddUserDialog';

export default function OneWalletScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [walletData, walletDataLoading, walletDataError, refreshWalletData] = useApi(AXIOS_METHOD.GET, `/wallet/${id}`, false, id);
  const [transactionsData,
    transactionsDataLoading,
    transactionsDataError,
    onLoadMore,
    hasMore,
    resetTransactionTable] = useTransactions(id);
  const [openNewUser, setOpenNewUser] = useState(false);
  const [openNewTranscation, setOpenNewTranscation] = useState(false);

  const handleNewUserOpen = () => {
    setOpenNewUser(true);
  };

  const handleNewUserClose = () => {
    setOpenNewUser(false);
  };

  const handleNewTranscationOpen = () => {
    setOpenNewTranscation(true);
  };

  const handleNewTranscationClose = () => {
    setOpenNewTranscation(false);
  };

  const handleAccessRemove = (name) => {
    doApiCall(AXIOS_METHOD.POST, '/user/search', (userId) => {
      doApiCall(AXIOS_METHOD.POST, `/wallet/${id}/remove_access`, () => refreshWalletData(), false, { user_id: userId });
    }, false, { name });
  };

  const handleTransactionDelete = (transactionId) => {
    doApiCall(AXIOS_METHOD.DELETE, `/transaction/${transactionId}`, () => resetTransactionTable());
  };

  if (walletDataError || transactionsDataError) {
    return <Typography>{walletDataError || transactionsDataError}</Typography>;
  }

  return (
    <>
      <MenuBar />
      <Container maxWidth="lg">
        <Grid container component={Paper} elevation={2} sx={{ mt: 3 }}>
          <Grid item sx={{ m: 2 }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h4" textAlign="center">{walletData?.name}</Typography>
              </Grid>
              <Grid item xs={12} sx={{ ml: 2 }}>
                <Grid container component={Paper} spacing={2} elevation={1}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Description</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" sx={{ minHeight: 50, pb: 2, pr: 2 }}>{walletData?.description}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ ml: 2 }}>
                <Grid container component={Paper} spacing={2} elevation={1}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Users</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 2 }}>
                    <Grid container spacing={1}>
                      {walletDataLoading
                        ? <LinearProgress />
                        : walletData && walletData?.access?.map(((user) => (
                          walletData.access.length === 1
                            ? <Grid item key={user.id}><Chip variant="outlined" label={user.name} /></Grid>
                            : <Grid item key={user.id}><Chip variant="outlined" label={user.name} onDelete={() => handleAccessRemove(user.name)} /></Grid>)))}
                      <Grid item>
                        <Chip icon={<AddIcon />} onClick={handleNewUserOpen} variant="outlined" sx={{ minWidth: 50 }} />
                      </Grid>
                    </Grid>
                    <AddNewUserDialog
                      open={openNewUser}
                      handleClose={handleNewUserClose}
                      id={id}
                      forceUsersRefresh={refreshWalletData}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ ml: 2 }}>
                <Grid container component={Paper} spacing={2} elevation={1}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Transactions</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {transactionsDataLoading ? <LinearProgress /> : transactionsData && (
                    <TransactionsTable
                      transactionsData={transactionsData}
                      onDelete={handleTransactionDelete}
                      resetTransactionTable={resetTransactionTable}
                    />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {hasMore && (
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} sx={{ ml: 2, mr: 2 }}>
                <Button variant="contained" onClick={onLoadMore} fullWidth>Load more</Button>
              </Grid>
            </Grid>
          </Grid>
          )}
          <Grid item xs={12} sx={{ m: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button variant="contained" onClick={handleNewTranscationOpen} color="success" fullWidth>Add new transaction</Button>
                {openNewTranscation && (
                <AddNewTransactionDialog
                  open={openNewTranscation}
                  handleClose={handleNewTranscationClose}
                  id={id}
                  resetTransactionTable={resetTransactionTable}
                />
                )}
              </Grid>
              <Grid item xs={6}>
                <Button onClick={() => navigate('/wallets')} variant="contained" color="error" fullWidth>Back</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
