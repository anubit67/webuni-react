/* eslint-disable react/jsx-no-bind */
import {
  IconButton,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ModifyTransactionDialog from '../Dialogs/ModifyTransactionDialog';
import { useAuth } from '../hooks/useAuth';

const columns = ['Who', 'Description', 'Amount', 'Date'];

export default function TransactionsTable({
  transactionsData, onDelete, resetTransactionTable,
}) {
  const [openModifyTransaction, setModifyTransaction] = useState(false);
  const { sessionUser } = useAuth();

  function handleModifyTranscationOpen() {
    setModifyTransaction(true);
  }

  function handleModifyTranscationClose() {
    setModifyTransaction(false);
  }

  const isOwner = (name) => sessionUser.name === name;

  function sortByDate(a, b) {
    if (a.created_at > b.created_at) {
      return -1;
    }
    if (a.created_at < b.created_at) {
      return 1;
    }
    return 0;
  }

  function renderAmount(a) {
    if (a < 0) {
      return <Typography color="red">{a}</Typography>;
    }
    if (a > 0) {
      return <Typography color="green">{a}</Typography>;
    }
    return <Typography>{a}</Typography>;
  }

  function formatDate(dateString) {
    return new Date(dateString).toUTCString();
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, idx) => (
              <TableCell key={idx}>
                <Typography>{column}</Typography>
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionsData.sort(sortByDate).map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <Typography>{transaction.created_by.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{transaction.title}</Typography>
              </TableCell>
              <TableCell>{renderAmount(transaction.amount)}</TableCell>
              <TableCell>
                <Typography>{formatDate(transaction.created_at)}</Typography>
              </TableCell>
              {isOwner(transaction.created_by.name)
                ? (
                  <TableCell align="right">
                    <IconButton onClick={handleModifyTranscationOpen}>
                      <EditIcon />
                    </IconButton>
                    <ModifyTransactionDialog
                      id={transaction.id}
                      open={openModifyTransaction}
                      handleClose={handleModifyTranscationClose}
                      resetTransactionTable={resetTransactionTable}
                    />
                    <IconButton onClick={() => onDelete(transaction.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                ) : (<TableCell />)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
