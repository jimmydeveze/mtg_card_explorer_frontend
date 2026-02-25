import { useState, useEffect, useRef } from "react";
import CardModal from "./CardModal/CardModal";
import FilterModal from "./FilterModal/FilterModal";
import ExplorerHeader from "./ExplorerHeader/ExplorerHeader";
import ExplorerGrid from "./ExplorerGrid/ExplorerGrid";
import Preloader from "../Preloader/Preloader";
import ExplorerChips from "./ExplorerChips/ExplorerChips";
import { api } from "../../utils/api-instance";
import { getCached, setCache } from "../../utils/cardsCache";
import { buildQuery } from "../../utils/buildQuery";
import { filterValidCards } from "../../utils/filterValidCards";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

function Explorer() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [visibleCount, setVisibleCount] = useState(50);
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

  const fetchingRef = useRef(false);

  function performSearch() {
    const finalQuery = buildQuery(query, filters);
    const cached = getCached(finalQuery);

    if (cached) {
      setCards(cached.data);
      setNextPage(cached.nextPage);
      setVisibleCount(50);
      return;
    }

    setLoading(true);
    setError(null);

    api
      .searchCards(finalQuery)
      .then((res) => {
        const validCards = filterValidCards(res.data);

        setCards(validCards);
        setNextPage(res.next_page || null);
        setVisibleCount(50);

        setCache(finalQuery, {
          data: validCards,
          nextPage: res.next_page || null,
        });
      })
      .catch(() => {
        setError("No se pudo conectar con Scryfall.");
        setCards([]);
      })
      .finally(() => setLoading(false));
  }

  function loadMoreCards() {
    if (visibleCount < cards.length) {
      setVisibleCount((prev) => prev + 50);
      return;
    }

    if (!nextPage || fetchingRef.current) return;

    fetchingRef.current = true;
    setIsFetchingMore(true);

    const cacheKey = `page:${nextPage}`;
    const cached = getCached(cacheKey);

    if (cached) {
      setCards((prev) => [...prev, ...cached.cards]);
      setNextPage(cached.nextPage);
      setVisibleCount((prev) => prev + 50);
      fetchingRef.current = false;
      setIsFetchingMore(false);
      return;
    }

    fetch(nextPage)
      .then((res) => res.json())
      .then((res) => {
        const validCards = filterValidCards(res.data);

        setCards((prev) => [...prev, ...validCards]);
        setNextPage(res.next_page || null);

        setCache(cacheKey, {
          cards: validCards,
          nextPage: res.next_page || null,
        });

        setVisibleCount((prev) => prev + 50);
      })
      .finally(() => {
        fetchingRef.current = false;
        setIsFetchingMore(false);
      });
  }

  useEffect(() => {
    const delay = setTimeout(performSearch, 400);
    return () => clearTimeout(delay);
  }, [query, filters]);

  useInfiniteScroll(loadMoreCards, [nextPage, cards, visibleCount]);

  function removeFilter(name) {
    setFilters((prev) => ({
      ...prev,
      [name]: name === "creaturesOnly" ? false : "",
    }));
  }

  return (
    <section className="explorer">
      <ExplorerHeader
        query={query}
        setQuery={setQuery}
        onSubmit={(e) => {
          e.preventDefault();
          performSearch();
        }}
        openFilters={() => setFiltersOpen(true)}
      />

      <ExplorerChips filters={filters} removeFilter={removeFilter} />

      <ExplorerGrid
        loading={loading}
        error={error}
        cards={cards}
        visibleCount={visibleCount}
        onCardClick={setSelectedCard}
      />

      {isFetchingMore && <Preloader />}

      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />

      <FilterModal
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onApply={() => {}}
      />
    </section>
  );
}

export default Explorer;
