import {
  Button,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const columns = ['Who', 'Description', 'Amount', 'Date'];

export default function BasicTable({ transactionData, onDelete }) {
  function sortByDate(a, b) {
    if (a.created_at > b.created_at) {
      return -1;
    }
    if (a.created_at < b.created_at) {
      return 1;
    }
    return 0;
  }

  function formatDate(dateString) {
    return new Date(dateString).toUTCString();
  }

  return (
    <TableContainer component={Paper} elevation={1}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => <TableCell>{column}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionData.sort(sortByDate).map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.created_by.name}</TableCell>
              <TableCell>{transaction.title}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{formatDate(transaction.created_at)}</TableCell>
              <Button><EditIcon /></Button>
              <Button><DeleteIcon onClick={() => onDelete(transaction.id)} /></Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
