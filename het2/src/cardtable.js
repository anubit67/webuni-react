import { useEffect, useState } from 'react';
import Card from './Card';
import { cards } from './card-generator';

function CardTable({ setCompleted }) {
  const [previousCard, setPreviousCard] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [reset, setReset] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [numOfVisibleCards, setNumOfVisibleCards] = useState(0);

  useEffect(() => {
    setPreviousCard(currentCard);

    if (numOfVisibleCards > 0 && numOfVisibleCards % 2 === 0) {
      if (previousCard !== null && currentCard !== null && previousCard === currentCard) {
        setCurrentCard(null);
        setPreviousCard(null);
      } else if (numOfVisibleCards > 0) {
        setTimeout(() => {
          setReset(!reset);
          setNumOfVisibleCards(0);
          setCurrentCard(null);
          setPreviousCard(null);
          setDisabled(false);
        }, 1000);
        setDisabled(true);
      }
    }

    if (numOfVisibleCards === 8) {
      setCompleted(true);
    }
  }, [numOfVisibleCards]);

  return (
    <div className="cardTable">
      <table>
        <tbody>
          <tr>
            {cards.map((suit, index) => (
              <Card
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                suit={suit}
                setCurrentCard={setCurrentCard}
                reset={reset}
                setNumOfVisibleCards={setNumOfVisibleCards}
                numOfVisibleCards={numOfVisibleCards}
                disabled={disabled}
              />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CardTable;
