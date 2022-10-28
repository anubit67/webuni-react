import clubs from './assets/cards/card-clubs-1.png';
import diamonds from './assets/cards/card-diamonds-1.png';
import hearts from './assets/cards/card-hearts-1.png';
import spades from './assets/cards/card-spades-1.png';

const suits = {
  hearts,
  clubs,
  diamonds,
  spades,
};

const generateCards = () => {
  const cards = [];
  Object.keys(suits).forEach((key) => {
    for (let i = 0; i < 2; i++) {
      cards.push(suits[key]);
    }
  });
  return cards;
};

const cards = generateCards();

const shuffleCards = () => cards.sort(() => Math.random() - 0.5);

shuffleCards();

export { cards, shuffleCards };
