import {
  // eslint-disable-next-line max-len
  Container, Grid, Paper, Card, CardMedia, CardContent, CardActions, Button, TextField, Select, MenuItem, TableContainer, Table, TableHead, TableCell, TableRow, TableBody,
} from '@mui/material';
import { useEffect, useState } from 'react';
import data from './data';
import TableData from './Table';

function App() {
  const [equipment, setEquipment] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
  }, [tableData.length]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={9} lg={9}>
          <TableContainer component={Paper}>
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
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    equipment={record.equipment}
                    name={record.name}
                    subject={record.subject}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Card elevation={5}>
            <CardMedia component="img" height="140" image="https://www.hdrshooter.com/wp-content/uploads/2014/01/Budapest-IMG_2755-web.jpg" />
            <CardContent>Budapest at night</CardContent>
            <CardActions><Button>Details</Button></CardActions>
          </Card>
          <Card elevation={5}>
            <CardMedia component="img" height="140" image="https://sumfinity.com/wp-content/uploads/2013/11/Prague-Castle-at-Night-Czech-Republic.jpg" />
            <CardContent>Prague at night</CardContent>
            <CardActions><Button>Details</Button></CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={9} lg={9} component={Paper}>
          <Grid item xs={12} md={6} lg={6}>
            <TextField fullWidth label="Equipment" value={equipment} onChange={(e) => setEquipment(e.target.value)} />
            <Select fullWidth value={name} label="Taken by" onChange={(e) => setName(e.target.value)}>
              <MenuItem value="John">John</MenuItem>
              <MenuItem value="Mark">Mark</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField fullWidth label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setTableData([...tableData, {
                  equipment,
                  name,
                  subject,
                }]);
              }}
            >
              Add new image
            </Button>
            <Button fullWidth variant="contained" color="error">Cancel</Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
