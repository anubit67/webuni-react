import { useEffect, useState } from 'react';
import cardBack from './assets/cards/card-back1.png';
import clubs from './assets/cards/card-clubs-1.png';
import diamonds from './assets/cards/card-diamonds-1.png';
import hearts from './assets/cards/card-hearts-1.png';
import spades from './assets/cards/card-spades-1.png';

function Card({
  suit, setCurrentCard, reset, setNumOfVisibleCards, numOfVisibleCards, disabled,
}) {
  const [visible, setVisible] = useState(false);

  const cards = {
    hearts,
    clubs,
    diamonds,
    spades,
  };

  useEffect(() => {
    if (visible) {
      setCurrentCard(suit);
      setNumOfVisibleCards(numOfVisibleCards += 1);
    }
  }, [visible]);

  useEffect(() => {
    setVisible(false);
  }, [reset]);

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <td><img src={visible ? cards[suit] : cardBack} alt="card" onClick={disabled ? () => {} : () => setVisible(true)} /></td>
  );
}

export default Card;
