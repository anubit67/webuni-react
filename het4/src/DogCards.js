import {
  Button, Container, Grid, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DogCard from './DogCard';

function DogCards({ dogs, setDogs, setTargetDog }) {
  const navigate = useNavigate();
  const onDelete = (id) => setDogs(dogs.filter((dog) => id !== dog.id));

  return (
    <Container maxWidth="lg">
      <Typography variant="h2">All dogs</Typography>
      <Grid container spacing={2}>
        {dogs.map((dog) => (
          <DogCard
            name={dog.name}
            url={dog.url}
            key={dog.id}
            id={dog.id}
            onDelete={onDelete}
            setTargetDog={setTargetDog}
          />
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={3} md={4} xs={12}>
          <Button variant="contained" onClick={() => navigate('/new')} fullWidth sx={{ marginTop: 2 }}>Add dog</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DogCards;
