import { useEffect, useState } from 'react';
import { Grid, ImageList, ImageListItem } from '@mui/material';
import { cards } from './card-generator';
import cardBack from './assets/cards/card-back1.png';

function CardTable({ setCompleted, hardMode }) {
  const [disabled, setDisabled] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);

  const isVisible = (idx) => visibleCards.includes(idx);

  const cardClick = (idx) => setVisibleCards([...visibleCards, idx]);

  useEffect(() => {
    if (visibleCards.length > 0 && visibleCards.length % 2 === 0) {
      const currentCard = cards[visibleCards[visibleCards.length - 1]];
      const lastCard = cards[visibleCards[visibleCards.length - 2]];
      if (!(lastCard === currentCard)) {
        setTimeout(() => {
          if (hardMode) {
            setVisibleCards([]);
          } else {
            setVisibleCards(visibleCards.slice(0, visibleCards.length - 2));
          }
          setDisabled(false);
        }, 1000);
        setDisabled(true);
      }
    }
    if (visibleCards.length === 8) {
      setCompleted(true);
    }
  }, [visibleCards.length]);

  return (
    <div className="cardTable">
      <Grid container direction="row" justifyContent="center" columnGap={{ xs: 0, md: 3 }}>
        <ImageList cols={4}>
          {cards.map((card, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <ImageListItem key={idx}>
              <img src={isVisible(idx) ? card : cardBack} alt="card" onClick={isVisible(idx) || disabled ? () => {} : () => cardClick(idx)} aria-hidden="true" />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </div>
  );
}

export default CardTable;
