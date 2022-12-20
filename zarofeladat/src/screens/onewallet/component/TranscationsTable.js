import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import { sortByDate } from '../../../utils/utils';
import TransactionTableRow from './TransactionTableRow';

const columns = ['Who', 'Description', 'Amount', 'Date'];

export default function TransactionsTable({
  transactionsData, onDelete, resetTransactionTable,
}) {
  return (
    <TableContainer sx={{ display: 'table', tableLayout: 'fixed' }}>
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
          {transactionsData && transactionsData.sort(sortByDate).map((transaction) => (
            <TransactionTableRow
              key={transaction.id}
              transaction={transaction}
              onDelete={onDelete}
              resetTransactionTable={resetTransactionTable}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
