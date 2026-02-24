import { memo, useCallback } from "react";

function CardItem({ card, onClick }) {
  const handleClick = useCallback(() => {
    onClick(card);
  }, [onClick, card]);

  return (
    <div className="card" onClick={handleClick}>
      <img
        src={card.image}
        alt={card.name}
        className="card__image"
        loading="lazy"
      />
      <h3 className="card__name">{card.name}</h3>
    </div>
  );
}

export default memo(CardItem);
