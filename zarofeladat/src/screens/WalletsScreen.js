/* eslint-disable */

import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import MenuBar from '../components/MenuBar';
import Wallet from '../components/Wallet';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import WalletDialog from '../Dialogs/WalletDialog';

const wallets = [{name: 'wallet1', balance: 1000}, {name: 'wallet2', balance: 2000}, {name: 'wallet3', balance: 3000}, {name: 'wallet4', balance: 4000}];

export default function WalletsScreen() {
  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} xs={12}>
          <MenuBar/>
        </Grid>
        { wallets.map((wallet, idx) => {
          return <Wallet key={idx} name={wallet.name} balance={wallet.balance}/>
          })
        }
        <Grid item>
          <AddIcon onClick={handleOpen}></AddIcon>
          <WalletDialog open={open} handleClose={handleClose}></WalletDialog>
        </Grid>
      </Grid>
    </Container>
  );
}
