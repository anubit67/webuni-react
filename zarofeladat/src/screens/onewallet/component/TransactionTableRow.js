/* eslint-disable camelcase */
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  IconButton, TableCell, TableRow, Typography,
} from '@mui/material';
import { useState } from 'react';
import {
  formatDate, DISPLAY_INLINE_FLEX, DISPLAY_NONE,
} from '../../../utils/utils';
import { useAuth } from '../../../hooks/useAuth';
import RenderAmount from '../../../components/RenderAmount';
import ModifyTransactionDialog from '../../../dialogs/ModifyTransactionDialog';

export default function TransactionTableRow({ transaction, resetTransactionTable, onDelete }) {
  const [openModifyTransaction, setModifyTransaction] = useState(false);
  const [style, setStyle] = useState({ display: 'none' });
  const {
    id, created_by, title, amount, created_at,
  } = transaction;
  const { sessionUser } = useAuth();

  const handleModifyTranscationOpen = () => {
    setModifyTransaction(true);
  };

  const handleModifyTranscationClose = () => {
    setModifyTransaction(false);
  };

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
      onMouseEnter={() => setStyle(DISPLAY_INLINE_FLEX)}
      onMouseLeave={() => setStyle(DISPLAY_NONE)}
    >
      <TableCell>
        <Typography>{created_by.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{title}</Typography>
      </TableCell>
      <TableCell><RenderAmount amount={amount} /></TableCell>
      <TableCell>
        <Typography>{formatDate(created_at)}</Typography>
      </TableCell>
      {(sessionUser.name === created_by.name)
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
