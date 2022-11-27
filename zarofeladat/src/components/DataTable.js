import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: 'fullName',
    headerName: 'Name',
    description: 'This column has a value getter and is not sortable.',
    width: 90,
  },
  {
    field: 'description',
    headerName: 'Description',
    sortable: false,
    width: 160,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    width: 90,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 120,
  },
];

const rows = [
  {
    id: 1, fullName: 'User1', amount: 1000, description: 'Lorem ipsum', date: '2022.11.22',
  },
  {
    id: 2, fullName: 'User2', amount: 2000, description: 'Asdasd', date: '2022.11.21',
  },
  {
    id: 3, fullName: 'User3', amount: 3000, description: 'asdasd', date: '2022.11.23',
  },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
