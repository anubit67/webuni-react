import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Container, Grid, TextField, Typography,
} from '@mui/material';

function DogForm({
  targetDog, dogs, setDogs, setTargetDog,
}) {
  const [name, setName] = useState(targetDog?.name ?? '');
  const [url, setUrl] = useState(targetDog?.url ?? '');
  const navigate = useNavigate();

  const removeTargetDog = () => dogs.filter((dog) => dog.id !== targetDog.id);

  const handleSave = () => {
    if (targetDog !== null) {
      // remove the modified dog and add the new dog
      setDogs([...removeTargetDog(), { name, url, id: dogs.length }]);
      setTargetDog(null);
      navigate('/');
    } else {
      // add the new dog
      setDogs([...dogs, { name, url, id: dogs.length }]);
      navigate('/');
    }
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
