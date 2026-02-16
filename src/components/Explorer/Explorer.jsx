import { useState } from "react";
import CardModal from "./CardModal/CardModal";
import CardItem from "./CardItem/CardItem";
import Preloader from "../Preloader/Preloader";
import EmptyState from "../EmptyState/EmptyState";
import { api } from "../../utils/api-instance";

import searchIcon from "../../images/search.svg";

function Explorer() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);

    api
      .searchCards(query)
      .then((res) => {
        setCards(res.data || []);
      })
      .catch((err) => {
        console.error("Error buscando cartas:", err);
        setCards([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <section className="explorer">
      <form className="explorer__header" onSubmit={handleSearch}>
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
        ) : cards.length === 0 ? (
          <EmptyState />
        ) : (
          cards.map((card) => (
            <CardItem
              key={card.id}
              card={{
                id: card.id,
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
              onClick={setSelectedCard}
            />
          ))
        )}
      </div>

      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </section>
  );
}

export default Explorer;
