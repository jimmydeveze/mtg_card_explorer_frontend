import { useState, useEffect } from "react";
import CardModal from "./CardModal/CardModal";
import CardItem from "./CardItem/CardItem";
import FilterModal from "./FilterModal/FilterModal";
import Preloader from "../Preloader/Preloader";
import EmptyState from "../EmptyState/EmptyState";
import { api } from "../../utils/api-instance";

import searchIcon from "../../images/search.svg";

function Explorer() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    color: "",
    type: "",
    rarity: "",
    minMana: "",
    maxMana: "",
    legal: "",
    creaturesOnly: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  function buildQuery() {
    let q = query.trim();

    if (filters.color) q += ` color:${filters.color}`;
    if (filters.type) q += ` type:${filters.type}`;
    if (filters.rarity) q += ` rarity:${filters.rarity}`;
    if (filters.minMana) q += ` cmc>=${filters.minMana}`;
    if (filters.maxMana) q += ` cmc<=${filters.maxMana}`;
    if (filters.legal) q += ` legal:${filters.legal}`;
    if (filters.creaturesOnly) q += ` type:creature`;

    q = q.trim();

    if (!q) q = "game:paper";

    return q;
  }

  function performSearch() {
    const finalQuery = buildQuery();

    setLoading(true);
    setError(null);

    api
      .searchCards(finalQuery)
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
        setCards([]);
      })
      .finally(() => setLoading(false));
  }

  function handleSearch(e) {
    e.preventDefault();
    performSearch();
  }

  useEffect(() => {
    if (!query.trim()) return;

    const delay = setTimeout(() => {
      performSearch();
    }, 600);

    return () => clearTimeout(delay);
  }, [query]);

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

        setCards((prev) => [...prev, ...validCards]);
        setNextPage(res.next_page || null);
      })
      .finally(() => setIsFetchingMore(false));
  }

  useEffect(() => {
    function handleScroll() {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;

      if (nearBottom) loadMoreCards();
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextPage, isFetchingMore]);

  useEffect(() => {
    performSearch();
  }, []);

  function removeFilter(name) {
    setFilters((prev) => ({
      ...prev,
      [name]: name === "creaturesOnly" ? false : "",
    }));

    setTimeout(() => performSearch(), 0);
  }

  return (
    <section className="explorer">
      <form className="explorer__header" onSubmit={handleSearch}>
        <h1 className="explorer__title">Explorar Cartas</h1>
        <input
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

        <button
          type="button"
          className="explorer__submit"
          onClick={() => setFiltersOpen(true)}
        >
          Filtros
        </button>
      </form>

      <div className="explorer__chips">
        {filters.color && (
          <button
            onClick={() => removeFilter("color")}
            className={`chip chip--${filters.color}`}
          >
            {filters.color.toUpperCase()} ✕
          </button>
        )}

        {filters.type && (
          <button
            onClick={() => removeFilter("type")}
            className="chip chip--type"
          >
            {filters.type} ✕
          </button>
        )}

        {filters.rarity && (
          <button
            onClick={() => removeFilter("rarity")}
            className="chip chip--rarity"
          >
            {filters.rarity} ✕
          </button>
        )}

        {filters.legal && (
          <button
            onClick={() => removeFilter("legal")}
            className="chip chip--legal"
          >
            {filters.legal} ✕
          </button>
        )}

        {filters.creaturesOnly && (
          <button
            onClick={() => removeFilter("creaturesOnly")}
            className="chip chip--type"
          >
            criaturas ✕
          </button>
        )}
      </div>

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

      <FilterModal
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onApply={performSearch}
      />
    </section>
  );
}

export default Explorer;
