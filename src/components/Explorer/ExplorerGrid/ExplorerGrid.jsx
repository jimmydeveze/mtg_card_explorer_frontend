import CardItem from "../CardItem/CardItem";
import Preloader from "../../Preloader/Preloader";
import EmptyState from "../../EmptyState/EmptyState";

function ExplorerGrid({ loading, error, cards, visibleCount, onCardClick }) {
  return (
    <div className="explorer__grid">
      {loading ? (
        <Preloader />
      ) : error ? (
        <p className="explorer__message explorer__message--error">{error}</p>
      ) : cards.length === 0 ? (
        <EmptyState />
      ) : (
        cards.slice(0, visibleCount).map((card, index) => (
          <CardItem
            key={`${card.id}-${index}`}
            card={{
              id: card.id,
              oracleId: card.oracle_id,
              name: card.name,
              image:
                card.image_uris?.normal ||
                card.card_faces?.[0]?.image_uris?.normal,
              type: card.type_line,
              manaCost: card.mana_cost,
              power: card.power,
              toughness: card.toughness,
              text: card.oracle_text,
              rarity: card.rarity,
            }}
            onClick={onCardClick}
          />
        ))
      )}
    </div>
  );
}

export default ExplorerGrid;
