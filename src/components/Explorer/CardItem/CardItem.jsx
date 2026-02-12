function CardItem({ card, onClick }) {
  return (
    <div className="card" onClick={() => onClick(card)}>
      <img src={card.image} alt={card.name} className="card__image" />
      <h3 className="card__name">{card.name}</h3>
    </div>
  );
}

export default CardItem;
