import { Button, Grid, Typography } from '@mui/material';
import { shuffleCards } from './card-generator';

function Congratulations({ setCompleted }) {
  const restartGame = () => {
    shuffleCards();
    setCompleted(false);
  };

  return (
    <div className="congratulations">
      <Grid container justifyContent="center" rowGap={5}>
        <Typography variant="h4">Gratulálok!</Typography>
        <Grid container justifyContent="center">
          <Button variant="contained" onClick={restartGame}>Új játék</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Congratulations;
