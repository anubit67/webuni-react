const suits = {
  hearts: 'hearts',
  clubs: 'clubs',
  diamonds: 'diamonds',
  spades: 'spades',
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
