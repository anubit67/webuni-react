import Card from './card';

function CardTable() {  
  const suits = {
    hearts: 'hearts',
    clubs: 'clubs',
    diamonds: 'diamonds',
    spades: 'spades',
  };

  const generateCards = () => {
    const cards = [];
    for (const key in suits) {
      for (let i = 0; i < 2; i++) {
        cards.push(suits[key]);
      }
    }
    return cards;
  }

  const shuffleCards = (arr) => arr.sort(() => Math.random() - 0.5);
  
  const cards = shuffleCards(generateCards());

  return (<div className="cardTable">
    <table>
      <tbody>
        <tr>
          {cards.map((suit, index) => <Card key={index} suit={suit}></Card>)}
        </tr>
      </tbody>
    </table>
  </div>)
}

export default CardTable;