import { useState, useEffect } from "react";
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
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    loadInitialCards();
  }, []);

  function loadInitialCards() {
    setLoading(true);
    setError(null);

    api
      .searchCards("*")
      .then((res) => {
        const validCards = (res.data || []).filter(
          (card) =>
            card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal,
        );

        setCards(validCards);
        setNextPage(res.next_page || null);
      })
      .catch(() => {
        setError("No se pudieron cargar cartas.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleSearch(e) {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setCards([]);
    setNextPage(null);

    api
      .searchCards(query)
      .then((res) => {
        const validCards = (res.data || []).filter(
          (card) =>
            card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal,
        );

        setCards(validCards);
        setNextPage(res.next_page || null);
      })
      .catch(() => {
        setError("No se pudo conectar con Scryfall.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function loadMoreCards() {
    if (!nextPage || isFetchingMore) return;

    setIsFetchingMore(true);

    fetch(nextPage)
      .then((res) => res.json())
      .then((res) => {
        const validCards = (res.data || []).filter(
          (card) =>
            card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal,
        );

        setCards((prev) => {
          const merged = [...prev, ...validCards];

          const unique = merged.filter(
            (card, index, self) =>
              index === self.findIndex((c) => c.id === card.id),
          );

          return unique;
        });

        setNextPage(res.next_page || null);
      })
      .catch(() => {
        console.error("Error cargando más cartas");
      })
      .finally(() => {
        setIsFetchingMore(false);
      });
  }

  useEffect(() => {
    function handleScroll() {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;

      if (nearBottom) loadMoreCards();
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextPage]);

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
        ) : error ? (
          <p className="explorer__message explorer__message--error">{error}</p>
        ) : cards.length === 0 ? (
          <EmptyState />
        ) : (
          cards.map((card, index) => (
            <CardItem
              key={`${card.id}-${index}`}
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

      {isFetchingMore && <Preloader />}

      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </section>
  );
}

export default Explorer;
