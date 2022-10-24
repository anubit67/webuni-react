import { shuffleCards } from './card-generator';

function Congratulations({ setCompleted }) {
  const restartGame = () => {
    shuffleCards();
    setCompleted(false);
  };

  return (
    <div className="congratulations">
      <h1>Congratulations! You did it.</h1>
      <button type="button" onClick={() => restartGame()}>PLAY AGAIN</button>
    </div>
  );
}

export default Congratulations;
