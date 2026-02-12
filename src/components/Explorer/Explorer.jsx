import { useState } from "react";
import CardModal from "./CardModal/CardModal";
import CardItem from "./CardItem/CardItem";

function Explorer() {
  const mockCards = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    name: `Arcane Sentinel ${i + 1}`,
    image: `https://picsum.photos/400/560?random=${i}`,
    type: "Creature — Human Wizard",
    manaCost: "{2}{U}{U}",
    power: "3",
    toughness: "4",
    text:
      "Whenever you cast a noncreature spell, draw a card, then discard a card. " +
      "If that spell was blue, tap target creature an opponent controls.",
    rarity: "Rare",
  }));

  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <section className="explorer">
      <div className="explorer__header">
        <h1 className="explorer__title">Explorar Cartas</h1>

        <input
          type="text"
          placeholder="Buscar carta..."
          className="explorer__search"
        />
      </div>

      <div className="explorer__grid">
        {mockCards.map((card) => (
          <CardItem key={card.id} card={card} onClick={setSelectedCard} />
        ))}
      </div>

      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </section>
  );
}

export default Explorer;
