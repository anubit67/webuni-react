import { useState } from 'react';
import {
  Button,
  Chip, Grid, LinearProgress, Paper, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Box, Container } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import TransactionsTable from './component/TranscationsTable';
import { AXIOS_METHOD, doApiCall, useApi } from '../../hooks/useApi';
import AddNewTransactionDialog from '../../dialogs/AddNewTransactionDialog';
import useTransactions from '../../hooks/useTransactions';
import MenuBar from '../../components/MenuBar';
import AddNewUserDialog from '../../dialogs/AddUserDialog';
import UserChip from './component/UserChip';

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
    <Box>
      <MenuBar />
      <Container maxWidth="lg" sx={{ pt: 3, pb: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Grid container>
            <Grid item>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant="h4" textAlign="center">{walletData?.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} elevation={1}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Description</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" sx={{ minHeight: 50, pb: 2, pr: 2 }}>{walletData?.description}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} elevation={1}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Users</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        {walletDataLoading
                          ? <LinearProgress />
                          : walletData && walletData?.access?.map((user) => (
                            <UserChip
                              key={user.id}
                              id={user.id}
                              name={user.name}
                              walletData={walletData}
                              handleAccessRemove={handleAccessRemove}
                            />
                          ))}
                        <Grid item>
                          <Chip icon={<AddIcon />} onClick={handleNewUserOpen} label="Add user" variant="outlined" />
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
                <Grid item xs={12}>
                  <Grid container spacing={2} elevation={1}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Transactions</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ overflowX: 'auto', overflowY: 'hidden' }}>
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
            <Grid item xs={12} sx={{ pt: 3 }}>
              <Grid container>
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary" onClick={onLoadMore} fullWidth>Load more</Button>
                </Grid>
              </Grid>
            </Grid>
            )}
            <Grid item xs={12} sx={{ pt: 2 }}>
              <Grid container>
                <Grid item xs={6} sx={{ pr: 2 }}>
                  <Button variant="contained" onClick={handleNewTranscationOpen} fullWidth>Add new transaction</Button>
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
        </Paper>
      </Container>
    </Box>
  );
}
