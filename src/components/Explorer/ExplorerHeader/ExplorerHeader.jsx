import searchIcon from "../../../images/search.svg";

function ExplorerHeader({ query, setQuery, onSubmit, openFilters }) {
  return (
    <form className="explorer__header" onSubmit={onSubmit}>
      <h1 className="explorer__title">Explorar Cartas</h1>

      <input
        type="text"
        placeholder="Buscar carta..."
        className="explorer__search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="explorer__actions">
        <button
          type="submit"
          className="explorer__submit explorer__submit--search"
        >
          <img src={searchIcon} alt="" className="explorer__icon" />
          <span className="explorer__submit-text">Buscar</span>
        </button>

        <button
          type="button"
          className="explorer__submit explorer__submit--filter"
          onClick={openFilters}
        >
          Filtros
        </button>
      </div>
    </form>
  );
}

export default ExplorerHeader;
