import { useState } from "react";
import CardModal from "./CardModal/CardModal";
import CardItem from "./CardItem/CardItem";
import Preloader from "../Preloader/Preloader";
import EmptyState from "../EmptyState/EmptyState";

import searchIcon from "../../images/search.svg";

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
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  return (
    <section className="explorer">
      <form
        className="explorer__header"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Buscar:", query);
        }}
      >
        <h1 className="explorer__title">Explorar Cartas</h1>

        <label htmlFor="search" className="visually-hidden">
          Buscar carta
        </label>

        <input
          id="search"
          type="text"
          placeholder="Buscar carta..."
          className="explorer__search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit" className="explorer__submit">
          <img src={searchIcon} alt="" />
          <span className="explorer__submit-text">Buscar</span>
        </button>
      </form>

      <div className="explorer__grid">
        {loading ? (
          <Preloader />
        ) : mockCards.length === 0 ? (
          <EmptyState />
        ) : (
          mockCards.map((card) => (
            <CardItem key={card.id} card={card} onClick={setSelectedCard} />
          ))
        )}
      </div>

      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </section>
  );
}

export default Explorer;
