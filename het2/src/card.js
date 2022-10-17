import {useState} from 'react';
import cardBack from './assets/cards/card-back1.png';
import clubs from './assets/cards/card-clubs-1.png';
import diamonds from './assets/cards/card-diamonds-1.png';
import hearts from './assets/cards/card-hearts-1.png';
import spades from './assets/cards/card-spades-1.png';

function Card({suit}) {
  const [visible, setVisible] = useState(false);
  const cards = {
    hearts,
    clubs,
    diamonds,
    spades,
  };

  return (
    <td><img src={visible ? cards[suit] : cardBack} alt='card' onClick={()=>setVisible(!visible)}></img></td>
  )
}

export default Card;