import { useEffect, useState } from 'react';
import {
  Button, Container, Grid, Typography,
} from '@mui/material';
import CardTable from './CardTable';
import Congratulations from './Congratulations';

function App() {
  const [completed, setCompleted] = useState(false);
  const [cheatEnabled, setCheatEnabled] = useState(false);
  const [hardMode, setHardmode] = useState(false);
  const [start, setStart] = useState(false);

  window.cheat = () => setCheatEnabled(true);

  const handleHardmode = () => {
    setHardmode(true);
    setStart(true);
  };

  const handleEasymode = () => {
    setHardmode(false);
    setStart(true);
  };

  const renderLogic = () => {
    if (start) {
      if (completed) {
        return <Congratulations setCompleted={setCompleted} />;
      }
      return (
        <Grid container justifyContent="center" rowGap={10}>
          <CardTable setCompleted={setCompleted} hardMode={hardMode} />
          <Grid container justifyContent="center">
            <Button variant="outlined" onClick={() => (setStart(false))}>Vissza</Button>
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid container justifyContent="center" rowGap={10}>
        <Grid item>
          <Typography variant="h5" align="center">Üdvözöllek a Memóriajátékban. Kérlek válassz nehézségi szintet</Typography>
        </Grid>
        <Grid item container justifyContent="center" direction="row" columnGap={2}>
          <Button variant="contained" color="success" size="large" onClick={handleEasymode}>Könnyű</Button>
          <Button variant="contained" color="error" size="large" onClick={handleHardmode}>Nehéz</Button>
        </Grid>
      </Grid>
    );
  };

  useEffect(() => {
    if (cheatEnabled) {
      setCompleted(true);
      setCheatEnabled(false);
    }
  }, [cheatEnabled]);

  return (
    <div className="App">
      <Container maxWidth="lg">
        <Grid container direction="column" justifyContent="center" alignItems="center" rowGap={10} paddingTop={20}>
          <Grid item>
            <Typography variant="h2" align="center">Memóriajáték</Typography>
          </Grid>
          <Grid item>
            {renderLogic() }
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
