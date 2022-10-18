import './App.css';
import { useEffect, useState } from 'react';
import CardTable from './CardTable';
import Congratulations from './Congratulations';

function App() {
  const [completed, setCompleted] = useState(false);
  const [cheatEnabled, setCheatEnabled] = useState(false);

  window.cheat = () => setCheatEnabled(true);

  useEffect(() => {
    if (cheatEnabled) {
      setCompleted(true);
      setCheatEnabled(false);
    }
  }, [cheatEnabled]);

  return (
    <div className="App">
      {completed
        ? <Congratulations setCompleted={setCompleted} />
        : <CardTable setCompleted={setCompleted} />}
      <h1>Memóriajáték</h1>
    </div>
  );
}

export default App;
