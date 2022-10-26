import {
  TableRow, TableCell, IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function TableData({
  index, equipment, name, subject, onRemove,
}) {
  return (
    <TableRow>
      <TableCell>{equipment}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{subject}</TableCell>
      <TableCell>
        <IconButton
          onClick={() => onRemove(index)}
          aria-label="delete"
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default TableData;
