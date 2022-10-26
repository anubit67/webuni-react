import { useState } from 'react';
import {
  Grid, Button, TextField, Select, MenuItem, FormControl, InputLabel,
} from '@mui/material';

function MyForm({ tableData, setTableData }) {
  const [equipment, setEquipment] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');

  const validator = () => (!(equipment.length === 0 || name.length === 0 || subject.length === 0));

  const addNewImage = () => {
    if (validator()) {
      setTableData([...tableData, {
        equipment,
        name,
        subject,
      }]);
    }
  };

  const clear = () => {
    setEquipment('');
    setName('');
    setSubject('');
  };

  return (
    <>
      <Grid item xs={12} md={6} lg={6}>
        <TextField fullWidth label="Equipment" value={equipment} onChange={(e) => setEquipment(e.target.value)} />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <FormControl fullWidth>
          <InputLabel id="name">Taken by</InputLabel>
          <Select value={name} label="name" onChange={(e) => setName(e.target.value)} labelId="name">
            <MenuItem value="Joe">Joe</MenuItem>
            <MenuItem value="John">John</MenuItem>
            <MenuItem value="Josh">Josh</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <TextField fullWidth label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Button fullWidth variant="contained" onClick={addNewImage}>Add new image</Button>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Button fullWidth variant="contained" color="error" onClick={clear}>Cancel</Button>
      </Grid>
    </>
  );
}

export default MyForm;
