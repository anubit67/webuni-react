/* eslint-disable camelcase */
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  IconButton, TableCell, TableRow, Typography,
} from '@mui/material';
import { useState } from 'react';
import ModifyTransactionDialog from '../dialog/ModifyTransactionDialog';
import { renderAmount, formatDate } from '../../../utils/utils';
import { useAuth } from '../../../hooks/useAuth';

export default function TransactionTableRow({ transaction, resetTransactionTable, onDelete }) {
  const [openModifyTransaction, setModifyTransaction] = useState(false);
  const [style, setStyle] = useState({ display: 'none' });
  const {
    id, created_by, title, amount, created_at,
  } = transaction;
  const { sessionUser } = useAuth();

  function isOwner(name) {
    return sessionUser.name === name;
  }

  function handleModifyTranscationOpen() {
    setModifyTransaction(true);
  }

  function handleModifyTranscationClose() {
    setModifyTransaction(false);
  }

  return (
    <TableRow
      key={id}
      sx={{
        height: '75px',
        transition: 'transform .5s, box-shadow 1s',
        '&:hover': {
          transform: 'scale(1.02) perspective(0px)',
        },
      }}
      onMouseEnter={() => setStyle({ display: 'inline-flex' })}
      onMouseLeave={() => setStyle({ display: 'none' })}
    >
      <TableCell>
        <Typography>{created_by.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{title}</Typography>
      </TableCell>
      <TableCell>{renderAmount(amount)}</TableCell>
      <TableCell>
        <Typography>{formatDate(created_at)}</Typography>
      </TableCell>
      {isOwner(created_by.name)
        ? (
          <TableCell align="right" sx={{ minWidth: '120px' }}>
            <IconButton onClick={handleModifyTranscationOpen} sx={style}>
              <EditIcon />
            </IconButton>
            {openModifyTransaction && (
            <ModifyTransactionDialog
              id={id}
              open={openModifyTransaction}
              handleClose={handleModifyTranscationClose}
              resetTransactionTable={resetTransactionTable}
            />
            )}
            <IconButton onClick={() => onDelete(id)} sx={style}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        ) : (<TableCell />)}
    </TableRow>
  );
}
