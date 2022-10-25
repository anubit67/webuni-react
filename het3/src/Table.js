import {
  TableRow, TableCell,
} from '@mui/material';

function TableData({ equipment, name, subject }) {
  return (
    <TableRow>
      <TableCell>{equipment}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{subject}</TableCell>
    </TableRow>
  );
}

export default TableData;
