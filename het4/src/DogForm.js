import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Container, Grid, TextField, Typography,
} from '@mui/material';

function DogForm({ onSave }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSave = () => {
    onSave({ name, url });
    navigate('/');
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4">Dog Form</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={3}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <TextField label="Picture url" value={url} onChange={(e) => setUrl(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DogForm;
