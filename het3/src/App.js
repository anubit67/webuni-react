import {
  Container, Grid, Paper, Table, TableHead, TableCell, TableRow, TableBody,
} from '@mui/material';
import { useEffect, useState } from 'react';
import data from './data';
import TableData from './TableData';
import Picture from './Picture';
import MyForm from './MyForm';

function App() {
  const [tableData, setTableData] = useState(data);
  const gridStyles = {
    paddingBottom: 2,
    paddingRight: 2,
    marginTop: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const onRemove = (index) => setTableData(tableData.filter((item) => item.index !== index));
  const addIndex = () => setTableData(tableData.map((record, index) => ({ ...record, index })));

  useEffect(() => {
    addIndex();
  }, [tableData.length]);

  return (
    <div className="App">
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ alignItems: 'flex-start', marginTop: 1 }}>
          <Grid container item xs={12} md={8} lg={8}>
            <Grid item xs={12} md={12} lg={12} component={Paper} elevation={3}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Equipment</TableCell>
                    <TableCell>Taken by</TableCell>
                    <TableCell>Subject</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((record, index) => (
                    <TableData
                      key={index}
                      index={record.index}
                      equipment={record.equipment}
                      name={record.name}
                      subject={record.subject}
                      onRemove={onRemove}
                    />
                  ))}
                </TableBody>
              </Table>
            </Grid>
            <Grid container spacing={2} component={Paper} elevation={3} sx={gridStyles}>
              <MyForm tableData={tableData} setTableData={setTableData} />
            </Grid>
          </Grid>
          <Grid container item spacing={2} xs={12} md={4} lg={4}>
            <Picture title="Budapest at night" imageUrl="https://www.voubs.com/original/photo/19d/Beautiful+Budapest+Chain+Bridge+and+Buda+Castle+at+night._de604fc6dea2cee0bbaafb522b149c2b.jpg" />
            <Picture title="Prague at night" imageUrl="https://sumfinity.com/wp-content/uploads/2013/11/Prague-Castle-at-Night-Czech-Republic.jpg" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
